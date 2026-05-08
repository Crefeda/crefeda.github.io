const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxMeta = document.querySelector(".lightbox-meta");
const lightboxClose = document.querySelector(".lightbox-close");
const photoGrid = document.querySelector(".dynamic-photo-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const featuredPhoto = document.querySelector(".featured-photo");
const featuredTitle = document.querySelector(".featured-title");
const featuredMeta = document.querySelector(".featured-meta");
const featuredDescription = document.querySelector("#featured-description");
const photoCount = document.querySelector("#photo-count");
const shufflePhoto = document.querySelector("#shuffle-photo");

const photos = [
  {
    title: "Dawn Over the Ridge",
    category: "landscape",
    label: "Landscape",
    location: "Highlands",
    year: "2026",
    description: "Early light, layered hills, and a quiet frame for the top of the gallery.",
    tone:
      "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0)), linear-gradient(145deg, #233d4d, #c89752 52%, #423244)",
    size: "wide",
  },
  {
    title: "Crosswalk Study",
    category: "street",
    label: "Street",
    location: "London",
    year: "2025",
    description: "A placeholder for candid urban geometry, movement, and everyday texture.",
    tone:
      "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0)), linear-gradient(145deg, #2d3039, #7f9389)",
    size: "standard",
  },
  {
    title: "Harbor Blue Hour",
    category: "travel",
    label: "Travel",
    location: "Lisbon",
    year: "2025",
    description: "Use this for travel work with atmosphere, scale, and a clear sense of place.",
    tone:
      "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0)), linear-gradient(145deg, #243b4a, #6c9cb3)",
    size: "tall",
  },
  {
    title: "Window Light Portrait",
    category: "portrait",
    label: "Portrait",
    location: "Studio",
    year: "2024",
    description: "A portrait placeholder for a human moment, controlled light, or editorial work.",
    tone:
      "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0)), linear-gradient(145deg, #4c3047, #b46367)",
    size: "standard",
  },
  {
    title: "Concrete Lines",
    category: "street",
    label: "Street",
    location: "New York",
    year: "2024",
    description: "A graphic architectural frame for shadows, shapes, and clean composition.",
    tone:
      "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0)), linear-gradient(145deg, #363b3f, #b88f66)",
    size: "standard",
  },
  {
    title: "Cloud Break",
    category: "landscape",
    label: "Landscape",
    location: "Lake District",
    year: "2023",
    description: "A landscape placeholder built for dramatic weather and a wide crop.",
    tone:
      "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0)), linear-gradient(145deg, #233d2f, #b0a85c)",
    size: "wide",
  },
];

let activeFilter = "all";
let featuredIndex = 0;

document.querySelector("#year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

function photoMeta(photo) {
  return `${photo.label} / ${photo.location} / ${photo.year}`;
}

function visiblePhotos() {
  return photos.filter((photo) => activeFilter === "all" || photo.category === activeFilter);
}

function openPhoto(photo) {
  lightboxTitle.textContent = photo.title;
  lightboxMeta.textContent = photoMeta(photo);
  lightboxImage.style.background = photo.tone;
  lightbox.showModal();
}

function setFeatured(index) {
  featuredIndex = index;
  const photo = photos[featuredIndex];

  featuredPhoto.style.background = photo.tone;
  featuredTitle.textContent = photo.title;
  featuredMeta.textContent = photoMeta(photo);
  featuredDescription.textContent = photo.description;

  document.querySelectorAll(".photo-tile").forEach((tile) => {
    tile.classList.toggle("is-featured", Number(tile.dataset.index) === featuredIndex);
  });
}

function renderPhotos() {
  const matches = visiblePhotos();

  photoGrid.innerHTML = "";
  photoCount.textContent = matches.length;

  matches.forEach((photo) => {
    const index = photos.indexOf(photo);
    const tile = document.createElement("button");
    tile.className = `photo-tile is-entering photo-${photo.size}`;
    tile.type = "button";
    tile.dataset.index = String(index);
    tile.style.background = photo.tone;
    tile.setAttribute("aria-label", `Open ${photo.title}`);
    tile.innerHTML = `<span>${photo.label}<strong>${photo.title}</strong></span>`;
    tile.addEventListener("click", () => {
      setFeatured(index);
      openPhoto(photo);
    });
    photoGrid.append(tile);
  });

  setFeatured(matches.includes(photos[featuredIndex]) ? featuredIndex : photos.indexOf(matches[0]));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderPhotos();
  });
});

featuredPhoto.addEventListener("click", () => {
  openPhoto(photos[featuredIndex]);
});

shufflePhoto.addEventListener("click", () => {
  const matches = visiblePhotos();
  const currentPosition = matches.indexOf(photos[featuredIndex]);
  const nextPhoto = matches[(currentPosition + 1) % matches.length];
  setFeatured(photos.indexOf(nextPhoto));
});

lightboxClose.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

renderPhotos();
