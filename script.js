/* =========================================================
   HOTEL MAHDEV INN — SITE CONFIG
   ⚠️ CHANGE THESE TWO LINES BEFORE PUBLISHING ⚠️
   ========================================================= */
const WHATSAPP_NUMBER = "916392301235"; // country code + number, no + no spaces, e.g. 919876543210
const HOTEL_NAME = "Hotel Mahdev Inn";

/* ---------------------------------------------------------
   Helper: open WhatsApp with a prefilled message
   --------------------------------------------------------- */
function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

/* ---------------------------------------------------------
   Set default WhatsApp links (nav, hero, footer, floating btn)
   --------------------------------------------------------- */
function wireDefaultWhatsAppLinks() {
  const defaultMsg = `Hello ${HOTEL_NAME}! I'd like to know more about room availability.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;
  document.querySelectorAll(
    "#navWhatsapp, .hero-whatsapp, .footer-whatsapp, #floatWhatsapp"
  ).forEach(el => { el.href = url; });
}

/* ---------------------------------------------------------
   Loader
   --------------------------------------------------------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hide"), 350);
});

/* ---------------------------------------------------------
   Hero video playlist: play 3 clips one after another
   --------------------------------------------------------- */
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const heroClips = [
    "gettyimages-1458478810-640_adpp.mp4",
    "gettyimages-2166552330-640_adpp.mp4",
    "gettyimages-651686553-640_adpp.mp4"
  ];
  let heroClipIndex = 0;

  function playHeroClip(index) {
    heroClipIndex = index;
    heroVideo.src = heroClips[index];
    heroVideo.load();
    heroVideo.play().catch(() => {});
  }

  playHeroClip(0);
  heroVideo.classList.add("is-playing");

  setInterval(() => {
    const nextIndex = (heroClipIndex + 1) % heroClips.length;
    playHeroClip(nextIndex);
  }, 5000);
}

/* ---------------------------------------------------------
   Nav: solid background on scroll + mobile menu
   --------------------------------------------------------- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("solid", window.scrollY > 60);
});

const navBurger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
navBurger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ---------------------------------------------------------
   Room cards: "Book on WhatsApp" per room
   --------------------------------------------------------- */
document.querySelectorAll(".room-book-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".room-card");
    const room = card.dataset.room;
    const price = card.dataset.price;
    const message =
      `Hello ${HOTEL_NAME}! I'd like to book the *${room}* (${price}/night).\n\n` +
      `Check-in: \nCheck-out: \nGuests: \n\nPlease confirm availability.`;
    openWhatsApp(message);
  });
});

/* ---------------------------------------------------------
   Room carousel: image slider for each room
   --------------------------------------------------------- */
document.querySelectorAll(".room-card").forEach(card => {
  const carousel = card.querySelector(".room-carousel");
  const images = carousel.querySelectorAll(".room-img");
  const dotsContainer = card.querySelector(".carousel-dots");
  const prevBtn = card.querySelector(".carousel-prev");
  const nextBtn = card.querySelector(".carousel-next");
  
  let currentImageIndex = 0;

  // Create dots
  images.forEach((img, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showImage(index));
    dotsContainer.appendChild(dot);
  });

  function showImage(index) {
    // Remove active class from all images and dots
    images.forEach(img => img.classList.remove("active"));
    dotsContainer.querySelectorAll(".carousel-dot").forEach(dot => dot.classList.remove("active"));
    
    // Add active class to current image and dot
    images[index].classList.add("active");
    dotsContainer.querySelectorAll(".carousel-dot")[index].classList.add("active");
    currentImageIndex = index;
  }

  prevBtn.addEventListener("click", () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    showImage(newIndex);
  });
});

/* ---------------------------------------------------------
   Booking form: build message from fields, open WhatsApp
   --------------------------------------------------------- */
const bookForm = document.getElementById("bookForm");
if (bookForm) {
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const getFieldValue = (name, fallback = "Not provided") => {
      const field = bookForm.querySelector(`[name="${name}"]`);
      const value = field?.value?.trim();
      return value || fallback;
    };

    const name = getFieldValue("name");
    const phone = getFieldValue("phone");
    const room = getFieldValue("room");
    const guests = getFieldValue("guests");
    const checkin = getFieldValue("checkin");
    const checkout = getFieldValue("checkout");
    const notes = getFieldValue("notes", "None");

    const message =
      `Hello ${HOTEL_NAME}! I'd like to make a reservation.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Room Type:* ${room}\n` +
      `*Guests:* ${guests}\n` +
      `*Check-in:* ${checkin}\n` +
      `*Check-out:* ${checkout}\n` +
      `*Special Requests:* ${notes}\n\n` +
      `Please confirm availability. Thank you!`;

    openWhatsApp(message);
  });
}

/* ---------------------------------------------------------
   Gallery lightbox
   --------------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll("#galleryGrid img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});
document.getElementById("lightboxClose").addEventListener("click", () => {
  lightbox.classList.remove("open");
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("open");
});

/* ---------------------------------------------------------
   Footer year
   --------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   Scroll-reveal for sections (simple, respects reduced motion)
   --------------------------------------------------------- */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".welcome-copy, .welcome-media, .culture-card, .room-card, .amenity, .gallery-grid img, .book-form, .section-head"
  );
  revealTargets.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .7s ease, transform .7s ease";
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => io.observe(el));
}

/* ---------------------------------------------------------
   Minimum date = today for check-in / check-out
   --------------------------------------------------------- */
const today = new Date().toISOString().split("T")[0];
document.getElementById("fCheckin").min = today;
document.getElementById("fCheckout").min = today;
document.getElementById("fCheckin").addEventListener("change", (e) => {
  document.getElementById("fCheckout").min = e.target.value;
});

/* Init */
wireDefaultWhatsAppLinks();