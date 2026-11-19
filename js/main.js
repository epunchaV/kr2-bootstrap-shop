document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.hero-section h2');
    if (counters.length > 0) {
        counters.forEach(counter => {
        const text = counter.innerText;
        const isMoney = text.includes('млн ₽');
        const target = parseFloat(text);
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
            if (count < target) {
            count += speed;
            counter.innerText = isMoney 
                ? `${Math.floor(count)} млн ₽` 
                : Math.floor(count);
            setTimeout(updateCount, 20);
            } else {
            counter.innerText = text;
            }
        };
        updateCount();
        });
    }

    const filterButtons = document.querySelectorAll('.list-group-item-action');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.childNodes[0].textContent.trim().toLowerCase();

            projectCards.forEach(card => {
            const cardCategory = card.querySelector('.badge-tech').innerText.trim().toLowerCase();
            const columnWrapper = card.closest('.col');

            if (selectedCategory === 'все направления' || cardCategory === selectedCategory) {
                columnWrapper.style.display = 'block';
            } else {
                columnWrapper.style.display = 'none';
            }
            });
        });
        });
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка данных...';

        setTimeout(() => {
            form.reset();
            form.classList.remove('was-validated');
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;

            const contactAlert = document.getElementById('contact-success-alert');
            if (form.id === 'contact-form' && contactAlert) {
            contactAlert.classList.remove('d-none');
            contactAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
            alert('Действие выполнено успешно! Данные отправлены в систему «ТехноСтарт».');
            const modal = document.querySelector('.modal.show');
            if (modal) {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) modalInstance.hide();
            }
            }
        }, 1000);
        });
    });

    const searchInput = document.getElementById('project-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const tagBadges = document.querySelectorAll('.tag-badge');
    const noResultsMsg = document.getElementById('no-results-msg');

    let currentCategory = 'все направления';
    let currentSearch = '';

    function filterProjects() {
        if (projectCards.length === 0) return;
        let visibleCount = 0;

        projectCards.forEach(card => {
        const cardCategory = card.querySelector('.badge-tech').innerText.trim().toLowerCase();
        const cardText = card.innerText.toLowerCase();
        const columnWrapper = card.closest('.col');

        const matchesCategory = (currentCategory === 'все направления' || cardCategory === currentCategory);
        const matchesSearch = cardText.includes(currentSearch);

        if (matchesCategory && matchesSearch) {
            columnWrapper.style.display = 'block';
            visibleCount++;
        } else {
            columnWrapper.style.display = 'none';
        }
        });

        if (noResultsMsg) {
        if (visibleCount === 0) {
            noResultsMsg.classList.remove('d-none');
        } else {
            noResultsMsg.classList.add('d-none');
        }
        }
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentCategory = button.childNodes[0].textContent.trim().toLowerCase();
            filterProjects();
        });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        filterProjects();
        });
    }

    if (clearSearchBtn && searchInput) {
        clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        filterProjects();
        });
    }

    if (tagBadges.length > 0 && searchInput) {
        tagBadges.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagWord = tag.innerText.replace('#', '').trim().toLowerCase();
            searchInput.value = tagWord;
            currentSearch = tagWord;
            filterProjects();
        });
        });
    }

    const cardsToAnimate = document.querySelectorAll('.card');
    cardsToAnimate.forEach(card => card.classList.add('reveal-item'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
        });
    }, { threshold: 0.15 });

    cardsToAnimate.forEach(card => observer.observe(card));

    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%'; 
        setTimeout(() => {
        bar.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        bar.style.width = targetWidth;
        }, 300);
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('technostart-theme') || 'light';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('technostart-theme', theme);

        if (themeToggleBtn) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ Светлая тема';
            themeToggleBtn.classList.replace('btn-outline-info', 'btn-info');
            themeToggleBtn.classList.add('text-dark', 'fw-bold');
        } else {
            themeToggleBtn.innerHTML = '🌙 Тёмная тема';
            themeToggleBtn.classList.replace('btn-info', 'btn-outline-info');
            themeToggleBtn.classList.remove('text-dark', 'fw-bold');
        }
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        });
    }
});