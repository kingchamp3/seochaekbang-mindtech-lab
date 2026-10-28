document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('문의가 접수되었습니다. (데모)');
  e.target.reset();
});