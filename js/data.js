/**
 * TravelWithGayya - Shared Central Data Store
 * Business WhatsApp: 075 841 5148 (+94 75 841 5148)
 */

const WHATSAPP_BUSINESS_NUMBER = "94758415148";
const DISPLAY_PHONE_NUMBER = "075 841 5148";
const INTERNATIONAL_PHONE_NUMBER = "+94 75 841 5148";

/* ==========================================================================
   1. VEHICLE FLEET DATA
   ========================================================================== */
const VEHICLES_DATA = [
  {
    id: "vitz-01",
    name: "Hatchback",
    displayName: "Hatchback",
    category: "compact",
    badge: "Popular Hatchback",
    ratePer100Km: 25, // $25 / 100 km
    currency: "$",
    image: "images/New/Vehicles/Vitz_white color.jpg",
    passengers: "4 Seats",
    transmission: "Automatic",
    fuel: "Petrol / Hybrid",
    luggage: "2 Medium Bags",
    ac: "Air Conditioned",
    driverOption: "Self-Drive or With Chauffeur",
    description: "Compact, agile, and extremely fuel-efficient. Hatchbacks are ideal for solo travelers, couples, or navigating narrow island streets with complete ease.",
    features: ["Super Fuel Efficient", "Easy City Parking", "Bluetooth Audio", "Ideal for Couples", "Full Rental Insurance", "Clean Hygienic Interior"]
  },
  {
    id: "hiace-gl-01",
    name: "Small Van",
    displayName: "Small Van",
    category: "van",
    badge: "Comfortable Small Group Van",
    ratePer100Km: 45, // $45 / 100 km
    currency: "$",
    image: "images/New/Vehicles/White_KDH.jpg",
    passengers: "8-10 Seats",
    transmission: "Automatic",
    fuel: "Diesel",
    luggage: "6 Large Bags",
    ac: "Dual High-Cool AC",
    driverOption: "With English-Speaking Chauffeur",
    description: "Spacious passenger van designed for medium-sized families and small tour groups. Offers generous luggage space and high-cooling dual AC.",
    features: ["Reclining Passenger Seats", "Spacious Interior", "Luggage Roof Space", "Chauffeur Included Available", "Cooler Box", "USB Charging Ports"]
  },
  {
    id: "hiace-sgl-01",
    name: "Large Van",
    displayName: "Large Van",
    category: "van",
    badge: "VIP Luxury Passenger Van",
    ratePer100Km: 55, // $55 / 100 km
    currency: "$",
    image: "images/New/Vehicles/Toyota_KDH.png",
    passengers: "10-14 Seats",
    transmission: "Automatic",
    fuel: "Diesel",
    luggage: "8 Large Bags",
    ac: "High-Cool Dual AC",
    driverOption: "With Senior English-Speaking Driver Guide",
    description: "Premium high-roof VIP van with extra legroom and luxury plush reclining seats. Perfect for large family reunions, retreats, and long Sri Lankan tours.",
    features: ["Premium Reclining Seats", "Extra Legroom & High Roof", "Roof Rack for Extra Luggage", "Senior Guide Chauffeur", "USB Power Outlets", "Ice Box Included"]
  },
  {
    id: "sedan-01",
    name: "Sedan",
    displayName: "Sedan",
    category: "sedan",
    badge: "Comfort & Smooth Ride",
    ratePer100Km: 35, // $35 / 100 km
    currency: "$",
    image: "images/New/Vehicles/Toyota_Axio.png",
    passengers: "4-5 Seats",
    transmission: "Automatic",
    fuel: "Petrol / Hybrid",
    luggage: "3 Medium Bags",
    ac: "Climate Control AC",
    driverOption: "Self-Drive or With Chauffeur",
    description: "Elegant, smooth sedan offering premium comfort and spacious trunk space. Ideal for business travel, couples, and relaxed island road trips.",
    features: ["Fuel Efficient Hybrid", "Modern Touchscreen & Bluetooth", "Smooth Soft Suspension", "Spacious Boot Space", "USB Fast Chargers", "Full Comprehensive Insurance"]
  }
];

/* ==========================================================================
   2. TOP DESTINATIONS / TOUR PACKAGES DATA
   ========================================================================== */
const PACKAGES_DATA = [
  {
    id: "pkg-kandy-ella",
    name: "Kandy → Nuwara Eliya → Ella Scenic Tour",
    badge: "⭐ Most Popular Tour",
    durationDays: 3,
    durationNights: 2,
    durationText: "3 Days / 2 Nights",
    image: "images/New/Ella Arch Bridge.jpeg",
    description: "Experience misty tea plantations, colonial mountain towns, and the famous Nine Arch Bridge with your private dedicated vehicle and chauffeur.",
    itinerary: [
      { day: "Day 1", title: "Colombo/BIA Airport to Kandy Kingdom", desc: "Pick up at airport or hotel. Visit Pinnawala Elephant Sanctuary, Spice Garden, and the Sacred Tooth Relic Temple in Kandy." },
      { day: "Day 2", title: "Kandy to Nuwara Eliya Highland Tea Trails", desc: "Drive along scenic winding mountain roads, visit Ramboda Waterfalls, Damro Tea Plantation & Factory, and Gregory Lake." },
      { day: "Day 3", title: "Nuwara Eliya to Ella Nine Arch Bridge & Return", desc: "Witness the majestic Nine Arch Bridge, hike Little Adam's Peak, and enjoy drop-off at your hotel or BIA airport." }
    ],
    highlights: ["Nine Arch Bridge Ella", "Temple of Sacred Tooth Relic", "Damro Tea Factory & Tasting", "Ramboda Waterfall Viewpoint", "Gregory Lake Promenade"],
    included: ["Private Dedicated AC Vehicle", "Fuel & Toll Fees Included", "Professional Chauffeur Guide", "Chauffeur Meals & Lodging", "Airport / Hotel Pickup & Drop"],
    excluded: ["Attraction Entrance Tickets", "Personal Meals & Hotel Accommodation"],
    vehiclePrices: {
      "vitz-01": 175,
      "hiace-gl-01": 255,
      "hiace-sgl-01": 310,
      "sedan-01": 210
    }
  },
  {
    id: "pkg-sigiriya-dambulla",
    name: "Sigiriya Rock Fortress & Dambulla Caves",
    badge: "🏛️ UNESCO World Heritage",
    durationDays: 2,
    durationNights: 1,
    durationText: "2 Days / 1 Night",
    image: "images/New/Sigiriya Ancient Rock.jpeg",
    description: "Climb the majestic 5th-century ancient palace rock fortress of Sigiriya and explore the awe-inspiring Golden Cave Temples of Dambulla.",
    itinerary: [
      { day: "Day 1", title: "Pickup to Dambulla & Sigiriya Sunset", desc: "Scenic drive from Colombo/BIA to Dambulla Cave Temple. Afternoon check-in near Sigiriya and catch breathtaking rural sunsets." },
      { day: "Day 2", title: "Sigiriya Lion Rock Climb & Village Experience", desc: "Early morning climb of Sigiriya Rock Fortress. Traditional Sri Lankan village catamaran ride & lunch before return journey." }
    ],
    highlights: ["Sigiriya Lion Rock Citadel", "Dambulla Golden Cave Temple", "Minneriya Elephant Safari Route", "Traditional Village Experience"],
    included: ["Private Dedicated AC Vehicle", "Unlimited Fuel & Highway Tolls", "English-Speaking Driver Guide", "Chauffeur Expenses Included"],
    excluded: ["Site Entrance Fees", "Personal Meals & Hotel Accommodation"],
    vehiclePrices: {
      "vitz-01": 135,
      "hiace-gl-01": 195,
      "hiace-sgl-01": 240,
      "sedan-01": 155
    }
  },
  {
    id: "pkg-galle-mirissa",
    name: "Galle Dutch Fort & Southern Beach Holiday",
    badge: "🌊 Sun & Surf Coastal",
    durationDays: 3,
    durationNights: 2,
    durationText: "3 Days / 2 Nights",
    image: "images/New/Galle fortress and lighthouse.jpeg",
    description: "Stroll colonial cobblestone ramparts inside Galle Fort, relax on palm-fringed golden beaches, and experience tropical Sri Lankan coastal charm.",
    itinerary: [
      { day: "Day 1", title: "Bentota River Safari & Galle Fort Sunset", desc: "Drive down Southern Expressway. Madu River boat safari, Sea Turtle Hatchery visit, and evening sunset walk on Galle Fort Ramparts." },
      { day: "Day 2", title: "Mirissa Beach & Coconut Tree Hill", desc: "Morning visit to Coconut Tree Hill Mirissa, Weligama Bay surfer watch, and beach relaxation." },
      { day: "Day 3", title: "Unawatuna Coast & Return Transfer", desc: "Unawatuna Japanese Peace Pagoda, stilt fishermen photo stop, and evening return transfer to Colombo / BIA airport." }
    ],
    highlights: ["Galle Dutch Fort & Lighthouse", "Coconut Tree Hill Mirissa", "Bentota River Boat Safari", "Sea Turtle Sanctuary", "Stilt Fishermen Experience"],
    included: ["Private AC Vehicle & Driver", "Highway Toll Tickets Included", "Chauffeur Meals & Overnight Stay", "Flexible Pickup & Drop"],
    excluded: ["Boat Ride Tickets & Entrance Fees", "Hotels & Personal Meals"],
    vehiclePrices: {
      "vitz-01": 165,
      "hiace-gl-01": 235,
      "hiace-sgl-01": 285,
      "sedan-01": 190
    }
  },
  {
    id: "pkg-nuwara-eliya",
    name: "Nuwara Eliya Tea Country & Highland Springs",
    badge: "☕ Little England Tour",
    durationDays: 2,
    durationNights: 1,
    durationText: "2 Days / 1 Night",
    image: "images/New/Nuwara Eliya Tea Plantation.jpeg",
    description: "Fresh crisp mountain air, cascading waterfalls, tea factory tours, and scenic driving through Sri Lanka's emerald highlands.",
    itinerary: [
      { day: "Day 1", title: "Drive to Highlands via Waterfalls", desc: "Pickup and drive up mountain passes. Stop at Devon & St. Clair Waterfalls, visit Damro Tea Factory, evening stroll at Gregory Lake." },
      { day: "Day 2", title: "Colonial Town & Post Office Tour", desc: "Explore Victoria Park, historic red-brick Nuwara Eliya Post Office, Hakgala Botanical Garden before scenic return journey." }
    ],
    highlights: ["Damro Ceylon Tea Estate", "Gregory Lake Boat Park", "Devon & St. Clair Waterfalls", "Colonial Nuwara Eliya Town"],
    included: ["Dedicated Chauffeur & Vehicle", "Fuel, Tolls & Parking Fees", "Chauffeur Overnight Expenses", "Door-to-Door Service"],
    excluded: ["Entrance / Park Fees", "Hotels & Personal Meals"],
    vehiclePrices: {
      "vitz-01": 140,
      "hiace-gl-01": 205,
      "hiace-sgl-01": 250,
      "sedan-01": 165
    }
  },
  {
    id: "pkg-yala-safari",
    name: "Yala National Park Wildlife Safari Escape",
    badge: "🐆 Wild Leopard Safari",
    durationDays: 2,
    durationNights: 1,
    durationText: "2 Days / 1 Night",
    image: "images/New/Yala.jpeg",
    description: "Search for wild leopards, Asian elephants, sloth bears, and exotic birds in Sri Lanka's world-famous Yala National Park.",
    itinerary: [
      { day: "Day 1", title: "Transfer to Tissamaharama / Yala", desc: "Drive south to Yala boundary. Check into hotel and prepare for wildlife excursion." },
      { day: "Day 2", title: "Dawn Game Drive & Udawalawe Transit Home", desc: "Early morning dawn safari drive in Yala. Afternoon visit to Udawalawe Elephant Transit Home before comfortable return drive." }
    ],
    highlights: ["Yala Leopard & Elephant Safari", "Udawalawe Elephant Orphanage", "Tissa Wewa Lake Sunset", "Ravana Falls Viewpoint"],
    included: ["Private Chauffeur & AC Vehicle", "Highway Express Tolls & Fuel", "Driver Support & Expenses", "Full Pickup & Drop Service"],
    excluded: ["National Park Jeep & Ticket Fees", "Hotel Accommodation"],
    vehiclePrices: {
      "vitz-01": 180,
      "hiace-gl-01": 260,
      "hiace-sgl-01": 315,
      "sedan-01": 210
    }
  },
  {
    id: "pkg-sacred-kandy",
    name: "Kandy Cultural & Sacred Temple Tour",
    badge: "👑 Royal Capital Tour",
    durationDays: 2,
    durationNights: 1,
    durationText: "2 Days / 1 Night",
    image: "images/New/Temple of Sacred tooth relic.jpeg",
    description: "Immerse in ancient Sri Lankan culture, traditional Kandyan dance performances, Peradeniya Royal Botanical Gardens, and the Sacred Tooth Relic Temple.",
    itinerary: [
      { day: "Day 1", title: "Pinnawala Elephants & Temple Ceremony", desc: "Pickup from airport/Colombo. Stop at Pinnawala Elephant Orphanage. Arrive in Kandy for evening Tooth Temple Puja Ceremony." },
      { day: "Day 2", title: "Royal Botanical Gardens & Spice Garden", desc: "Morning visit to Royal Botanical Gardens Peradeniya. Visit Spice Garden and Bahirawakanda Giant Buddha Statue before returning." }
    ],
    highlights: ["Temple of the Sacred Tooth Relic", "Royal Botanical Gardens Peradeniya", "Pinnawala Elephant Sanctuary", "Kandyan Cultural Dance Show"],
    included: ["Private Vehicle with Driver", "All Fuel, Highway & Parking Fees", "Chauffeur Stay & Meals Included", "Airport Pickup & Hotel Drop"],
    excluded: ["Temple & Garden Tickets", "Hotels & Personal Expenses"],
    vehiclePrices: {
      "vitz-01": 125,
      "hiace-gl-01": 180,
      "hiace-sgl-01": 220,
      "sedan-01": 145
    }
  }
];

/* ==========================================================================
   3. DISTANCE MATRIX (KM) FOR SRI LANKA ROUTES
   ========================================================================== */
const DISTANCE_MATRIX = {
  "bia": {
    "colombo": 35,
    "negombo": 12,
    "kandy": 115,
    "sigiriya": 150,
    "nuwara-eliya": 165,
    "ella": 210,
    "galle": 155,
    "mirissa": 175,
    "yala": 260
  },
  "colombo": {
    "bia": 35,
    "negombo": 40,
    "kandy": 115,
    "sigiriya": 165,
    "nuwara-eliya": 170,
    "ella": 205,
    "galle": 125,
    "mirissa": 150,
    "yala": 250
  },
  "negombo": {
    "bia": 12,
    "colombo": 40,
    "kandy": 110,
    "sigiriya": 145,
    "galle": 160,
    "ella": 215
  },
  "kandy": {
    "bia": 115,
    "colombo": 115,
    "sigiriya": 90,
    "nuwara-eliya": 75,
    "ella": 135,
    "galle": 225,
    "yala": 210
  },
  "sigiriya": {
    "bia": 150,
    "colombo": 165,
    "kandy": 90,
    "nuwara-eliya": 160,
    "ella": 200
  },
  "nuwara-eliya": {
    "bia": 165,
    "colombo": 170,
    "kandy": 75,
    "ella": 55,
    "galle": 230,
    "yala": 170
  },
  "ella": {
    "bia": 210,
    "colombo": 205,
    "kandy": 135,
    "nuwara-eliya": 55,
    "yala": 95,
    "galle": 200,
    "mirissa": 175
  },
  "galle": {
    "bia": 155,
    "colombo": 125,
    "mirissa": 35,
    "yala": 170,
    "ella": 200,
    "kandy": 225
  },
  "mirissa": {
    "bia": 175,
    "colombo": 150,
    "galle": 35,
    "yala": 145,
    "ella": 175,
    "kandy": 240
  },
  "yala": {
    "bia": 260,
    "colombo": 250,
    "ella": 95,
    "galle": 170,
    "mirissa": 145,
    "kandy": 210
  }
};

/* Helper to lookup or calculate distance */
function lookupDistance(pickupKey, dropoffKey) {
  if (!pickupKey || !dropoffKey) return 100;
  if (pickupKey === dropoffKey) return 25;

  const p = pickupKey.toLowerCase().replace(/[^a-z]/g, '');
  const d = dropoffKey.toLowerCase().replace(/[^a-z]/g, '');

  if (DISTANCE_MATRIX[p] && DISTANCE_MATRIX[p][d]) {
    return DISTANCE_MATRIX[p][d];
  }
  if (DISTANCE_MATRIX[d] && DISTANCE_MATRIX[d][p]) {
    return DISTANCE_MATRIX[d][p];
  }

  return 120;
}
