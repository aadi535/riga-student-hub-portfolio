export const RIGA_CITIES = [
  { id: 'riga', name: 'Riga, Latvia', flag: '🇱🇻', active: true },
  { id: 'berlin', name: 'Berlin, Germany', flag: '🇩🇪', active: false, badge: 'Coming Soon' },
  { id: 'warsaw', name: 'Warsaw, Poland', flag: '🇵🇱', active: false, badge: 'Coming Soon' },
  { id: 'vilnius', name: 'Vilnius, Lithuania', flag: '🇱🇹', active: false, badge: 'Coming Soon' },
];

export const GROCERIES_DATA = [
  {
    id: 'singh-grocery',
    name: "Singh's Indian Grocery & Spices",
    category: 'Indian & South Asian',
    badge: 'Student Favorite',
    address: 'Lāčplēša iela 24, Centrs, Rīga',
    area: 'Centrs',
    priceLevel: '€€',
    description: 'The go-to store for Indian students in Riga. Basmati rice (5kg/10kg bags), fresh paneer, atta, haldiram snacks, whole spices, and ready-to-eat meals.',
    whatToBuy: ['Aashirvaad Atta & Basmati Rice', 'Paneer & Ghee', 'Shan & MDH Masalas', 'Moong/Toor/Chana Dal'],
    mapsUrl: 'https://maps.google.com/?q=Singh+Grocery+Riga+Lacplesa',
    tips: 'Ask the owner for student bulk deals on 10kg rice bags.'
  },
  {
    id: 'hans-asian',
    name: "Han's Asian Market",
    category: 'East & Southeast Asian',
    badge: 'Asian Essentials',
    address: 'Pulkveža Brieža iela 3, Centrs, Rīga',
    area: 'Centrs (Quiet Center)',
    priceLevel: '€€',
    description: 'Wide variety of noodles, tofu, Asian sauces, fresh herbs, curry pastes, chili oils, and Asian snacks.',
    whatToBuy: ['Samyang & Shin Ramyun', 'Tofu & Soy Sauces', 'Frozen Dumplings', 'Jasmine Rice & Nori'],
    mapsUrl: 'https://maps.google.com/?q=Hans+Asian+Market+Riga',
    tips: 'Great selection of instant noodles and quick college dorm cooking supplies.'
  },
  {
    id: 'central-market',
    name: 'Rīgas Centrāltirgus (Riga Central Market)',
    category: 'Fresh Produce & Halal',
    badge: 'Cheapest Produce',
    address: 'Nēģu iela 7, Rīga (Next to Central Station)',
    area: 'Central Station',
    priceLevel: '€',
    description: 'One of the largest historical markets in Europe. Five huge Zeppelin hangars with fresh vegetables, fruits, dry fruits, spices, and halal butcher stands at the lowest prices in Riga.',
    whatToBuy: ['Fresh Vegetables by Kilo', 'Halal Meat & Poultry', 'Nuts, Dried Fruits & Bulk Spices', 'Affordable Local Cheese'],
    mapsUrl: 'https://maps.google.com/?q=Riga+Central+Market',
    tips: 'Go Saturday mornings for the freshest produce and best bargaining.'
  },
  {
    id: 'lidl-riga',
    name: 'Lidl Supermarket',
    category: 'Budget European Supermarket',
    badge: 'Most Affordable',
    address: 'Multiple locations (Dzelzavas, Krasta, Kalnciema)',
    area: 'Citywide',
    priceLevel: '€',
    description: 'The cheapest everyday European supermarket in Latvia. Lowest prices on milk, bread, eggs, cooking oil, chicken breasts, pasta, and weekly international food themes.',
    whatToBuy: ['Everyday Dairy & Eggs', 'Cooking Oil & Pasta', 'Fresh Bakery (Croissants/Pretzels)', 'Affordable Dorm Essentials'],
    mapsUrl: 'https://maps.google.com/?q=Lidl+Riga',
    tips: 'Download the Lidl Plus mobile app on your phone for extra 10-20% student weekly coupons.'
  },
  {
    id: 'rimi-maxima',
    name: 'Rimi & Maxima XX / XXX',
    category: 'Full-Service Supermarkets',
    badge: 'Open Late',
    address: 'Available in every neighborhood & shopping mall (Origo, Galerija Centrs, Akropole)',
    area: 'Citywide',
    priceLevel: '€€',
    description: 'The two major Latvian supermarket chains. Rimi has higher quality bakery and organic sections; Maxima has lower budget private label items (Optima Linija, Well Done).',
    whatToBuy: ['Late-night Groceries', 'Mans Rimi / Mans Paldies Card Discounts', 'Ready-to-eat Hot Lunch Buffets'],
    mapsUrl: 'https://maps.google.com/?q=Rimi+Riga+Origo',
    tips: 'Register for Rimi and Maxima discount cards immediately using your Latvian phone number.'
  }
];

export const HOUSING_DATA = [
  {
    id: 'duck-republik',
    name: 'Duck Republik Student Hotel',
    category: 'Coliving & Student Residence',
    badge: 'Top International Hub',
    address: 'Lauvas iela 1, Latgales priekšpilsēta, Rīga',
    priceRange: '€270 – €450 / month',
    included: 'All utilities, High-speed WiFi, Gym, Cinema room, Study room, Social events',
    description: 'Modern private student coliving community popular with international students from RTU, TSI, and LU. Fully furnished private and shared studio rooms with international student events.',
    url: 'https://duckrepublik.com/',
    pros: 'Zero landlord hassles, address registration (Deklarācija) guaranteed, vibrant international vibe.',
    caution: 'Rooms fill up 2 months before semester start. Book early.'
  },
  {
    id: '1home-coliving',
    name: '1Home Student Coliving Riga',
    category: 'Student Apartments & Flats',
    badge: 'Popular Shared Flats',
    address: 'Various central locations (Brīvības, Barona, Čaka iela)',
    priceRange: '€230 – €380 / month',
    included: 'Furnished private bedroom, shared kitchen/bath, internet, regular cleaning of common areas',
    description: 'Managed shared student apartments designed specifically for foreign students and Erasmus exchange in Riga city center.',
    url: 'https://1home.eu/riga/',
    pros: 'Central walking distance to universities and public transport. English contract.',
    caution: 'Read utility cost breakdown for winter heating season.'
  },
  {
    id: 'rtu-rsu-dorms',
    name: 'Official University Dorms (RTU / RSU)',
    category: 'University Dormitory',
    badge: 'Lowest Cost',
    address: 'RTU: Ķīpsalas iela / Āzenes iela • RSU: Dzirciema iela / Mārupes iela',
    priceRange: '€110 – €220 / month',
    included: 'Room, heat, water, electricity, basic furnishings',
    description: 'Official university-managed housing located directly on or near the university campuses. The most cost-effective option for freshmen.',
    url: 'https://www.rtu.lv/en/studies/student-life/accommodations',
    pros: 'Extremely cheap, walk to class in 2 minutes, easy to make friends in your course.',
    caution: 'Shared bathrooms/kitchens with roommates; waiting lists can be long.'
  },
  {
    id: 'ss-com-guide',
    name: 'Private Rentals: ss.com & Facebook Groups',
    category: 'Private Market Rentals',
    badge: 'Must Read Safety Guide',
    address: 'Online portal (ss.com / RentInRiga / Facebook)',
    priceRange: '€250 – €550 / month + utilities',
    included: 'Varies by landlord',
    description: 'The largest classifieds portal in Latvia for private apartment rentals directly from landlords or real estate agents.',
    url: 'https://www.ss.com/lv/real-estate/flats/riga/',
    pros: 'Huge variety of private 1-bedroom and 2-bedroom flats in Centrs, Teika, and Āgenskalns.',
    caution: 'CRITICAL: Never transfer security deposits before signing a contract in person and checking owner property deed (Zemesgrāmata). Ensure landlord allows official address registration (Deklarācija).'
  }
];

export const JOBS_DATA = [
  {
    id: 'bolt-wolt-courier',
    name: 'Bolt Food & Wolt Courier Delivery',
    category: 'Food Delivery / Gig Economy',
    badge: 'Most Flexible for Students',
    hourlyEstimate: '€7 – €14 / hour (performance based)',
    hoursLimit: 'Work anytime around university lectures',
    requirements: 'Bicycle, e-scooter, or car; smartphone; self-employed tax registration (VID EDS)',
    description: 'The #1 part-time job for international students in Riga. Choose your own hours, deliver in central Riga, and earn extra bonuses during lunch and dinner rush hours.',
    perkBonus: 'Get €85 – €100 cashback via our referral program',
    steps: [
      'Register on Bolt / Wolt courier portal using our referral code.',
      'Register your economic activity online at VID EDS (Latvian Tax Service).',
      'Collect thermal delivery bag and start earning.'
    ]
  },
  {
    id: 'english-tech-support',
    name: 'English Tech & Customer Support (Evolution, Transcom, Webhelp)',
    category: 'Corporate Office / Remote',
    badge: 'Fixed Monthly Salary',
    hourlyEstimate: '€900 – €1,400 / month (Part-time or Full-time shifts)',
    hoursLimit: '20 hours/week during semester (legal non-EU limit)',
    requirements: 'Fluent English; basic computer skills; no Latvian language required for international teams',
    description: 'Major international firms based in Riga actively hire international students for English-speaking game presentation, live chat support, and IT helpdesk.',
    perkBonus: 'Free health insurance and evening meal allowances often included',
    steps: [
      'Prepare a clean 1-page English CV/resume.',
      'Apply directly on company career pages (e.g. Evolution Careers Riga, Transcom Riga).',
      'Attend online interview & paid training.'
    ]
  },
  {
    id: 'warehouse-logistics',
    name: 'Warehouse & Logistics Staff (Omniva, DPD, Smartpost)',
    category: 'Logistics & Sorting',
    badge: 'Night & Weekend Shifts',
    hourlyEstimate: '€6.50 – €9.50 / hour',
    hoursLimit: 'Weekend and evening shifts available',
    requirements: 'Physical fitness, reliability, basic English',
    description: 'Sorting parcels and handling warehouse shipments for postal couriers near Riga airport (RIX) and logistics hubs.',
    perkBonus: 'Often provides private transport shuttle from central Riga',
    steps: [
      'Apply on cv.lv or via student job agencies like Biuro or CV-Online.',
      'Sign official Latvian employment contract (Darba līgums).'
    ]
  },
  {
    id: 'tax-rules',
    name: 'Student Legal Work Limits & VID Tax Guide',
    category: 'Legal & Tax Rules in Latvia',
    badge: 'Important Legal Guide',
    hourlyEstimate: 'Legal Framework',
    hoursLimit: 'Max 20 hrs/week during study semester; 40 hrs/week during summer breaks',
    requirements: 'Valid Latvian Temporary Residence Permit (TRP) with study clause',
    description: 'Non-EU students in Latvia are legally entitled to work up to 20 hours per week during term time. For courier work, register as a Micro-enterprise tax payer (Mikrouzņēmumu nodoklis) on eds.vid.gov.lv for a simple flat 25% tax.',
    perkBonus: 'Prevents any TRP visa cancellation or PMLP violations',
    steps: [
      'Login to eds.vid.gov.lv with your Latvian e-signature (eParaksts) or smart-ID.',
      'Submit registration form for economic activity.',
      'Link your Revolut or Wise EUR account for receiving payouts.'
    ]
  }
];

export const VISA_TRP_DATA = [
  {
    step: 1,
    title: 'Collect Required Documents (Before & Upon Arrival)',
    duration: 'Week 1-2',
    description: 'Ensure you have your valid Passport, University Study Agreement (RTU/RSU/LU), Academic transcript/invitation approval letter from university, Police Clearance Certificate (PCC) with Apostille/legalization, and Proof of sufficient financial funds (approx. €700/month or ~€8,400 per year on your bank statement).'
  },
  {
    step: 2,
    title: 'Book PMLP / OCMA Appointment via Qticket',
    duration: 'Day 5-10',
    description: 'Never pay agents €300+ just to book an appointment! Download the free Qticket mobile app on your phone. Look for PMLP branches in Riga (PMLP 1. nodaļa Čiekurkalnā, 2. nodaļa, or 3. nodaļa) to reserve your appointment slot for biometric data submission.'
  },
  {
    step: 3,
    title: 'Get Official Address Registration (Deklarācija)',
    duration: 'Week 2',
    description: 'Your dorm or landlord must provide permission to register your place of residence in Latvia. You can declare your address online at latvija.gov.lv or in person at the local Riga municipality (Rīgas pilsētas apkaimju iedzīvotāju centrs).'
  },
  {
    step: 4,
    title: 'Submit Biometrics & Pay State Fee',
    duration: 'Day of Appointment',
    description: 'Attend your PMLP appointment with all original documents. Pay the state processing fee (~€100 to €200 depending on standard 30-day or express 10-day review). They take your photo and fingerprints.'
  },
  {
    step: 5,
    title: 'Collect Your TRP eID Card (Uzturēšanās atļauja)',
    duration: 'Final Step',
    description: 'Once approved, pick up your physical Latvian Residence Permit eID card. This card gives you legal resident status, Schengen travel access, right to work 20h/week, and local e-ID authentication!'
  }
];
