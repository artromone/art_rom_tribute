// Инициализация Telegram Web App
const tg = window.Telegram?.WebApp;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram Web App
    initTelegram();
    
    // Загрузка контента
    loadContent();
    
    // Инициализация интерактивности
    initInteractivity();
    
    // Скрытие загрузки
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

// Инициализация Telegram Web App
function initTelegram() {
    if (!tg) return;
    
    tg.ready();
    tg.expand();
    
    // Применение темы
    applyTheme();
    
    // Настройка главной кнопки
    setupMainButton();
    
    // Обработка событий
    tg.onEvent('themeChanged', applyTheme);
    tg.onEvent('mainButtonClicked', handleMainButtonClick);
}

function applyTheme() {
    if (!tg) return;
    
    const theme = tg.colorScheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    if (tg.themeParams) {
        const root = document.documentElement;
        Object.entries(tg.themeParams).forEach(([key, value]) => {
            root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value);
        });
    }
}

function setupMainButton() {
    if (!tg) return;
    
    tg.MainButton.text = content.fixedButton;
    tg.MainButton.color = '#007AFF';
    tg.MainButton.show();
}

function handleMainButtonClick() {
    scrollToSection('pricing');
}

// Загрузка контента
function loadContent() {
    loadHeroContent();
    loadTargetAudienceContent();
    loadValuePropContent();
    loadWhatsInsideContent();
    loadAboutExpertContent();
    loadStatsResultsContent();
    loadTestimonialsContent();
    loadPricingContent();
    loadHowToJoinContent();
    loadBonusSectionContent();
    loadFAQContent();
    loadFinalCTAContent();
    loadFixedButtonContent();
}

function loadHeroContent() {
    const hero = content.hero;
    document.getElementById('hero-badge').textContent = hero.badge;
    document.getElementById('hero-title').textContent = hero.title;
    document.getElementById('hero-subtitle').textContent = hero.subtitle;
    document.getElementById('hero-cta-btn').textContent = hero.ctaButton;
    document.getElementById('hero-guarantee').textContent = hero.guarantee;
}

function loadTargetAudienceContent() {
    const target = content.targetAudience;
    document.getElementById('target-title').textContent = target.title;
    
    // Проблемы
    const problemsContainer = document.getElementById('target-problems');
    problemsContainer.innerHTML = `
        <h3>Знакомые боли?</h3>
        ${target.problems.map(problem => `
            <div class="problem-item">
                <span class="problem-icon">${problem.icon}</span>
                <span>${problem.text}</span>
            </div>
        `).join('')}
    `;
    
    // Чек-лист
    const checklistContainer = document.getElementById('target-checklist');
    checklistContainer.innerHTML = `
        <h3>${target.checklist.title}</h3>
        ${target.checklist.items.map(item => `
            <div class="checklist-item">
                <span class="checklist-icon">✓</span>
                <span>${item.replace('✅ ', '')}</span>
            </div>
        `).join('')}
    `;
}

function loadValuePropContent() {
    const valueProp = content.valueProp;
    document.getElementById('value-title').textContent = valueProp.title;
    
    const valueGrid = document.getElementById('value-grid');
    valueGrid.innerHTML = valueProp.values.map(value => `
        <div class="value-card animate-on-scroll">
            <div class="value-icon">${value.icon}</div>
            <h3 class="value-title">${value.title}</h3>
            <p>${value.description}</p>
        </div>
    `).join('');
}

function loadWhatsInsideContent() {
    const inside = content.whatsInside;
    document.getElementById('inside-title').textContent = inside.title;
    
    const insideContent = document.getElementById('inside-content');
    insideContent.innerHTML = inside.content.map(item => `
        <div class="inside-card animate-on-scroll">
            <div class="inside-format">${item.format}</div>
            <h3 class="inside-title">${item.title}</h3>
            <p class="inside-description">${item.description}</p>
            <div class="inside-frequency">${item.frequency}</div>
        </div>
    `).join('');
}

function loadAboutExpertContent() {
    const expert = content.aboutExpert;
    document.getElementById('expert-photo').src = expert.photo;
    document.getElementById('expert-name').textContent = expert.name;
    document.getElementById('expert-title').textContent = expert.title;
    document.getElementById('expert-story').innerHTML = expert.story;
    
    const achievementsContainer = document.getElementById('expert-achievements');
    achievementsContainer.innerHTML = expert.achievements.map(achievement => `
        <div class="achievement-item">
            <span class="achievement-number">${achievement.number}</span>
            <span class="achievement-text">${achievement.text}</span>
        </div>
    `).join('');
}

function loadStatsResultsContent() {
    const stats = content.statsResults;
    document.getElementById('stats-title').textContent = stats.title;
    
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = stats.stats.map(stat => `
        <div class="stat-card animate-on-scroll">
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');
    
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = `
        <h3>${stats.results.title}</h3>
        <ul style="list-style: none; padding: 0; margin-top: 1.5rem;">
            ${stats.results.items.map(item => `<li style="margin-bottom: 1rem; font-size: 1.1rem;">${item}</li>`).join('')}
        </ul>
    `;
}

function loadTestimonialsContent() {
    const testimonials = content.testimonials;
    document.getElementById('testimonials-title').textContent = testimonials.title;
    
    const testimonialsGrid = document.getElementById('testimonials-grid');
    testimonialsGrid.innerHTML = testimonials.items.map(testimonial => `
        <div class="testimonial-card animate-on-scroll">
            <div class="testimonial-quote">"${testimonial.quote}"</div>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.author}</div>
                <div class="author-info">
                    <div class="author-name">${testimonial.name}</div>
                    <div class="author-title">${testimonial.title}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadPricingContent() {
    const pricing = content.pricing;
    document.getElementById('pricing-title').textContent = pricing.title;
    
    const pricingGrid = document.getElementById('pricing-grid');
    pricingGrid.innerHTML = pricing.plans.map(plan => `
        <div class="pricing-card ${plan.featured ? 'featured' : ''} animate-on-scroll">
            <h3 class="pricing-title">${plan.title}</h3>
            <div class="pricing-price">${plan.price}₽</div>
            <div class="pricing-period">/${plan.period}</div>
            <ul class="pricing-features">
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn btn-primary" onclick="handleSubscribe('${plan.title}', ${plan.price})">${plan.button}</button>
        </div>
    `).join('');
}

function loadHowToJoinContent() {
    const join = content.howToJoin;
    document.getElementById('join-title').textContent = join.title;
    
    const joinSteps = document.getElementById('join-steps');
    joinSteps.innerHTML = join.steps.map(step => `
        <div class="join-step animate-on-scroll">
            <div class="step-number">${step.number}</div>
            <h4 class="step-title">${step.title}</h4>
            <p class="step-description">${step.description}</p>
        </div>
    `).join('');
    
    document.getElementById('join-cta-btn').textContent = join.ctaButton;
    
    const joinGuarantees = document.getElementById('join-guarantees');
    joinGuarantees.innerHTML = join.guarantees.map(guarantee => `
        <div class="guarantee-item">
            <span>${guarantee}</span>
        </div>
    `).join('');
}

function loadBonusSectionContent() {
    const bonus = content.bonusSection;
    document.getElementById('bonus-title').textContent = bonus.title;
    
    const bonusContent = document.getElementById('bonus-content');
    bonusContent.innerHTML = bonus.bonuses.map(item => `
        <div class="bonus-card animate-on-scroll">
            <div class="bonus-icon">${item.icon}</div>
            <h3 class="bonus-title">${item.title}</h3>
            <p>${item.description}</p>
            <div class="bonus-value">${item.value}</div>
        </div>
    `).join('');
}

function loadFAQContent() {
    const faq = content.faq;
    document.getElementById('faq-title').textContent = faq.title;
    
    const faqList = document.getElementById('faq-list');
    faqList.innerHTML = faq.items.map((item, index) => `
        <div class="faq-item">
            <button class="faq-question" onclick="toggleFAQ(${index})">
                ${item.question}
                <span class="faq-toggle">+</span>
            </button>
            <div class="faq-answer">
                ${item.answer}
            </div>
        </div>
    `).join('');
}

function loadFinalCTAContent() {
    const finalCta = content.finalCta;
    document.getElementById('final-cta-title').textContent = finalCta.title;
    document.getElementById('final-cta-subtitle').textContent = finalCta.subtitle;
    document.getElementById('final-cta-btn').textContent = finalCta.button;
    document.getElementById('final-cta-note').textContent = finalCta.note;
    
    const urgencyContainer = document.getElementById('final-cta-urgency');
    urgencyContainer.innerHTML = `
        <h4>${finalCta.urgency.title}</h4>
        <p>${finalCta.urgency.text}</p>
    `;
}

function loadFixedButtonContent() {
    document.getElementById('fixed-btn').textContent = content.fixedButton;
}

// Интерактивность
function initInteractivity() {
    // Анимации при скролле
    initScrollAnimations();
    
    // Фиксированная кнопка
    initFixedButton();
    
    // Плавный скролл для кнопок
    initSmoothScroll();
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initFixedButton() {
    const fixedBtn = document.getElementById('fixed-bottom-btn');
    const hero = document.getElementById('hero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fixedBtn.classList.remove('visible');
            } else {
                fixedBtn.classList.add('visible');
            }
        });
    });
    
    observer.observe(hero);
}

function initSmoothScroll() {
    // Обработчики для всех CTA кнопок
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        
        const text = button.textContent.toLowerCase();
        if (text.includes('начать') || text.includes('присоединиться') || text.includes('изменить') || text.includes('карьеру')) {
            e.preventDefault();
            scrollToSection('pricing');
        }
    });
}

// Утилиты
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    const isActive = currentItem.classList.contains('active');
    
    // Закрываем все остальные
    faqItems.forEach(item => item.classList.remove('active'));
    
    // Переключаем текущий
    if (!isActive) {
        currentItem.classList.add('active');
    }
}

function handleSubscribe(planTitle, price) {
    if (tg) {
        // Отправляем данные боту
        tg.sendData(JSON.stringify({
            action: 'subscribe',
            plan: planTitle,
            price: price,
            user_id: tg.initDataUnsafe?.user?.id
        }));
        
        tg.showAlert(`Спасибо за выбор тарифа "${planTitle}"! Сейчас вы будете перенаправлены на оплату.`);
    } else {
        // Fallback для тестирования вне Telegram
        alert(`Выбран тариф: ${planTitle} за ${price}₽`);
    }
}

// Дополнительные обработчики для кнопок
document.addEventListener('click', (e) => {
    if (e.target.id === 'hero-cta-btn' || 
        e.target.id === 'join-cta-btn' || 
        e.target.id === 'final-cta-btn' ||
        e.target.id === 'fixed-btn') {
        scrollToSection('pricing');
    }
});
