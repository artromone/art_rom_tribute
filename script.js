// Telegram Web App инициализация
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    setupTheme();
    setupMainButton();
}

// Применение темы Telegram
function setupTheme() {
    const theme = tg?.colorScheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

// Настройка главной кнопки
function setupMainButton() {
    if (!tg) return;
    
    tg.MainButton.text = 'Присоединиться сейчас!';
    tg.MainButton.color = '#34C759';
    tg.MainButton.show();
    
    tg.MainButton.onClick(() => {
        openSubscriptionModal();
    });
}

// DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    initLanding();
    setupAnimations();
    setupFAQ();
    setupStickyButton();
    loadContent();
});

// Инициализация лендинга
function initLanding() {
    // Загрузка контента из data.js
    loadContent();
    
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Запуск анимаций
    setupAnimations();
}

// Загрузка контента
function loadContent() {
    loadHeroSection();
    loadTargetAudience();
    loadValueSection();
    loadContentSection();
    loadExpertSection();
    loadStatsSection();
    loadTestimonials();
    loadPricingSection();
    loadHowToJoin();
    loadBonusSection();
    loadFAQ();
    loadFinalCTA();
}

// Загрузка Hero секции
function loadHeroSection() {
    const hero = landingData.hero;
    
    document.querySelector('.community-name').textContent = hero.communityName;
    document.querySelector('.hero-title').textContent = hero.mainHeadline;
    document.querySelector('.hero-description').textContent = hero.description;
    document.querySelector('.hero-cta').textContent = hero.ctaText;
}

// Загрузка целевой аудитории
function loadTargetAudience() {
    const target = landingData.targetAudience;
    
    document.querySelector('#target-audience .section-title').textContent = target.title;
    
    const problemsList = document.querySelector('.problems-list');
    problemsList.innerHTML = target.problems.map(problem => 
        `<li>${problem}</li>`
    ).join('');
    
    document.querySelector('.target-subtitle').textContent = target.subtitle;
}

// Загрузка ценности
function loadValueSection() {
    const value = landingData.value;
    
    document.querySelector('#value .section-title').textContent = value.title;
    
    const benefitsGrid = document.querySelector('.benefits-grid');
    benefitsGrid.innerHTML = value.benefits.map(benefit =>
        `<div class="benefit-card fade-in">
            <span class="benefit-icon">${benefit.icon}</span>
            <h3 class="benefit-title">${benefit.title}</h3>
            <p class="benefit-description">${benefit.description}</p>
        </div>`
    ).join('');
}

// Загрузка контента сообщества
function loadContentSection() {
    const content = landingData.content;
    
    document.querySelector('#content .section-title').textContent = content.title;
    
    const formatsGrid = document.querySelector('.formats-grid');
    formatsGrid.innerHTML = content.formats.map(format =>
        `<div class="format-card fade-in">
            <span class="format-icon">${format.icon}</span>
            <div class="format-content">
                <h3>${format.title}</h3>
                <p class="format-description">${format.description}</p>
                <span class="format-frequency">${format.frequency}</span>
            </div>
        </div>`
    ).join('');
}

// Загрузка информации об эксперте
function loadExpertSection() {
    const expert = landingData.expert;
    
    document.querySelector('.expert-photo').src = expert.photo;
    document.querySelector('.expert-name').textContent = expert.name;
    document.querySelector('.expert-title').textContent = expert.title;
    
    const achievementsList = document.querySelector('.achievements-list');
    achievementsList.innerHTML = expert.achievements.map(achievement =>
        `<li>${achievement}</li>`
    ).join('');
    
    document.querySelector('.expert-story').textContent = expert.story;
}

// Загрузка статистики
function loadStatsSection() {
    const stats = landingData.stats;
    
    document.querySelector('#stats .section-title').textContent = stats.title;
    
    const statsGrid = document.querySelector('.stats-grid');
    statsGrid.innerHTML = stats.numbers.map(stat =>
        `<div class="stat-card fade-in">
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>`
    ).join('');
    
    const resultsList = document.querySelector('.results-list');
    resultsList.innerHTML = stats.results.map(result =>
        `<li>${result}</li>`
    ).join('');
}

// Загрузка отзывов
function loadTestimonials() {
    const testimonials = landingData.testimonials;
    
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    testimonialsGrid.innerHTML = testimonials.map(testimonial =>
        `<div class="testimonial-card fade-in">
            <div class="testimonial-header">
                <img src="${testimonial.photo}" alt="${testimonial.name}" class="testimonial-photo">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-result">
                <span class="result-before">Было: ${testimonial.before}</span>
                <span class="result-after">Стало: ${testimonial.after}</span>
            </div>
        </div>`
    ).join('');
}

// Загрузка тарифов
function loadPricingSection() {
    const pricing = landingData.pricing;
    
    document.querySelector('#pricing .section-title').textContent = pricing.title;
    
    const pricingGrid = document.querySelector('.pricing-grid');
    pricingGrid.innerHTML = pricing.plans.map(plan =>
        `<div class="pricing-card ${plan.popular ? 'popular' : ''} fade-in">
            <div class="pricing-header">
                <h3 class="pricing-name">${plan.name}</h3>
                <div class="pricing-price">${plan.price} ₽</div>
                <div class="pricing-period">/${plan.period}</div>
            </div>
            <ul class="pricing-features">
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn btn-primary" onclick="selectPlan('${plan.name}')">
                Выбрать тариф
            </button>
        </div>`
    ).join('');
    
    const discountBanner = document.querySelector('.discount-banner');
    discountBanner.textContent = pricing.discount.text;
}

// Загрузка шагов присоединения
function loadHowToJoin() {
    const howToJoin = landingData.howToJoin;
    
    document.querySelector('#how-to-join .section-title').textContent = howToJoin.title;
    
    const stepsList = document.querySelector('.steps-list');
    stepsList.innerHTML = howToJoin.steps.map(step =>
        `<div class="step-item fade-in">
            <span class="step-number">${step.step}</span>
            <span>${step.text}</span>
        </div>`
    ).join('');
    
    const guaranteesList = document.querySelector('.guarantees-list');
    guaranteesList.innerHTML = howToJoin.guarantees.map(guarantee =>
        `<li>${guarantee}</li>`
    ).join('');
}

// Загрузка бонусов
function loadBonusSection() {
    const bonus = landingData.bonus;
    
    document.querySelector('#bonus .section-title').textContent = bonus.title;
    
    const bonusGrid = document.querySelector('.bonus-grid');
    bonusGrid.innerHTML = bonus.freebies.map(item =>
        `<div class="bonus-card fade-in">
            <span class="bonus-icon">${item.icon}</span>
            <div class="bonus-content">
                <h4>${item.title}</h4>
                <p class="bonus-description">${item.description}</p>
                <span class="bonus-value">Стоимость: ${item.value}</span>
            </div>
        </div>`
    ).join('');
    
    document.querySelector('.bonus-total').innerHTML = 
        `Общая стоимость: <strong>${bonus.totalValue}</strong><br>${bonus.getForFree}`;
}

// Загрузка FAQ
function loadFAQ() {
    const faq = landingData.faq;
    
    const faqList = document.querySelector('.faq-list');
    faqList.innerHTML = faq.map((item, index) =>
        `<div class="faq-item fade-in">
            <button class="faq-question" data-index="${index}">
                ${item.question}
            </button>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>`
    ).join('');
}

// Загрузка финального призыва
function loadFinalCTA() {
    const finalCta = landingData.finalCta;
    
    document.querySelector('.final-cta-title').textContent = finalCta.title;
    document.querySelector('.final-cta-subtitle').textContent = finalCta.subtitle;
    document.querySelector('.urgency-text').textContent = finalCta.urgency;
    document.querySelector('.limit-text').textContent = finalCta.limit;
    document.querySelector('.final-cta-button').textContent = finalCta.buttonText;
    document.querySelector('.last-chance').textContent = finalCta.lastChance;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // CTA кнопки
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });
    
    // Кнопки тарифов
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Выбрать тариф')) {
            e.preventDefault();
            openSubscriptionModal();
        }
    });
}

// Обработка кликов по CTA
function handleCTAClick(e) {
    e.preventDefault();
    openSubscriptionModal();
}

// Настройка FAQ
function setupFAQ() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('faq-question')) {
            const question = e.target;
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Закрываем все другие FAQ
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Переключаем текущий
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        }
    });
}

// Настройка липкой кнопки
function setupStickyButton() {
    const stickyButton = document.querySelector('.sticky-cta');
    const hero = document.querySelector('.hero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyButton.classList.remove('visible');
            } else {
                stickyButton.classList.add('visible');
            }
        });
    });
    
    observer.observe(hero);
}

// Настройка анимаций
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Выбор тарифа
function selectPlan(planName) {
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'select_plan',
            plan: planName,
            user_id: tg.initDataUnsafe?.user?.id
        }));
    }
    
    openSubscriptionModal(planName);
}

// Открытие модального окна подписки
function openSubscriptionModal(selectedPlan = null) {
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'open_subscription',
            selected_plan: selectedPlan,
            user_id: tg.initDataUnsafe?.user?.id
        }));
        
        tg.showAlert('Переходим к оформлению подписки...');
    } else {
        // Симуляция для тестирования
        alert(`Выбран тариф: ${selectedPlan || 'Базовый'}`);
    }
}

// Обработка событий Telegram
if (tg) {
    tg.onEvent('themeChanged', setupTheme);
    
    tg.onEvent('mainButtonClicked', () => {
        openSubscriptionModal();
    });
}

// Плавная прокрутка к якорям
document.addEventListener('click', function(e) {
    if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Haptic feedback для мобильных
function addHapticFeedback() {
    if (tg) {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                tg.HapticFeedback.impactOccurred('medium');
            });
        });
    }
}

// Инициализация после загрузки
window.addEventListener('load', function() {
    addHapticFeedback();
    
    // Предзагрузка изображений
    preloadImages();
});

// Предзагрузка изображений
function preloadImages() {
    const images = [
        landingData.expert.photo,
        ...landingData.testimonials.map(t => t.photo)
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

