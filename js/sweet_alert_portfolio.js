function showPortfolioConfirm(e) {
  e.preventDefault();
  Swal.fire({
    width: '90%',
    heightAuto: false,
    title: 'Proceed to Portfolio?',
    text: 'Would you like to proceed to the portfolio page?',
    icon: 'question',
    iconHtml: '<i class="fas fa-rocket"></i>',
    background: '#e6f7ff',
    showCancelButton: true,
    confirmButtonText: 'Yes, take me there',
    cancelButtonText: 'No, stay here',
    confirmButtonColor: '#007bff',
    cancelButtonColor: '#0056b3',
    customClass: {
      popup:   'swal2-border-blue',
      title:   'swal2-title-blue',
      content: 'swal2-content-blue',
      icon:    'swal2-icon-blue'
    }
  }).then(result => {
    if (result.isConfirmed) {
      window.location.href = 'portfolio.html';
    }
  });
}

function bindSweetAlert() {
  const btn = document.getElementById('view-work-btn');
  if (!btn) return;
  btn.removeEventListener('click', showPortfolioConfirm);
  btn.addEventListener('click', showPortfolioConfirm);
}

window.addEventListener('DOMContentLoaded', bindSweetAlert);
window.addEventListener('pageshow', bindSweetAlert);



