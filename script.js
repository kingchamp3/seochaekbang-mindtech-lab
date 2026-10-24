const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sloganEl = document.getElementById('slogan');
const sloganEnEl = document.getElementById('slogan-en');
const sloganText = '인간을 이해하고, 지능의 미래를 탐구하다.';
const sloganEnText = 'Understanding Minds, Exploring Intelligence.';

function typeText(el, text, speed = 40) {
  return new Promise(resolve => {
    if (prefersReduced || sessionStorage.getItem('sloganPlayed')) {
      el.textContent = text;
      resolve();
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function playSlogan() {
  if (sessionStorage.getItem('sloganPlayed') || prefersReduced) {
    sloganEl.textContent = sloganText;
    sloganEnEl.textContent = sloganEnText;
    return;
  }
  await typeText(sloganEl, sloganText, 45);
  await new Promise(r => setTimeout(r, 400));
  await typeText(sloganEnEl, sloganEnText, 30);
  sessionStorage.setItem('sloganPlayed', '1');
}
playSlogan();

document.querySelectorAll('.door').forEach(door => {
  door.addEventListener('touchstart', () => {
    document.querySelectorAll('.door').forEach(d => d.classList.remove('active'));
    door.classList.add('active');
  }, { passive: true });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const form = document.getElementById('contact-form');
const typeSelect = document.getElementById('inquiry-type');
const orgGroup = document.getElementById('org-group');

typeSelect.addEventListener('change', () => {
  const val = typeSelect.value;
  orgGroup.style.display = (val === 'collab' || val === 'partner') ? 'flex' : 'none';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  document.getElementById('name-error').textContent = name.value.trim() ? '' : '이름을 입력해 주세요.';
  document.getElementById('email-error').textContent = email.value.includes('@') ? '' : '올바른 이메일을 입력해 주세요.';
  document.getElementById('message-error').textContent = message.value.trim() ? '' : '문의 내용을 입력해 주세요.';

  if (name.value.trim() && email.value.includes('@') && message.value.trim()) {
    alert('문의가 접수되었습니다. (데모)');
    form.reset();
    orgGroup.style.display = 'none';
  }
});