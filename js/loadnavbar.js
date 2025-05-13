

document.addEventListener('DOMContentLoaded', function() {
  
  const existingNavbar = document.querySelector('header');
  if (existingNavbar) {
    existingNavbar.remove();
  }
  
  const existingOverlay = document.getElementById('overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  

  const navbar = new NavbarShadowDOM();

  const addBodyPadding = () => {
    
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
     
      setTimeout(() => {
       
        const navbarHeight = navbarContainer.getBoundingClientRect().height;
       
        document.body.style.paddingTop = `${navbarHeight}px`;
      }, 100);
    }
  };
  

  addBodyPadding();
  
  
  window.addEventListener('resize', addBodyPadding);
  

  const observer = new MutationObserver(addBodyPadding);
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});