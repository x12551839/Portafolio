document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Configuración inicial del tema
    // =============================================
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // =============================================
    // Funciones principales
    // =============================================
    
    /**
     * Aplica el tema seleccionado y guarda la preferencia
     * @param {boolean} isDark - Si es true, aplica tema oscuro
     */
    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
            localStorage.setItem('theme', 'light');
        }
    }
    
    /**
     * Inicializa el tema basado en preferencias guardadas o del sistema
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Usar preferencia guardada
            applyTheme(savedTheme === 'dark');
        } else {
            // Usar preferencia del sistema
            applyTheme(prefersDarkScheme.matches);
            
            // Escuchar cambios en la preferencia del sistema
            prefersDarkScheme.addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    applyTheme(e.matches);
                }
            });
        }
    }
    
    // =============================================
    // Scroll suave para enlaces internos
    // =============================================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Actualizar URL sin recargar la página
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    }
    
    // =============================================
    // Animaciones al hacer scroll
    // =============================================
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar todas las tarjetas y secciones con animación
        document.querySelectorAll('.card, .animated-element').forEach(element => {
            observer.observe(element);
        });
    }
    
    // =============================================
    // Event Listeners
    // =============================================
    
    // Alternar tema manualmente
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(!isDark);
    });
    
    // =============================================
    // Inicialización
    // =============================================
    function init() {
        initTheme();
        setupSmoothScroll();
        setupScrollAnimations();
        
        // Puedes agregar más inicializaciones aquí
        console.log('Portafolio inicializado correctamente');
    }
    
    // Iniciar la aplicación
    init();
});


// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Aquí puedes agregar el código para enviar el formulario
        console.log('Formulario enviado:', { name, email, message });
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        
        // Resetear formulario
        contactForm.reset();
    });
}