document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables and elements
  const header = document.querySelector('header');
  const highlightItems = document.querySelectorAll('#highlights article');
  const hostingSection = document.querySelector('#hosting');
  const darkModeToggle = document.createElement('div');
  
  // Create dark mode toggle
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
  darkModeToggle.setAttribute('role', 'button');
  darkModeToggle.setAttribute('tabindex', '0');
  document.body.appendChild(darkModeToggle);
  
  // Load Font Awesome for icons
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  document.head.appendChild(fontAwesome);
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }
  
  // Function to handle scroll animations
  function handleScrollAnimations() {
    // Header scroll effect
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Animate highlights when in viewport
    highlightItems.forEach(item => {
      if (isInViewport(item)) {
        item.classList.add('visible');
      }
    });
    
    // Animate hosting section when in viewport
    if (isInViewport(hostingSection)) {
      hostingSection.classList.add('visible');
    }
  }
  
  // Scroll to section function
  window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Add staggered animation delay to highlight items
  highlightItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
  });
  
  // Dark mode toggle functionality
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Toggle icon
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
  }
  
  // Handle keyboard navigation for custom buttons
  darkModeToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
  
  // Cursor trail effect
  const cursorTrail = document.createElement('div');
  cursorTrail.className = 'cursor-trail';
  document.body.appendChild(cursorTrail);
  
  document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'trail-dot';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
      trail.remove();
    }, 1000);
  });
  
  // Custom styling for cursor trail
  const cursorStyle = document.createElement('style');
  cursorStyle.innerHTML = `
    .trail-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--accent-color);
      pointer-events: none;
      opacity: 0.7;
      transform: translate(-50%, -50%);
      z-index: 9999;
      animation: trailFade 1s forwards;
    }
    
    @keyframes trailFade {
      0% {
        opacity: 0.7;
        width: 8px;
        height: 8px;
      }
      100% {
        opacity: 0;
        width: 40px;
        height: 40px;
      }
    }
  `;
  document.head.appendChild(cursorStyle);
  
  // Parallax effect on hero section
  const hero = document.getElementById('hero');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  });
  
  // Typing effect for hero section
  const heroP = document.querySelector('#hero p');
  const originalText = heroP.textContent;
  heroP.textContent = '';
  
  function typeWriter(text, element, i = 0) {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(text, element, i), 50);
    }
  }
  
  // Start typing effect after initial animation
  setTimeout(() => {
    typeWriter(originalText, heroP);
  }, 1800);
  
  // Initialize scroll animations and set up event listeners
  handleScrollAnimations();
  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('resize', handleScrollAnimations);
  
  // Add scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = '<span></span>';
  hero.appendChild(scrollIndicator);
  
  // Style for scroll indicator
  const scrollStyle = document.createElement('style');
  scrollStyle.innerHTML = `
    .scroll-indicator {
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 50px;
      border: 2px solid white;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      opacity: 0;
      animation: fadeIn 1s forwards 2s;
    }
    
    .scroll-indicator span {
      width: 4px;
      border-radius: 2px;
      background-color: white;
      display: block;
      height: 10px;
      margin-top: 8px;
      animation: scrollDown 2s infinite;
    }
    
    @keyframes scrollDown {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(scrollStyle);
  
  // Add progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);
  
  // Style for progress bar
  const progressStyle = document.createElement('style');
  progressStyle.innerHTML = `
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent-color);
      z-index: 1001;
      transition: width 0.1s;
    }
  `;
  document.head.appendChild(progressStyle);
  
  // Update progress bar
  window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
});
