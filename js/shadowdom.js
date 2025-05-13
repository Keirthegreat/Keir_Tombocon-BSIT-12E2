


(function() {
  
  class NavbarComponent extends HTMLElement {
    constructor() {
      super();
     
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
   
      this.render();
      
      this.setupEventListeners();
    
      this.adjustBodyPadding();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
          }
          
          *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .navbar-header {
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
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
              rgba(255, 255, 255, 0.9),
              rgba(240, 249, 255, 0.9),
              rgba(255, 255, 255, 0.9)
            );
            border-bottom: 1px solid rgba(37, 99, 235, 0.1);
          }
          
          .site-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2563eb;
            text-decoration: none;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
            padding: 0.3rem 0.5rem;
            transition: all 0.3s ease;
            display: block;
          }
          
          .site-title:hover {
            transform: translateY(-2px);
            text-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
          }
          
          .site-title::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent,
              #2563eb,
              transparent
            );
            transform: translateX(-100%);
            transition: transform 0.6s ease;
          }
          
          .site-title:hover::before {
            transform: translateX(0);
          }
          
          .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
            margin: 0;
            padding: 0;
          }
          
          .nav-links li {
            position: relative;
            margin: 0;
          }
          
          .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            font-size: 1rem;
            transition: color 0.3s ease;
            position: relative;
            padding: 0.5rem 0;
            display: block;
          }
          
          .nav-links a:hover {
            color: #2563eb;
          }
          
          .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 3px;
            background-color: #2563eb;
            transition: width 0.3s ease;
            border-radius: 2px;
          }
          
          .nav-links a:hover::after {
            display:none;
          }
          
          .nav-links li a::before {
            content: '';
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%) scale(0);
            width: 5px;
            height: 5px;
            background-color: #2563eb;
            border-radius: 50%;
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          
          .nav-links li a:hover::before {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          
          .nav-links .active a {
            color: #2563eb;
          }
          
          .nav-links .active a::after {
            width: 40%;
            left: 30%;
            height:3px;
          }
          
          .hamburger {
            display: none;
            cursor: pointer;
            z-index: 1001;
            background: none;
            border: none;
            padding: 0;
          }
          
          .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            background-color: #333;
            transition: all 0.3s ease-in-out;
            border-radius: 2px;
          }
          
          .overlay {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease;
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
              font-size: 1.4rem;
            }
            
            .nav-links a {
              font-size: 1.2rem;
            }
            
            .hamburger.active span:nth-child(1) {
              transform: translateY(8px) rotate(45deg);
              background-color: #2563eb;
            }
            
            .hamburger.active span:nth-child(2) {
              opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
              transform: translateY(-8px) rotate(-45deg);
              background-color: #2563eb;
            }
            
            .nav-links {
              position: fixed;
              left: -100%;
              top: 0;
              flex-direction: column;
              background-color: #ffffff;
              width: 80%;
              height: 100vh;
              text-align: center;
              transition: 0.5s ease;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              padding: 6rem 0;
              gap: 2.5rem;
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
              transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .nav-links.active li:nth-child(1) {
              transition-delay: 0.2s;
            }
            .nav-links.active li:nth-child(2) {
              transition-delay: 0.3s;
            }
            .nav-links.active li:nth-child(3) {
              transition-delay: 0.4s;
            }
            .nav-links.active li:nth-child(4) {
              transition-delay: 0.5s;
            }
            .nav-links.active li:nth-child(5) {
              transition-delay: 0.6s;
            }
            .nav-links.active li:nth-child(6) {
              transition-delay: 0.7s;
            }
            .nav-links.active li:nth-child(7) {
              transition-delay: 0.8s;
            }
          }
        </style>
        
        <div class="navbar-header">
          <nav class="navbar">
            <a class="site-title">Tombocon Portfolio Website</a>
            <ul class="nav-links">
              <li class="active"><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="skills.html">Skills</a></li>
              <li><a href="portfolio.html">Portfolio</a></li>
              <li><a href="resume.html">Resume</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
        <div class="overlay"></div>
      `;
    }

    setupEventListeners() {
      const hamburger = this.shadowRoot.querySelector('.hamburger');
      const navLinks = this.shadowRoot.querySelector('.nav-links');
      const overlay = this.shadowRoot.querySelector('.overlay');
      const navItems = this.shadowRoot.querySelectorAll('.nav-links li');

   
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
      });

      
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          overlay.classList.remove('active');
        });
      });

      
      overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
      });

      
      this.setActivePage();


      window.addEventListener('resize', () => this.adjustBodyPadding());
    }

    setActivePage() {
      const navItems = this.shadowRoot.querySelectorAll('.nav-links li');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      let activeFound = false;
      
      navItems.forEach(item => {
        const link = item.querySelector('a');
        const href = link.getAttribute('href');
        
        item.classList.remove('active');
        if (href === currentPage) {
          item.classList.add('active');
          activeFound = true;
        }
      });
      
    
      if (!activeFound) {
        navItems[0].classList.add('active');
      }
    }

    adjustBodyPadding() {
  
      const navbar = this.shadowRoot.querySelector('.navbar-header');
      if (navbar) {
        const height = navbar.offsetHeight;
        document.body.style.paddingTop = `${height}px`;
      }
    }
  }

  customElements.define('navbar-component', NavbarComponent);

 
  document.addEventListener('DOMContentLoaded', () => {
  
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
      existingHeader.remove();
    }

   
    const navbar = document.createElement('navbar-component');
    document.body.insertBefore(navbar, document.body.firstChild);
  });
})();