document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Configuración inicial
    // =============================================
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentYear = document.querySelector('.current-year');
    
    // Inicializar año actual
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // =============================================
    // Efecto de partículas
    // =============================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#4285f4" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#4285f4", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // =============================================
    // Seguidor de cursor personalizado
    // =============================================
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
        
        // Efecto al pasar sobre elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .tech-orb, .nav-dot');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.opacity = '0.7';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '20px';
                cursorFollower.style.height = '20px';
                cursorFollower.style.opacity = '1';
            });
        });
    }
    
    // =============================================
    // Navegación por secciones
    // =============================================
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        });
    }
    
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = dot.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // Botón "Volver arriba"
    // =============================================
    window.addEventListener('scroll', () => {
        updateActiveSection();
        
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =============================================
    // Gestión del tema oscuro/claro
    // =============================================
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
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            applyTheme(savedTheme === 'dark');
        } else {
            applyTheme(prefersDarkScheme.matches);
            
            prefersDarkScheme.addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    applyTheme(e.matches);
                }
            });
        }
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(!isDark);
    });
    
    // =============================================
    // Animaciones con GSAP
    // =============================================
    if (typeof gsap !== 'undefined') {
        // Animación de las tarjetas de habilidades
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power3.out"
            });
        });
        
        // Animación de los proyectos
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1.7)"
            });
        });
        
        // Animación del título
        gsap.from(".glitch", {
            duration: 1.5,
            y: -50,
            opacity: 0,
            ease: "elastic.out(1, 0.5)"
        });
    }
    
    // =============================================
    // Visualización de habilidades 3D
    // =============================================
// =============================================
// Visualización de habilidades 3D
// =============================================
if (typeof Chart !== 'undefined') {
    const skillCtx = document.getElementById('skillChart');

    if (skillCtx) {
        // Registrar el plugin
        Chart.register(ChartDataLabels);

        const skillChart = new Chart(skillCtx, {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Servidores Linux', 'Optimización', 'Testing', 'Aprendizaje', 'Git y GitHub'],
                datasets: [{
                    label: 'Nivel de Habilidad', // <-- Este es el texto que aparece en leyenda y tooltip
                    // Para darle estilo como color, tamaño o tipo de fuente:
                    // Estilízalo dentro de `options.plugins.legend.labels` (si activas la leyenda)
                    // y en `options.plugins.tooltip` para el tooltip
                    data: [90, 75, 88, 60, 95, 80],
                    backgroundColor: 'rgba(66, 133, 244, 0.2)',
                    borderColor: 'rgba(66, 133, 244, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(66, 133, 244, 1)',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(66, 133, 244, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHitRadius: 10,
                    pointBorderWidth: 2
                }]
            },
            options: {
                plugins: {
                    datalabels: {
                       color: 'gray',
                        font: {
                            weight: 'bold',
                            size: 13
                        },
                        formatter: value => value + '%',
                        anchor: 'end',
                        align: 'top',
                        offset: 4
                    },
                    // Puedes activar y estilizar la leyenda aquí para que se vea el label
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'gray', // Color del texto del label
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: 10,
                            boxWidth: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.dataset.label}: ${ctx.formattedValue}%`
                        },
                        titleFont: { size: 14 },
                        bodyFont: { size: 12 },
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff'
                    }
                },
                scale: {
                    angleLines: { display: true },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        backdropColor: 'transparent',
                        color: '#888',
                        font: {
                            size: 10
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        color: 'var(--text)' // Asegúrate de definir esta variable CSS
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                maintainAspectRatio: false
            }
        });
    }
}

    
    // =============================================
    // Modal de proyectos
    // =============================================
    const projectLinks = document.querySelectorAll('[data-project]');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            
            // Aquí podrías cargar contenido dinámico basado en el proyecto
            modalBody.innerHTML = `
                <h3>Detalles del Proyecto</h3>
                <p>Contenido detallado sobre el proyecto ${projectId}...</p>
                <div class="project-screenshots">
                    <!-- Aquí irían capturas del proyecto -->
                </div>
                <a href="#" class="btn" target="_blank">Ver Proyecto</a>
            `;
            
            projectModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        projectModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // =============================================
    // Formulario de contacto
    // =============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const loader = submitBtn.querySelector('.submit-loader');
            const btnText = submitBtn.querySelector('span');
            
            // Mostrar loader
            btnText.style.visibility = 'hidden';
            loader.style.display = 'flex';
            
            // Simular envío (en un caso real sería una petición AJAX)
            setTimeout(() => {
                // Ocultar loader y mostrar mensaje
                loader.style.display = 'none';
                btnText.style.visibility = 'visible';
                btnText.textContent = '¡Mensaje Enviado!';
                
                // Resetear formulario después de un tiempo
                setTimeout(() => {
                    contactForm.reset();
                    btnText.textContent = 'Enviar Mensaje';
                }, 2000);
            }, 1500);
        });
    }
    
    // =============================================
    // Efecto de escritura para el código
    // =============================================
    const codeBlocks = document.querySelectorAll('.interactive-code');
    
    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            const lines = block.querySelectorAll('div');
            
            lines.forEach((line, i) => {
                setTimeout(() => {
                    line.style.animation = 'typeLine 0.3s forwards';
                    setTimeout(() => {
                        line.style.animation = '';
                    }, 300);
                }, i * 100);
            });
        });
    });
    
    // =============================================
    // Inicialización
    // =============================================
    function init() {
        initTheme();
        updateActiveSection();
        
        // Inicializar tooltips
        tippy('[data-tooltip]', {
            content(reference) {
                return reference.getAttribute('data-tooltip');
            },
            animation: 'scale',
            theme: 'light',
            arrow: true,
            delay: [100, 0]
        });
        
        console.log('Portafolio futurista inicializado correctamente');
    }
    
    init();
});

// Añadir estilos de animación para el efecto de escritura
const style = document.createElement('style');
style.textContent = `
    @keyframes typeLine {
        0% { opacity: 0.5; transform: translateX(-10px); }
        100% { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);