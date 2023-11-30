
// ---------- Navbar ---------

const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('active', window.scrollY > 0)
})

// ------- Responsive-Menu --------

const responsiveMenu = document.querySelector('.responsiveMenu');
const respMenuOpenBtn = document.querySelector('.menuBtn');
const respMenuCloseBtn = document.querySelector('.closeRespMenu');

respMenuOpenBtn.addEventListener('click', () => {
    responsiveMenu.classList.add('active');
    document.body.style.overflowY = 'hidden';
})

respMenuCloseBtn.addEventListener('click', () => {
    responsiveMenu.classList.remove('active');
    document.body.style.overflowY = 'auto';

});

responsiveMenu.addEventListener('click', (evn) => {
    if(evn.target.className.search('responsiveMenu') !== -1) {
        responsiveMenu.classList.remove('active');
        document.body.style.overflowY = 'auto';
    }
})