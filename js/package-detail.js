/**
 * TravelWithGayya - Package Detail Page Engine
 * Uses shared data from js/data.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsAppFab();
  
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get('id') || 'pkg-kandy-ella';

  const pkg = PACKAGES_DATA.find(p => p.id === packageId) || PACKAGES_DATA[0];
  renderPackageDetails(pkg);
  renderRelatedPackages(pkg.id);
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

function renderPackageDetails(pkg) {
  document.title = `${pkg.name} - Detailed Itinerary & Booking | TravelWithGayya`;

  // Hero elements
  const banner = document.getElementById('detailHeroBanner');
  const badge = document.getElementById('detailBadge');
  const title = document.getElementById('detailTitle');
  const duration = document.getElementById('detailDuration');
  const desc = document.getElementById('detailDesc');

  if (banner) banner.style.backgroundImage = `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url('${pkg.image}')`;
  if (badge) badge.textContent = pkg.badge;
  if (title) title.textContent = pkg.name;
  if (duration) duration.textContent = pkg.durationText;
  if (desc) desc.textContent = pkg.description;

  // Itinerary
  const itineraryContainer = document.getElementById('detailItinerary');
  if (itineraryContainer && pkg.itinerary) {
    itineraryContainer.innerHTML = pkg.itinerary.map(item => `
      <div class="itinerary-node">
        <div class="itinerary-day-badge">${item.day}</div>
        <div class="itinerary-info">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Highlights
  const highlightsContainer = document.getElementById('detailHighlights');
  if (highlightsContainer && pkg.highlights) {
    highlightsContainer.innerHTML = pkg.highlights.map(h => `
      <span class="highlight-chip"><i class="fas fa-star" style="color: var(--secondary);"></i> ${h}</span>
    `).join('');
  }

  // Included & Excluded
  const incContainer = document.getElementById('detailIncluded');
  const excContainer = document.getElementById('detailExcluded');

  if (incContainer && pkg.included) {
    incContainer.innerHTML = pkg.included.map(i => `
      <li><i class="fas fa-check-circle" style="color: var(--primary);"></i> ${i}</li>
    `).join('');
  }

  if (excContainer && pkg.excluded) {
    excContainer.innerHTML = pkg.excluded.map(e => `
      <li><i class="fas fa-times-circle" style="color: #ef4444;"></i> ${e}</li>
    `).join('');
  }

  // Vehicle Rates Comparison Matrix
  const ratesContainer = document.getElementById('detailVehicleRates');
  if (ratesContainer) {
    ratesContainer.innerHTML = VEHICLES_DATA.map(v => {
      const price = pkg.vehiclePrices[v.id] || 'Quote';
      return `
        <div class="vehicle-rate-card ${v.id === 'vitz-01' ? 'popular-rate' : ''}">
          <div class="rate-veh-img">
            <img src="${v.image}" alt="${v.name}">
          </div>
          <div class="rate-veh-info">
            <h5>${v.name}</h5>
            <p><i class="fas fa-users"></i> ${v.passengers} • ${v.ac}</p>
          </div>
          <div class="rate-veh-price">
            <span class="rate-amount">$${price}</span>
            <span class="rate-label">Fixed Total</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Booking Form Initialization
  const vehicleSelect = document.getElementById('pkgFormVehicleSelect');
  if (vehicleSelect) {
    vehicleSelect.innerHTML = VEHICLES_DATA.map(v => {
      const price = pkg.vehiclePrices[v.id] || 200;
      return `<option value="${v.id}">${v.name} - $${price} Fixed</option>`;
    }).join('');

    vehicleSelect.addEventListener('change', () => updateFormPricing(pkg));
  }

  const today = new Date();
  const dateInput = document.getElementById('pkgFormStartDate');
  if (dateInput) dateInput.valueAsDate = today;

  updateFormPricing(pkg);

  // Form submit listener
  const form = document.getElementById('packageDetailBookingForm');
  if (form) {
    form.addEventListener('submit', (e) => handleDetailFormSubmit(e, pkg));
  }
}

function updateFormPricing(pkg) {
  const vehicleSelect = document.getElementById('pkgFormVehicleSelect');
  const priceEl = document.getElementById('pkgFormTotalPrice');
  const durationEl = document.getElementById('pkgFormDurationText');
  const vehNameEl = document.getElementById('pkgFormSelectedVehName');

  if (!vehicleSelect) return;

  const selectedVehId = vehicleSelect.value;
  const veh = VEHICLES_DATA.find(v => v.id === selectedVehId) || VEHICLES_DATA[0];
  const price = pkg.vehiclePrices[veh.id] || 200;

  if (priceEl) priceEl.textContent = `$${price}`;
  if (durationEl) durationEl.textContent = pkg.durationText;
  if (vehNameEl) vehNameEl.textContent = veh.name;
}

function handleDetailFormSubmit(e, pkg) {
  e.preventDefault();

  const vehicleSelect = document.getElementById('pkgFormVehicleSelect');
  const nameInput = document.getElementById('pkgFormName');
  const countryInput = document.getElementById('pkgFormCountry');
  const phoneInput = document.getElementById('pkgFormPhone');
  const dateInput = document.getElementById('pkgFormStartDate');
  const passengersInput = document.getElementById('pkgFormPassengers');
  const notesInput = document.getElementById('pkgFormNotes');

  const veh = VEHICLES_DATA.find(v => v.id === vehicleSelect.value) || VEHICLES_DATA[0];
  const price = document.getElementById('pkgFormTotalPrice')?.textContent || `$${pkg.vehiclePrices[veh.id]}`;

  if (!nameInput.value.trim() || !phoneInput.value.trim()) {
    alert("Please enter your name and WhatsApp phone number.");
    return;
  }

  let message = `🌴 *TOUR PACKAGE DETAILED BOOKING REQUEST* - *TravelWithGayya*\n\n`;
  message += `📌 *Tour Package:* ${pkg.name}\n`;
  message += `⏱️ *Duration:* ${pkg.durationText}\n`;
  message += `🚗 *Selected Vehicle:* ${veh.displayName}\n`;
  message += `👤 *Customer Name:* ${nameInput.value.trim()}\n`;
  message += `🌍 *Nationality:* ${countryInput.value.trim() || 'International Tourist'}\n`;
  message += `📞 *WhatsApp Number:* ${phoneInput.value.trim()}\n`;
  message += `📅 *Preferred Start Date:* ${dateInput.value || 'Soon'}\n`;
  message += `👥 *Number of Guests:* ${passengersInput.value || '2'}\n`;

  if (notesInput.value.trim()) {
    message += `💬 *Hotel Pickup / Notes:* ${notesInput.value.trim()}\n`;
  }

  message += `\n💰 *Total Fixed Package Price:* ${price}\n\n`;
  message += `*Hi Gayya! I viewed this tour package details on your website and would like to confirm booking (075 841 5148). Thank you!*`;

  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function renderRelatedPackages(currentId) {
  const container = document.getElementById('relatedPackagesGrid');
  if (!container) return;

  const otherPackages = PACKAGES_DATA.filter(p => p.id !== currentId).slice(0, 3);

  container.innerHTML = otherPackages.map(pkg => `
    <div class="package-card attraction-card" style="cursor: pointer;" onclick="window.location.href='package-detail.html?id=${pkg.id}'">
      <div class="attraction-img-wrap">
        <img src="${pkg.image}" alt="${pkg.name}" loading="lazy">
        <span class="attraction-badge">${pkg.badge}</span>
      </div>
      <div class="attraction-content">
        <h3>${pkg.name}</h3>
        <p class="attraction-desc">${pkg.description}</p>
        <div class="attraction-footer" style="margin-top: 1rem;">
          <span class="attraction-rec">From $${pkg.vehiclePrices['vitz-01']} Fixed</span>
          <a href="package-detail.html?id=${pkg.id}" class="btn btn-whatsapp btn-sm" onclick="event.stopPropagation();">
            <i class="fas fa-arrow-right"></i> View Details
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function initWhatsAppFab() {
  const fab = document.getElementById('whatsappFab');
  const quickBox = document.getElementById('waQuickBox');
  const closeQuick = document.getElementById('closeWaQuick');

  if (fab && quickBox) {
    fab.addEventListener('click', () => {
      quickBox.classList.toggle('active');
    });
  }

  if (closeQuick && quickBox) {
    closeQuick.addEventListener('click', () => {
      quickBox.classList.remove('active');
    });
  }
}
