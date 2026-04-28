document.addEventListener('DOMContentLoaded', function() {
  // Form submission with Formspree integration
  const form = document.getElementById('cf');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Disable submit button and show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '전송 중...';
      formStatus.style.display = 'none';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.display = 'block';
          formStatus.style.backgroundColor = 'var(--cyan-muted)';
          formStatus.style.color = 'var(--navy-deep)';
          formStatus.textContent = '✓ 문의가 접수되었습니다. 1 영업일 이내 담당자가 직접 연락드립니다.';
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;

          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = 'rgba(255, 100, 100, 0.1)';
        formStatus.style.color = '#d32f2f';
        formStatus.textContent = '오류 발생. 다시 시도해 주세요.';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Mobile menu toggle
  const hambBtn = document.getElementById('hamb-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hambBtn && navMenu) {
    hambBtn.addEventListener('click', function() {
      const isOpen = hambBtn.getAttribute('aria-expanded') === 'true';
      hambBtn.setAttribute('aria-expanded', !isOpen);
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hambBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }

  // IntersectionObserver for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animate-in class
  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    observer.observe(el);
  });
});
