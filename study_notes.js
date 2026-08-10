// Full-Stack Web Development Study Notes JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Feather Icons or FontAwesome replacement if needed
  setupSearch();
  setupThemeToggle();
  setupQuiz();
  setupActiveNav();
});

// Live Search Filter
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const topicCards = document.querySelectorAll('.topic-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    topicCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Copy Code Snippet
function copyCode(btn) {
  const codeContainer = btn.closest('.code-container');
  const codeText = codeContainer.querySelector('code').innerText;

  navigator.clipboard.writeText(codeText).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btn.style.background = '#10b981';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);
  });
}

// Toggle Live Preview
function togglePreview(btnId, previewId) {
  const previewBox = document.getElementById(previewId);
  if (!previewBox) return;

  if (previewBox.style.display === 'none' || !previewBox.style.display) {
    previewBox.style.display = 'block';
  } else {
    previewBox.style.display = 'none';
  }
}

// Theme Toggle
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.body.removeAttribute('data-theme');
      toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.setAttribute('data-theme', 'light');
      toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}

// Quiz Interactive Evaluation
function checkAnswer(btn, isCorrect) {
  const parentBox = btn.closest('.quiz-options');
  const allOptions = parentBox.querySelectorAll('.quiz-opt');

  allOptions.forEach((opt) => {
    opt.disabled = true;
    opt.style.cursor = 'default';
  });

  if (isCorrect) {
    btn.classList.add('correct');
    btn.innerHTML += ' ✓ (Correct!)';
  } else {
    btn.classList.add('incorrect');
    btn.innerHTML += ' ✗ (Wrong)';
  }
}

// Sidebar Active Navigation on Scroll
function setupActiveNav() {
  const sections = document.querySelectorAll('.topic-card');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
