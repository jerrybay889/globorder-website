// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('cf');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('문의가 접수되었습니다. 1 영업일 이내 담당자가 직접 연락드립니다.');
      form.reset();
    });
  }

  // Mobile menu toggle
  const hambBtn = document.querySelector('.hamb');
  if (hambBtn) {
    hambBtn.addEventListener('click', function() {
      // Add mobile menu functionality here
      console.log('Menu button clicked');
    });
  }
});
