/**
 * Sushant Gwachha - Portfolio Scripts
 * Interactive Canvas, Dynamic Typing, Project Filters, Modals, Theme Switching & ATS Print
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNeuralCanvas();
  initTypewriter();
  initProjectFilters();
  initModals();
  initContactForm();
  initScrollNav();
  initBackToTop();
  initMobileMenu();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('sg_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sg_theme', newTheme);

      // Re-trigger canvas redraw with new colors
      if (window.updateCanvasTheme) {
        window.updateCanvasTheme(newTheme);
      }
    });
  }
}

/* ==========================================================================
   2. Neural Network / Data Nodes Particle Canvas
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: null, y: null, radius: 140 };
  let particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);

  function getColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
      particle: isDark ? 'rgba(6, 182, 212, 0.75)' : 'rgba(2, 132, 199, 0.75)',
      line: isDark ? 'rgba(6, 182, 212, ' : 'rgba(2, 132, 199, ',
      particleAlt: isDark ? 'rgba(16, 185, 129, 0.75)' : 'rgba(5, 150, 105, 0.75)'
    };
  }

  let themeColors = getColors();

  window.updateCanvasTheme = function () {
    themeColors = getColors();
  };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.75;
      this.speedY = (Math.random() - 0.5) * 0.75;
      this.isAlt = Math.random() > 0.75;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > height || this.y < 0) this.speedY = -this.speedY;

      // Mouse Proximity Repulsion / Attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isAlt ? themeColors.particleAlt : themeColors.particle;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDist) {
          const opacity = (1 - distance / maxDist) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = themeColors.line + opacity + ')';
          ctx.lineWidth = 0.85;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
}

/* ==========================================================================
   3. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const phrases = [
    'Predictive Machine Learning Models.',
    'End-to-End Data Science Pipelines.',
    'NLP & Resume Matching Algorithms.',
    'Interactive Tableau Dashboards.',
    'Intelligent Solutions with Python.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1600; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 450;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   4. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Modals (Project Details & ATS Resume)
   ========================================================================== */
const projectDetails = {
  recruitment: {
    title: 'AI Talent Recruitment System',
    badge: 'Machine Learning & NLP (Ongoing)',
    status: 'Actively in Development',
    tech: 'Python, Machine Learning, NLP, Scikit-learn, TF-IDF, Pandas',
    description: `
      <p style="margin-bottom: 1rem;">
        Recruiting teams frequently spend hundreds of hours manually screening and scoring candidates from high-volume applicant pools. The <strong>AI Talent Recruitment System</strong> is an automated intelligence tool built to extract text from candidate resumes, vectorize key qualifications, and calculate relevancy against targeted job descriptions.
      </p>
      <h4 style="margin: 1rem 0 0.5rem; color: var(--accent-cyan);">Key Architecture & Implementation:</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted);">
        <li><strong>Text Ingestion & Preprocessing:</strong> Parses diverse resume formats, removes noise/stopwords, applies tokenization and lemmatization.</li>
        <li><strong>TF-IDF & Text Vectorization:</strong> Transforms candidate skill sets and job descriptions into high-dimensional vector representations.</li>
        <li><strong>Cosine Similarity Scoring:</strong> Measures distance in vector space to dynamically rank applicants with high mathematical accuracy.</li>
        <li><strong>Skill Extraction Engine:</strong> Extracts specific hard and soft skills to provide transparent hiring rationales.</li>
      </ul>
      <h4 style="margin: 1rem 0 0.5rem; color: var(--accent-cyan);">Current Status & Next Iteration:</h4>
      <p style="color: var(--text-muted);">
        Currently integrating semantic embedding models and a lightweight web interface for HR recruiters to upload PDFs and visualize candidate rankings in real time.
      </p>
    `
  },
  'study-habits': {
    title: 'Student Study Habits Analysis',
    badge: 'Exploratory Data Analysis (EDA)',
    status: 'Completed Research Study',
    tech: 'Python, Pandas, NumPy, Matplotlib, Jupyter Notebook',
    description: `
      <p style="margin-bottom: 1rem;">
        A quantitative analytical project evaluating how collegiate lifestyle attributes—including daily study hours, classroom attendance percentage, sleep duration, and recreational habits—impact semester academic performance (GPA).
      </p>
      <h4 style="margin: 1rem 0 0.5rem; color: var(--accent-cyan);">Analytical Methodology:</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted);">
        <li><strong>Data Sanitization:</strong> Handled null values, addressed outliers, and standardized continuous and categorical features using Pandas.</li>
        <li><strong>Statistical Correlation:</strong> Uncovered significant positive correlation between regular attendance (&gt;85%) and GPA, alongside diminishing returns on cramming past 6 continuous hours without adequate sleep.</li>
        <li><strong>Visual Storytelling:</strong> Designed multi-variable scatter plots, box plots, and heatmaps in Matplotlib to convey actionable habits.</li>
        <li><strong>Actionable Insights:</strong> Generated evidence-based recommendations for students and academic mentors to optimize study cycles.</li>
      </ul>
    `
  },
  netflix: {
    title: 'Netflix Content Trends Dashboard',
    badge: 'Business Intelligence & Visualization',
    status: 'Published Dashboard',
    tech: 'Tableau, Data Visualization, Trend Analysis, Business Intelligence',
    description: `
      <p style="margin-bottom: 1rem;">
        An interactive Tableau dashboard built to dissect Netflix's expansive catalog of movies and television series spanning multiple decades and global production hubs.
      </p>
      <h4 style="margin: 1rem 0 0.5rem; color: var(--accent-cyan);">Dashboard Features & Business Insights:</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted);">
        <li><strong>Content Composition Breakdown:</strong> Evaluated the historical pivot from licensed movies to episodic television series over the last decade.</li>
        <li><strong>Genre & Rating Distribution:</strong> Highlighted dominant genres (Drama, Comedy, Documentaries) and mapped content maturity ratings (TV-MA, PG-13) across target demographics.</li>
        <li><strong>Global Production Heatmaps:</strong> Identified the rapid rise of international content origination (e.g., South Korea, Spain, India).</li>
        <li><strong>Interactive Drill-downs:</strong> Configured year, genre, and duration filters allowing users to isolate release patterns instantaneously.</li>
      </ul>
    `
  }
};

function initModals() {
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeProjectBtn = document.getElementById('closeProjectModalBtn');
  const modalCloseAction = document.getElementById('modalCloseAction');

  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  // Open Project Details Modal
  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (!data) return;

      modalTitle.innerHTML = `${data.title} <span style="font-size: 0.8rem; font-weight: normal; color: var(--accent-cyan); display: block; margin-top: 4px;">${data.badge}</span>`;
      modalBody.innerHTML = `
        <div style="margin-bottom: 1rem; padding: 0.6rem 1rem; background: var(--bg-tertiary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.88rem;">
          <strong>Tech Stack:</strong> <span style="color: var(--text-muted); font-family: var(--font-mono);">${data.tech}</span>
        </div>
        ${data.description}
      `;

      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Project Modal
  function closeProject() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeProjectBtn) closeProjectBtn.addEventListener('click', closeProject);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeProject);

  // Resume Modal Handling
  function openResume() {
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  // Print Resume / Export PDF
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close on Backdrop Click
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProject();
    if (e.target === resumeModal) closeResume();
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProject();
      closeResume();
    }
  });
}

/* ==========================================================================
   6. Contact Form & Feedback Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !subject || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill out all fields before submitting.';
      return;
    }

    // Construct standard mailto link
    const mailtoLink = `mailto:sushantgwachha@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject}`
    )}&body=${encodeURIComponent(`Hi Sushant,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    feedback.className = 'form-feedback success';
    feedback.textContent = 'Opening your email client to send message...';

    // Trigger user's mail client
    window.location.href = mailtoLink;

    setTimeout(() => {
      feedback.textContent = 'Thank you! If your email client did not open, feel free to write directly to sushantgwachha@gmail.com.';
      form.reset();
    }, 2500);
  });
}

/* ==========================================================================
   7. Scroll Spy & Active Nav Link Highlighting
   ========================================================================== */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   8. Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}
