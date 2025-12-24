document.addEventListener("DOMContentLoaded", function() {
    
    /* --- 1. SCROLL REVEAL (Animation d'apparition) --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // On joue l'anim une seule fois
            }
        });
    }, observerOptions);

    // On cible les cartes "Comment ça marche" et les éléments Bento
    const revealElements = document.querySelectorAll('.stack-card, .b-item, .format-card');
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // Classe CSS injectée dynamiquement pour l'état "revealed"
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);


    /* --- 2. GESTION DU FORMULAIRE (Simulation UX) --- */
    const contactBtn = document.querySelector('.contact-form-glass button');
    const inputs = document.querySelectorAll('.contact-form-glass input, .contact-form-glass textarea');
    
    if(contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validation basique
            let isValid = true;
            inputs.forEach(input => {
                if(!input.value) {
                    isValid = false;
                    input.style.border = "1px solid #FF5C00"; // Bordure orange si vide
                } else {
                    input.style.border = "none";
                }
            });

            if(isValid) {
                // Simulation d'envoi (Loading state)
                const originalText = contactBtn.innerText;
                contactBtn.innerText = "ENVOI EN COURS...";
                contactBtn.style.opacity = "0.7";
                
                setTimeout(() => {
                    // Succès UX
                    const formContainer = document.querySelector('.contact-form-glass');
                    formContainer.innerHTML = `
                        <div style="text-align:center; padding:40px 0;">
                            <i class="fas fa-check-circle" style="font-size:3rem; color:#3777FF; margin-bottom:20px;"></i>
                            <h3 style="margin-bottom:10px;">Message envoyé !</h3>
                            <p>Notre équipe vous recontacte sous 48h.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }

    /* --- 3. SMOOTH SCROLL NAVIGATION --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                // Offset pour la barre de navigation fixe
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.nav-toggle');
    const closeBtn = document.querySelector('.mobile-close-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    // Fonction pour ouvrir
    burgerBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêche le scroll derrière
    });

    // Fonction pour fermer
    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Réactive le scroll
    };

    closeBtn.addEventListener('click', closeMenu);

    // Fermer le menu si on clique sur un lien (pour la navigation one-page)
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    /* --- SLIDER AVIS LOGIC --- */
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if(!track) return; // Sécurité si la section n'existe pas

    let currentIndex = 0;
    
    // Fonction pour savoir combien de cartes sont visibles à l'écran
    const getVisibleCards = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    const updateSlider = () => {
        const cards = document.querySelectorAll('.testimonial-card');
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // Correspond au gap CSS (30px)
        
        // Calcul du déplacement
        const moveAmount = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${moveAmount}px)`;
        
        // Mise à jour des dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Gestion état boutons (optionnel : désactiver si fin de liste)
        // Ici on laisse infini ou boucle selon besoin, version simple :
    };

    const maxIndex = () => {
        const totalCards = document.querySelectorAll('.testimonial-card').length;
        return totalCards - getVisibleCards(); 
    };

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex()) {
            currentIndex++;
        } else {
            currentIndex = 0; // Retour au début (boucle)
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex(); // Aller à la fin
        }
        updateSlider();
    });

    // Clic sur les dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            // On s'assure de ne pas dépasser le max possible visuellement
            if(index <= maxIndex()) {
                currentIndex = index;
                updateSlider();
            }
        });
    });

    // Mettre à jour si on redimensionne la fenêtre
    window.addEventListener('resize', updateSlider);
});

// SECTION EXPERTS

document.addEventListener('DOMContentLoaded', function() {
    const tdNavLinks = document.querySelectorAll('.td-nav-item');
    const tdTabPanels = document.querySelectorAll('.td-tab-panel');

    tdNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Désactiver tous les onglets
            tdNavLinks.forEach(n => n.classList.remove('td-active'));
            tdTabPanels.forEach(t => t.classList.remove('td-active'));

            // Activer celui cliqué
            this.classList.add('td-active');
            const targetId = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            
            if(targetPanel) {
                targetPanel.classList.add('td-active');
            }
        });
    });
});