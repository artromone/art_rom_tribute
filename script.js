// Инициализация Telegram Web App
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    applyTheme();
    setupMainButton();
}

// Применение темы
function applyTheme() {
    const theme = tg?.colorScheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    if (tg?.themeParams) {
        const root = document.documentElement;
        Object.entries(tg.themeParams).forEach(([key, value]) => {
            root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value);
        });
    }
}

// Настройка главной кнопки
function setupMainButton() {
    if (!tg) return;
    
    tg.MainButton.text = 'Выбрать услугу';
    tg.MainButton.color = '#007AFF';
    tg.MainButton.show();
    
    tg.MainButton.onClick(() => {
        scrollToServices();
    });
}

// Функции навигации
function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Выбор услуги
function selectService(serviceId) {
    if (tg) {
        const services = {
            1: {
                name: 'Консультация по резюме',
                description: 'Разбор резюме и стратегии поиска работы'
            },
            2: {
                name: 'Менторство с 0 в IT',
                description: 'Полное сопровождение до первого оффера'
            }
        };
        
        const service = services[serviceId];
        
        tg.sendData(JSON.stringify({
            action: 'select_service',
            service_id: serviceId,
            service_name: service.name,
            user_id: tg.initDataUnsafe?.user?.id
        }));
        
        tg.showAlert(`Вы выбрали: "${service.name}". Сейчас с вами свяжется специалист.`);
    } else {
        alert('Для заказа услуги откройте приложение в Telegram');
    }
}

// Показать результаты
function showResults() {
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'show_results',
            user_id: tg.initDataUnsafe?.user?.id
        }));
    } else {
        alert('Для просмотра подробных результатов откройте в Telegram');
    }
}

// Обработка событий Telegram
if (tg) {
    tg.onEvent('themeChanged', applyTheme);
    
    tg.onEvent('mainButtonClicked', () => {
        scrollToServices();
    });
}

// Плавная анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к секциям
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

