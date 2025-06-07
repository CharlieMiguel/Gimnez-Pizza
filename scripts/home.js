document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
            
            // Marcar enlace como activo
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo en el navbar
        updateActiveLink();
    });
    
    // Scrollspy para actualizar enlaces activos
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Intersection Observer para animaciones al hacer scroll
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-scroll', 'in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    scrollElements.forEach(el => {
        observer.observe(el);
    });
    
    // Efecto de hover con sombra rojiza para tarjetas
    const cards = document.querySelectorAll('.menu-item, .testimonial');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.pageX - card.offsetLeft;
            const y = e.pageY - card.offsetTop;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            
            const glow = document.createElement('div');
            glow.className = 'glow-effect';
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            card.appendChild(glow);
            
            setTimeout(() => {
                glow.remove();
            }, 1000);
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animación de envío
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                
                // Resetear después de 2 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = 'Enviar Mensaje';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Inicializar enlace activo al cargar
    updateActiveLink();
});