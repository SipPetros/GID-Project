const loader = document.querySelector('.loader');
const firstSectionEl = document.querySelector('.first-section');
const secondSectionEl = document.querySelector('.second-section');

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;

    firstSectionEl.style.transition = 'opacity 1s ease-in';
    secondSectionEl.style.transition = 'opacity 2s ease-in';

    setTimeout(() => (firstSectionEl.style.opacity = 1), 10);
    setTimeout(() => (secondSectionEl.style.opacity = 1), 50);
    btn.disabled = false;
    btn.style.background = '#649290';
  }, 2000);
}

function inout() {
  setTimeout(() => {
    loader.style.opacity = 1;
    loader.style.display = 'block';

    firstSectionEl.style.transition = 'linear';
    secondSectionEl.style.transition = 'linear';

    setTimeout(() => (firstSectionEl.style.opacity = 0), 10);
    setTimeout(() => (secondSectionEl.style.opacity = 0), 10);
  }, 50);
}
