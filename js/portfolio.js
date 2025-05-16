function initLightbox() {
  const body = document.body;
  const images = document.querySelectorAll('.showcase-images img, .award-item img');
  

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox-img';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  
  const lightboxNav = document.createElement('div');
  lightboxNav.className = 'lightbox-nav';
  
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  
  lightboxNav.appendChild(prevBtn);
  lightboxNav.appendChild(nextBtn);
  
  lightboxContent.appendChild(lightboxImg);
  lightboxContent.appendChild(lightboxCaption);
  lightboxContent.appendChild(closeBtn);
  lightboxContent.appendChild(lightboxNav);
  
  lightbox.appendChild(lightboxContent);
  body.appendChild(lightbox);
  
  let currentIndex = 0;
  const imagesArray = Array.from(images);
  

  function openLightbox(index) {
    currentIndex = index;
    const image = imagesArray[currentIndex];
    const src = image.getAttribute('src');
    const alt = image.getAttribute('alt');
    
    lightboxImg.setAttribute('src', src);
    lightboxCaption.textContent = alt;
    lightbox.classList.add('active');
    
   
    body.style.overflow = 'hidden';
  }
  

  function closeLightbox() {
    lightbox.classList.remove('active');
    
   
    body.style.overflow = '';
  }
  

  function nextImage() {
    currentIndex = (currentIndex + 1) % imagesArray.length;
    const image = imagesArray[currentIndex];
    const src = image.getAttribute('src');
    const alt = image.getAttribute('alt');
    
    lightboxImg.setAttribute('src', src);
    lightboxCaption.textContent = alt;
  }
  
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
    const image = imagesArray[currentIndex];
    const src = image.getAttribute('src');
    const alt = image.getAttribute('alt');
    
    lightboxImg.setAttribute('src', src);
    lightboxCaption.textContent = alt;
  }
  

  images.forEach((image, index) => {
    image.addEventListener('click', () => {
      openLightbox(index);
    });
  });
  
 
  closeBtn.addEventListener('click', closeLightbox);
  
 
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);
  

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });
}


document.addEventListener('DOMContentLoaded', initLightbox);