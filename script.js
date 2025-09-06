// Update year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
	yearElement.textContent = new Date().getFullYear();
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const isOpen = siteNav.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});
}

// Reveal on scroll via IntersectionObserver
const revealEls = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window && revealEls.length) {
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('revealed');
				obs.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15 });
	revealEls.forEach(el => observer.observe(el));
} else {
	revealEls.forEach(el => el.classList.add('revealed'));
}

// Project filters
document.addEventListener('DOMContentLoaded', () => {
	const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
	const projectCards = Array.from(document.querySelectorAll('.project-card'));
	if (!filterButtons.length || !projectCards.length) return;

	function applyFilter(category) {
		projectCards.forEach(card => {
			const cardCategory = card.getAttribute('data-category');
			const match = category === 'all' || cardCategory === category;
			card.style.display = match ? '' : 'none';
		});
	}

	filterButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			filterButtons.forEach(b => {
				b.classList.remove('active');
				b.setAttribute('aria-selected', 'false');
			});
			btn.classList.add('active');
			btn.setAttribute('aria-selected', 'true');
			applyFilter(btn.dataset.filter || 'all');
		});
	});

	// Optional: keyboard navigation for tabs
	const tablist = document.querySelector('.filters');
	if (tablist) {
		tablist.addEventListener('keydown', (e) => {
			if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
			const currentIndex = filterButtons.findIndex(b => b.classList.contains('active'));
			let nextIndex = currentIndex + (e.key === 'ArrowRight' ? 1 : -1);
			if (nextIndex < 0) nextIndex = filterButtons.length - 1;
			if (nextIndex >= filterButtons.length) nextIndex = 0;
			filterButtons[nextIndex].focus();
			filterButtons[nextIndex].click();
		});
	}
});

// Lightbox for cards
const cards = document.querySelectorAll('.card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentAlbum = [];
let currentIndex = 0;

cards.forEach(card => {
  card.addEventListener('click', () => {
    const images = card.dataset.images ? card.dataset.images.split(',') : [];
    if (!images.length) return;
    currentAlbum = images;
    currentIndex = 0;
    showImage();
    lightbox.style.display = 'flex';
  });
});

function showImage() {
  lightboxImg.src = currentAlbum[currentIndex];
}

closeBtn.onclick = () => lightbox.style.display = 'none';
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
  showImage();
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentAlbum.length;
  showImage();
};

window.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'Escape') lightbox.style.display = 'none';
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

window.onclick = e => { if (e.target === lightbox) lightbox.style.display = 'none'; }

// Lightbox for cards
const cards = document.querySelectorAll('.card[data-images]');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentAlbum = [];
let currentIndex = 0;

cards.forEach(card => {
  card.addEventListener('click', () => {
    const images = card.dataset.images ? card.dataset.images.split(',') : [];
    if (!images.length) return;
    currentAlbum = images;
    currentIndex = 0;
    showImage();
    lightbox.style.display = 'flex';
  });
});

function showImage() {
  lightboxImg.src = currentAlbum[currentIndex];
}

closeBtn.onclick = () => lightbox.style.display = 'none';
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
  showImage();
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentAlbum.length;
  showImage();
};

window.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'Escape') lightbox.style.display = 'none';
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

window.onclick = e => { if (e.target === lightbox) lightbox.style.display = 'none'; }
