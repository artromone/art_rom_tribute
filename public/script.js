const tg = window.Telegram?.WebApp;

if (!tg) {
    console.error('Telegram Web App не доступен');
    document.getElementById('app-info').textContent = 'Ошибка: приложение должно быть открыто в Telegram';
}

// Настройка приложения
if (tg) {
    tg.ready();
    tg.expand();
    
    // Применение темы
    applyTheme();
    
    // Настройка главной кнопки
    setupMainButton();
    
    // Инициализация пользователя
    initUser();
    
    // Показать информацию о приложении
    showAppInfo();
}

function applyTheme() {
    const theme = tg.colorScheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Применяем цвета темы Telegram
    if (tg.themeParams) {
        const root = document.documentElement;
        Object.entries(tg.themeParams).forEach(([key, value]) => {
            root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value);
        });
    }
}

function setupMainButton() {
    tg.MainButton.text = 'Готово ✓';
    tg.MainButton.color = tg.themeParams.button_color || '#007AFF';
    tg.MainButton.textColor = tg.themeParams.button_text_color || '#ffffff';
    tg.MainButton.show();
    
    tg.MainButton.onClick(() => {
        tg.sendData(JSON.stringify({
            action: 'main_button_clicked',
            timestamp: Date.now(),
            user_id: tg.initDataUnsafe?.user?.id
        }));
    });
}

function initUser() {
    const user = tg.initDataUnsafe?.user;
    const userNameElement = document.getElementById('user-name');
    const userStatusElement = document.getElementById('user-status');
    const userAvatarElement = document.getElementById('user-avatar');
    
    if (user) {
        userNameElement.textContent = `${user.first_name} ${user.last_name || ''}`.trim();
        userStatusElement.textContent = user.username ? `@${user.username}` : 'Пользователь Telegram';
        userAvatarElement.textContent = user.first_name.charAt(0).toUpperCase();
    } else {
        userNameElement.textContent = 'Гость';
        userStatusElement.textContent = 'Неизвестный пользователь';
        userAvatarElement.textContent = '?';
    }
}

function showAppInfo() {
    const info = {
        platform: tg.platform,
        version: tg.version,
        colorScheme: tg.colorScheme,
        isExpanded: tg.isExpanded,
        viewportHeight: tg.viewportHeight,
        isClosingConfirmationEnabled: tg.isClosingConfirmationEnabled
    };
    
    document.getElementById('app-info').textContent = JSON.stringify(info, null, 2);
}

// Обработчики событий
document.getElementById('main-button')?.addEventListener('click', () => {
    tg.showAlert('Главная кнопка нажата! 🎉', () => {
        tg.HapticFeedback.impactOccurred('medium');
    });
});

document.getElementById('data-button')?.addEventListener('click', () => {
    const data = {
        action: 'data_sent',
        timestamp: Date.now(),
        user_data: tg.initDataUnsafe?.user,
        app_data: {
            platform: tg.platform,
            version: tg.version
        }
    };
    
    tg.sendData(JSON.stringify(data));
    tg.showPopup({
        title: 'Данные отправлены',
        message: 'Информация передана боту',
        buttons: [{type: 'ok'}]
    });
});

document.getElementById('close-button')?.addEventListener('click', () => {
    tg.showConfirm('Вы уверены, что хотите закрыть приложение?', (confirmed) => {
        if (confirmed) {
            tg.close();
        }
    });
});

// Обработка событий Telegram
if (tg) {
    tg.onEvent('themeChanged', applyTheme);
    
    tg.onEvent('viewportChanged', () => {
        showAppInfo();
    });
    
    tg.onEvent('mainButtonClicked', () => {
        console.log('Main button clicked via event');
    });
}

// Показать приветствие при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (tg) {
            tg.showPopup({
                title: 'Добро пожаловать! 👋',
                message: 'Mini App успешно загружено и готово к работе',
                buttons: [{type: 'ok'}]
            });
        }
    }, 1000);
});
