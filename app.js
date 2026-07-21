/* ==========================================================================
   INTERACTIVE JAVASCRIPT ENGINE - KRYSTELL F. SAN GABRIEL PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. DYNAMIC TYPING EFFECT (HERO SECTION)
       ---------------------------------------------------------------------- */
    const typingElement = document.getElementById('typing-element');
    if (typingElement) {
        const roles = [
            "Computer Engineer",
            "IT Instructor",
            "Systems Developer",
            "TESDA 2D Animator",
            "MIS Specialist"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    /* ----------------------------------------------------------------------
       2. BACKGROUND PARTICLE CANVAS
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 45; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(79, 172, 254, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    /* ----------------------------------------------------------------------
       3. NAVIGATION & THEME TOGGLE
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        });
    }

    /* ----------------------------------------------------------------------
       4. ANIMATED STAT COUNTERS
       ---------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    function runCounters() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        const rect = heroSection.getBoundingClientRect();

        if (rect.top <= window.innerHeight && !animatedStats) {
            animatedStats = true;
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 40);

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = count;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }

    window.addEventListener('scroll', runCounters);
    runCounters(); // Run once on load

    /* ----------------------------------------------------------------------
       5. EXPERIENCE & EDUCATION TAB SWITCHER
       ---------------------------------------------------------------------- */
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelineContents = document.querySelectorAll('.timeline-content');

    timelineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            timelineTabs.forEach(t => t.classList.remove('active'));
            timelineContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const content = document.getElementById(target);
            if (content) content.classList.add('active');
        });
    });

    /* ----------------------------------------------------------------------
       6. PROJECTS CATEGORY FILTERING
       ---------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------------------------------------
       7. INTERACTIVE PROJECT MODAL DIALOGS
       ---------------------------------------------------------------------- */
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtns = document.querySelectorAll('.modal-close-btn');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const targetModal = document.getElementById(`modal-${projectId}`);
            if (targetModal) {
                targetModal.classList.add('active');
                
                // Initialize specific simulators when opened
                if (projectId === 'qr-system') initQrSimulator();
                if (projectId === 'eval-system') initEvalChart();
            }
        });
    });

    // Resume Preview Button
    const btnResumePreview = document.getElementById('btn-resume-preview');
    if (btnResumePreview) {
        btnResumePreview.addEventListener('click', () => {
            const modalResume = document.getElementById('modal-resume');
            if (modalResume) modalResume.classList.add('active');
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlays.forEach(m => m.classList.remove('active'));
        });
    });

    modalOverlays.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
       8. LIVE SIMULATOR 1: QR CODE ENROLLMENT GENERATOR & SCANNER
       ---------------------------------------------------------------------- */
    let qrcodeObj = null;

    function initQrSimulator() {
        const qrContainer = document.getElementById('sim-qrcode-display');
        if (!qrContainer) return;
        
        qrContainer.innerHTML = '';
        const defaultData = document.getElementById('sim-qr-id').value + '|' + document.getElementById('sim-qr-name').value;
        
        qrcodeObj = new QRCode(qrContainer, {
            text: defaultData,
            width: 140,
            height: 140,
            colorDark : "#0f172a",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    const btnGenerateQr = document.getElementById('sim-qr-generate');
    if (btnGenerateQr) {
        btnGenerateQr.addEventListener('click', () => {
            const id = document.getElementById('sim-qr-id').value || 'SLSU-2025-XXXX';
            const name = document.getElementById('sim-qr-name').value || 'New Student';
            const course = document.getElementById('sim-qr-course').value || 'B.S. IT';
            
            const qrContainer = document.getElementById('sim-qrcode-display');
            qrContainer.innerHTML = '';
            
            qrcodeObj = new QRCode(qrContainer, {
                text: `${id}|${name}|${course}`,
                width: 140,
                height: 140,
                colorDark : "#0f172a",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });

            document.getElementById('sim-qr-status-text').innerText = `QR Pass Generated for ${name}`;
        });
    }

    const btnScanQr = document.getElementById('sim-qr-scan');
    if (btnScanQr) {
        btnScanQr.addEventListener('click', () => {
            const id = document.getElementById('sim-qr-id').value || 'SLSU-2025-0842';
            const name = document.getElementById('sim-qr-name').value || 'Juan Dela Cruz';
            const course = document.getElementById('sim-qr-course').value || 'B.S. Information Technology';
            
            const tableBody = document.getElementById('sim-qr-log-table');
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${timeStr}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${course}</td>
                <td><span class="badge-success">Enrolled & Verified</span></td>
            `;

            tableBody.prepend(newRow);
            document.getElementById('sim-qr-status-text').innerText = `✅ Scan Success: Logged into database at ${timeStr}!`;
        });
    }

    /* ----------------------------------------------------------------------
       9. LIVE SIMULATOR 2: INSTRUCTOR EVALUATION ANALYTICS CHART
       ---------------------------------------------------------------------- */
    let evalChart = null;

    function initEvalChart() {
        const ctx = document.getElementById('eval-chart-canvas');
        if (!ctx) return;

        const val1 = parseFloat(document.getElementById('slider-criteria-1').value);
        const val2 = parseFloat(document.getElementById('slider-criteria-2').value);
        const val3 = parseFloat(document.getElementById('slider-criteria-3').value);
        const val4 = parseFloat(document.getElementById('slider-criteria-4').value);

        if (evalChart) {
            evalChart.destroy();
        }

        evalChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Subject Mastery', 'Classroom Mgmt', 'Lab Materials', 'Mentorship'],
                datasets: [{
                    label: 'Evaluation Score (Out of 5.0)',
                    data: [val1, val2, val3, val4],
                    backgroundColor: [
                        'rgba(0, 242, 254, 0.7)',
                        'rgba(79, 172, 254, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)'
                    ],
                    borderColor: [
                        '#00f2fe',
                        '#4facfe',
                        '#8b5cf6',
                        '#10b981'
                    ],
                    borderWidth: 1.5,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Sliders event listener
    const sliders = [1, 2, 3, 4];
    sliders.forEach(num => {
        const slider = document.getElementById(`slider-criteria-${num}`);
        const label = document.getElementById(`val-criteria-${num}`);
        if (slider && label) {
            slider.addEventListener('input', () => {
                label.innerText = slider.value;
                updateOverallRating();
            });
        }
    });

    function updateOverallRating() {
        const val1 = parseFloat(document.getElementById('slider-criteria-1').value);
        const val2 = parseFloat(document.getElementById('slider-criteria-2').value);
        const val3 = parseFloat(document.getElementById('slider-criteria-3').value);
        const val4 = parseFloat(document.getElementById('slider-criteria-4').value);
        const avg = ((val1 + val2 + val3 + val4) / 4).toFixed(2);

        const scoreEl = document.getElementById('eval-overall-score');
        if (scoreEl) {
            let ratingText = "Outstanding";
            if (avg < 4.5 && avg >= 3.5) ratingText = "Very Satisfactory";
            if (avg < 3.5) ratingText = "Satisfactory";
            scoreEl.innerText = `${avg} / 5.00 (${ratingText})`;
        }
    }

    const btnRecalc = document.getElementById('btn-recalc-eval');
    if (btnRecalc) {
        btnRecalc.addEventListener('click', () => {
            initEvalChart();
        });
    }

    /* ----------------------------------------------------------------------
       10. LIVE SIMULATOR 3: 2D ANIMATION PLAYER
       ---------------------------------------------------------------------- */
    let animPlayInterval = null;
    let currentAnimFrame = 1;

    const btnAnimPlay = document.getElementById('btn-anim-play');
    const btnAnimPrev = document.getElementById('btn-anim-prev');
    const btnAnimNext = document.getElementById('btn-anim-next');
    const animStatus = document.getElementById('anim-status-text');

    const animFrames = [
        "assets/animation-showcase.jpg",
        "assets/qr-system.jpg",
        "assets/instructor-eval.jpg",
        "assets/bpo-crm.jpg"
    ];
    const animDescriptions = [
        "Frame 1: 2D Character Keyframe & Concept Sheet",
        "Frame 2: Storyboard Sequence & In-Between Pass",
        "Frame 3: Digital Lineart & Clean-up Layer",
        "Frame 4: Post-Production & Color Compositing"
    ];

    function updateAnimFrame(index) {
        currentAnimFrame = index;
        const img = document.getElementById('anim-frame-img');
        if (img) img.src = animFrames[currentAnimFrame];
        if (animStatus) animStatus.innerText = animDescriptions[currentAnimFrame];
    }

    if (btnAnimNext) {
        btnAnimNext.addEventListener('click', () => {
            let nextIndex = (currentAnimFrame + 1) % animFrames.length;
            updateAnimFrame(nextIndex);
        });
    }

    if (btnAnimPrev) {
        btnAnimPrev.addEventListener('click', () => {
            let prevIndex = (currentAnimFrame - 1 + animFrames.length) % animFrames.length;
            updateAnimFrame(prevIndex);
        });
    }

    if (btnAnimPlay) {
        btnAnimPlay.addEventListener('click', () => {
            if (animPlayInterval) {
                clearInterval(animPlayInterval);
                animPlayInterval = null;
                btnAnimPlay.innerHTML = '<i class="fa-solid fa-play"></i> Toggle Auto-Play';
            } else {
                animPlayInterval = setInterval(() => {
                    let nextIndex = (currentAnimFrame + 1) % animFrames.length;
                    updateAnimFrame(nextIndex);
                }, 1500);
                btnAnimPlay.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Auto-Play';
            }
        });
    }

    /* ----------------------------------------------------------------------
       11. LIVE SIMULATOR 4: BPO CRM LEAD ADDITION
       ---------------------------------------------------------------------- */
    const btnAddCrmLead = document.getElementById('btn-add-crm-lead');
    if (btnAddCrmLead) {
        btnAddCrmLead.addEventListener('click', () => {
            const leadName = document.getElementById('crm-new-lead-name').value.trim();
            const leadStatus = document.getElementById('crm-new-lead-status').value;

            if (!leadName) {
                alert('Please enter a valid lead name');
                return;
            }

            const leadsTable = document.getElementById('crm-leads-table');
            const tr = document.createElement('tr');
            
            const randomVal = (Math.floor(Math.random() * 50) + 20) * 100;
            const badgeClass = leadStatus === 'Closed Won' ? 'badge-success' : 'badge-warning';

            tr.innerHTML = `
                <td>${leadName}</td>
                <td>$${randomVal.toLocaleString()}</td>
                <td><span class="${badgeClass}">${leadStatus}</span></td>
                <td><button class="btn btn-xs btn-outline">Call Log</button></td>
            `;

            leadsTable.prepend(tr);
            document.getElementById('crm-new-lead-name').value = '';

            // Update stats
            const totalEl = document.getElementById('crm-total-leads');
            const total = parseInt(totalEl.innerText) + 1;
            totalEl.innerText = total;

            if (leadStatus === 'Closed Won') {
                const closedEl = document.getElementById('crm-closed-deals');
                const closed = parseInt(closedEl.innerText) + 1;
                closedEl.innerText = closed;

                const convRate = ((closed / total) * 100).toFixed(1);
                document.getElementById('crm-conv-rate').innerText = `${convRate}%`;
            }
        });
    }

    /* ----------------------------------------------------------------------
       12. COPY ACTIONS & CONTACT FORM
       ---------------------------------------------------------------------- */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('talasangabriel@gmail.com').then(() => {
                const hint = copyEmailBtn.querySelector('.copy-hint');
                const originalText = hint.innerHTML;
                hint.innerHTML = '<i class="fa-solid fa-check"></i> Email Copied!';
                setTimeout(() => hint.innerHTML = originalText, 2500);
            });
        });
    }

    const copyPhoneBtn = document.getElementById('copy-phone-btn');
    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('0931-946-6985').then(() => {
                const hint = copyPhoneBtn.querySelector('.copy-hint');
                const originalText = hint.innerHTML;
                hint.innerHTML = '<i class="fa-solid fa-check"></i> Phone Copied!';
                setTimeout(() => hint.innerHTML = originalText, 2500);
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...';
            }

            if (formStatus) {
                formStatus.className = 'form-status-msg';
                formStatus.innerHTML = '';
                formStatus.style.display = 'none';
            }

            // Send to FormSubmit.co using AJAX
            fetch("https://formsubmit.co/ajax/talasangabriel@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: `New Portfolio Inquiry: ${subject}`,
                    message: message,
                    _captcha: "false" // Disables the captcha redirection page for seamless AJAX
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to send message.');
                }
            })
            .then(data => {
                if (formStatus) {
                    formStatus.className = 'form-status-msg success';
                    formStatus.innerHTML = `Thank you, <strong>${name}</strong>! Your inquiry has been sent to Krystell's email. You will receive a response at <strong>${email}</strong>.`;
                    formStatus.style.display = 'block';
                }
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (formStatus) {
                    formStatus.className = 'form-status-msg error';
                    formStatus.innerHTML = `Oops! Something went wrong. Please email directly to <a href="mailto:talasangabriel@gmail.com">talasangabriel@gmail.com</a>.`;
                    formStatus.style.display = 'block';
                }
            })
            .finally(() => {
                // Restore submit button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message to Krystell';
                }
            });
        });
    }

});
