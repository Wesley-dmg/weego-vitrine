document.addEventListener('DOMContentLoaded', function () {
    // ===== HERO SLIDESHOW AVEC TEXTES DYNAMIQUES =====
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.hero-control.prev');
    const nextBtn = document.querySelector('.hero-control.next');
    const heroTextContainer = document.getElementById('heroTextContainer');
    let currentSlide = 0;
    let slideInterval;

    // Contenu des slides (texte, badge, boutons)
    const slideContent = [
        {
            badge: "Agence hybride",
            title: "L'agence qui digitalise votre réussite",
            description: "Weego combine stratégie, expertise locale et flexibilité freelance pour offrir un marketing digital sur-mesure aux entreprises béninoises et ouest-africaines.",
            btn1: { text: "Découvrir nos services", url: "/public/services.html", class: "btn-weego-primary" },
            btn2: { text: "Nous contacter", url: "/public/contact.html", class: "btn-weego-outline" }
        },
        {
            badge: "Expertise locale",
            title: "Des stratégies adaptées au marché africain",
            description: "Nous maîtrisons les spécificités culturelles et économiques de l'Afrique de l'Ouest pour des campagnes qui résonnent vraiment.",
            btn1: { text: "Nos références", url: "/public/about.html", class: "btn-weego-primary" },
            btn2: { text: "Nous contacter", url: "/public/contact.html", class: "btn-weego-outline" }
        },
        {
            badge: "Flexibilité totale",
            title: "Du sur-mesure pour chaque budget",
            description: "Modules à la carte, exécution freelance ou interne : vous composez l'accompagnement dont vous avez besoin, sans engagement.",
            btn1: { text: "Voir les tarifs", url: "/public/pricing.html", class: "btn-weego-primary" },
            btn2: { text: "Demander un devis", url: "#", class: "btn-weego-outline", modal: true }
        }
    ];

    function updateHeroContent(index) {
        const content = slideContent[index];
        let html = `
            <span class="badge mb-3">${content.badge}</span>
            <h1 class="display-4 fw-bold">${content.title}</h1>
            <p class="lead">${content.description}</p>
            <div class="mt-4">
        `;
        // Bouton 1
        if (content.btn1.modal) {
            html += `<button class="${content.btn1.class} btn-lg me-2" data-bs-toggle="modal" data-bs-target="#quoteModal">${content.btn1.text}</button>`;
        } else {
            html += `<a href="${content.btn1.url}" class="${content.btn1.class} btn-lg me-2">${content.btn1.text}</a>`;
        }
        // Bouton 2
        if (content.btn2.modal) {
            html += `<button class="${content.btn2.class} btn-lg" data-bs-toggle="modal" data-bs-target="#quoteModal">${content.btn2.text}</button>`;
        } else {
            html += `<a href="${content.btn2.url}" class="${content.btn2.class} btn-lg">${content.btn2.text}</a>`;
        }
        html += `</div>`;
        heroTextContainer.innerHTML = html;
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        updateHeroContent(index);
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);

    // Initialiser avec la première slide
    showSlide(0);
    startAutoSlide();

    // ===== SECTION SERVICES : GÉNÉRATION DES FLIP CARDS =====
    const servicesGrid = document.getElementById('servicesGrid');
    const services = [
        {
            name: "Stratégie & Direction",
            shortDesc: "Pilotez votre croissance",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Nous définissons avec vous une feuille de route marketing claire, basée sur des objectifs mesurables et une connaissance approfondie de votre marché."
        },
        {
            name: "Contenu & Copywriting",
            shortDesc: "Des mots qui convertissent",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "De la rédaction SEO aux pages de vente, nous créons des contenus engageants qui captent l'attention et poussent à l'action."
        },
        {
            name: "SEO & Référencement",
            shortDesc: "Soyez visible sur Google",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Améliorez votre positionnement dans les résultats de recherche grâce à un audit technique, une stratégie de mots-clés et des backlinks de qualité."
        },
        {
            name: "Publicité Payante",
            shortDesc: "Des campagnes rentables",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Nous gérons vos campagnes Google Ads et Facebook Ads pour maximiser votre retour sur investissement, avec un suivi précis et des optimisations continues."
        },
        {
            name: "Réseaux & Influence",
            shortDesc: "Engagez votre communauté",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Community management, collaborations avec des micro-influenceurs, et création de contenu UGC pour développer votre notoriété et votre engagement."
        },
        {
            name: "Data & Analytics",
            shortDesc: "Pilotez par la donnée",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Tableaux de bord personnalisés, suivi des KPIs, et recommandations data-driven pour améliorer en continu la performance de vos actions."
        }
    ];

    services.forEach((service, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
        <div class="flip-card ${index === 0 ? 'auto-flip' : ''}">
            <div class="flip-card-inner">
                <div class="flip-card-front" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${service.image}');">
                    <h3 class="h4">${service.name}</h3>
                    <p>${service.shortDesc}</p>
                </div>
                <div class="flip-card-back">
                    <h4>${service.name}</h4>
                    <p class="small">${service.description}</p>
                    <a href="/public/services.html" class="btn-weego-light btn-sm mt-3">En savoir plus</a>
                </div>
            </div>
        </div>
    `;
        servicesGrid.appendChild(col);
    });

    // ===== GESTION VIDÉO YOUTUBE =====
    const thumbnail = document.getElementById('videoThumbnail');
    const playBtn = document.getElementById('playButton');
    const iframeContainer = document.getElementById('videoIframe');
    const iframe = document.getElementById('youtubePlayer');

    if (playBtn) {
        playBtn.addEventListener('click', function () {
            thumbnail.classList.add('d-none');
            iframeContainer.classList.remove('d-none');
            iframe.src = "https://www.youtube.com/embed/2ad79Xc20js";
        });
    }

    // ===== FORMULAIRE DE DEVIS =====
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Merci pour votre demande ! Nous vous contacterons rapidement.');
            bootstrap.Modal.getInstance(document.getElementById('quoteModal')).hide();
            quoteForm.reset();
        });
    }

    // ===== NEWSLETTER =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Merci pour votre abonnement avec l'adresse : ${email}`);
            this.reset();
        });
    }

    // ===== ANIMATION AU SCROLL =====
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.pricing-card, .partner-card, .flip-card');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.9) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.pricing-card, .partner-card, .flip-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // pour les éléments déjà visibles
});