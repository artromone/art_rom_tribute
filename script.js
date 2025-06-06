
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
    
    tg.MainButton.text = 'Присоединиться к сообществу';
    tg.MainButton.color = '#007AFF';
    tg.MainButton.show();
    
    tg.MainButton.onClick(() => {
        showPricing();
    });
}

// Загрузка контента
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
    initCarousels();
    initFAQ();
    initModal();
});

function loadContent() {
    // Hero Section
    document.getElementById('hero-emoji').textContent = content.hero.backgroundEmoji;
    document.getElementById('hero-title').textContent = content.hero.title;
    document.getElementById('hero-headline').textContent = content.hero.headline;
    document.getElementById('hero-description').textContent = content.hero.description;
    document.getElementById('hero-cta').textContent = content.hero.ctaText;

    // Target Audience
    document.getElementById('target-title').textContent = content.targetAudience.title;
    loadProblems();

    // Value Proposition
    document.getElementById('value-title').textContent = content.value.title;
    loadBenefits();

    // What's Inside
    document.getElementById('inside-title').textContent = content.inside.title;
    loadFeatures();

    // About
    document.getElementById('about-title').textContent = content.about.title;
    loadAbout();

    // Stats
    document.getElementById('stats-title').textContent = content.stats.title;
    loadStats();

    // Testimonials
    document.getElementById('testimonials-title').textContent = content.testimonials.title;
    loadTestimonials();

    // Pricing
    document.getElementById('pricing-title').textContent = content.pricing.title;
    loadPricing();

    // How to Join
    document.getElementById('join-title').textContent = content.howToJoin.title;
    loadHowToJoin();

    // Bonus
    document.getElementById('bonus-title').textContent = content.bonus.title;
    loadBonus();

    // FAQ
    document.getElementById('faq-title').textContent = content.faq.title;
    loadFAQ();

    // Final CTA
    document.getElementById('final-title').textContent = content.finalCta.title;
    document.getElementById('final-subtitle').textContent = content.finalCta.subtitle;
    document.getElementById('urgency').textContent = content.finalCta.urgency;
    document.getElementById('final-cta-btn').textContent = content.finalCta.ctaText;
    document.getElementById('final-guarantee').textContent = content.finalCta.guarantee;
}

function loadProblems() {
    const container = document.getElementById('problems-grid');
    container.innerHTML = '';
    
    content.targetAudience.problems.forEach(problem => {
        const item = document.createElement('div');
        item.className = 'problem-item';
        item.innerHTML = `
            <div class="problem-icon">${problem.icon}</div>
            <div class="problem-text">${problem.text}</div>
        `;
        container.appendChild(item);
    });
}

function loadBenefits() {
    const container = document.getElementById('benefits-grid');
    container.innerHTML = '';
    
    content.value.benefits.forEach(benefit => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.innerHTML = `
            <div class="benefit-icon">${benefit.icon}</div>
            <h3 class="benefit-title">${benefit.title}</h3>
            <p class="benefit-description">${benefit.description}</p>
        `;
        container.appendChild(card);
    });
}

function loadFeatures() {
    const container = document.getElementById('features-carousel');
    container.innerHTML = '';
    
    content.inside.features.forEach(feature => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="feature-card">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

function loadAbout() {
    document.getElementById('about-name').textContent = content.about.name;
    document.getElementById('about-position').textContent = content.about.position;
    document.getElementById('about-experience').textContent = content.about.experience;
    document.getElementById('about-story').textContent = content.about.story;
    
    const achievementsContainer = document.getElementById('achievements');
    achievementsContainer.innerHTML = '';
    
    content.about.achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'achievement';
        item.textContent = achievement;
        achievementsContainer.appendChild(item);
    });
}

function loadStats() {
    const container = document.getElementById('stats-grid');
    container.innerHTML = '';
    
    content.stats.numbers.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        container.appendChild(card);
    });
}

function loadTestimonials() {
    const container = document.getElementById('testimonials-carousel');
    container.innerHTML = '';
    
    content.testimonials.reviews.forEach(review => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${review.avatar}</div>
                    <div class="testimonial-info">
                        <h4>${review.name}</h4>
                        <p class="testimonial-role">${review.role}</p>
                    </div>
                </div>
                <div class="testimonial-change">${review.before} → ${review.after}</div>
                <p class="testimonial-text">"${review.text}"</p>
            </div>
        `;
        container.appendChild(item);
    });
}

function loadPricing() {
    const container = document.getElementById('pricing-carousel');
    container.innerHTML = '';
    
    content.pricing.plans.forEach(plan => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        
        const features = plan.features.map(feature => `<li>${feature}</li>`).join('');
        
        item.innerHTML = `
            <div class="pricing-card ${plan.popular ? 'popular' : ''}">
                ${plan.popular ? '<div class="popular-badge">Популярный</div>' : ''}
                <div class="pricing-header">
                    <h3 class="pricing-name">${plan.name}</h3>
                    <div class="pricing-price">${plan.price}₽</div>
                    <div class="pricing-period">/${plan.period}</div>
                </div>
                <ul class="pricing-features">${features}</ul>
                <button class="btn btn-primary" onclick="selectPlan(${plan.id})">
                    Выбрать план
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function loadHowToJoin() {
    const container = document.getElementById('steps-grid');
    container.innerHTML = '';
    
    content.howToJoin.steps.forEach(step => {
        const card = document.createElement('div');
        card.className = 'step-card';
        card.innerHTML = `
            <div class="step-number">${step.step}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
    
    document.getElementById('guarantee').textContent = content.howToJoin.guarantee;
    document.getElementById('join-cta').textContent = content.howToJoin.ctaText;
}

function loadBonus() {
    const container = document.getElementById('bonus-grid');
    container.innerHTML = '';
    
    content.bonus.items.forEach(item => {
        const bonusItem = document.createElement('div');
        bonusItem.className = 'bonus-item';
        bonusItem.innerHTML = `
            <div class="bonus-icon">${item.icon}</div>
            <div class="bonus-content">
                <h4>${item.title}</h4>
                <p class="bonus-description">${item.description}</p>
                <div class="bonus-value">Стоимость: ${item.value}</div>
            </div>
        `;
        container.appendChild(bonusItem);
    });
    
    document.getElementById('bonus-value').textContent = content.bonus.totalValue;
    document.getElementById('bonus-cta').textContent = content.bonus.ctaText;
}

function loadFAQ() {
    const container = document.getElementById('faq-list');
    container.innerHTML = '';
    
    content.faq.questions.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                <span>${item.question}</span>
                <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        container.appendChild(faqItem);
    });
}

// Инициализация каруселей
function initCarousels() {
    const carousels = [
        { container: 'features-carousel', dots: 'features-dots' },
        { container: 'testimonials-carousel', dots: 'testimonials-dots' },
        { container: 'pricing-carousel', dots: 'pricing-dots' }
    ];
    
    carousels.forEach(carousel => {
        setupCarousel(carousel.container, carousel.dots);
    });
}

function setupCarousel(containerId, dotsId) {
    const container = document.getElementById(containerId);
    const dotsContainer = document.getElementById(dotsId);
    
    if (!container || !dotsContainer) return;
    
    const items = container.children;
    const itemCount = items.length;
    
    if (itemCount <= 1) {
        dotsContainer.style.display = 'none';
        return;
    }
    
    // Создаем точки
    dotsContainer.innerHTML = '';
    for (let i = 0; i < itemCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToItem(container, i));
        dotsContainer.appendChild(dot);
    }
    
    // Обработка скролла
    let scrollTimeout;
    container.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveDot(container, dotsContainer);
        }, 100);
    });
}

function scrollToItem(container, index) {
    const itemWidth = container.children[0].offsetWidth + 16; // включая gap
    container.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
    });
}

function updateActiveDot(container, dotsContainer) {
    const itemWidth = container.children[0].offsetWidth + 16;
    const scrollLeft = container.scrollLeft;
    const activeIndex = Math.round(scrollLeft / itemWidth);
    
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === activeIndex);
    }
}

// Инициализация FAQ
function initFAQ() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.faq-question')) {
            const faqItem = e.target.closest('.faq-item');
            faqItem.classList.toggle('active');
        }
    });
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modal-close');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Функции действий
function selectPlan(planId) {
    const plan = content.pricing.plans.find(p => p.id === planId);
    if (!plan) return;
    
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'select_plan',
            plan_id: planId,
            plan_name: plan.name,
            price: plan.price,
            user_id: tg.initDataUnsafe?.user?.id
        }));
        
        tg.showAlert(`Вы выбрали тариф "${plan.name}". Сейчас откроется окно оплаты.`);
    } else {
        showModal(`Тариф "${plan.name}"`, `
            <div style="text-align: center;">
                <h4>Цена: ${plan.price}₽/${plan.period}</h4>
                <p>Для оплаты откройте приложение в Telegram</p>
                <button class="btn btn-primary" onclick="closeModal()">Понятно</button>
            </div>
        `);
    }
}

function showPricing() {
    document.querySelector('.pricing').scrollIntoView({ behavior: 'smooth' });
}

// Обработка кнопок CTA
document.addEventListener('click', (e) => {
    if (e.target.id === 'hero-cta' || 
        e.target.id === 'join-cta' || 
        e.target.id === 'final-cta-btn') {
        showPricing();
    }
    
    if (e.target.id === 'bonus-cta') {
        showModal('Бонусы', `
            <div>
                <h4>Вы получите все бонусы при покупке любого тарифа:</h4>
                <ul style="margin: 16px 0; padding-left: 20px;">
                    ${content.bonus.items.map(item => 
                        `<li style="margin: 8px 0;">${item.title} (${item.value})</li>`
                    ).join('')}
                </ul>
                <p><strong>Общая стоимость: ${content.bonus.totalValue}</strong></p>
                <button class="btn btn-primary" onclick="showPricing(); closeModal();">
                    Выбрать тариф
                </button>
            </div>
        `);
    }
});

// Обработка событий Telegram
if (tg) {
    tg.onEvent('themeChanged', applyTheme);
    
    tg.onEvent('mainButtonClicked', () => {
        showPricing();
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
