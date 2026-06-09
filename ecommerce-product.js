const burgerMenu = document.querySelector('.burger-menu');
const navigation = document.querySelector('.navigation');
const closeMenu = document.querySelector('.close-menu');
const overlay = document.querySelector('.overlay');

const images = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg"
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

const cartIcon = document.querySelector(".shopping-cart-btn");
const cartBasket = document.getElementById("cartBasket");
const cartQuantity = document.querySelector(".cart-count");

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const quantityCount = document.querySelector(".quantity-count");

const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartItems = document.querySelector(".cart-basket-item");
const checkOut = document.querySelector(".checkout");

let mainIndex = 0;
let lightboxIndex = 0;

let count = 0;
let totalCartQuantity = 0;

const updateCount = (newCount) => {
    count = newCount;
    quantityCount.textContent = count;

    addToCartBtn.disabled = (count === 0);
};

updateCount(0);

minus.addEventListener("click", () => {
    if (count > 0) {
        updateCount(count - 1);
    }
});

plus.addEventListener("click", () => {
    updateCount(count + 1);
});

// CART MODAL
cartIcon.addEventListener('click', () => {
    cartBasket.classList.toggle("show");   
});

const updateTotalCartQuantity = () => {
    const cartItemList = document.querySelectorAll(".cart-item"); 
    totalCartQuantity = 0;

    cartItemList.forEach((item) => {
        totalCartQuantity += parseInt(item.dataset.quantity);
    });

    cartQuantity.textContent = totalCartQuantity;
};

const addItemToCart = (name, price, imageSrc) => {
    const existingItem = cartItems.querySelector(".cart-item");

    if (existingItem) {
        const newQty = count;
        existingItem.dataset.quantity = newQty;

        const newTotalPrice = newQty * price;

        const textContainer = existingItem.querySelector(".item-details p");
        textContainer.innerHTML = `
            $${price.toFixed(2)} x ${newQty}
            <span class="total-price">$${newTotalPrice.toFixed(2)}</span>
        `;

        updateTotalCartQuantity();
        return; 
    }

    const totalPrice = count * price;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.quantity = count;
    cartItem.innerHTML = `
        <img src="${imageSrc}" alt="${name}" />
        <div class="item-details">
            <div class="item-details-txt">
                ${name}
            </div>
            <div>
                <p>
                    $${price.toFixed(2)} x ${count}
                    <span class="total-price">$${totalPrice.toFixed(2)}</span>
                </p>
            </div>
        </div>
        <button class="delete-item"> 
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" fill="#C3CAD9"/></svg>
        </button>
    `;

    cartItems.appendChild(cartItem); 

    updateTotalCartQuantity(); 

    if (cartItems.classList.contains("empty")) {
        cartItems.classList.remove("empty");
        checkOut.classList.remove("empty");
    }

    const deleteButton = cartItem.querySelector(".delete-item");
    deleteButton.addEventListener("click", (event) => {
        const itemRow = event.target.closest(".cart-item");
        removeItemFromCart(itemRow);
    });
};

addToCartBtn.addEventListener("click", () => {
    if (count === 0) return;
    const productName = document.querySelector(".product-container .product-header").textContent;
    const productPriceEl = document.querySelector(".product-container .discounted-price");
    const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
    const productImg = document
    .querySelector(".product-gallery #mainProductImage")
    .getAttribute("src");

    addItemToCart(productName, productPrice, productImg);
    cartBasket.classList.add("active");
});

const removeItemFromCart = (cartItem) => {
    cartItem.remove();

    if (typeof updateCount === "function") {
        updateCount(0); 
    }
    
    updateTotalCartQuantity();
    
    if (cartItems.querySelectorAll(".cart-item").length === 0) {
        cartItems.classList.add("empty");
        checkOut.classList.add("empty");
    }
};

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

window.addEventListener("resize", () => {
    if (window.innerWidth <= 1024) {
        lightbox.classList.remove("show"); 
    }
});

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
    let prevIndex = (lightboxIndex - 1 + images.length) % images.length;
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
