/**
 * TravelWithGayya - Main JavaScript Application (Index Page)
 * Uses shared data from js/data.js
 */

/* Initial Reviews Data */
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Sarah & Marcus Jenkins",
    country: "United Kingdom 🇬🇧",
    avatar: "S",
    rating: 5,
    date: "September 2026",
    vehicle: "Large Van",
    text: "We booked a Large Van for our family tour around Kandy, Nuwara Eliya, and Ella. Gayya made everything seamless via WhatsApp (075 841 5148)! The vehicle was pristine, cold AC, and our driver was amazing."
  },
  {
    id: 2,
    name: "Lukas Weber",
    country: "Germany 🇩🇪",
    avatar: "L",
    rating: 5,
    date: "August 2026",
    vehicle: "Hatchbacks",
    text: "Renting a compact Hatchback from TravelWithGayya was perfect for exploring Sri Lanka! Fuel efficient, super clean car, ice-cold AC. Instant response on WhatsApp whenever we had questions!"
  },
  {
    id: 3,
    name: "Chloe & Jean Dupont",
    country: "France 🇫🇷",
    avatar: "C",
    rating: 5,
    date: "August 2026",
    vehicle: "Small Van",
    text: "We traveled as a group of 7. The Small Van was spacious and comfortable. Our chauffeur was punctual, friendly, and gave us the best local food recommendations in Galle. 100% recommended!"
  },
  {
    id: 4,
    name: "David & Emily Miller",
    country: "Australia 🇦🇺",
    avatar: "D",
    rating: 5,
    date: "July 2026",
    vehicle: "Sedans",
    text: "Booked a comfortable Sedan for our coastal drive from Colombo to Galle and Ella. Smooth experience, transparent distance pricing with zero hidden fees!"
  }
];

let reviewsState = JSON.parse(localStorage.getItem('travelWithGayya_reviews')) || INITIAL_REVIEWS;

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderFleetCards(VEHICLES_DATA);
  renderPackagesGrid();
  renderReviews();
  initFaqAccordion();
  initBookingModals();
  initReviewForm();
  initWhatsAppFab();
  bindGlobalEvents();
});

/* ==========================================================================
   Navbar & Navigation
   ========================================================================== */
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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
          }
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ==========================================================================
   Render Tour Packages Section
   Redirects to package-detail.html?id=... on click!
   ========================================================================== */
function renderPackagesGrid() {
  const track = document.getElementById('packagesTrack') || document.getElementById('attractionsTrack');
  const container = document.getElementById('packagesContainer') || document.getElementById('attractionsContainer');
  const leftBtn = document.getElementById('scrollAttractionsLeft');
  const rightBtn = document.getElementById('scrollAttractionsRight');

  if (!track) return;

  track.innerHTML = PACKAGES_DATA.map(pkg => `
    <div class="package-card attraction-card" style="cursor: pointer;" onclick="window.location.href='package-detail.html?id=${pkg.id}'">
      <div class="attraction-img-wrap">
        <img src="${pkg.image}" alt="${pkg.name}" loading="lazy" onerror="this.src='images/New/Sigiriya Ancient Rock.jpeg'">
        <span class="attraction-badge">${pkg.badge}</span>
      </div>
      <div class="attraction-content">
        <h3>${pkg.name}</h3>
        <div class="attraction-info" style="margin-bottom: 0.5rem;">
          <span><i class="fas fa-clock" style="color: var(--secondary); margin-right:4px;"></i> <strong>${pkg.durationText}</strong></span>
        </div>
        <p class="attraction-desc">${pkg.description}</p>
        
        <div class="package-vehicle-pricing-preview">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-white-muted); display: block; margin-bottom: 4px;">
            <i class="fas fa-tags" style="color: var(--secondary);"></i> Fixed Package Rates:
          </span>
          <div class="pricing-mini-list">
            <span class="mini-price-tag">Hatchback: <strong>$${pkg.vehiclePrices['vitz-01']}</strong></span>
            <span class="mini-price-tag">Small Van: <strong>$${pkg.vehiclePrices['hiace-gl-01']}</strong></span>
            <span class="mini-price-tag">Large Van: <strong>$${pkg.vehiclePrices['hiace-sgl-01']}</strong></span>
            <span class="mini-price-tag">Sedan: <strong>$${pkg.vehiclePrices['sedan-01']}</strong></span>
          </div>
        </div>

        <div class="attraction-footer" style="margin-top: 1rem;">
          <span class="attraction-rec" style="font-size: 0.8rem;">From $${pkg.vehiclePrices['vitz-01']} Fixed</span>
          <a href="package-detail.html?id=${pkg.id}" class="btn btn-whatsapp btn-sm" onclick="event.stopPropagation();">
            <i class="fas fa-info-circle"></i> Book Tour Package
          </a>
        </div>
      </div>
    </div>
  `).join('');

  if (leftBtn && rightBtn && container) {
    leftBtn.onclick = () => container.scrollBy({ left: -360, behavior: 'smooth' });
    rightBtn.onclick = () => container.scrollBy({ left: 360, behavior: 'smooth' });
  }
}

/* ==========================================================================
   Render Vehicle Fleet Grid
   Redirects to vehicle-detail.html?id=... on click!
   ========================================================================== */
function renderFleetCards(vehicles) {
  const fleetGrid = document.getElementById('fleetGrid');
  if (!fleetGrid) return;

  fleetGrid.innerHTML = vehicles.map(v => `
    <div class="vehicle-card" data-category="${v.category}" style="cursor: pointer;" onclick="window.location.href='vehicle-detail.html?id=${v.id}'">
      <span class="vehicle-badge">${v.badge}</span>
      <div class="vehicle-img-wrap">
        <img src="${v.image}" alt="${v.name}" loading="lazy" onerror="this.src='images/New/Toyota_Axio.png'">
      </div>
      <div class="vehicle-content">
        <div class="vehicle-header">
          <div>
            <h3 class="vehicle-title">${v.name}</h3>
          </div>
          <div class="vehicle-price">
            <span class="price-num">${v.currency}${v.ratePer100Km}</span>
            <span class="price-period">/ 100 km</span>
          </div>
        </div>

        <div class="vehicle-specs">
          <div class="spec-item"><i class="fas fa-users"></i> ${v.passengers}</div>
          <div class="spec-item"><i class="fas fa-cog"></i> ${v.transmission}</div>
          <div class="spec-item"><i class="fas fa-suitcase"></i> ${v.luggage}</div>
          <div class="spec-item"><i class="fas fa-snowflake"></i> ${v.ac}</div>
        </div>

        <div class="vehicle-features">
          ${v.features.map(f => `<span class="feature-tag"><i class="fas fa-check" style="color: var(--primary); margin-right:4px;"></i> ${f}</span>`).join('')}
        </div>

        <div class="vehicle-actions" style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <a href="vehicle-detail.html?id=${v.id}" class="btn btn-whatsapp" style="flex: 1;" onclick="event.stopPropagation();">
            <i class="fas fa-info-circle"></i> Book Vehicle Only
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Booking Modals & Calculation Logic (Modal inside Index fallback)
   ========================================================================== */
function initBookingModals() {
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeBookingModal');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  const tabPkgBtn = document.getElementById('tabPkgBtn');
  const tabVehBtn = document.getElementById('tabVehBtn');

  if (tabPkgBtn && tabVehBtn) {
    tabPkgBtn.addEventListener('click', () => switchBookingTab('package'));
    tabVehBtn.addEventListener('click', () => switchBookingTab('vehicle'));
  }

  const pkgSelect = document.getElementById('modalPackageSelect');
  const pkgVehSelect = document.getElementById('modalPkgVehicleSelect');
  if (pkgSelect) pkgSelect.addEventListener('change', updatePackageCalculation);
  if (pkgVehSelect) pkgVehSelect.addEventListener('change', updatePackageCalculation);

  const vehVehSelect = document.getElementById('modalVehOnlySelect');
  const pickupLoc = document.getElementById('vehPickupLocation');
  const dropoffLoc = document.getElementById('vehDropoffLocation');
  const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');

  if (vehVehSelect) vehVehSelect.addEventListener('change', updateVehicleOnlyCalculation);
  if (pickupLoc) pickupLoc.addEventListener('change', updateVehicleOnlyCalculation);
  if (dropoffLoc) dropoffLoc.addEventListener('change', updateVehicleOnlyCalculation);
  tripTypeRadios.forEach(radio => radio.addEventListener('change', updateVehicleOnlyCalculation));

  const pkgForm = document.getElementById('packageBookingForm');
  const vehForm = document.getElementById('vehicleOnlyBookingForm');

  if (pkgForm) pkgForm.addEventListener('submit', handlePackageBookingSubmit);
  if (vehForm) vehForm.addEventListener('submit', handleVehicleOnlyBookingSubmit);
}

function switchBookingTab(tab) {
  const tabPkgBtn = document.getElementById('tabPkgBtn');
  const tabVehBtn = document.getElementById('tabVehBtn');
  const pkgSection = document.getElementById('packageBookingSection');
  const vehSection = document.getElementById('vehicleOnlyBookingSection');

  if (tab === 'package') {
    if (tabPkgBtn) tabPkgBtn.classList.add('active');
    if (tabVehBtn) tabVehBtn.classList.remove('active');
    if (pkgSection) pkgSection.style.display = 'block';
    if (vehSection) vehSection.style.display = 'none';
    updatePackageCalculation();
  } else {
    if (tabVehBtn) tabVehBtn.classList.add('active');
    if (tabPkgBtn) tabPkgBtn.classList.remove('active');
    if (vehSection) vehSection.style.display = 'block';
    if (pkgSection) pkgSection.style.display = 'none';
    updateVehicleOnlyCalculation();
  }
}

function updatePackageCalculation() {
  const pkgSelect = document.getElementById('modalPackageSelect');
  const pkgVehSelect = document.getElementById('modalPkgVehicleSelect');
  if (!pkgSelect || !pkgVehSelect) return;

  const pkgId = pkgSelect.value;
  const vehId = pkgVehSelect.value;

  const pkg = PACKAGES_DATA.find(p => p.id === pkgId) || PACKAGES_DATA[0];
  const veh = VEHICLES_DATA.find(v => v.id === vehId) || VEHICLES_DATA[0];

  const price = pkg.vehiclePrices[veh.id] || 200;

  const durationEl = document.getElementById('calcPkgDuration');
  const totalEl = document.getElementById('calcPkgTotal');
  const imgPreview = document.getElementById('pkgVehicleImg');

  if (durationEl) durationEl.textContent = pkg.durationText;
  if (totalEl) totalEl.textContent = `$${price}`;
  if (imgPreview) imgPreview.src = veh.image;
}

function updateVehicleOnlyCalculation() {
  const vehSelect = document.getElementById('modalVehOnlySelect');
  const pickupSelect = document.getElementById('vehPickupLocation');
  const dropoffSelect = document.getElementById('vehDropoffLocation');
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'one-way';

  if (!vehSelect || !pickupSelect || !dropoffSelect) return;

  const veh = VEHICLES_DATA.find(v => v.id === vehSelect.value) || VEHICLES_DATA[0];
  const oneWayDistance = lookupDistance(pickupSelect.value, dropoffSelect.value);

  const totalDistance = tripType === 'round-trip' ? oneWayDistance * 2 : oneWayDistance;
  const totalFee = Math.round((totalDistance / 100) * veh.ratePer100Km);

  const distEl = document.getElementById('calcVehDistance');
  const rateEl = document.getElementById('calcVehRate');
  const feeEl = document.getElementById('calcVehTotalFee');
  const imgPreview = document.getElementById('vehOnlyImg');

  if (distEl) distEl.textContent = `${totalDistance} km (${tripType === 'round-trip' ? 'Round Trip' : 'One Way'})`;
  if (rateEl) rateEl.textContent = `$${veh.ratePer100Km} / 100 km`;
  if (feeEl) feeEl.textContent = `$${totalFee}`;
  if (imgPreview) imgPreview.src = veh.image;
}

function handlePackageBookingSubmit(e) {
  e.preventDefault();
  const pkgSelect = document.getElementById('modalPackageSelect');
  const vehSelect = document.getElementById('modalPkgVehicleSelect');
  const nameInput = document.getElementById('pkgCustomerName');
  const countryInput = document.getElementById('pkgCustomerCountry');
  const phoneInput = document.getElementById('pkgCustomerPhone');
  const dateInput = document.getElementById('pkgStartDate');
  const notesInput = document.getElementById('pkgSpecialNotes');

  const pkg = PACKAGES_DATA.find(p => p.id === pkgSelect.value);
  const veh = VEHICLES_DATA.find(v => v.id === vehSelect.value);
  const price = document.getElementById('calcPkgTotal').textContent;

  if (!nameInput.value.trim() || !phoneInput.value.trim()) {
    alert("Please fill in your name and WhatsApp phone number.");
    return;
  }

  let message = `🌴 *TOUR PACKAGE BOOKING REQUEST* - *TravelWithGayya*\n\n`;
  message += `📌 *Booking Type:* Tour Package\n`;
  message += `🏛️ *Destination Package:* ${pkg.name}\n`;
  message += `⏱️ *Duration:* ${pkg.durationText}\n`;
  message += `🚗 *Selected Vehicle:* ${veh.displayName}\n`;
  message += `👤 *Customer Name:* ${nameInput.value.trim()}\n`;
  message += `🌍 *Country/Nationality:* ${countryInput.value.trim() || 'International Traveler'}\n`;
  message += `📞 *WhatsApp Number:* ${phoneInput.value.trim()}\n`;
  message += `📅 *Preferred Start Date:* ${dateInput.value || 'As soon as possible'}\n`;

  if (notesInput.value.trim()) {
    message += `💬 *Notes / Requests:* ${notesInput.value.trim()}\n`;
  }

  message += `\n💰 *Fixed Package Price:* ${price}\n\n`;
  message += `*Hi Gayya! Please confirm availability for this Tour Package (075 841 5148). Thank you!*`;

  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById('bookingModal').classList.remove('active');
  window.open(url, '_blank');
}

function handleVehicleOnlyBookingSubmit(e) {
  e.preventDefault();
  const vehSelect = document.getElementById('modalVehOnlySelect');
  const pickupSelect = document.getElementById('vehPickupLocation');
  const dropoffSelect = document.getElementById('vehDropoffLocation');
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'one-way';
  const nameInput = document.getElementById('vehCustomerName');
  const countryInput = document.getElementById('vehCustomerCountry');
  const phoneInput = document.getElementById('vehCustomerPhone');
  const dateInput = document.getElementById('vehTravelDate');
  const passengersInput = document.getElementById('vehPassengers');
  const notesInput = document.getElementById('vehSpecialNotes');

  const veh = VEHICLES_DATA.find(v => v.id === vehSelect.value);
  const distanceStr = document.getElementById('calcVehDistance').textContent;
  const rateStr = document.getElementById('calcVehRate').textContent;
  const feeStr = document.getElementById('calcVehTotalFee').textContent;

  if (!nameInput.value.trim() || !phoneInput.value.trim()) {
    alert("Please fill in your name and WhatsApp phone number.");
    return;
  }

  let message = `🚗 *VEHICLE-ONLY DISTANCE BOOKING REQUEST* - *TravelWithGayya*\n\n`;
  message += `📌 *Booking Type:* Vehicle Only (Distance Based)\n`;
  message += `🚗 *Selected Vehicle:* ${veh.displayName}\n`;
  message += `📍 *Pickup Location:* ${pickupSelect.options[pickupSelect.selectedIndex].text}\n`;
  message += `📍 *Destination:* ${dropoffSelect.options[dropoffSelect.selectedIndex].text}\n`;
  message += `🔄 *Trip Type:* ${tripType === 'round-trip' ? 'Round Trip' : 'One Way'}\n`;
  message += `📏 *Total Distance:* ${distanceStr}\n`;
  message += `🏷️ *Vehicle Rate:* ${rateStr}\n`;
  message += `👤 *Customer Name:* ${nameInput.value.trim()}\n`;
  message += `🌍 *Country/Nationality:* ${countryInput.value.trim() || 'International Traveler'}\n`;
  message += `📞 *WhatsApp Number:* ${phoneInput.value.trim()}\n`;
  message += `👥 *Passengers:* ${passengersInput.value || '1-4'}\n`;
  message += `📅 *Travel Date:* ${dateInput.value || 'Today'}\n`;

  if (notesInput.value.trim()) {
    message += `💬 *Special Requests:* ${notesInput.value.trim()}\n`;
  }

  message += `\n💰 *Total Vehicle Fee:* ${feeStr}\n\n`;
  message += `*Hi Gayya! Please confirm vehicle availability for this distance booking (075 841 5148). Thank you!*`;

  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById('bookingModal').classList.remove('active');
  window.open(url, '_blank');
}

/* Quick Search from Hero Section */
function bindGlobalEvents() {
  const heroForm = document.getElementById('heroSearchForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mode = document.getElementById('searchMode')?.value || 'package';
      const category = document.getElementById('searchCategory')?.value || 'vitz-01';
      if (mode === 'package') {
        window.location.href = `package-detail.html?id=pkg-kandy-ella`;
      } else {
        window.location.href = `vehicle-detail.html?id=${category}`;
      }
    });
  }
}

/* Reviews */
function renderReviews() {
  const reviewsGrid = document.getElementById('reviewsGrid');
  if (!reviewsGrid) return;

  reviewsGrid.innerHTML = reviewsState.map(r => `
    <div class="review-card">
      <div class="review-user">
        <div class="user-avatar">${r.avatar}</div>
        <div class="user-info">
          <h4>${r.name}</h4>
          <p>${r.country} <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified Booking</span></p>
        </div>
      </div>
      <div class="stars" style="margin-bottom: 0.8rem;">
        ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
      </div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-footer">
        <span>Rented: <strong>${r.vehicle}</strong></span>
        <span>${r.date}</span>
      </div>
    </div>
  `).join('');
}

function initReviewForm() {
  const reviewForm = document.getElementById('addReviewForm');
  if (!reviewForm) return;

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const country = document.getElementById('reviewCountry').value.trim();
    const vehicle = document.getElementById('reviewVehicle').value;
    const rating = parseInt(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !text) return;

    const newReview = {
      id: Date.now(),
      name: name,
      country: country || 'Tourist',
      avatar: name.charAt(0).toUpperCase(),
      rating: rating,
      date: 'Just now',
      vehicle: vehicle,
      text: text
    };

    reviewsState.unshift(newReview);
    localStorage.setItem('travelWithGayya_reviews', JSON.stringify(reviewsState));
    renderReviews();

    reviewForm.reset();
    alert('Thank you for your review! It has been posted successfully.');
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* WhatsApp FAB */
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

function sendQuickWhatsApp(customMsg) {
  let text = customMsg || "Hi Gayya (075 841 5148)! I'm planning a trip to Sri Lanka and would like to ask a few questions about renting a vehicle.";
  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
