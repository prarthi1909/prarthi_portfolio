/* ============================================
   PRARTHI KUMARI â€” PORTFOLIO SCRIPTS
   Enhanced Particles Â· Typewriter Â· Scroll Â· Glow Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    //  THEME TOGGLE — Dark / Light Mode
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    function setTheme(theme) {
        if (theme === 'light') {
            root.classList.add('light-theme');
        } else {
            root.classList.remove('light-theme');
        }
        localStorage.setItem('pk-theme', theme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = root.classList.contains('light-theme');
            const newTheme = isLight ? 'dark' : 'light';

            // Add transition class for smooth animation
            root.classList.add('theme-transitioning');
            setTheme(newTheme);

            // Remove transition class after animation completes (avoid perf hit)
            setTimeout(() => root.classList.remove('theme-transitioning'), 600);
        });
    }

    // ---- Typewriter Effect ----
    const typewriterEl = document.getElementById('typewriter');
    const titles = [
        'Full Stack Developer',
        'Java Programmer',
        'Web Developer',
        'CS Undergraduate'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const current = titles[titleIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();


    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;

        // Progress bar
        scrollProgress.style.width = scrollPercent + '%';

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ---- Mobile Navigation ----
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }


    // ---- Scroll Animations (Intersection Observer) ----
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px'
    });

    animateElements.forEach(el => observer.observe(el));


    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    const aboutSection = document.getElementById('about');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }


    // ---- Enhanced Particles Background with Glow ----
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null };
        let animFrameId;
        let time = 0;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Dynamic color palette
        const colorPalette = [
            { r: 139, g: 92,  b: 246 },  // Vivid Violet
            { r: 59,  g: 130, b: 246 },  // Electric Blue
            { r: 6,   g: 214, b: 160 },  // Neon Mint
            { r: 56,  g: 189, b: 248 },  // Sky Blue
            { r: 244, g: 114, b: 182 },  // Hot Pink
            { r: 167, g: 139, b: 250 },  // Light Violet
        ];

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.baseSize = this.size;
                this.speedX = (Math.random() - 0.5) * 0.35;
                this.speedY = (Math.random() - 0.5) * 0.35;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.baseOpacity = this.opacity;

                // Color from palette
                const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                this.r = color.r;
                this.g = color.g;
                this.b = color.b;

                // Pulsing parameters
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulsePhase = Math.random() * Math.PI * 2;

                // Glow intensity
                this.glowSize = Math.random() * 8 + 3;
            }

            update(time) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Gentle pulsing
                const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase);
                this.size = this.baseSize + pulse * 0.5;
                this.opacity = this.baseOpacity + pulse * 0.1;

                // Mouse interaction â€” attract gently when close
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        this.x -= dx * 0.008 * force;
                        this.y -= dy * 0.008 * force;
                        // Brighten near mouse
                        this.opacity = Math.min(this.baseOpacity + force * 0.4, 0.9);
                        this.size = this.baseSize + force * 2;
                    }
                }

                // Wrap around edges smoothly
                if (this.x < -10) this.x = canvas.width + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.y > canvas.height + 10) this.y = -10;
            }

            draw() {
                // Draw glow
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.glowSize
                );
                gradient.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw core dot
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            // Limit particles for performance
            const density = window.innerWidth < 768 ? 18000 : 10000;
            const maxParticles = window.innerWidth < 768 ? 60 : 100;
            const count = Math.min(Math.floor((canvas.width * canvas.height) / density), maxParticles);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDist = 130;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.08;
                        // Blend colors between connected particles
                        const r = (particles[i].r + particles[j].r) / 2;
                        const g = (particles[i].g + particles[j].g) / 2;
                        const b = (particles[i].b + particles[j].b) / 2;

                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(time);
                p.draw();
            });
            connectParticles();
            animFrameId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Debounce resize for performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 250);
        });
    }


    // ---- Mouse-follow glow on hero section ----
    const heroSection = document.querySelector('.hero');
    let heroGlow = null;

    if (heroSection) {
        function createHeroGlow() {
            heroGlow = document.createElement('div');
            heroGlow.style.cssText = `
                position: absolute;
                width: 400px;
                height: 400px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%);
                pointer-events: none;
                z-index: 0;
                transition: transform 0.3s ease-out;
                filter: blur(20px);
            `;
            heroSection.style.position = 'relative';
            heroSection.appendChild(heroGlow);
        }

        createHeroGlow();

        heroSection.addEventListener('mousemove', (e) => {
            if (heroGlow) {
                const rect = heroSection.getBoundingClientRect();
                const x = e.clientX - rect.left - 200;
                const y = e.clientY - rect.top - 200;
                heroGlow.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }


    // ---- Contact Form (Backend Email) ----
    const contactForm = document.getElementById('contact-form');
    const btnSend = document.getElementById('btn-send');

    if (contactForm && btnSend) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }

            // Loading state
            const originalHTML = btnSend.innerHTML;
            btnSend.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btnSend.disabled = true;

            try {
                const response = await fetch('http://localhost:5000/send-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });

                let data;
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const text = await response.text();
                    if (text) {
                        data = JSON.parse(text);
                    } else {
                        throw new Error('Server returned an empty response.');
                    }
                } else {
                    throw new Error('Server returned an unexpected response. Make sure the backend is running on port 5000.');
                }

                if (response.ok && data.success) {
                    // Success state
                    btnSend.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    btnSend.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    showAlert('Your message has been sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Failed to send message.');
                }
            } catch (error) {
                // Error state
                btnSend.innerHTML = '<i class="fas fa-times"></i> Failed';
                btnSend.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                
                // Detect network/server-down errors
                if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                    showAlert('Cannot reach the server. Please make sure the backend is running (npm start).', 'error');
                } else {
                    showAlert(error.message || 'Something went wrong. Please try again.', 'error');
                }
            }


            // Reset button after 3 seconds
            setTimeout(() => {
                btnSend.innerHTML = originalHTML;
                btnSend.style.background = '';
                btnSend.disabled = false;
            }, 3000);
        });
    }

    // ---- Toast Alert System ----
    function showAlert(message, type = 'success') {
        // Remove any existing alert
        const existing = document.querySelector('.toast-alert');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast-alert toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }


    // ---- Smooth anchor scrolling (for older browsers) ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Advanced 3D Tilt & Glare effect on glass cards (desktop only) ----
    if (window.innerWidth > 768) {
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach(card => {
            // Optional: inject a Glare element for realistic light reflection
            let glare = document.createElement('div');
            glare.className = 'card-glare';
            glare.style.position = 'absolute';
            glare.style.top = '0';
            glare.style.left = '0';
            glare.style.width = '100%';
            glare.style.height = '100%';
            glare.style.pointerEvents = 'none';
            glare.style.borderRadius = 'inherit';
            glare.style.opacity = '0';
            glare.style.transition = 'opacity 0.4s ease';
            card.style.position = 'relative'; // ensure bounded
            // Only clip glare on cards whose content won't get cut-off
            if (!card.classList.contains('skill-category')) {
                 card.style.overflow = 'hidden'; 
            }
            card.appendChild(glare);

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; // remove structural transition to prevent dragging/lagging
                glare.style.opacity = '1';
                card.style.zIndex = '10'; // pop element forward
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Stronger tilt magnitude (12 degrees max)
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;

                // Real 3D depth and slight zoom
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
                
                // Dynamic shadow casts opposite to the light/tilt angle
                card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.15)`;

                // Dynamic light glare tracks mouse coordinates precisely
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
            });

            card.addEventListener('mouseleave', () => {
                // Return gracefully with a spring animation
                card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.boxShadow = '';
                card.style.zIndex = '';
                glare.style.opacity = '0';
                
                // Clean up transitions after animation
                setTimeout(() => {
                    card.style.transition = ''; 
                }, 500);
            });
        });
    }


    // ============================================
    //  3D TECH STACK — FLOATING BALLS VISUALIZATION
    // ============================================
    (function initTechStackViz() {
        const tsCanvas = document.getElementById('tech-stack-canvas');
        if (!tsCanvas) return;

        const tsCtx = tsCanvas.getContext('2d');
        const wrapper = tsCanvas.parentElement;
        let tsWidth, tsHeight;
        let tsBalls = [];
        let tsAnimFrame;
        let tsMouse = { x: null, y: null };
        let tsHoveredBall = null;
        let tsSelectedBall = null;
        let tsTime = 0;
        let tsIsVisible = false;

        // Detail panel elements
        const detailPanel = document.getElementById('tech-stack-detail');
        const detailIcon = document.getElementById('tech-detail-icon');
        const detailName = document.getElementById('tech-detail-name');
        const detailCategory = document.getElementById('tech-detail-category');
        const detailDesc = document.getElementById('tech-detail-desc');
        const detailClose = document.getElementById('tech-detail-close');

        // Color palette per category
        const categoryColors = {
            'Languages':        { h: 265, s: 85, l: 66, r: 139, g: 92,  b: 246 },
            'Frontend':         { h: 330, s: 80, l: 68, r: 244, g: 114, b: 182 },
            'Backend':          { h: 162, s: 95, l: 43, r: 6,   g: 214, b: 160 },
            'Database':         { h: 217, s: 91, l: 60, r: 59,  g: 130, b: 246 },
            'CS Fundamentals':  { h: 199, s: 90, l: 55, r: 56,  g: 189, b: 248 }
        };

        // Skill descriptions for the detail panel
        const skillDescriptions = {
            'Java':       'Object-oriented, platform-independent language used for enterprise apps, Android development, and backend systems.',
            'C++':        'High-performance systems language for competitive programming, game development, and OS-level applications.',
            'JavaScript': 'Dynamic, versatile language for web interactivity, frontend frameworks, and full-stack Node.js applications.',
            'HTML5':      'The backbone of the web — semantic markup language for structuring modern, accessible web pages.',
            'CSS3':       'Stylesheet language for designing beautiful, responsive user interfaces with animations and layouts.',
            'Bootstrap':  'Popular CSS framework for building responsive, mobile-first front-end designs rapidly.',
            'Node.js':    'JavaScript runtime for building fast, scalable server-side applications and REST APIs.',
            'Express.js': 'Minimal and flexible Node.js framework for building web applications and APIs.',
            'MongoDB':    'NoSQL document database for scalable, flexible data storage with JSON-like documents.',
            'DSA':        'Data Structures & Algorithms — essential for problem-solving, optimization, and technical interviews.',
            'OOPs':       'Object-Oriented Programming — encapsulation, inheritance, polymorphism for clean software design.',
            'DBMS':       'Database Management Systems — relational design, SQL queries, normalization, and transactions.'
        };

        // ---- Parse skills from existing DOM ----
        function parseSkillsFromDOM() {
            const skills = [];
            const categories = document.querySelectorAll('#skills .skill-category');
            categories.forEach(cat => {
                const titleEl = cat.querySelector('.skill-category-title');
                if (!titleEl) return;
                const categoryName = titleEl.textContent.trim();
                const items = cat.querySelectorAll('.skill-item');
                items.forEach(item => {
                    const iconEl = item.querySelector('i');
                    const nameEl = item.querySelector('span');
                    if (nameEl) {
                        skills.push({
                            name: nameEl.textContent.trim(),
                            category: categoryName,
                            iconClass: iconEl ? iconEl.className : 'fas fa-code'
                        });
                    }
                });
            });
            return skills;
        }

        // ---- Resize canvas ----
        function tsResize() {
            const rect = wrapper.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            tsWidth = rect.width;
            tsHeight = tsCanvas.offsetHeight;
            tsCanvas.width = tsWidth * dpr;
            tsCanvas.height = tsHeight * dpr;
            tsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // ---- SkillBall class ----
        class SkillBall {
            constructor(skill, index, total) {
                this.name = skill.name;
                this.category = skill.category;
                this.iconClass = skill.iconClass;
                this.description = skillDescriptions[skill.name] || `Proficient in ${skill.name} — part of ${skill.category} expertise.`;

                // Get color from category
                const catColor = categoryColors[skill.category] || categoryColors['Languages'];
                this.color = catColor;

                // Size based on ball importance — slightly randomized
                const baseSize = window.innerWidth < 480 ? 30 : (window.innerWidth < 768 ? 36 : 44);
                this.radius = baseSize + Math.random() * 8;

                // Position with some spread
                const angle = (index / total) * Math.PI * 2;
                const spreadX = (tsWidth * 0.3) * Math.cos(angle);
                const spreadY = (tsHeight * 0.3) * Math.sin(angle);
                this.x = tsWidth / 2 + spreadX + (Math.random() - 0.5) * 60;
                this.y = tsHeight / 2 + spreadY + (Math.random() - 0.5) * 60;

                // Clamp to bounds
                this.x = Math.max(this.radius + 10, Math.min(tsWidth - this.radius - 10, this.x));
                this.y = Math.max(this.radius + 10, Math.min(tsHeight - this.radius - 10, this.y));

                // Velocity
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;

                // Animation properties
                this.floatPhase = Math.random() * Math.PI * 2;
                this.floatSpeed = 0.008 + Math.random() * 0.006;
                this.floatAmplitude = 0.3 + Math.random() * 0.3;
                this.rotationAngle = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 0.3;

                // Interaction state
                this.hovered = false;
                this.selected = false;
                this.scale = 1;
                this.targetScale = 1;
                this.glowIntensity = 0;
                this.targetGlowIntensity = 0;
            }

            update(time) {
                // Float motion
                const floatX = Math.sin(time * this.floatSpeed + this.floatPhase) * this.floatAmplitude;
                const floatY = Math.cos(time * this.floatSpeed * 0.8 + this.floatPhase) * this.floatAmplitude * 0.6;

                this.vx += floatX * 0.01;
                this.vy += floatY * 0.01;

                // Apply friction
                this.vx *= 0.992;
                this.vy *= 0.992;

                // Clamp max speed
                const maxSpeed = 1.5;
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed;
                    this.vy = (this.vy / speed) * maxSpeed;
                }

                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                const r = this.radius * this.scale;
                if (this.x - r < 0) { this.x = r; this.vx = Math.abs(this.vx) * 0.7; }
                if (this.x + r > tsWidth) { this.x = tsWidth - r; this.vx = -Math.abs(this.vx) * 0.7; }
                if (this.y - r < 0) { this.y = r; this.vy = Math.abs(this.vy) * 0.7; }
                if (this.y + r > tsHeight) { this.y = tsHeight - r; this.vy = -Math.abs(this.vy) * 0.7; }

                // Rotation
                this.rotationAngle += this.rotationSpeed;

                // Smooth scale transition
                this.scale += (this.targetScale - this.scale) * 0.1;
                this.glowIntensity += (this.targetGlowIntensity - this.glowIntensity) * 0.1;

                // Set targets based on state
                if (this.selected) {
                    this.targetScale = 1.3;
                    this.targetGlowIntensity = 1;
                } else if (this.hovered) {
                    this.targetScale = 1.15;
                    this.targetGlowIntensity = 0.7;
                } else {
                    this.targetScale = 1;
                    this.targetGlowIntensity = 0;
                }
            }

            draw(ctx, isLightTheme) {
                const r = this.radius * this.scale;
                const { r: cr, g: cg, b: cb } = this.color;

                ctx.save();
                ctx.translate(this.x, this.y);

                // Outer glow
                if (this.glowIntensity > 0.01) {
                    const glowR = r * 2.2;
                    const glowGrad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, glowR);
                    glowGrad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${0.25 * this.glowIntensity})`);
                    glowGrad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, ${0.08 * this.glowIntensity})`);
                    glowGrad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
                    ctx.beginPath();
                    ctx.arc(0, 0, glowR, 0, Math.PI * 2);
                    ctx.fillStyle = glowGrad;
                    ctx.fill();
                }

                // Ambient glow (always-on subtle)
                const ambientGrad = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 1.6);
                ambientGrad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.06)`);
                ambientGrad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
                ctx.beginPath();
                ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
                ctx.fillStyle = ambientGrad;
                ctx.fill();

                // Ball body — 3D gradient
                const bodyGrad = ctx.createRadialGradient(
                    -r * 0.25, -r * 0.3, r * 0.1,
                    0, 0, r
                );
                if (isLightTheme) {
                    bodyGrad.addColorStop(0, `rgba(${Math.min(cr+80,255)}, ${Math.min(cg+80,255)}, ${Math.min(cb+80,255)}, 0.95)`);
                    bodyGrad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, 0.85)`);
                    bodyGrad.addColorStop(1, `rgba(${Math.max(cr-40,0)}, ${Math.max(cg-40,0)}, ${Math.max(cb-40,0)}, 0.9)`);
                } else {
                    bodyGrad.addColorStop(0, `rgba(${Math.min(cr+60,255)}, ${Math.min(cg+60,255)}, ${Math.min(cb+60,255)}, 0.9)`);
                    bodyGrad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, 0.75)`);
                    bodyGrad.addColorStop(1, `rgba(${Math.max(cr-50,0)}, ${Math.max(cg-50,0)}, ${Math.max(cb-50,0)}, 0.85)`);
                }

                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fillStyle = bodyGrad;
                ctx.fill();

                // Glossy highlight (top-left specular)
                const glossGrad = ctx.createRadialGradient(
                    -r * 0.3, -r * 0.35, 0,
                    -r * 0.1, -r * 0.15, r * 0.7
                );
                glossGrad.addColorStop(0, `rgba(255, 255, 255, ${isLightTheme ? 0.5 : 0.35})`);
                glossGrad.addColorStop(0.4, `rgba(255, 255, 255, ${isLightTheme ? 0.12 : 0.08})`);
                glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.fillStyle = glossGrad;
                ctx.fill();

                // Ring border
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.3 + this.glowIntensity * 0.4})`;
                ctx.lineWidth = 1.5 + this.glowIntensity;
                ctx.stroke();

                // Text label
                const fontSize = Math.max(10, r * 0.32);
                ctx.font = `600 ${fontSize}px 'Poppins', sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Text shadow
                ctx.fillStyle = `rgba(0, 0, 0, 0.5)`;
                ctx.fillText(this.name, 1, 1);

                // Text
                ctx.fillStyle = isLightTheme ? '#fff' : '#fff';
                ctx.fillText(this.name, 0, 0);

                ctx.restore();
            }

            containsPoint(px, py) {
                const dx = px - this.x;
                const dy = py - this.y;
                return dx * dx + dy * dy <= (this.radius * this.scale) * (this.radius * this.scale);
            }
        }

        // ---- Ball-to-ball collision ----
        function resolveCollisions() {
            for (let i = 0; i < tsBalls.length; i++) {
                for (let j = i + 1; j < tsBalls.length; j++) {
                    const a = tsBalls[i];
                    const b = tsBalls[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = (a.radius * a.scale) + (b.radius * b.scale) + 4;

                    if (dist < minDist && dist > 0) {
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const overlap = (minDist - dist) / 2;

                        // Separate
                        a.x -= nx * overlap;
                        a.y -= ny * overlap;
                        b.x += nx * overlap;
                        b.y += ny * overlap;

                        // Elastic-ish bounce
                        const relVx = a.vx - b.vx;
                        const relVy = a.vy - b.vy;
                        const relVdotN = relVx * nx + relVy * ny;

                        if (relVdotN > 0) {
                            const restitution = 0.5;
                            const impulse = relVdotN * restitution;
                            a.vx -= impulse * nx;
                            a.vy -= impulse * ny;
                            b.vx += impulse * nx;
                            b.vy += impulse * ny;
                        }
                    }
                }
            }
        }

        // ---- Mouse interaction ----
        function getMousePos(e) {
            const rect = tsCanvas.getBoundingClientRect();
            const touch = e.touches ? e.touches[0] : e;
            return {
                x: (touch.clientX || touch.pageX) - rect.left,
                y: (touch.clientY || touch.pageY) - rect.top
            };
        }

        tsCanvas.addEventListener('mousemove', (e) => {
            const pos = getMousePos(e);
            tsMouse.x = pos.x;
            tsMouse.y = pos.y;

            // Check hover
            let foundHover = false;
            for (let i = tsBalls.length - 1; i >= 0; i--) {
                if (tsBalls[i].containsPoint(pos.x, pos.y)) {
                    if (tsHoveredBall !== tsBalls[i]) {
                        if (tsHoveredBall) tsHoveredBall.hovered = false;
                        tsHoveredBall = tsBalls[i];
                        tsHoveredBall.hovered = true;
                    }
                    foundHover = true;
                    break;
                }
            }
            if (!foundHover && tsHoveredBall) {
                tsHoveredBall.hovered = false;
                tsHoveredBall = null;
            }

            tsCanvas.classList.toggle('hovering', foundHover);
        });

        tsCanvas.addEventListener('mouseleave', () => {
            tsMouse.x = null;
            tsMouse.y = null;
            if (tsHoveredBall) {
                tsHoveredBall.hovered = false;
                tsHoveredBall = null;
            }
            tsCanvas.classList.remove('hovering');
        });

        // Click handler
        tsCanvas.addEventListener('click', (e) => {
            const pos = getMousePos(e);
            let clickedBall = null;

            for (let i = tsBalls.length - 1; i >= 0; i--) {
                if (tsBalls[i].containsPoint(pos.x, pos.y)) {
                    clickedBall = tsBalls[i];
                    break;
                }
            }

            if (clickedBall) {
                // Deselect previous
                if (tsSelectedBall && tsSelectedBall !== clickedBall) {
                    tsSelectedBall.selected = false;
                }
                tsSelectedBall = clickedBall;
                tsSelectedBall.selected = true;
                showSkillDetail(clickedBall);
            } else {
                // Clicked empty space — close panel
                if (tsSelectedBall) {
                    tsSelectedBall.selected = false;
                    tsSelectedBall = null;
                }
                hideSkillDetail();
            }
        });

        // Touch support
        tsCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const pos = getMousePos(e);
            let touchedBall = null;

            for (let i = tsBalls.length - 1; i >= 0; i--) {
                if (tsBalls[i].containsPoint(pos.x, pos.y)) {
                    touchedBall = tsBalls[i];
                    break;
                }
            }

            if (touchedBall) {
                if (tsSelectedBall && tsSelectedBall !== touchedBall) {
                    tsSelectedBall.selected = false;
                }
                tsSelectedBall = touchedBall;
                tsSelectedBall.selected = true;
                showSkillDetail(touchedBall);
            } else {
                if (tsSelectedBall) {
                    tsSelectedBall.selected = false;
                    tsSelectedBall = null;
                }
                hideSkillDetail();
            }
        }, { passive: false });

        // Detail panel functions
        function showSkillDetail(ball) {
            const color = ball.color;
            detailIcon.innerHTML = `<i class="${ball.iconClass}" style="color: rgb(${color.r}, ${color.g}, ${color.b})"></i>`;
            detailIcon.style.borderColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`;
            detailIcon.style.boxShadow = `0 0 20px rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
            detailName.textContent = ball.name;
            detailCategory.textContent = ball.category;
            detailCategory.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
            detailCategory.style.borderColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
            detailCategory.style.background = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`;
            detailDesc.textContent = ball.description;
            detailPanel.classList.add('active');
        }

        function hideSkillDetail() {
            detailPanel.classList.remove('active');
        }

        detailClose.addEventListener('click', (e) => {
            e.stopPropagation();
            if (tsSelectedBall) {
                tsSelectedBall.selected = false;
                tsSelectedBall = null;
            }
            hideSkillDetail();
        });

        // ---- Mouse repulsion on hover (soft push) ----
        function applyMouseForce() {
            if (tsMouse.x === null) return;
            tsBalls.forEach(ball => {
                const dx = ball.x - tsMouse.x;
                const dy = ball.y - tsMouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = ball.radius * 2.5;

                if (dist < minDist && dist > 0) {
                    const force = (minDist - dist) / minDist * 0.15;
                    ball.vx += (dx / dist) * force;
                    ball.vy += (dy / dist) * force;
                }
            });
        }

        // ---- Draw connecting lines between nearby balls of same category ----
        function drawConnections(ctx, isLightTheme) {
            const maxDist = 180;
            for (let i = 0; i < tsBalls.length; i++) {
                for (let j = i + 1; j < tsBalls.length; j++) {
                    if (tsBalls[i].category !== tsBalls[j].category) continue;
                    const dx = tsBalls[i].x - tsBalls[j].x;
                    const dy = tsBalls[i].y - tsBalls[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * (isLightTheme ? 0.12 : 0.1);
                        const c = tsBalls[i].color;
                        ctx.beginPath();
                        ctx.moveTo(tsBalls[i].x, tsBalls[i].y);
                        ctx.lineTo(tsBalls[j].x, tsBalls[j].y);
                        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        // ---- Main animation loop ----
        function tsAnimate() {
            if (!tsIsVisible) {
                tsAnimFrame = requestAnimationFrame(tsAnimate);
                return;
            }

            tsTime++;
            const isLightTheme = document.documentElement.classList.contains('light-theme');

            tsCtx.clearRect(0, 0, tsWidth, tsHeight);

            // Draw subtle grid pattern
            drawBackgroundGrid(tsCtx, isLightTheme);

            // Update & physics
            tsBalls.forEach(ball => ball.update(tsTime));
            resolveCollisions();
            applyMouseForce();

            // Draw category connections
            drawConnections(tsCtx, isLightTheme);

            // Draw balls (selected last for z-order)
            const sortedBalls = [...tsBalls].sort((a, b) => {
                if (a.selected) return 1;
                if (b.selected) return -1;
                if (a.hovered) return 1;
                if (b.hovered) return -1;
                return 0;
            });

            sortedBalls.forEach(ball => ball.draw(tsCtx, isLightTheme));

            tsAnimFrame = requestAnimationFrame(tsAnimate);
        }

        // ---- Subtle grid background ----
        function drawBackgroundGrid(ctx, isLightTheme) {
            const gridSize = 60;
            const opacity = isLightTheme ? 0.04 : 0.03;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;

            for (let x = 0; x < tsWidth; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, tsHeight);
                ctx.stroke();
            }
            for (let y = 0; y < tsHeight; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(tsWidth, y);
                ctx.stroke();
            }
        }

        // ---- Initialize ----
        function tsInit() {
            tsResize();
            const skills = parseSkillsFromDOM();
            tsBalls = skills.map((skill, i) => new SkillBall(skill, i, skills.length));
            tsAnimate();
        }

        // Intersection Observer — only animate when visible
        const tsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                tsIsVisible = entry.isIntersecting;
            });
        }, { threshold: 0.05 });

        const tsSection = document.getElementById('tech-stack-3d');
        if (tsSection) tsObserver.observe(tsSection);

        // Debounced resize
        let tsResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(tsResizeTimer);
            tsResizeTimer = setTimeout(() => {
                tsResize();
                // Re-bound balls
                tsBalls.forEach(ball => {
                    ball.x = Math.max(ball.radius + 10, Math.min(tsWidth - ball.radius - 10, ball.x));
                    ball.y = Math.max(ball.radius + 10, Math.min(tsHeight - ball.radius - 10, ball.y));
                });
            }, 200);
        });

        tsInit();
    })();


    // ---- AI Chatbot Assistant (Enhanced) ----
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');
    const chatSuggestions = document.getElementById('chatbot-suggestions');
    let chatOpened = false;
    let conversationHistory = [];
    let fallbackIndex = 0;

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.add('open');
        chatToggle.classList.add('hidden');
        chatInput.focus();

        if (!chatOpened) {
            chatOpened = true;
            addBotMessage("Hi there! ðŸ‘‹ I'm <strong>PK Assistant</strong>, Prarthi's portfolio bot. I can answer questions about her skills, projects, experience, and more â€” just type anything!");
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        chatToggle.classList.remove('hidden');
    });

    // Send message with smart delay
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        chatInput.value = '';
        chatInput.disabled = true;
        chatSend.disabled = true;

        showTyping();

        // Try OpenAI first for unmatched queries, fall back to local
        const localResponse = getLocalResponse(text);

        if (localResponse) {
            // Delay proportional to response length for realism
            const delay = Math.min(500 + localResponse.length * 2, 1800);
            setTimeout(() => {
                removeTyping();
                addBotMessage(localResponse);
                chatInput.disabled = false;
                chatSend.disabled = false;
                chatInput.focus();
            }, delay);
        } else {
            // Try AI backend, then smart fallback
            try {
                const aiResponse = await fetchAIResponse(text);
                removeTyping();
                addBotMessage(aiResponse);
            } catch {
                removeTyping();
                addBotMessage(getSmartFallback(text));
            }
            chatInput.disabled = false;
            chatSend.disabled = false;
            chatInput.focus();
        }

        conversationHistory.push(text.toLowerCase());
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Suggestion chips
    chatSuggestions.addEventListener('click', (e) => {
        const chip = e.target.closest('.suggestion-chip');
        if (chip) {
            const query = chip.getAttribute('data-query');
            chatInput.value = query;
            sendMessage();
        }
    });

    // Add message bubbles
    function addBotMessage(html) {
        const msg = document.createElement('div');
        msg.className = 'chat-message bot';
        msg.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="msg-bubble">${html}</div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'chat-message user';
        msg.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-user"></i></div>
            <div class="msg-bubble">${escapeHTML(text)}</div>
        `;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chat-message bot typing-msg';
        typing.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="msg-bubble typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {
        const typing = chatMessages.querySelector('.typing-msg');
        if (typing) typing.remove();
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ============================================
    //  INTENT-AWARE RESPONSE ENGINE
    // ============================================

    // ---- LAYER 1: Portfolio Topic Patterns (scored) ----
    const portfolioTopics = [
        {
            id: 'greeting',
            patterns: [/^(hi|hello|hey|yo|sup|hola|greetings|good\s?(morning|evening|afternoon|night)|howdy|what'?s\s?up|namaste)/i],
            weight: 10
        },
        {
            id: 'about',
            keywords: ['about', 'who', 'prarthi', 'tell me', 'introduce', 'yourself', 'background', 'bio', 'profile', 'describe', 'summary', 'overview'],
            weight: 5
        },
        {
            id: 'projects',
            keywords: ['project', 'work', 'built', 'portfolio', 'repo', 'app', 'application', 'developed', 'created', 'made', 'build', 'waste', 'zoo', 'student identification'],
            weight: 5
        },
        {
            id: 'skills',
            keywords: ['skill', 'tech', 'stack', 'proficient', 'expertise', 'tools', 'framework', 'capable', 'programming', 'coding', 'technologies', 'good at', 'speciali'],
            weight: 5
        },
        {
            id: 'education',
            keywords: ['education', 'study', 'college', 'degree', 'university', 'school', 'btech', 'b.tech', 'academic', 'qualification', 'lnct', 'bhopal', 'graduate', 'undergraduate', 'major', 'course'],
            weight: 5
        },
        {
            id: 'experience',
            keywords: ['experience', 'intern', 'job', 'company', 'wipro', 'eduskill', 'infosys', 'professional', 'career', 'worked', 'working', 'training', 'role', 'position', 'employed'],
            weight: 5
        },
        {
            id: 'achievements',
            keywords: ['achievement', 'award', 'certif', 'hackerrank', 'accomplishment', 'cocubes', 'nptel', 'rank', 'star', 'badge', 'competition', 'contest', 'won', 'medal', 'honor'],
            weight: 5
        },
        {
            id: 'contact',
            keywords: ['contact', 'email', 'reach', 'connect', 'hire', 'message', 'talk', 'call', 'phone', 'mail', 'get in touch', 'write', 'enquiry', 'inquiry', 'collaborate'],
            weight: 5
        },
        {
            id: 'resume',
            keywords: ['resume', 'cv', 'download resume', 'pdf', 'document'],
            weight: 5
        },
        {
            id: 'social',
            keywords: ['github', 'linkedin', 'social', 'instagram', 'leetcode', 'codechef', 'follow'],
            weight: 4
        },
        {
            id: 'thanks',
            patterns: [/^(thanks?|thank\s?you|thx|ty|bye|goodbye|good\s?bye|see\s?you|take\s?care|cya|cheers|tata)/i],
            weight: 10
        },
        {
            id: 'help',
            keywords: ['help', 'what can', 'options', 'menu', 'commands', 'guide', 'assist', 'features', 'all topics'],
            weight: 4
        },
        {
            id: 'compliment',
            keywords: ['nice portfolio', 'great portfolio', 'awesome portfolio', 'beautiful website', 'cool site', 'love the design', 'impressive work', 'well done', 'good job'],
            weight: 6
        },
        {
            id: 'java',
            keywords: ['java', 'spring', 'spring boot', 'jvm', 'maven'],
            weight: 4
        },
        {
            id: 'webdev',
            keywords: ['web dev', 'frontend', 'backend', 'full stack', 'fullstack', 'full-stack', 'web app', 'node', 'express'],
            weight: 4
        },
        {
            id: 'database',
            keywords: ['database', 'mongodb', 'mysql', 'sql', 'nosql', 'schema', 'query'],
            weight: 4
        },
        {
            id: 'dsa',
            keywords: ['dsa', 'algorithm', 'data structure', 'competitive', 'problem solving'],
            weight: 4
        },
        {
            id: 'location',
            keywords: ['where is she', 'where does she live', 'location', 'city', 'country', 'based in'],
            weight: 5
        },
        {
            id: 'age',
            keywords: ['how old', 'age', 'born', 'birthday', 'year of birth'],
            weight: 5
        },
        {
            id: 'availability',
            keywords: ['available', 'freelance', 'open to', 'looking for', 'opportunity', 'hiring', 'remote', 'full time', 'part time'],
            weight: 4
        }
    ];

    // Portfolio response templates
    const portfolioResponses = {
        greeting: [
            "Hello! ðŸ˜Š Welcome to Prarthi's portfolio. How can I help you? You can ask about her <strong>skills</strong>, <strong>projects</strong>, <strong>experience</strong>, or just chat!",
            "Hey there! ðŸ‘‹ Great to have you here! I can tell you about Prarthi's work, or we can just have a friendly chat. What's on your mind?",
            "Hi! ðŸ˜„ I'm PK Assistant. Ask me about Prarthi's portfolio, or feel free to ask anything else â€” I'll do my best to help!"
        ],
        about: [
            "Prarthi Kumari is a motivated <strong>Computer Science undergraduate</strong> pursuing B.Tech at LNCT Group of Colleges, Bhopal. She specializes in <strong>Java</strong>, <strong>Full Stack Web Development</strong>, and <strong>Database Management</strong>. She's passionate about building real-world applications with clean, efficient code. ðŸš€"
        ],
        projects: [
            `Here are Prarthi's key projects:<br><br>
            â­ <strong>Urban Waste Management System</strong> â€” Full-stack waste reporting platform<br>
            <a href="https://github.com/prarthi1909/urban-waste-mamangment-system" target="_blank">View on GitHub â†’</a><br><br>
            ðŸ“‹ <strong>Student Identification System</strong> â€” Student data management with unique ID generation<br>
            <a href="https://github.com/prarthi1909/student-identification" target="_blank">View on GitHub â†’</a><br><br>
            ðŸ¦ <strong>Zoo Management System</strong> â€” C++/Java-based animal & operations management<br>
            <a href="https://github.com/prarthi1909/zoo-managment-1" target="_blank">View on GitHub â†’</a><br><br>
            ðŸ“¸ <strong>Instagram Clone (Sample UI)</strong> â€” Frontend clone showcasing UI skills<br>
            <a href="https://github.com/prarthi1909/instagram-sample" target="_blank">View on GitHub â†’</a>`
        ],
        skills: [
            `Prarthi's technical skills include:<br><br>
            ðŸ’» <strong>Languages:</strong> Java, C++, JavaScript<br>
            ðŸŽ¨ <strong>Frontend:</strong> HTML5, CSS3, Bootstrap<br>
            âš™ï¸ <strong>Backend:</strong> Node.js, Express.js<br>
            ðŸ—„ï¸ <strong>Database:</strong> MongoDB<br>
            ðŸ§  <strong>CS Fundamentals:</strong> DSA, OOP, DBMS`
        ],
        education: [
            `ðŸŽ“ <strong>B.Tech in Computer Science</strong> (2022â€“2026)<br>
            LNCT Group of Colleges, Bhopal<br><br>
            ðŸ“š <strong>Senior Secondary (12th)</strong> (2020â€“2022)<br>
            K.M.R.J Inter College â€” Science (PCM)<br><br>
            ðŸ“– <strong>Secondary School (10th)</strong> (2019â€“2020)<br>
            Acme Public School`
        ],
        experience: [
            `Prarthi's professional experience:<br><br>
            ðŸ’¼ <strong>Java Full Stack Developer</strong> â€” Wipro<br>
            Enterprise Java apps, RESTful APIs, Spring Boot<br><br>
            ðŸ›¡ï¸ <strong>Cybersecurity Intern</strong> â€” Eduskill<br>
            Network security, vulnerability assessment<br><br>
            ðŸ“˜ <strong>Springboard Training</strong> â€” Infosys<br>
            Software development & agile methodologies`
        ],
        achievements: [
            `ðŸ† Prarthi's achievements:<br><br>
            â­ <strong>4â˜… HackerRank</strong> â€” Problem Solving & Java<br>
            ðŸ¥‡ <strong>Top 1% â€” CoCubes</strong> National Assessment 2025<br>
            ðŸ“œ <strong>NPTEL Certified</strong> â€” Java Programming`
        ],
        contact: [
            `You can reach Prarthi at:<br><br>
            ðŸ“§ <strong>Email:</strong> <a href="mailto:Prarthikumari0101@gmail.com">Prarthikumari0101@gmail.com</a><br>
            ðŸ”— <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/prarthikumari348471256" target="_blank">LinkedIn Profile â†’</a><br>
            ðŸ’» <strong>GitHub:</strong> <a href="https://github.com/prarthi1909" target="_blank">github.com/prarthi1909 â†’</a><br><br>
            Or scroll down to the <a href="#contact">Contact section</a> to send a message directly!`
        ],
        resume: [
            `ðŸ“„ You can download Prarthi's resume by clicking the <strong>"Download Resume"</strong> button in the hero section, or <a href="assets/resume.pdf" download>click here to download</a>.`
        ],
        social: [
            `Follow Prarthi on social media:<br><br>
            ðŸ’» <a href="https://github.com/prarthi1909" target="_blank">GitHub â†’</a><br>
            ðŸ”— <a href="https://www.linkedin.com/in/prarthikumari348471256" target="_blank">LinkedIn â†’</a><br>
            ðŸ“· <a href="https://www.instagram.com/prarthi1909" target="_blank">Instagram â†’</a><br>
            ðŸ§© <a href="https://leetcode.com/u/prarthi1909" target="_blank">LeetCode â†’</a><br>
            ðŸ´ <a href="https://www.codechef.com/users/prarthi_1909" target="_blank">CodeChef â†’</a>`
        ],
        thanks: [
            "You're welcome! ðŸ˜Š Feel free to come back anytime. Have a great day! ðŸ‘‹",
            "Glad I could help! ðŸ™Œ Don't hesitate to ask more questions. Take care!",
            "Anytime! ðŸ˜„ It was great chatting with you. Enjoy exploring the portfolio!"
        ],
        help: [
            `I can help with a lot! Here's what I know:<br><br>
            ðŸ‘¤ <strong>About Prarthi</strong> â€” Background & bio<br>
            ðŸ’» <strong>Projects</strong> â€” GitHub repositories & details<br>
            ðŸ› ï¸ <strong>Skills</strong> â€” Tech stack & languages<br>
            ðŸŽ“ <strong>Education</strong> â€” Academic background<br>
            ðŸ’¼ <strong>Experience</strong> â€” Internships & training<br>
            ðŸ† <strong>Achievements</strong> â€” Awards & certifications<br>
            ðŸ“§ <strong>Contact</strong> â€” How to reach Prarthi<br>
            ðŸ“„ <strong>Resume</strong> â€” Download CV<br><br>
            I can also handle casual conversation! Try asking me anything ðŸ˜Š`
        ],
        compliment: [
            "Thank you so much! ðŸ˜Š Prarthi worked really hard on this portfolio. Would you like to see her <strong>projects</strong> or learn about her <strong>skills</strong>?",
            "That's so kind of you! ðŸ™ Glad you like the design. Feel free to explore the <a href='#projects'>Projects</a> or <a href='#contact'>get in touch</a>!",
            "Aww, thanks! ðŸŒŸ Prarthi appreciates the feedback. Want to know more about the person behind it?"
        ],
        java: [
            "Java is one of Prarthi's strongest skills! â˜• She has <strong>4â˜… on HackerRank</strong> in Java and worked as a <strong>Java Full Stack Developer at Wipro</strong>, building enterprise apps with Spring Boot and RESTful APIs. She's also <strong>NPTEL certified</strong> in Java Programming!"
        ],
        webdev: [
            "Prarthi is a passionate <strong>Full Stack Web Developer</strong>! ðŸŒ She builds with:<br><br>ðŸŽ¨ <strong>Frontend:</strong> HTML5, CSS3, JavaScript, Bootstrap<br>âš™ï¸ <strong>Backend:</strong> Node.js, Express.js<br>ðŸ—„ï¸ <strong>Database:</strong> MongoDB<br><br>Her projects like the <strong>Urban Waste Management System</strong> and this very portfolio showcase her full-stack abilities!"
        ],
        database: [
            "Prarthi works with <strong>MongoDB</strong> for her full-stack projects! ðŸ—„ï¸ She has hands-on experience designing schemas, writing queries, and integrating databases with Node.js and Express.js backends."
        ],
        dsa: [
            "Prarthi has strong <strong>DSA foundations</strong>! ðŸ§  She has a <strong>4â˜… rating on HackerRank</strong> in Problem Solving and was ranked in the <strong>Top 1% on CoCubes</strong>. <a href='https://leetcode.com/u/prarthi1909' target='_blank'>Check her LeetCode â†’</a>"
        ],
        location: [
            "Prarthi is based in <strong>India</strong> ðŸ‡®ðŸ‡³, currently studying at LNCT Group of Colleges in <strong>Bhopal, Madhya Pradesh</strong>."
        ],
        age: [
            "Prarthi is a <strong>B.Tech student (2022â€“2026 batch)</strong> at LNCT Group of Colleges, Bhopal. She's currently in her final years of study! ðŸŽ“"
        ],
        availability: [
            "Prarthi is actively looking for opportunities! ðŸš€ She's open to <strong>internships</strong>, <strong>full-time roles</strong>, and <strong>collaborative projects</strong> in Java Full Stack Development. <a href='#contact'>Reach out to her â†’</a>"
        ]
    };

    // ---- LAYER 2: General Conversation Patterns ----
    const generalPatterns = [
        {
            id: 'weather',
            patterns: [/weather|temperature|rain|sunny|cloudy|forecast|storm|hot outside|cold outside/i],
            responses: [
                "I don't have access to live weather data, but you can check <a href='https://weather.google.com' target='_blank'>Google Weather</a> for real-time updates! ðŸŒ¤ï¸ Is there anything about the portfolio I can help with?",
                "I wish I could check the weather for you! â˜ï¸ Try asking Google or your phone's weather app. Meanwhile, feel free to ask me about Prarthi's projects or skills!",
                "Weather tracking isn't my specialty ðŸ˜… but <a href='https://weather.google.com' target='_blank'>Google Weather</a> has you covered! Need help with anything else?"
            ]
        },
        {
            id: 'time',
            patterns: [/what time|current time|what'?s the time|tell me the time|date today|what day|what'?s today/i],
            responses: () => {
                const now = new Date();
                const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                return `It's currently <strong>${timeStr}</strong> on <strong>${dateStr}</strong> â°. Anything else you'd like to know?`;
            }
        },
        {
            id: 'joke',
            patterns: [/joke|funny|make me laugh|humor|tell me something funny/i],
            responses: [
                "Why do programmers prefer dark mode? Because light attracts bugs! ðŸ›ðŸ˜„",
                "A SQL query walks into a bar, sees two tables, and asks â€” 'Can I join you?' ðŸ˜‚",
                "There are only 10 types of people in the world: those who understand binary and those who don't! ðŸ¤“",
                "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! ðŸ˜„",
                "!false â€” it's funny because it's true! ðŸ˜‚",
                "A programmer's wife says: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes back with 12 loaves of bread. ðŸžðŸ˜‚"
            ]
        },
        {
            id: 'music',
            patterns: [/music|song|listen|favorite song|playlist|singer|band|spotify/i],
            responses: [
                "I can't play music, but I love the idea! ðŸŽ¶ Try <a href='https://open.spotify.com' target='_blank'>Spotify</a> or <a href='https://music.youtube.com' target='_blank'>YouTube Music</a> for some great tunes. What genre do you like?",
                "Music makes everything better! ðŸŽµ I'd recommend checking out Spotify or YouTube Music. If coding playlists are your thing, lo-fi beats are perfect! ðŸŽ§"
            ]
        },
        {
            id: 'movie',
            patterns: [/movie|film|watch|netflix|show|series|anime|drama/i],
            responses: [
                "I'm more of a code reader than a movie watcher ðŸŽ¬ðŸ˜„, but Netflix and IMDb are great for recommendations! Any favorite genre?",
                "Great topic! While I can't suggest specific movies, sites like <a href='https://www.imdb.com' target='_blank'>IMDb</a> have amazing recommendations. Enjoy your movie night! ðŸ¿"
            ]
        },
        {
            id: 'sports',
            patterns: [/sport|cricket|football|soccer|basketball|tennis|match|game score|ipl|world cup|fifa/i],
            responses: [
                "I'm not up-to-date on live sports scores, but you can check <a href='https://www.espn.com' target='_blank'>ESPN</a> or <a href='https://www.google.com/search?q=live+scores' target='_blank'>Google Sports</a> for the latest! âš½ðŸ",
                "Sports are exciting! ðŸ† I don't track live scores, but ESPN and Google Sports have real-time updates. Are you a cricket or football fan?"
            ]
        },
        {
            id: 'food',
            patterns: [/food|eat|hungry|recipe|cook|restaurant|pizza|burger|lunch|dinner|breakfast|biryani|snack/i],
            responses: [
                "Now you're making me hungry! ðŸ• I can't cook, but <a href='https://www.google.com/search?q=recipes' target='_blank'>Google Recipes</a> has amazing ideas. What's your favorite food?",
                "Food talk is always fun! ðŸ” I don't have recipe access, but try searching on YouTube for easy recipes. What are you craving?",
                "Mmm, great topic! I'd recommend checking out food channels on YouTube or apps like Zomato & Swiggy for nearby restaurants ðŸ•ðŸ˜‹"
            ]
        },
        {
            id: 'news',
            patterns: [/news|headline|what'?s happening|current events|latest news|trending|breaking/i],
            responses: [
                "I don't have access to live news, but you can check <a href='https://news.google.com' target='_blank'>Google News</a> for the latest headlines! ðŸ“° Ask me anything about the portfolio in the meantime.",
                "For the latest news, I'd recommend <a href='https://news.google.com' target='_blank'>Google News</a> or your favorite news app ðŸ“±. Is there something specific you're curious about?"
            ]
        },
        {
            id: 'ai_question',
            patterns: [/what is ai|artificial intelligence|machine learning|deep learning|chatgpt|openai|neural network|how does ai work/i],
            responses: [
                "Great question! ðŸ¤– AI (Artificial Intelligence) enables machines to learn from data and make decisions. It includes areas like machine learning, NLP, and computer vision. Fun fact â€” I'm powered by smart pattern matching right in your browser!",
                "AI is fascinating! ðŸ§  It's the field of creating systems that can learn, reason, and solve problems. From chatbots like me to self-driving cars, AI is everywhere! Want to know about Prarthi's tech skills?"
            ]
        },
        {
            id: 'meaning_of_life',
            patterns: [/meaning of life|purpose of life|why are we here|what is life|philosophy/i],
            responses: [
                "The meaning of life? That's a deep one! ðŸ¤” Some say it's 42 (thanks, Douglas Adams!). I think for developers like Prarthi, it's about building things that make a difference. What do you think? ðŸ’­",
                "A philosophical question! ðŸ’« While I ponder that, I can tell you Prarthi's purpose is clear â€” building impactful applications with clean code! Want to see her projects?"
            ]
        },
        {
            id: 'math',
            patterns: [/(\d+)\s*[\+\-\*\/xÃ—Ã·]\s*(\d+)|calculate|what is \d|math|how much is/i],
            responses: () => null // Handled specially below
        },
        {
            id: 'translate',
            patterns: [/translate|how do you say|in spanish|in french|in hindi|in japanese|in german/i],
            responses: [
                "I don't have translation capabilities yet, but <a href='https://translate.google.com' target='_blank'>Google Translate</a> is fantastic for that! ðŸŒ Need help with anything else?",
                "Translation isn't my forte, but try <a href='https://translate.google.com' target='_blank'>Google Translate</a> â€” it supports 100+ languages! ðŸ—£ï¸"
            ]
        },
        {
            id: 'coding_help',
            patterns: [/how to code|learn programming|learn coding|best language to learn|coding tips|how to start|tutorial|beginner/i],
            responses: [
                "Great question! ðŸ’» Here are some tips to start coding:<br><br>1ï¸âƒ£ Pick a language (Java or Python are great for beginners)<br>2ï¸âƒ£ Practice on <a href='https://www.hackerrank.com' target='_blank'>HackerRank</a> or <a href='https://leetcode.com' target='_blank'>LeetCode</a><br>3ï¸âƒ£ Build projects (like Prarthi did!)<br>4ï¸âƒ£ Be consistent â€” code a little every day! ðŸš€",
                "Learning to code is awesome! ðŸŽ‰ Start with HTML/CSS for web, or Java/Python for programming fundamentals. Prarthi started with Java and now does full-stack development â€” proof that consistency pays off!"
            ]
        },
        {
            id: 'relationship',
            patterns: [/love|girlfriend|boyfriend|married|relationship|single|crush|dating/i],
            responses: [
                "That's a personal question! ðŸ˜Š I'm just a portfolio assistant, so I'll keep things professional. How about we explore Prarthi's impressive <strong>projects</strong> or <strong>skills</strong> instead?",
                "I respect Prarthi's privacy on personal matters! ðŸ¤— But I can definitely tell you about her professional achievements â€” she's on ðŸ”¥ on HackerRank!"
            ]
        },
        {
            id: 'gaming',
            patterns: [/game|gaming|play|gta|minecraft|fortnite|pubg|valorant|video game/i],
            responses: [
                "Gaming is fun! ðŸŽ® I can't play games, but I can tell you that building games requires skills Prarthi has â€” like <strong>C++</strong>, <strong>Java</strong>, and strong <strong>OOP</strong> fundamentals!",
                "Nice topic! ðŸ•¹ï¸ While I can't game with you, did you know game development uses many of the same skills Prarthi has, like object-oriented programming and algorithms?"
            ]
        }
    ];

    // ---- LAYER 3: Casual Chat Patterns ----
    const casualPatterns = [
        {
            patterns: [/how are you|how'?s it going|how do you do|how you doing|how'?re you/i],
            responses: [
                "I'm doing great, thanks for asking! ðŸ˜Š I'm here and ready to help. What would you like to know?",
                "I'm wonderful! ðŸ¤– Running on full battery. How can I assist you today?",
                "All good! ðŸ˜„ Thanks for the kind check-in. What's on your mind?"
            ]
        },
        {
            patterns: [/who are you|what are you|what'?s your name|your name/i],
            responses: [
                "I'm <strong>PK Assistant</strong> ðŸ¤– â€” a smart chatbot built into Prarthi Kumari's portfolio website. I can answer questions about her work, or just have a friendly chat!",
                "I'm PK Assistant! ðŸ˜Š Prarthi built me to help visitors explore her portfolio. But I also enjoy casual conversation â€” ask me anything!"
            ]
        },
        {
            patterns: [/bored|boring|nothing to do|i'?m bored/i],
            responses: [
                "Bored? Let me help! ðŸ˜„ Here are some ideas:<br>ðŸ”¹ Check out Prarthi's <a href='#projects'>cool projects</a><br>ðŸ”¹ Test my knowledge â€” ask me a random question!<br>ðŸ”¹ Ask me for a coding joke ðŸ˜‚",
                "No room for boredom here! ðŸš€ How about I tell you a joke, or you explore some interesting projects Prarthi has built?"
            ]
        },
        {
            patterns: [/i'?m (sad|upset|angry|frustrated|depressed|stressed|anxious|tired|exhausted)/i],
            responses: [
                "I'm sorry to hear that ðŸ’™. Sometimes taking a break and doing something creative helps. Maybe exploring some code or cool projects could be a nice distraction? I'm here if you want to chat!",
                "Hey, I hope things get better soon ðŸ¤—. Remember, it's okay to take a step back. If you need a distraction, I've got coding jokes and portfolio facts ready!"
            ]
        },
        {
            patterns: [/i'?m (happy|excited|great|amazing|awesome|good|fantastic|wonderful)/i],
            responses: [
                "That's awesome to hear! ðŸŽ‰ Your positive energy is contagious! What would you like to explore today?",
                "Love that energy! ðŸ˜ŠðŸ”¥ Let's keep the good vibes going â€” want to check out some cool projects?"
            ]
        },
        {
            patterns: [/do you (like|love|enjoy|hate|dislike)/i],
            responses: [
                "As a bot, I don't have feelings, but I do enjoy helping people! ðŸ¤–ðŸ˜Š It's what I was built for. What can I help you with?",
                "I'm just code, but if I could feel, I'd say I love chatting with visitors! ðŸ˜„ What's your question?"
            ]
        },
        {
            patterns: [/can you (help|assist|do|make|create|write)/i],
            responses: [
                "I'll try my best! ðŸ’ª I'm great at answering questions about Prarthi's portfolio, and I can handle general conversation too. What do you need help with?",
                "That's what I'm here for! ðŸ˜Š Tell me more about what you need, and I'll do my best to help."
            ]
        },
        {
            patterns: [/you'?re (smart|clever|intelligent|cool|awesome|great|good|funny|amazing)/i],
            responses: [
                "Aww, thanks! ðŸ˜Š I try my best! Is there anything else you'd like to know or chat about?",
                "You're too kind! ðŸŒŸ Prarthi put a lot of thought into building me. Glad you're having a good experience!"
            ]
        },
        {
            patterns: [/^(ok|okay|k|sure|alright|right|got it|i see|cool|nice|yep|yea|yeah|yes|no|nope|nah)$/i],
            responses: [
                "ðŸ˜Š Let me know if you have any other questions! I'm here to help.",
                "Got it! Feel free to ask anything else â€” about the portfolio or just for fun! ðŸ˜„",
                "ðŸ‘ I'm ready whenever you are! What else would you like to know?"
            ]
        }
    ];

    // ---- Math handler ----
    function tryMath(input) {
        const mathMatch = input.match(/(\d+(?:\.\d+)?)\s*([\+\-\*\/xÃ—Ã·])\s*(\d+(?:\.\d+)?)/);
        if (mathMatch) {
            const a = parseFloat(mathMatch[1]);
            const op = mathMatch[2];
            const b = parseFloat(mathMatch[3]);
            let result;
            switch (op) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': case 'x': case 'Ã—': result = a * b; break;
                case '/': case 'Ã·': result = b !== 0 ? (a / b) : 'undefined (division by zero)'; break;
                default: return null;
            }
            return `ðŸ§® <strong>${a} ${op} ${b} = ${typeof result === 'number' ? parseFloat(result.toFixed(4)) : result}</strong>. Need anything else?`;
        }
        return null;
    }

    // ---- Master Response Function ----
    function getLocalResponse(input) {
        const q = input.toLowerCase().trim();

        // Step 1: Try math calculation
        const mathResult = tryMath(q);
        if (mathResult) return mathResult;

        // Step 2: Check portfolio topics (scored matching)
        let bestTopic = null;
        let bestScore = 0;

        for (const topic of portfolioTopics) {
            let score = 0;

            if (topic.patterns) {
                for (const pattern of topic.patterns) {
                    if (pattern.test(q)) {
                        score = topic.weight * 3;
                    }
                }
            }

            if (topic.keywords) {
                for (const kw of topic.keywords) {
                    if (q.includes(kw)) {
                        score += topic.weight;
                        if (q.startsWith(kw)) score += 2;
                    }
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestTopic = topic.id;
            }
        }

        if (bestTopic && bestScore >= 4) {
            const pool = portfolioResponses[bestTopic];
            if (pool && pool.length > 0) {
                return pool[Math.floor(Math.random() * pool.length)];
            }
        }

        // Step 3: Check general conversation patterns
        for (const gp of generalPatterns) {
            for (const pattern of gp.patterns) {
                if (pattern.test(q)) {
                    if (typeof gp.responses === 'function') {
                        const result = gp.responses();
                        if (result) return result;
                        // If function returns null (like math handler), continue
                    } else {
                        return gp.responses[Math.floor(Math.random() * gp.responses.length)];
                    }
                }
            }
        }

        // Step 4: Check casual chat patterns
        for (const cp of casualPatterns) {
            for (const pattern of cp.patterns) {
                if (pattern.test(q)) {
                    return cp.responses[Math.floor(Math.random() * cp.responses.length)];
                }
            }
        }

        // Step 5: No match â€” return null to trigger AI or fallback
        return null;
    }

    // ---- Context-aware fallbacks (not portfolio-forced) ----
    const smartFallbacks = [
        "That's an interesting question! ðŸ¤” I don't have a specific answer for that, but I'm happy to chat about other things â€” <strong>tech</strong>, <strong>coding</strong>, or Prarthi's <strong>portfolio</strong>. What interests you?",
        "Hmm, I'm not sure about that one! ðŸ˜Š I'm best at portfolio topics and general conversation. Try asking me something else, or type <strong>help</strong> to see what I can do!",
        "Good question! I may not have the exact answer, but I can help with a lot of other things ðŸ’¡ â€” coding tips, portfolio info, or even a joke! Just ask.",
        "I appreciate the curiosity! ðŸŒŸ That's outside my current knowledge, but feel free to ask about <strong>anything else</strong> â€” I can handle portfolio questions, general chat, math, and more!",
        "I'm still learning new things! ðŸ¤– I don't have an answer for that yet, but try rephrasing or asking about a different topic. I promise I'm more helpful than I look! ðŸ˜„",
        "That's a tough one! ðŸ˜… I'm not able to answer that specifically, but I'm great at tech talk, portfolio info, and casual conversation. What else is on your mind?",
        "Interesting! While I don't have that info, I can help with all sorts of things â€” from <strong>Prarthi's projects</strong> to <strong>coding jokes</strong> to <strong>quick math</strong>! What would you like?",
        "I wish I knew the answer to that! ðŸ¤· But hey, I'm always improving. In the meantime, ask me about tech, projects, or even tell me how your day is going! ðŸ˜Š"
    ];

    function getSmartFallback(input) {
        const fb = smartFallbacks[fallbackIndex % smartFallbacks.length];
        fallbackIndex++;
        return fb;
    }

    // ---- Optional: OpenAI API integration ----
    async function fetchAIResponse(input) {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: input,
                history: conversationHistory.slice(-6)
            })
        });

        if (!res.ok) throw new Error('AI not available');

        const data = await res.json();
        if (data.success && data.reply) {
            return data.reply;
        }
        throw new Error('No AI reply');
    }

});


/* ============================================
   CODE TYPING SPEED CHALLENGE — Game Module
   ============================================ */
(function() {
    'use strict';

    // Snippet pools by difficulty
    const snippets = {
        easy: [
            "Hello World! Welcome to the coding challenge.",
            "The quick brown fox jumps over the lazy dog.",
            "Programming is the art of telling a computer what to do.",
            "Java is a popular programming language for building applications.",
            "Practice makes perfect when learning to code every day.",
            "Full stack developers build both frontend and backend systems.",
            "MongoDB is a NoSQL database for modern applications.",
            "Clean code reads like well written prose and tells a story.",
            "Node.js allows JavaScript to run on the server side.",
            "A good developer writes code that humans can understand."
        ],
        medium: [
            'function greet(name) { return "Hello, " + name; }',
            'const sum = (a, b) => a + b; console.log(sum(5, 3));',
            'for (let i = 0; i < 10; i++) { console.log(i); }',
            'const colors = ["red", "blue", "green"]; colors.push("purple");',
            'app.get("/api/users", (req, res) => { res.json(users); });',
            'document.getElementById("btn").addEventListener("click", handler);',
            'if (score > 100) { rank = "expert"; } else { rank = "beginner"; }',
            'const data = await fetch("/api/data").then(res => res.json());',
            'class Student { constructor(name) { this.name = name; } }',
            'const filtered = items.filter(item => item.active === true);'
        ],
        hard: [
            'const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };',
            'app.post("/api/auth", async (req, res) => { const { email, password } = req.body; const token = jwt.sign({ email }, SECRET); });',
            'const merge = (a, b) => [...new Set([...a, ...b])].sort((x, y) => x - y);',
            'document.querySelectorAll(".card").forEach(el => { el.style.transform = `rotateY(${angle}deg)`; });',
            'const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);',
            'interface User { id: number; name: string; email: string; roles: string[]; }',
            'db.collection("users").find({ age: { $gte: 18 } }).sort({ name: 1 }).toArray();',
            'const Observable = (fn) => ({ subscribe: (obs) => fn(obs), pipe: (...ops) => ops.reduce((s, o) => o(s), fn) });'
        ]
    };

    // DOM elements
    const display = document.getElementById('game-code-display');
    const input = document.getElementById('game-input');
    const startBtn = document.getElementById('game-start');
    const restartBtn = document.getElementById('game-restart');
    const diffSelect = document.getElementById('game-difficulty');
    const timerEl = document.getElementById('game-timer');
    const wpmEl = document.getElementById('game-wpm');
    const accuracyEl = document.getElementById('game-accuracy');
    const highscoreEl = document.getElementById('game-highscore');
    const resultsDiv = document.getElementById('game-results');

    if (!display || !input || !startBtn) return; // Guard clause

    // Game state
    let currentText = '';
    let timeLeft = 30;
    let timerInterval = null;
    let isPlaying = false;
    let correctChars = 0;
    let wrongChars = 0;
    let totalTyped = 0;
    let startTime = 0;
    let highScore = parseInt(localStorage.getItem('pk-typing-highscore') || '0');

    // Initialize high score display
    highscoreEl.textContent = highScore;

    // Pick random snippet
    function getSnippet() {
        const diff = diffSelect.value;
        const pool = snippets[diff];
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // Render text with character spans
    function renderText(text) {
        display.innerHTML = text.split('').map((char, i) =>
            `<span class="char${i === 0 ? ' current' : ''}" data-index="${i}">${char === ' ' ? '&nbsp;' : escapeChar(char)}</span>`
        ).join('');
        display.classList.add('active');
    }

    function escapeChar(c) {
        const map = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' };
        return map[c] || c;
    }

    // Start game
    function startGame() {
        currentText = getSnippet();
        timeLeft = 30;
        correctChars = 0;
        wrongChars = 0;
        totalTyped = 0;
        isPlaying = true;
        startTime = Date.now();

        renderText(currentText);
        input.disabled = false;
        input.value = '';
        input.focus();

        startBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        resultsDiv.style.display = 'none';
        diffSelect.disabled = true;

        // Timer color reset
        timerEl.parentElement.classList.remove('warning', 'danger');

        updateStats();
        timerInterval = setInterval(tick, 1000);
    }

    // Timer tick
    function tick() {
        timeLeft--;
        timerEl.textContent = timeLeft;

        // Color warnings
        const timerStat = timerEl.parentElement;
        if (timeLeft <= 5) {
            timerStat.classList.remove('warning');
            timerStat.classList.add('danger');
        } else if (timeLeft <= 10) {
            timerStat.classList.add('warning');
        }

        if (timeLeft <= 0) {
            endGame();
        }
    }

    // Update live stats
    function updateStats() {
        const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
        const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
        const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

        wpmEl.textContent = wpm;
        accuracyEl.textContent = accuracy;
    }

    // Handle input
    input.addEventListener('input', (e) => {
        if (!isPlaying) return;

        const typed = input.value;
        const chars = display.querySelectorAll('.char');
        totalTyped = typed.length;
        correctChars = 0;
        wrongChars = 0;

        chars.forEach((span, i) => {
            span.classList.remove('correct', 'wrong', 'current');
            if (i < typed.length) {
                if (typed[i] === currentText[i]) {
                    span.classList.add('correct');
                    correctChars++;
                } else {
                    span.classList.add('wrong');
                    wrongChars++;
                }
            } else if (i === typed.length) {
                span.classList.add('current');
            }
        });

        updateStats();

        // If typed entire text correctly, load next snippet
        if (typed === currentText) {
            currentText = getSnippet();
            renderText(currentText);
            input.value = '';
            totalTyped = 0;
        }
    });

    // End game
    function endGame() {
        clearInterval(timerInterval);
        isPlaying = false;
        input.disabled = true;
        display.classList.remove('active');
        diffSelect.disabled = false;

        const elapsed = (Date.now() - startTime) / 1000 / 60;
        const finalWpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
        const finalAccuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
        const finalChars = correctChars + wrongChars;

        // Rank
        let rank = '🌱 Beginner';
        if (finalWpm >= 80) rank = '🏆 Legendary';
        else if (finalWpm >= 60) rank = '🔥 Expert';
        else if (finalWpm >= 40) rank = '⭐ Pro';
        else if (finalWpm >= 20) rank = '📈 Rising';

        // Update high score
        if (finalWpm > highScore) {
            highScore = finalWpm;
            localStorage.setItem('pk-typing-highscore', highScore.toString());
            highscoreEl.textContent = highScore;
        }

        // Show results
        document.getElementById('result-wpm').textContent = finalWpm;
        document.getElementById('result-accuracy').textContent = finalAccuracy;
        document.getElementById('result-chars').textContent = finalChars;
        document.getElementById('result-rank').textContent = rank;
        resultsDiv.style.display = 'block';

        // Update display
        wpmEl.textContent = finalWpm;
        accuracyEl.textContent = finalAccuracy;
        timerEl.textContent = '0';

        // Show restart button
        restartBtn.style.display = 'flex';
    }

    // Event listeners
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    // Click on display to start
    display.addEventListener('click', () => {
        if (!isPlaying) startGame();
    });

    // Prevent tab from leaving input during game
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') e.preventDefault();
    });

})();


/* ============================================
   RESUME PREVIEW MODAL — Controller
   ============================================ */
(function() {
    'use strict';

    const modal = document.getElementById('resume-modal');
    const iframe = document.getElementById('resume-iframe');
    const wrapper = document.getElementById('resume-viewer-wrapper');
    const closeBtn = document.getElementById('resume-close');
    const zoomInBtn = document.getElementById('resume-zoom-in');
    const zoomOutBtn = document.getElementById('resume-zoom-out');
    const zoomResetBtn = document.getElementById('resume-zoom-reset');
    const zoomLevelEl = document.getElementById('resume-zoom-level');

    if (!modal || !iframe) return;

    let currentZoom = 100;
    const ZOOM_STEP = 15;
    const ZOOM_MIN = 50;
    const ZOOM_MAX = 200;
    const RESUME_URL = 'assets/resume.pdf';

    // Lazy-load PDF only when modal opens
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load PDF only on first open
        if (!iframe.src || iframe.src === '' || iframe.src === window.location.href) {
            iframe.src = RESUME_URL;
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Zoom controls
    function setZoom(level) {
        currentZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, level));
        wrapper.style.transform = `scale(${currentZoom / 100})`;

        // Adjust wrapper size so scrolling works correctly at zoom > 100%
        if (currentZoom > 100) {
            wrapper.style.width = `${100 * (100 / currentZoom)}%`;
            wrapper.style.height = `${100 * (100 / currentZoom)}%`;
        } else {
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';
        }

        zoomLevelEl.textContent = currentZoom + '%';
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);

    zoomInBtn.addEventListener('click', () => setZoom(currentZoom + ZOOM_STEP));
    zoomOutBtn.addEventListener('click', () => setZoom(currentZoom - ZOOM_STEP));
    zoomResetBtn.addEventListener('click', () => setZoom(100));

    // The preview button in hero uses onclick to add .active class - override to also lazy-load
    const previewBtn = document.getElementById('btn-resume-preview');
    if (previewBtn) {
        previewBtn.onclick = (e) => {
            e.preventDefault();
            openModal();
        };
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Close backdrop click (already handled via inline onclick, but add JS backup)
    const backdrop = modal.querySelector('.resume-modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }

})();

// ============================================
// CURSOR PARTICLE TRAIL EFFECT
// ============================================
(function initCursorTrail() {
    // Disable on mobile devices based on screen width or touch capability
    if (window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    const particles = [];
    const colors = [
        '#00ffcc', // Cyan
        '#39ff14', // Neon Green
        '#ffff33', // Neon Yellow
        '#ff4d6d', // Neon Pink/Red
        '#ff914d', // Neon Orange
        '#ff00ff', // Magenta/Pink
        '#00e5ff'  // Bright Blue
    ];

    let mouse = { x: -100, y: -100 };
    let lastMouse = { x: -100, y: -100 };

    window.addEventListener('mousemove', (e) => {
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        if (lastMouse.x === -100) return; // skip first move

        // Calculate distance for smooth trail interpolation
        const dx = mouse.x - lastMouse.x;
        const dy = mouse.y - lastMouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Spawn based on speed (more distance = more particles to fill the gap)
        const spawnCount = Math.min(Math.floor(distance / 4), 12) + 1;

        if (particles.length < 80) {
            for(let i=0; i<spawnCount; i++) {
                if (particles.length >= 80) break; // Strict performance limit
                
                // Interpolate positions to draw a smooth line
                const progress = i / spawnCount;
                const px = lastMouse.x + dx * progress;
                const py = lastMouse.y + dy * progress;

                particles.push(new Particle(px, py));
            }
        }
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Tighter drift for a sharp trail
            this.vx = (Math.random() - 0.5) * 1.0;
            this.vy = (Math.random() - 0.5) * 1.0; 
            // Vibrant bokeh size (6px - 10px)
            this.size = Math.random() * 4 + 6; 
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 1; // 1 to 0
            // Faster fade for smooth tail cleanup
            this.decay = Math.random() * 0.04 + 0.02; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.size *= 0.95; // Shrink while fading
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 20; // Strong neon glow
            ctx.shadowColor = this.color;
            ctx.globalAlpha = Math.max(0, this.life);
            ctx.fill();
            ctx.shadowBlur = 0; 
            ctx.globalAlpha = 1;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0 || particles[i].size <= 0.1) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();

// ============================================
// SPOTLIGHT CURSOR EFFECT
// ============================================
(function initSpotlight() {
    // Disable on mobile devices based on screen width or touch capability
    if (window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const overlay = document.createElement('div');
    document.body.appendChild(overlay);

    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9998'; // Below particles (9999) but over UI
    overlay.style.transition = 'opacity 0.6s ease';
    overlay.style.opacity = '0'; // Start invisible to avoid sudden flash

    // Thematically matches the dark UI
    const baseDark = 'rgba(5, 5, 16, 0.85)';
    const midDark = 'rgba(5, 5, 16, 0.4)';
    
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    
    let targetSize = 250;
    let currentSize = 250;
    let hasMoved = false;

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        if (!hasMoved) {
            hasMoved = true;
            overlay.style.opacity = '1';
            currentX = targetX;
            currentY = targetY;
        }
    });

    // Expand spotlight size dynamically when hovering interactive elements
    window.addEventListener('mouseover', (e) => {
        // Find if target is interactive (link, button, input, or glass-card)
        const isInteractive = e.target.closest('a, button, input, textarea, .glass-card, .skill-item');
        targetSize = isInteractive ? 380 : 250;
    });

    // Smooth animation loop using LERP
    function animateSpotlight() {
        if (hasMoved) {
            // LERP for smooth lagging motion (delay/smoothening)
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;
            currentSize += (targetSize - currentSize) * 0.1;

            // Proper full-screen radial gradient scaling outward from the cursor
            overlay.style.background = `radial-gradient(
                circle at ${currentX}px ${currentY}px, 
                transparent 0px, 
                transparent ${currentSize * 0.3}px,
                rgba(5, 5, 16, 0.45) ${currentSize * 0.7}px, 
                rgba(5, 5, 16, 0.8) ${currentSize}px, 
                rgba(0, 0, 0, 0.85) 100%
            )`;
        }
        
        requestAnimationFrame(animateSpotlight);
    }

    animateSpotlight();
})();

// ============================================
// MAGNETIC BUTTON HOVER EFFECT
// ============================================
(function initMagneticButtons() {
    // Disable on mobile devices
    if (window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const magneticButtons = document.querySelectorAll('#btn-projects, #btn-contact, #btn-resume-preview');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center to cursor
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            
            // Pull factor (dampening) so it moves slightly towards mouse (15% pull)
            const pullX = dx * 0.15; 
            const pullY = dy * 0.15;

            // Instantly track using incredibly fast transition to avoid jitter/lag
            btn.style.transition = 'transform 0.05s linear, box-shadow 0.3s ease'; 
            
            // Apply translation, slight scale, and a matching neon shadow glow
            btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.08)`;
            btn.style.boxShadow = `0 10px 25px rgba(139, 92, 246, 0.4), 0 0 15px rgba(139, 92, 246, 0.2)`;
            btn.style.zIndex = '10'; // Ensure it pops over sibling elements
        });

        // Snap back on mouse leave
        btn.addEventListener('mouseleave', () => {
            // Springy cubic-bezier for a delightfully smooth snap-back animation
            btn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            btn.style.transform = `translate(0px, 0px) scale(1)`;
            btn.style.boxShadow = '';
            btn.style.zIndex = '';
            
            // Clean up the inline styles after snap-back completes
            setTimeout(() => {
                btn.style.transition = ''; 
            }, 400);
        });
    });
})();

// ============================================
// AUDIO FEEDBACK SYSTEM (UI Interactions)
// ============================================
(function initAudioFeedback() {
    let soundEnabled = false;
    
    const audioTypes = ['click', 'swipe', 'pop'];
    const audioAssets = {};
    
    // Attempt pointing to expected external assets
    audioTypes.forEach(type => {
        audioAssets[type] = new Audio(`./assets/${type}.mp3`);
        audioAssets[type].preload = 'auto';
        audioAssets[type].volume = 0.3; // Soft and subtle
    });
    
    // Robust synthesized fallback (zero latency & no network requests required)
    // Used seamlessly if assets do not physically exist.
    function playSynthesizedSound(type) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            const t = ctx.currentTime;
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            if (type === 'click') {
                // High-pitch sharp drop
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, t);
                osc.frequency.exponentialRampToValueAtTime(100, t + 0.05); 
                gainNode.gain.setValueAtTime(0.15, t);
                gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
                osc.start(t);
                osc.stop(t + 0.05);
            } else if (type === 'pop') {
                // Deep bubble drop
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, t);
                osc.frequency.exponentialRampToValueAtTime(40, t + 0.08); 
                gainNode.gain.setValueAtTime(0.2, t);
                gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
                osc.start(t);
                osc.stop(t + 0.08);
            } else if (type === 'swipe') {
                // Soft ascending wind sweep
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, t);
                osc.frequency.exponentialRampToValueAtTime(400, t + 0.12); 
                gainNode.gain.setValueAtTime(0.01, t);
                gainNode.gain.linearRampToValueAtTime(0.1, t + 0.06);
                gainNode.gain.linearRampToValueAtTime(0.01, t + 0.12);
                osc.start(t);
                osc.stop(t + 0.12);
            }
        } catch (e) {}
    }

    function playSound(type) {
        if (!soundEnabled) return;
        
        const audio = audioAssets[type];
        if (audio) {
            // Reset playback position so rapid clicks don't skip
            audio.currentTime = 0;
            audio.play().catch(() => {
                // If the audio play fails (404 missing file, autoplay blocked, etc),
                // silently trigger the perfectly synthesized Web Audio tick.
                playSynthesizedSound(type);
            });
        }
    }

    // Connect to the UI toggle button we placed in index.html
    const soundToggleBtn = document.getElementById('sound-toggle');
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', (e) => {
            soundEnabled = !soundEnabled;
            const icon = soundToggleBtn.querySelector('i');
            
            if (soundEnabled) {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
                icon.style.color = 'var(--accent-1)';
                soundToggleBtn.setAttribute('title', 'Disable Sound');
                
                // Fire audio context once immediately on user-gesture to unlock mobile browsers
                playSound('click'); 
            } else {
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
                icon.style.color = 'var(--text-secondary)';
                soundToggleBtn.setAttribute('title', 'Enable Sound');
            }
        });
    }

    // Attach delegated click listener to track interactive parts of the DOM
    document.addEventListener('click', (e) => {
        if (!soundEnabled) return;
        
        // Target ALL interactive elements: links, buttons, chatbot buttons, and cards
        const interactiveSelectors = 'a, button, [role="button"], input[type="submit"], input[type="button"], .glass-card, .project-card, .skill-item, #chatbot-toggle, .chatbot-icon, .chatbot-close';
        const interactive = e.target.closest(interactiveSelectors);
        
        // Do not double-play when the volume toggle itself is clicked
        if (interactive && interactive.id !== 'sound-toggle') {
            let soundType = 'click'; // Default UI click
            
            // Map specific sounds based on element class context
            if (interactive.matches('.nav-link, #nav-menu a')) {
                soundType = 'swipe';
            } else if (interactive.matches('.glass-card, .project-card, .skill-item')) {
                soundType = 'pop';
            }
            
            console.log(`Click detected on interactive element, playing [${soundType}] sound...`);
            playSound(soundType);
        }
    });
})();

