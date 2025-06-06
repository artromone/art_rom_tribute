
// Инициализация Telegram Web App
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    applyTheme();
    setupMainButton();
    initUser();
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
    
    tg.MainButton.text = 'Поддержать автора';
    tg.MainButton.color = '#007AFF';
    tg.MainButton.show();
    
    tg.MainButton.onClick(() => {
        showSubscriptions();
    });
}

// Инициализация пользователя
function initUser() {
    if (!tg) return;
    
    const user = tg.initDataUnsafe?.user;
    if (user) {
        // Можно обновить данные пользователя
        console.log('User:', user);
    }
}

// Навигация по табам
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    loadSubscriptionLevels();
    loadServices();
    loadUserSubscription();
});

function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Обновляем активные табы
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Обновляем главную кнопку в зависимости от таба
            updateMainButton(targetTab);
        });
    });
}

function updateMainButton(activeTab) {
    if (!tg) return;
    
    switch(activeTab) {
        case 'subscriptions':
            tg.MainButton.text = 'Выбрать подписку';
            tg.MainButton.show();
            break;
        case 'services':
            tg.MainButton.text = 'Заказать услугу';
            tg.MainButton.show();
            break;
        case 'about':
            tg.MainButton.text = 'Связаться со мной';
            tg.MainButton.show();
            break;
        case 'my-subscription':
            tg.MainButton.text = 'Управление подпиской';
            tg.MainButton.show();
            break;
    }
}

// Загрузка уровней подписки
function loadSubscriptionLevels() {
    const container = document.getElementById('subscription-levels');
    
    subscriptionLevels.forEach(level => {
        const card = createSubscriptionCard(level);
        container.appendChild(card);
    });
}

function createSubscriptionCard(level) {
    const card = document.createElement('div');
    card.className = `subscription-card ${level.popular ? 'popular' : ''}`;
    
    card.innerHTML = `
        <div class="subscription-header">
            <div class="subscription-info">
                <h3>${level.name}</h3>
                <p>${level.description}</p>
            </div>
            <div class="subscription-price">
                <div class="price-amount">${level.price} ₽</div>
                <div class="price-period">/${level.period}</div>
            </div>
        </div>
        <div class="subscription-features">
            <ul>
                ${level.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <button class="btn btn-primary" onclick="openSubscriptionModal(${level.id})">
            Подписаться
        </button>
    `;
    
    return card;
}

// Загрузка услуг
function loadServices() {
    const container = document.getElementById('services-grid');
    
    services.forEach(service => {
        const card = createServiceCard(service);
        container.appendChild(card);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    
    card.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="service-price">${service.price}</div>
        <button class="btn btn-outline" onclick="openServiceModal(${service.id})">
            Подробнее
        </button>
    `;
    
    return card;
}

// Модальные окна
function openSubscriptionModal(levelId) {
    const level = subscriptionLevels.find(l => l.id === levelId);
    if (!level) return;
    
    const modal = document.getElementById('subscription-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = level.name;
    body.innerHTML = `
        <div class="modal-price">
            <div class="modal-price-amount">${level.price} ₽</div>
            <div class="modal-price-period">/${level.period}</div>
        </div>
        <p>${level.description}</p>
        <div class="modal-features">
            <h4>Что включено:</h4>
            <ul>
                ${level.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <button class="btn btn-success" onclick="subscribe(${levelId})">
            Оформить подписку
        </button>
        <button class="btn btn-secondary" onclick="closeModal()" style="margin-top: 12px;">
            Отмена
        </button>
    `;
    
    modal.classList.add('active');
}

function openServiceModal(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('service-modal-title');
    const body = document.getElementById('service-modal-body');
    
    title.textContent = service.name;
    body.innerHTML = `
        <div class="service-icon" style="font-size: 48px; text-align: center; margin-bottom: 16px;">
            ${service.icon}
        </div>
        <p style="margin-bottom: 20px;">${service.description}</p>
        <div style="background: var(--secondary-bg); padding: 16px; border-radius: 12px; margin-bottom: 20px;">
            <div style="font-size: 24px; font-weight: 700; color: var(--primary-color); margin-bottom: 4px;">
                ${service.price}
            </div>
            <div style="color: var(--hint-color); font-size: 14px;">
                Срок выполнения: ${service.deliveryTime}
            </div>
        </div>
        <div class="modal-features">
            <h4>Что входит в услугу:</h4>
            <ul>
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        <button class="btn btn-primary" onclick="orderService(${serviceId})">
            Заказать
        </button>
        <button class="btn btn-secondary" onclick="closeServiceModal()" style="margin-top: 12px;">
            Закрыть
        </button>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('subscription-modal').classList.remove('active');
}

function closeServiceModal() {
    document.getElementById('service-modal').classList.remove('active');
}

// Действия
function subscribe(levelId) {
    const level = subscriptionLevels.find(l => l.id === levelId);
    if (!level) return;
    
    // Отправляем данные боту
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'subscribe',
            level_id: levelId,
            level_name: level.name,
            price: level.price,
            user_id: tg.initDataUnsafe?.user?.id
        }));
    }
    
    // Симуляция успешной подписки
    userData.subscription = {
        level: level,
        startDate: new Date(),
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
    
    userData.paymentHistory.unshift({
        date: new Date(),
        amount: level.price,
        level: level.name
    });
    
    loadUserSubscription();
    closeModal();
    
    if (tg) {
        tg.showAlert(`Подписка "${level.name}" успешно оформлена!`);
    }
}

function orderService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    // Отправляем данные боту
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'order_service',
            service_id: serviceId,
            service_name: service.name,
            price: service.price,
            user_id: tg.initDataUnsafe?.user?.id
        }));
    }
    
    closeServiceModal();
    
    if (tg) {
        tg.showAlert(`Заявка на "${service.name}" отправлена! Я свяжусь с вами в ближайшее время.`);
    }
}

function loadUserSubscription() {
    const statusContainer = document.getElementById('subscription-status');
    const historyContainer = document.getElementById('payment-history');
    
    if (userData.subscription) {
        const sub = userData.subscription;
        statusContainer.innerHTML = `
            <div class="status-card">
                <div class="status-icon">⭐</div>
                <h3>Активная подписка</h3>
                <p class="status-text">
                    <strong>${sub.level.name}</strong><br>
                    Следующее списание: ${sub.nextPayment.toLocaleDateString('ru-RU')}
                </p>
                <button class="btn btn-secondary" onclick="cancelSubscription()">
                    Отменить подписку
                </button>
            </div>
        `;
    } else {
        statusContainer.innerHTML = `
            <div class="status-card">
                <div class="status-icon">👤</div>
                <h3>Статус подписки</h3>
                <p class="status-text">У вас нет активной подписки</p>
                <button class="btn btn-primary" onclick="showSubscriptions()">
                    Выбрать подписку
                </button>
            </div>
        `;
    }
    
    // История платежей
    if (userData.paymentHistory.length > 0) {
        historyContainer.innerHTML = userData.paymentHistory.map(payment => `
            <div class="history-item">
                <span class="history-date">${payment.date.toLocaleDateString('ru-RU')}</span>
                <span class="history-amount">${payment.amount} ₽</span>
            </div>
        `).join('');
    } else {
        historyContainer.innerHTML = `
            <div class="history-item">
                <span class="history-date">Нет данных</span>
                <span class="history-amount">—</span>
            </div>
        `;
    }
}

function cancelSubscription() {
    if (tg) {
        tg.showConfirm('Вы уверены, что хотите отменить подписку?', (confirmed) => {
            if (confirmed) {
                userData.subscription = null;
                loadUserSubscription();
                tg.showAlert('Подписка отменена');
            }
        });
    }
}

function showSubscriptions() {
    // Переключаемся на таб подписок
    document.querySelector('[data-tab="subscriptions"]').click();
}

// Обработка событий Telegram
if (tg) {
    tg.onEvent('themeChanged', applyTheme);
    
    tg.onEvent('mainButtonClicked', () => {
        const activeTab = document.querySelector('.nav-tab.active').dataset.tab;
        
        switch(activeTab) {
            case 'subscriptions':
                // Прокрутить к первой подписке
                document.querySelector('.subscription-card').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'services':
                // Прокрутить к первой услуге
                document.querySelector('.service-card').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                // Отправить данные для связи
                tg.sendData(JSON.stringify({
                    action: 'contact_request',
                    user_id: tg.initDataUnsafe?.user?.id
                }));
                break;
        }
    });
}

// Закрытие модалок по клику вне их
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
