const defaultConfig = {
  hero_name: 'Every Line of Code\nTells a Story',
  hero_tagline: 'Building at the intersection of technology, culture & narrative.',
  about_heading: 'Where Code Meets Culture',
  about_text: "I'm a software engineer with roots in sociology and African Studies — a combination that gives me a unique lens on how technology shapes communities and how stories move through digital spaces. Whether I'm writing clean code or crafting compelling narratives, I'm driven by the same impulse: to connect people to ideas that matter.",
  projects_heading: 'Projects',
  contact_heading: 'Start a Conversation',
  contact_subtext: "Got an idea, a project, or a story to tell? I'd love to hear from you.",
  background_color: '#1a1a2e',
  surface_color: '#16162a',
  text_color: '#f0e6d3',
  primary_action_color: '#e87722',
  secondary_action_color: '#d4a574',
  font_family: 'Playfair Display',
  font_size: 16
};

// Apply configuration to the DOM
function applyConfig(config) {
  const c = { ...defaultConfig, ...config };
  const el = id => document.getElementById(id);
  
  // Update text content
  if (el('heroName')) el('heroName').innerHTML = (c.hero_name || defaultConfig.hero_name).replace(/\n/g, '<br>');
  if (el('heroTagline')) el('heroTagline').textContent = c.hero_tagline || defaultConfig.hero_tagline;
  if (el('aboutHeading')) el('aboutHeading').textContent = c.about_heading || defaultConfig.about_heading;
  if (el('aboutText')) el('aboutText').textContent = c.about_text || defaultConfig.about_text;
  if (el('projectsHeading')) el('projectsHeading').textContent = c.projects_heading || defaultConfig.projects_heading;
  if (el('contactHeading')) el('contactHeading').textContent = c.contact_heading || defaultConfig.contact_heading;
  if (el('contactSubtext')) el('contactSubtext').textContent = c.contact_subtext || defaultConfig.contact_subtext;
  
  // Update colors
  const bg = c.background_color || defaultConfig.background_color;
  const sf = c.surface_color || defaultConfig.surface_color;
  const tx = c.text_color || defaultConfig.text_color;
  
  const heroSec = document.getElementById('hero');
  const aboutSec = document.getElementById('about');
  const projSec = document.getElementById('projects');
  const contactSec = document.getElementById('contact');
  
  if (heroSec) heroSec.style.background = bg;
  if (aboutSec) aboutSec.style.background = sf;
  if (projSec) projSec.style.background = bg;
  if (contactSec) contactSec.style.background = sf;
  
  // Update navigation text color
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => { 
    l.style.color = tx; 
  });
  
  // Update font family for headings
  const ff = c.font_family || defaultConfig.font_family;
  document.querySelectorAll('h1, h2, h3').forEach(h => {
    h.style.fontFamily = `'${ff}', 'Playfair Display', serif`;
  });
}

// Initialize SDK if available
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { 
      applyConfig(config); 
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        { 
          get: () => config.background_color || defaultConfig.background_color, 
          set: v => { 
            config.background_color = v; 
            window.elementSdk.setConfig({ background_color: v }); 
          } 
        },
        { 
          get: () => config.surface_color || defaultConfig.surface_color, 
          set: v => { 
            config.surface_color = v; 
            window.elementSdk.setConfig({ surface_color: v }); 
          } 
        },
        { 
          get: () => config.text_color || defaultConfig.text_color, 
          set: v => { 
            config.text_color = v; 
            window.elementSdk.setConfig({ text_color: v }); 
          } 
        },
        { 
          get: () => config.primary_action_color || defaultConfig.primary_action_color, 
          set: v => { 
            config.primary_action_color = v; 
            window.elementSdk.setConfig({ primary_action_color: v }); 
          } 
        }
      ],
      fontEditable: { 
        get: () => config.font_family || defaultConfig.font_family, 
        set: v => { 
          config.font_family = v; 
          window.elementSdk.setConfig({ font_family: v }); 
        } 
      },
      fontSizeable: { 
        get: () => config.font_size || defaultConfig.font_size, 
        set: v => { 
          config.font_size = v; 
          window.elementSdk.setConfig({ font_size: v }); 
        } 
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_name', config.hero_name || defaultConfig.hero_name],
      ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
      ['about_heading', config.about_heading || defaultConfig.about_heading],
      ['about_text', config.about_text || defaultConfig.about_text],
      ['projects_heading', config.projects_heading || defaultConfig.projects_heading],
      ['contact_heading', config.contact_heading || defaultConfig.contact_heading],
      ['contact_subtext', config.contact_subtext || defaultConfig.contact_subtext]
    ])
  });
}

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
    } 
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── COUNTER ANIMATION ───
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = 'true';
      const target = parseInt(e.target.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { 
          current = target; 
          clearInterval(interval); 
        }
        e.target.textContent = current;
      }, 40);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ─── PROJECT FILTER ───
window.filterProjects = function(cat) {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(b => {
    b.classList.remove('active-filter');
    b.style.background = 'transparent';
    b.style.color = '#f0e6d3';
    b.style.border = '1px solid rgba(240,230,211,0.2)';
  });
  
  // Find the active button by data-filter attribute
  let activeBtn = null;
  btns.forEach(btn => {
    if (btn.getAttribute('data-filter') === cat) {
      activeBtn = btn;
    }
  });
  
  if (activeBtn) {
    activeBtn.classList.add('active-filter');
    activeBtn.style.background = '#e87722';
    activeBtn.style.color = '#1a1a2e';
    activeBtn.style.border = '1px solid #e87722';
  }
  
  document.querySelectorAll('.project-card').forEach(card => {
    if (cat === 'all' || card.dataset.category === cat) {
      card.style.display = 'flex';
      card.style.animation = 'fadeSlideUp 0.5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
};

// Add event listeners to filter buttons (replacing inline onclick)
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const category = this.getAttribute('data-filter');
      if (category) {
        filterProjects(category);
      }
    });
  });
});

// ─── CONTACT FORM HANDLER WITH FORMSPREE ───
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get the submit button
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(form);
      
      try {
        const response = await fetch('https://formspree.io/f/mlgapeee', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success!
          alert('✓ Message sent successfully! I\'ll get back to you soon.');
          form.reset();
        } else {
          // Error from Formspree
          const errorData = await response.json();
          console.error('Formspree error:', errorData);
          alert('Failed to send. Please email me directly at xavierroberson177@gmail.com');
        }
      } catch (error) {
        // Network or other error
        console.error('Error:', error);
        alert('Error sending message. Please try again or email me directly.');
      } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

// ─── MOBILE MENU HANDLER ───
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinksDesktop = document.getElementById('navLinks');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
    });
    
    document.querySelectorAll('.mobile-nav-link').forEach(l => {
      l.addEventListener('click', () => { 
        mobileMenu.style.display = 'none'; 
      });
    });
  }
  
  // Responsive navigation handler
  function checkNav() {
    if (window.innerWidth < 640) {
      if (navLinksDesktop) navLinksDesktop.style.display = 'none';
      if (mobileBtn) mobileBtn.style.display = 'block';
    } else {
      if (navLinksDesktop) navLinksDesktop.style.display = 'flex';
      if (mobileBtn) mobileBtn.style.display = 'none';
      if (mobileMenu) mobileMenu.style.display = 'none';
    }
  }
  
  window.addEventListener('resize', checkNav);
  checkNav();
});

// ─── LUCIDE ICONS INITIALIZATION ───
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// ─── SMOOTH SCROLLING FOR ANCHOR LINKS ───
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ─── ADD FADESLIDEUP ANIMATION KEYFRAMES DYNAMICALLY IF NEEDED ───
// (Ensures the animation is available for project cards)
if (!document.querySelector('#dynamic-animation-style')) {
  const style = document.createElement('style');
  style.id = 'dynamic-animation-style';
  style.textContent = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}