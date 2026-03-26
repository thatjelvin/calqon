document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (reveal elements)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // CTA Form Handler
    const ctaForm = document.getElementById('cta-form');
    if(ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = ctaForm.querySelector('#waitlist-name');
            const emailInput = ctaForm.querySelector('#waitlist-email');
            const discordOptIn = ctaForm.querySelector('#discord-opt-in');
            const errorText = ctaForm.querySelector('#waitlist-error');
            const btn = ctaForm.querySelector('.btn-alt');
            const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            errorText.textContent = '';

            if (!nameValue || nameValue.length > 100) {
                errorText.textContent = 'Please enter your name (up to 100 characters).';
                nameInput.focus();
                return;
            }

            if (!validEmailPattern.test(emailValue)) {
                errorText.textContent = 'Please enter a valid email address.';
                emailInput.focus();
                return;
            }
            
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Saved!';
            btn.style.backgroundColor = '#34d399'; // Green success color
            nameInput.value = '';
            emailInput.value = '';

            if (discordOptIn && discordOptIn.checked) {
                window.open('https://discord.gg/your-invite-code', '_blank', 'noopener,noreferrer');
            }
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = ''; // Revert to CSS default
            }, 3000);
        });
    }

    // Waitlist Top button smooth scroll to bottom form
    const waitlistBtnNav = document.getElementById('waitlist-btn-nav');
    if(waitlistBtnNav) {
        waitlistBtnNav.addEventListener('click', () => {
            const formSection = document.querySelector('.final-cta');
            formSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
