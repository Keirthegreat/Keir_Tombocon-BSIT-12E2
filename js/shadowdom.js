class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this._navbarHeight = 0;
    this._resizeObserver = null;
    this._hasSetPadding = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    
    document.body.classList.add('has-navbar');
    
    try {
      this._resizeObserver = new ResizeObserver(() => {
        this.adjustBodyPadding();
      });
      
      const header = this.shadowRoot.querySelector('.navbar-header');
      if (header) {
        this._resizeObserver.observe(header);
      }
    } catch (e) {
      console.warn('ResizeObserver not supported, falling back to window resize');
    }
    
    this.adjustBodyPadding();
    setTimeout(() => this.adjustBodyPadding(), 200);
    
    this.updateActiveLink();
    
    window.addEventListener('hashchange', this.updateActiveLink.bind(this));
    window.addEventListener('popstate', this.updateActiveLink.bind(this));
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    
    window.removeEventListener('resize', this._boundAdjustBodyPadding);
    window.removeEventListener('load', this._boundAdjustBodyPadding);
    window.removeEventListener('hashchange', this.updateActiveLink.bind(this));
    window.removeEventListener('popstate', this.updateActiveLink.bind(this));
    
    document.body.classList.remove('has-navbar');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          
          --nav-font-size: 16px;
          --nav-title-size: 24px;
          --nav-mobile-title-size: 18px;
          --nav-mobile-font-size: 16px;
          
          --nav-bg-color: #ffffff;
          --nav-text-color: #333333;
          --nav-accent-color: #2563eb;
          --nav-shadow: 0 4px 20px rgba(0,0,0,0.1);
          --nav-border-color: rgba(37,99,235,0.1);
          --nav-transition: 0.3s;
        }

        .navbar-header {
          position: fixed;
          top: 0; 
          left: 0;
          width: 100%;
          background: var(--nav-bg-color);
          box-shadow: var(--nav-shadow);
          z-index: 1000;
        }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5%;
          max-width: 1400px;
          margin: 0 auto;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0.9),
            rgba(240,249,255,0.9),
            rgba(255,255,255,0.9)
          );
          border-bottom: 1px solid var(--nav-border-color);
        }

        .site-title {
          font-size: var(--nav-title-size);
          font-weight: 700;
          color: var(--nav-accent-color);
          text-decoration: none;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          padding: 0.3rem 0.5rem;
          transition: transform var(--nav-transition), 
                      text-shadow var(--nav-transition);
        }
        
        .site-title:hover {
          transform: translateY(-2px);
          text-shadow: 0 4px 8px rgba(37,99,235,0.3);
        }
        
        .site-title::before {
          content: '';
          position: absolute;
          bottom: 0; 
          left: 0;
          width: 100%; 
          height: 2px;
          background: linear-gradient(to right, transparent, var(--nav-accent-color), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        
        .site-title:hover::before {
          transform: translateX(0);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        .nav-links li { 
          position: relative;
        }
        
        .nav-links a {
          display: block;
          position: relative;
          font-size: var(--nav-font-size);
          font-weight: 500;
          color: var(--nav-text-color);
          text-decoration: none;
          padding: 0.5rem 0;
          transition: color var(--nav-transition);
        }
        
        .nav-links a:hover {
          color: var(--nav-accent-color);
        }
        
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: var(--nav-accent-color);
          transition: width var(--nav-transition);
          border-radius: 2px;
        }
        
        .nav-links a:hover::after {
          width: 100%;
        }
        
        .nav-links .active a {
          color: var(--nav-accent-color);
        }
        
        .nav-links .active a::after {
          width: 40%;
          left: 30%;
        }

        .hamburger {
          display: none;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          z-index: 1001;
        }
        
        .hamburger span {
          display: block;
          width: 25px;
          height: 3px;
          margin: 5px auto;
          border-radius: 2px;
          background: var(--nav-text-color);
          transition: transform var(--nav-transition), 
                      opacity var(--nav-transition);
        }
        
        .overlay {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s, visibility 0.5s;
          z-index: 999;
        }
        
        .overlay.active {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 768px) {
          .hamburger { 
            display: block;
          }
          
          .site-title {
            font-size: var(--nav-mobile-title-size);
            padding: 0.2rem 0.3rem;
          }
          
          .nav-links a {
            font-size: var(--nav-mobile-font-size);
          }
          
          .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
            background: var(--nav-accent-color);
          }
          
          .hamburger.active span:nth-child(2) { 
            opacity: 0;
          }
          
          .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
            background: var(--nav-accent-color);
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            left: -100%;
            flex-direction: column;
            width: 70%;
            height: 100vh;
            padding: 4rem 0;
            align-items: center;
            gap: 1.5rem;
            background: var(--nav-bg-color);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            transition: left 0.5s;
            z-index: 1000;
          }
          
          .nav-links.active { 
            left: 0;
          }
          
          .nav-links li {
            opacity: 0;
            transform: translateY(20px);
          }
          
          .nav-links.active li {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.5s, transform 0.5s;
          }
          
          .nav-links.active li:nth-child(1) { transition-delay: 0.2s; }
          .nav-links.active li:nth-child(2) { transition-delay: 0.3s; }
          .nav-links.active li:nth-child(3) { transition-delay: 0.4s; }
          .nav-links.active li:nth-child(4) { transition-delay: 0.5s; }
          .nav-links.active li:nth-child(5) { transition-delay: 0.6s; }
          .nav-links.active li:nth-child(6) { transition-delay: 0.7s; }
          .nav-links.active li:nth-child(7) { transition-delay: 0.8s; }

          .navbar {
            padding: 0.5rem 3%;
          }
        }
      </style>

      <div class="navbar-header">
        <nav class="navbar">
          <a class="site-title" >Tombocon Portfolio Website</a>
          <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="skills.html">Skills</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="resume.html">Resume</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="Faq.html">Faq</a></li>
          </ul>
          <button class="hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </nav>
      </div>
      <div class="overlay"></div>
    `;
  }

  setupEventListeners() {
    const ham = this.shadowRoot.querySelector('.hamburger');
    const links = this.shadowRoot.querySelector('.nav-links');
    const overlay = this.shadowRoot.querySelector('.overlay');
    const items = this.shadowRoot.querySelectorAll('.nav-links li');

    ham.addEventListener('click', () => {
      ham.classList.toggle('active');
      links.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', () => {
      ham.classList.remove('active');
      links.classList.remove('active');
      overlay.classList.remove('active');
    });
    
    items.forEach(li => li.addEventListener('click', () => {
      ham.classList.remove('active');
      links.classList.remove('active');
      overlay.classList.remove('active');
    }));

    this._boundAdjustBodyPadding = this.adjustBodyPadding.bind(this);
    
    window.addEventListener('resize', this._boundAdjustBodyPadding);
    window.addEventListener('load', this._boundAdjustBodyPadding);
  }

  updateActiveLink() {
    const currentLocation = window.location.href;
    console.log('Current location:', currentLocation);
    
    // Get all page links
    const navLinks = this.shadowRoot.querySelectorAll('.nav-links li');
    
    // Reset all active states first
    navLinks.forEach(li => li.classList.remove('active'));
    
    // Find which link matches the current URL
    let currentPageName = '';
    
    // Extract the page name from the URL (handles both local and GitHub Pages URLs)
    if (currentLocation.includes('.html')) {
      // If the URL contains .html
      const urlParts = currentLocation.split('/');
      for (let i = urlParts.length - 1; i >= 0; i--) {
        if (urlParts[i].includes('.html')) {
          currentPageName = urlParts[i].toLowerCase();
          break;
        }
      }
    } else {
      // If no .html, check if it ends with a slash or is the root
      if (currentLocation.endsWith('/') || 
          currentLocation.endsWith('.io') || 
          currentLocation.split('/').pop() === '') {
        currentPageName = 'index.html';
      } else {
        // Otherwise use the last part of the URL
        currentPageName = currentLocation.split('/').pop().toLowerCase() + '.html';
      }
    }
    
    console.log('Detected current page name:', currentPageName);
    
    // If we couldn't determine a page, default to home
    if (!currentPageName) {
      currentPageName = 'index.html';
    }
    
    // Find and activate the matching link
    navLinks.forEach(li => {
      const anchor = li.querySelector('a');
      const href = anchor.getAttribute('href').toLowerCase();
      
      if (currentPageName === href || 
         (currentPageName === 'index.html' && href === '') ||
         (currentPageName === '' && href === 'index.html')) {
        li.classList.add('active');
        console.log(`Activated link: ${href}`);
      }
    });
    
    // For GitHub Pages and other special cases
    if (!this.shadowRoot.querySelector('.nav-links li.active')) {
      // Special handling for root URL
      if (window.location.pathname === '/' || 
          window.location.pathname === '' ||
          window.location.pathname.endsWith('/')) {
        const homeLink = this.shadowRoot.querySelector('.nav-links li a[href="index.html"]');
        if (homeLink) {
          homeLink.parentElement.classList.add('active');
          console.log('Activated home link as fallback');
        }
      } else {
        // Try matching just the filename part
        const pathParts = window.location.pathname.split('/');
        const lastPathPart = pathParts[pathParts.length - 1].toLowerCase();
        
        navLinks.forEach(li => {
          const anchor = li.querySelector('a');
          const href = anchor.getAttribute('href').toLowerCase();
          
          if (lastPathPart === href || 
             (lastPathPart === '' && href === 'index.html')) {
            li.classList.add('active');
            console.log(`Activated link based on path part: ${href}`);
          }
        });
      }
    }
  }

  adjustBodyPadding() {
    const header = this.shadowRoot.querySelector('.navbar-header');
    if (!header) return;
    
    const computedHeight = header.offsetHeight;
    
    if (computedHeight > 0) {
      if (!this._hasSetPadding || this._navbarHeight !== computedHeight) {
        this._navbarHeight = computedHeight;
        document.body.style.paddingTop = computedHeight + 'px';
        this._hasSetPadding = true;
      }
    }
  }
}

customElements.define('navbar-component', NavbarComponent);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('header').forEach(el => {
    el.remove();
  });
  
  if (!document.querySelector('navbar-component')) {
    const nav = document.createElement('navbar-component');
    document.body.insertBefore(nav, document.body.firstChild);
  }
  
  // Initial navigation update
  setTimeout(() => {
    const navbar = document.querySelector('navbar-component');
    if (navbar) {
      navbar.updateActiveLink();
    }
  }, 100);
});

// Add a global script to force update active links if page loads after component
window.addEventListener('load', () => {
  setTimeout(() => {
    const navbar = document.querySelector('navbar-component');
    if (navbar) {
      navbar.updateActiveLink();
    }
  }, 500);
});

// Handle navigation events
window.addEventListener('hashchange', () => {
  const navbar = document.querySelector('navbar-component');
  if (navbar) {
    navbar.updateActiveLink();
  }
});

window.addEventListener('popstate', () => {
  const navbar = document.querySelector('navbar-component');
  if (navbar) {
    navbar.updateActiveLink();
  }
});
