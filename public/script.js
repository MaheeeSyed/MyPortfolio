const dropdownToggle = document.querySelector('.dropdown-toggle');
const menu = document.querySelector('.menu');

dropdownToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});
