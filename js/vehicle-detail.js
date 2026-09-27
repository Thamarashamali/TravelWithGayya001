/**
 * TravelWithGayya - Vehicle Detail Page Engine
 * Uses shared data from js/data.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsAppFab();

  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = urlParams.get('id') || 'vitz-01';

  const veh = VEHICLES_DATA.find(v => v.id === vehicleId) || VEHICLES_DATA[0];
  renderVehicleDetails(veh);
  renderRelatedVehicles(veh.id);
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

function renderVehicleDetails(veh) {
  document.title = `${veh.name} - Vehicle Specs & Distance Booking | TravelWithGayya`;

  // Elements
  const badge = document.getElementById('vBadge');
  const title = document.getElementById('vTitle');
  const rate = document.getElementById('vRate');
  const img = document.getElementById('vImg');
  const desc = document.getElementById('vDesc');

  if (badge) badge.textContent = veh.badge;
  if (title) title.textContent = veh.name;
  if (rate) rate.textContent = `${veh.currency}${veh.ratePer100Km} / 100 km`;
  if (img) {
    img.src = veh.image;
    img.alt = veh.name;
  }
  if (desc) desc.textContent = veh.description;

  // Specs Grid
  const specsContainer = document.getElementById('vSpecsGrid');
  if (specsContainer) {
    specsContainer.innerHTML = `
      <div class="v-spec-box"><i class="fas fa-users"></i> <span>Capacity</span> <strong>${veh.passengers}</strong></div>
      <div class="v-spec-box"><i class="fas fa-cog"></i> <span>Transmission</span> <strong>${veh.transmission}</strong></div>
      <div class="v-spec-box"><i class="fas fa-gas-pump"></i> <span>Fuel Type</span> <strong>${veh.fuel}</strong></div>
      <div class="v-spec-box"><i class="fas fa-suitcase"></i> <span>Luggage</span> <strong>${veh.luggage}</strong></div>
      <div class="v-spec-box"><i class="fas fa-snowflake"></i> <span>AC Comfort</span> <strong>${veh.ac}</strong></div>
      <div class="v-spec-box"><i class="fas fa-user-tie"></i> <span>Chauffeur</span> <strong>${veh.driverOption}</strong></div>
    `;
  }

  // Features
  const featuresContainer = document.getElementById('vFeaturesList');
  if (featuresContainer && veh.features) {
    featuresContainer.innerHTML = veh.features.map(f => `
      <span class="v-feature-chip"><i class="fas fa-check-circle" style="color: var(--primary);"></i> ${f}</span>
    `).join('');
  }

  // Calculator Initialization
  const pickupLoc = document.getElementById('vehDetailPickup');
  const dropoffLoc = document.getElementById('vehDetailDropoff');
  const tripTypeRadios = document.querySelectorAll('input[name="vehDetailTripType"]');

  if (pickupLoc) pickupLoc.addEventListener('change', () => updateVehicleCalculator(veh));
  if (dropoffLoc) dropoffLoc.addEventListener('change', () => updateVehicleCalculator(veh));
  tripTypeRadios.forEach(radio => radio.addEventListener('change', () => updateVehicleCalculator(veh)));

  const today = new Date();
  const dateInput = document.getElementById('vehDetailDate');
  if (dateInput) dateInput.valueAsDate = today;

  updateVehicleCalculator(veh);

  // Form Submission
  const form = document.getElementById('vehicleDetailBookingForm');
  if (form) {
    form.addEventListener('submit', (e) => handleVehicleDetailSubmit(e, veh));
  }
}

function updateVehicleCalculator(veh) {
  const pickupLoc = document.getElementById('vehDetailPickup');
  const dropoffLoc = document.getElementById('vehDetailDropoff');
  const tripType = document.querySelector('input[name="vehDetailTripType"]:checked')?.value || 'one-way';

  if (!pickupLoc || !dropoffLoc) return;

  const oneWayDistance = lookupDistance(pickupLoc.value, dropoffLoc.value);
  const totalDistance = tripType === 'round-trip' ? oneWayDistance * 2 : oneWayDistance;
  const totalFee = Math.round((totalDistance / 100) * veh.ratePer100Km);

  const distEl = document.getElementById('vehCalcDistanceText');
  const rateEl = document.getElementById('vehCalcRateText');
  const feeEl = document.getElementById('vehCalcTotalFee');

  if (distEl) distEl.textContent = `${totalDistance} km (${tripType === 'round-trip' ? 'Round Trip' : 'One Way'})`;
  if (rateEl) rateEl.textContent = `$${veh.ratePer100Km} / 100 km`;
  if (feeEl) feeEl.textContent = `$${totalFee}`;
}

function handleVehicleDetailSubmit(e, veh) {
  e.preventDefault();

  const pickupLoc = document.getElementById('vehDetailPickup');
  const dropoffLoc = document.getElementById('vehDetailDropoff');
  const tripType = document.querySelector('input[name="vehDetailTripType"]:checked')?.value || 'one-way';
  const nameInput = document.getElementById('vehDetailName');
  const countryInput = document.getElementById('vehDetailCountry');
  const phoneInput = document.getElementById('vehDetailPhone');
  const dateInput = document.getElementById('vehDetailDate');
  const passengersInput = document.getElementById('vehDetailPassengers');
  const notesInput = document.getElementById('vehDetailNotes');

  const distanceStr = document.getElementById('vehCalcDistanceText')?.textContent || '100 km';
  const feeStr = document.getElementById('vehCalcTotalFee')?.textContent || `$${veh.ratePer100Km}`;

  if (!nameInput.value.trim() || !phoneInput.value.trim()) {
    alert("Please enter your name and WhatsApp phone number.");
    return;
  }

  let message = `🚗 *VEHICLE-ONLY DETAILED DISTANCE BOOKING REQUEST* - *TravelWithGayya*\n\n`;
  message += `📌 *Selected Vehicle:* ${veh.displayName}\n`;
  message += `📍 *Pickup Location:* ${pickupLoc.options[pickupLoc.selectedIndex].text}\n`;
  message += `📍 *Dropoff Destination:* ${dropoffLoc.options[dropoffLoc.selectedIndex].text}\n`;
  message += `🔄 *Journey Type:* ${tripType === 'round-trip' ? 'Round Trip (2x Distance)' : 'One Way'}\n`;
  message += `📏 *Calculated Distance:* ${distanceStr}\n`;
  message += `🏷️ *Vehicle Rate:* $${veh.ratePer100Km} / 100 km\n`;
  message += `👤 *Customer Name:* ${nameInput.value.trim()}\n`;
  message += `🌍 *Nationality:* ${countryInput.value.trim() || 'International Tourist'}\n`;
  message += `📞 *WhatsApp Number:* ${phoneInput.value.trim()}\n`;
  message += `👥 *Passengers:* ${passengersInput.value || '2'}\n`;
  message += `📅 *Travel Date:* ${dateInput.value || 'Soon'}\n`;

  if (notesInput.value.trim()) {
    message += `💬 *Special Requests:* ${notesInput.value.trim()}\n`;
  }

  message += `\n💰 *Total Calculated Fee:* ${feeStr}\n\n`;
  message += `*Hi Gayya! I viewed vehicle details for ${veh.name} on your website and would like to confirm vehicle availability (075 841 5148). Thank you!*`;

  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function renderRelatedVehicles(currentId) {
  const container = document.getElementById('relatedVehiclesGrid');
  if (!container) return;

  const otherVehicles = VEHICLES_DATA.filter(v => v.id !== currentId);

  container.innerHTML = otherVehicles.map(v => `
    <div class="vehicle-card" style="cursor: pointer;" onclick="window.location.href='vehicle-detail.html?id=${v.id}'">
      <span class="vehicle-badge">${v.badge}</span>
      <div class="vehicle-img-wrap">
        <img src="${v.image}" alt="${v.name}" loading="lazy">
      </div>
      <div class="vehicle-content">
        <div class="vehicle-header">
          <h3 class="vehicle-title">${v.name}</h3>
          <div class="vehicle-price">
            <span class="price-num">${v.currency}${v.ratePer100Km}</span>
            <span class="price-period">/ 100 km</span>
          </div>
        </div>
        <div class="vehicle-actions" style="margin-top: 1rem;">
          <a href="vehicle-detail.html?id=${v.id}" class="btn btn-whatsapp btn-sm" style="width:100%;" onclick="event.stopPropagation();">
            <i class="fas fa-arrow-right"></i> View Specs & Book
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
