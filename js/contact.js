(function(){
  document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure this is your final message?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, edit it',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#6c757d',
      background: '#e0f0ff',
    }).then((result) => {
      if (result.isConfirmed) {
        emailjs.sendForm('service_dokyxje', 'template_ru9mgam', this)
          .then(function(){
            Swal.fire({
              title: 'Message Sent',
              text: 'Your message was sent successfully!',
              icon: 'success', 
              showConfirmButton: true,
              confirmButtonColor: '#007bff',
              background: '#e0f0ff'
            });
            document.getElementById('contact-form').reset();
          }, function(){
            Swal.fire({
              title: 'Error',
              text: 'Failed to send message.',
              icon: 'error',
              confirmButtonColor: '#007bff',
              background: '#e0f0ff'
            });
          });
      }
    });
  });
})();




