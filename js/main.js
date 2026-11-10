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
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;

            const modal = document.querySelector('.modal.show');
            if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
            }
        }, 1500);
        });
    });
});