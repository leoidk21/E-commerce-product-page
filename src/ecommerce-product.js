const burgerMenu = document.querySelector('.burger-menu');
const navigation = document.querySelector('.navigation');
const closeMenu = document.querySelector('.close-menu');
const overlay = document.querySelector('.overlay');

const images = [
    "../images/image-product-1.jpg",
    "../images/image-product-2.jpg",
    "../images/image-product-3.jpg",
    "../images/image-product-4.jpg"
];

const lightbox = document.getElementById("lightbox");
const mainImage = document.getElementById("mainProductImage");
const lightboxImage = document.getElementById("lightboxMainImage");

const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const mainPrev = document.querySelector(".slider-btn.prev");
const mainNext = document.querySelector(".slider-btn.next");
const closeLightbox = document.querySelector(".close-lightbox");

const mainThumbnails = document.querySelectorAll(".product-gallery .product-thumbnail .thumb");
const lightboxThumbnails = document.querySelectorAll(".lightbox .product-thumbnail .thumb");

let mainIndex = 0;
let lightboxIndex = 0;

// HELPER FUNCTIONS
function updateMainImage(index) {
    mainIndex = index;
    mainImage.style.opacity = 0;
    setTimeout(() => {
        mainImage.src = images[mainIndex];
        mainImage.style.opacity = 1;
    }, 150);

    mainThumbnails.forEach((t, idx) => {
        t.classList.toggle("active", idx === mainIndex);
    });
}

function updateLightboxImage(index) {
    lightboxIndex = index;
    lightboxImage.src = images[lightboxIndex];
    
    lightboxThumbnails.forEach((t, idx) => {
        t.classList.toggle("active", idx === lightboxIndex);
    });
}

// OPEN LIGHTBOX
mainImage.addEventListener('click', () => {
    if(window.innerWidth <= 1024) {
        return;
    }

    lightbox.classList.add("show");
    lightboxImage = mainIndex;
    lightboxImage.src = images[lightboxIndex];
});
// OPEN LIGHTBOX

// CLOSE LIGHTBOX
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove("show");
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
        lightbox.classList.remove("show");
    }
});
// CLOSE LIGHTBOX

// LIGHTBOX NAV
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    let nextIndex = (lightboxIndex + 1) % images.length;
    updateLightboxImage(nextIndex);
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    let prevIndex = (lightboxIndex - 1 + images.length) % images.length; // Safe layout wrap around
    updateLightboxImage(prevIndex);
});
// LIGHTBOX NAV

// MAIN GALLERY NAV
mainNext.addEventListener('click', (e) => {
    e.stopPropagation();
    let nextIndex = (mainIndex + 1) % images.length;
    updateMainImage(nextIndex);
});

mainPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    let prevIndex = (mainIndex - 1 + images.length) % images.length;
    updateMainImage(prevIndex);
});
// MAIN GALLERY NAV

// MAIN THUMBNAILS
mainThumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        updateMainImage(index);
    });
});
// MAIN THUMBNAILS

// LIGHTBOX THUMBNAILS
lightboxThumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        updateLightboxImage(index);
    });
});

// BURGER MENU
if(burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        navigation.classList.toggle('active');
        overlay.classList.toggle('active');
    });
}

if(closeMenu) {
    closeMenu.addEventListener('click', () => {
        navigation.classList.remove('active');
        overlay.classList.remove('active');
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navigation && overlay) {
        navigation.classList.remove('active');
        overlay.classList.remove('active');
    }
});