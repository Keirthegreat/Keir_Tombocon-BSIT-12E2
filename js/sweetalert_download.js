function showDownloadConfirm(e) {
  e.preventDefault();
  Swal.fire({
    width: '90%',
    heightAuto: false,
    title: 'Are you sure?',
    text: 'Do you want to download my resume?',
    icon: 'info',
    iconHtml: '<i class="fas fa-file-pdf"></i>',
    background: '#e6f7ff',
    showCancelButton: true,
    confirmButtonText: 'Yes, download it',
    cancelButtonText: 'No, thanks',
    confirmButtonColor: '#007bff',
    cancelButtonColor: '#0056b3',
    customClass: {
      popup: 'swal2-border-blue',
      title: 'swal2-title-blue',
      content: 'swal2-content-blue',
      icon: 'swal2-icon-blue'
    }
  }).then(result => {
    if (result.isConfirmed) {
      const link = document.createElement('a');
      link.href = e.currentTarget.href;
      link.download = 'Keir_Tombocon_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
}

function bindDownloadConfirm() {
  const link = document.getElementById('download-resume');
  if (!link) {
    console.error('Element with ID "download-resume" not found');
    return;
  }
  link.removeEventListener('click', showDownloadConfirm);
  link.addEventListener('click', showDownloadConfirm);
}

window.addEventListener('DOMContentLoaded', bindDownloadConfirm);
window.addEventListener('pageshow', bindDownloadConfirm);
