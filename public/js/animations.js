/* ============================================================
   7CEPL — Shared Animations & Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. Navbar scroll effect
    ---------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');

    const handleNavScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    /* ----------------------------------------------------------
       2. Active nav link
    ---------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ----------------------------------------------------------
       3. Mobile nav toggle
    ---------------------------------------------------------- */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (navToggle && navLinksList) {
        navToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('open');
            navToggle.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinksList.contains(e.target)) {
                navLinksList.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    }

    /* ----------------------------------------------------------
       4. Scroll-reveal (IntersectionObserver)
    ---------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    /* ----------------------------------------------------------
       5. Animated number counters
    ---------------------------------------------------------- */
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const tick = () => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString() + suffix;
            if (current < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }

    /* ----------------------------------------------------------
       6. Hero particle canvas
    ---------------------------------------------------------- */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animFrameId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', resize, { passive: true });
        resize();

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.r = Math.random() * 2.2 + 0.4;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.a = Math.random() * 0.5 + 0.1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,107,0,${this.a})`;
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width ||
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
        }

        // Spawn particles
        const COUNT = Math.min(80, Math.floor(canvas.width / 12));
        for (let i = 0; i < COUNT; i++) particles.push(new Particle());

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255,107,0,${(1 - dist / 120) * 0.18})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        };

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            animFrameId = requestAnimationFrame(loop);
        };
        loop();

        // Hero BG parallax/load
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            setTimeout(() => heroBg.classList.add('loaded'), 100);
        }
    }

    /* ----------------------------------------------------------
       7. Typed text effect
    ---------------------------------------------------------- */
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const words = ['Reliability', 'Speed', 'Precision', 'Trust'];
        let wordIdx = 0, charIdx = 0, deleting = false;

        const type = () => {
            const word = words[wordIdx];
            if (deleting) {
                typedEl.textContent = word.slice(0, --charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    wordIdx = (wordIdx + 1) % words.length;
                    setTimeout(type, 450);
                    return;
                }
                setTimeout(type, 65);
            } else {
                typedEl.textContent = word.slice(0, ++charIdx);
                if (charIdx === word.length) {
                    deleting = true;
                    setTimeout(type, 1800);
                    return;
                }
                setTimeout(type, 110);
            }
        };
        setTimeout(type, 800);
    }

    /* ----------------------------------------------------------
       8. Testimonials carousel
    ---------------------------------------------------------- */
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.carousel-dot');

    if (track && dots.length) {
        let current = 0;
        const total = dots.length;

        const goTo = (idx) => {
            current = (idx + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        };

        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
        goTo(0);

        let autoPlay = setInterval(() => goTo(current + 1), 5000);
        track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
        track.parentElement.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => goTo(current + 1), 5000);
        });
    }

    /* ----------------------------------------------------------
       9. Smooth scroll for anchor links
    ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
