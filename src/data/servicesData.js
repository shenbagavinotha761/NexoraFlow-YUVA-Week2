/**
 * NexoraFlow - Service Booking & Management Platform
 * Data Store: Services Catalog, Categories, Initial Demo Bookings & Reviews
 */

export const SERVICE_CATEGORIES = [
  'All',
  'Home Cleaning',
  'Electrical',
  'Plumbing',
  'Appliance Repair',
  'Smart Home & Tech',
  'Painting & Carpentry'
];

export const INITIAL_SERVICES = [
  {
    id: 'srv-01',
    name: 'Whole-Home Deep Cleaning & Sanitization',
    category: 'Home Cleaning',
    shortDescription: 'Comprehensive top-to-bottom hygienic cleaning including kitchen degreasing, bathroom descaling, and floor buffing.',
    fullDescription: 'Our certified cleaning specialists utilize eco-safe medical-grade disinfectants and HEPA multi-stage filtration vacuums to eliminate 99.9% of indoor allergens, grime, and grease. Perfect for seasonal resets, move-in/out, or post-renovation recovery.',
    price: 119,
    duration: '3 - 4 hours',
    rating: 4.9,
    reviewCount: 184,
    badge: 'Most Popular',
    provider: {
      name: 'Pristine Living Co.',
      rating: 4.9,
      experience: '7 years',
      verified: true,
      completedJobs: 1420
    },
    features: [
      'Multi-room dust removal & HEPA floor vacuuming',
      'Intensive kitchen oven, stove & cabinet sanitizing',
      'Bathroom limescale & grout descaling',
      'High-touch surface antibacterial disinfection',
      'Eco-friendly, non-toxic pet-safe detergents'
    ],
    faqs: [
      { q: 'Do I need to supply any equipment or cleaning fluids?', a: 'No, our team arrives fully equipped with commercial-grade vacuums, steamers, and eco-certified detergents.' },
      { q: 'Is this service pet-safe?', a: 'Yes! All chemicals used are 100% plant-based and non-toxic to cats and dogs.' }
    ]
  },
  {
    id: 'srv-02',
    name: 'Emergency Pipe Leak & Drain Diagnostics',
    category: 'Plumbing',
    shortDescription: 'Rapid response plumbing service for burst pipes, low water pressure, mainline clogs, and fixture leaks.',
    fullDescription: 'Licensed master plumbers equipped with acoustic leak detection and endoscopic sewer cameras diagnose and resolve persistent water problems without unnecessary drywall destruction.',
    price: 89,
    duration: '1.5 - 2 hours',
    rating: 4.8,
    reviewCount: 142,
    badge: 'Urgent Dispatch',
    provider: {
      name: 'FlowGuard Plumbing Services',
      rating: 4.85,
      experience: '12 years',
      verified: true,
      completedJobs: 2310
    },
    features: [
      'Endoscopic pipe inspection & pressure test',
      'Rapid pipe sealing and joint replacement',
      'Clog removal with heavy-duty snake augers',
      'Shut-off valve assessment & water meter check',
      '30-day leak-free operational warranty'
    ],
    faqs: [
      { q: 'How quickly does the technician arrive?', a: 'Standard slots are within selected hours, while emergency slots arrive within 60-90 minutes of confirmation.' },
      { q: 'Are parts included in the base diagnostic fee?', a: 'Diagnostic and minor sealants are included. Any major replacement pipes or valves are quoted upfront before installation.' }
    ]
  },
  {
    id: 'srv-03',
    name: 'Electrical Panel Inspection & Surge Protection',
    category: 'Electrical',
    shortDescription: 'Circuit breaker health assessment, thermal imaging for hot spots, grounding safety check, and whole-house surge prep.',
    fullDescription: 'Certified master electricians inspect your main electrical distribution board, tighten busbar connections, identify overloaded circuits with FLIR thermal sensors, and ensure your home meets current safety codes.',
    price: 135,
    duration: '2 hours',
    rating: 4.95,
    reviewCount: 96,
    badge: 'Safety Certified',
    provider: {
      name: 'VoltCraft Electrical Systems',
      rating: 4.95,
      experience: '15 years',
      verified: true,
      completedJobs: 980
    },
    features: [
      'Infrared thermal scanning for circuit hotspots',
      'Ground fault circuit interrupter (GFCI) testing',
      'Main panel busbar screw torque calibration',
      'Whole-home surge suppressor readiness audit',
      'Official NFPA electrical safety compliance report'
    ],
    faqs: [
      { q: 'Will the power need to be turned off during service?', a: 'Yes, a temporary 20-30 minute main breaker shutoff is required for safe internal terminal torque checks.' }
    ]
  },
  {
    id: 'srv-04',
    name: 'Inverter AC Precision Tune-Up & Coil Jet Wash',
    category: 'Appliance Repair',
    shortDescription: 'High-pressure chemical jet wash for indoor/outdoor coils, refrigerant level check, and motor amperage calibration.',
    fullDescription: 'Restore your air conditioner to peak energy efficiency, eliminate musty odors, and lower electricity bills with specialized coil cleaning, blower wheel descaling, and refrigerant pressure optimization.',
    price: 65,
    duration: '1.5 hours',
    rating: 4.75,
    reviewCount: 215,
    badge: 'Energy Saver',
    provider: {
      name: 'CoolBreeze HVAC Techs',
      rating: 4.8,
      experience: '9 years',
      verified: true,
      completedJobs: 3400
    },
    features: [
      'Chemical foam & water jet deep cleaning of condenser',
      'Indoor evaporator blower wheel anti-mold wash',
      'R32 / R410A refrigerant gas pressure calibration',
      'Condensate drain tray flush & anti-bacterial tablet',
      'Operating temperature differential measurement'
    ],
    faqs: [
      { q: 'How often should this AC tune-up be conducted?', a: 'We recommend once every 6 months for optimal cooling speed and minimal electrical consumption.' }
    ]
  },
  {
    id: 'srv-05',
    name: 'Smart Home Wi-Fi Mesh & IoT Hub Integration',
    category: 'Smart Home & Tech',
    shortDescription: 'Seamless whole-house mesh networking, smart lock setup, video doorbell calibration, and Matter/Zigbee hub integration.',
    fullDescription: 'Eliminate dead zones and streamline your smart ecosystem. Our network engineers position nodes, configure secure guest VLANs, connect your smart lighting, security cameras, and voice assistants with zero lag.',
    price: 149,
    duration: '2.5 - 3 hours',
    rating: 4.9,
    reviewCount: 78,
    badge: 'Tech Favorite',
    provider: {
      name: 'Nexus Smart Solutions',
      rating: 4.92,
      experience: '6 years',
      verified: true,
      completedJobs: 750
    },
    features: [
      'RF signal heat-mapping to eliminate blind spots',
      'Smart video doorbell, chimes & smart lock pairing',
      'Voice assistant routine automation setup (Alexa / Apple / Google)',
      'Dedicated IoT isolated 2.4GHz Wi-Fi sub-network',
      'Hands-on tutorial for family members'
    ],
    faqs: [
      { q: 'What if my devices are from different brands?', a: 'Our engineers specialize in cross-brand interoperability using Matter, Zigbee, and unified Apple Home / Google Home dashboards.' }
    ]
  },
  {
    id: 'srv-06',
    name: 'Interior Accent Wall Painting & Crack Restoration',
    category: 'Painting & Carpentry',
    shortDescription: 'Premium matte or satin acrylic painting with surface spackling, sanding, edge masking, and double-coat application.',
    fullDescription: 'Transform your room with immaculate edge work and smooth paint coverage. Includes crack filling, moisture testing, drop-cloth floor protection, and odorless low-VOC premium paints.',
    price: 185,
    duration: '4 - 5 hours',
    rating: 4.85,
    reviewCount: 112,
    badge: 'Design Choice',
    provider: {
      name: 'Artisan Palette Studio',
      rating: 4.88,
      experience: '10 years',
      verified: true,
      completedJobs: 1150
    },
    features: [
      'Full furniture masking and floor drop-cloth prep',
      'Surface spackling, hole filling & machine sanding',
      'Two coats of premium low-VOC washable paint',
      'Laser-straight cut lines on ceilings and trim',
      'Zero-mess cleanup and leftover paint container handed to you'
    ],
    faqs: [
      { q: 'Is paint included in this package?', a: 'Yes! Standard premium paint in your color choice from our swatch deck is included for walls up to 180 sq ft.' }
    ]
  },
  {
    id: 'srv-07',
    name: 'Kitchen Chimney & Hood Degreasing Service',
    category: 'Appliance Repair',
    shortDescription: 'Industrial rotary solvent cleaning of stainless baffle filters, motor blower blades, and exterior oil collector trays.',
    fullDescription: 'Prolong chimney motor lifespan and prevent kitchen fire hazards with a thorough teardown and ultrasonic/solvent wash of grease traps, filters, and exhaust chambers.',
    price: 55,
    duration: '1.5 hours',
    rating: 4.7,
    reviewCount: 165,
    badge: 'Budget Value',
    provider: {
      name: 'Apex Kitchen Care',
      rating: 4.75,
      experience: '5 years',
      verified: true,
      completedJobs: 1980
    },
    features: [
      'Filter disassembly and ultrasonic degreaser bath',
      'Motor housing suction power & airflow verification',
      'Exhaust pipe carbon residue clear-out',
      'Exterior stainless steel scratch-free polishing',
      'Noise vibration dampening check'
    ],
    faqs: [
      { q: 'How long before I can use the stove after service?', a: 'You can cook immediately after our technician performs the final test run.' }
    ]
  },
  {
    id: 'srv-08',
    name: 'Bathroom Waterproofing & Silicone Recaulking',
    category: 'Plumbing',
    shortDescription: 'Anti-mold silicone stripping and resealing for bathtubs, glass shower enclosures, sink vanities, and baseboards.',
    fullDescription: 'Stop water seepage and eliminate ugly black mildew along your bathtub and shower borders with medical-grade antimycotic silicone sealant that cures 100% waterproof within hours.',
    price: 75,
    duration: '2 hours',
    rating: 4.8,
    reviewCount: 92,
    badge: 'Preventative Care',
    provider: {
      name: 'FlowGuard Plumbing Services',
      rating: 4.85,
      experience: '12 years',
      verified: true,
      completedJobs: 2310
    },
    features: [
      'Mechanical scraping of rotten/black moldy caulk',
      'Isopropyl surface sterilization and moisture dry-out',
      'Grade-A 100% silicone micro-bead application',
      'Smooth contour tooling for watertight adhesion',
      '5-year mold resistance manufacturer guarantee'
    ],
    faqs: [
      { q: 'When can we take a shower after recaulking?', a: 'Our rapid-cure silicone is shower-ready in 4 hours, though 12 hours is recommended for ultimate curing.' }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'NXF-892104',
    serviceId: 'srv-01',
    serviceName: 'Whole-Home Deep Cleaning & Sanitization',
    category: 'Home Cleaning',
    date: '2026-10-30',
    timeSlot: '09:00 AM - 01:00 PM',
    customerName: 'Venkatesh A.',
    customerEmail: 'venkatesh.a@nexoraflow.demo',
    customerPhone: '+91 98401 23456',
    address: 'Flat 402, Green Meadows Residency, Tech Zone 1',
    provider: 'Pristine Living Co.',
    price: 119,
    tax: 9.52,
    platformFee: 5.0,
    totalPrice: 133.52,
    status: 'Confirmed',
    createdAt: '2026-10-25T14:30:00Z',
    notes: 'Please pay extra attention to balcony sliding doors and master bathroom tiles.'
  },
  {
    id: 'NXF-741290',
    serviceId: 'srv-03',
    serviceName: 'Electrical Panel Inspection & Surge Protection',
    category: 'Electrical',
    date: '2026-11-04',
    timeSlot: '02:00 PM - 04:00 PM',
    customerName: 'Venkatesh A.',
    customerEmail: 'venkatesh.a@nexoraflow.demo',
    customerPhone: '+91 98401 23456',
    address: 'Flat 402, Green Meadows Residency, Tech Zone 1',
    provider: 'VoltCraft Electrical Systems',
    price: 135,
    tax: 10.8,
    platformFee: 5.0,
    totalPrice: 150.8,
    status: 'Pending',
    createdAt: '2026-10-26T08:15:00Z',
    notes: 'We noticed a slight buzzing sound from the 32A AC circuit breaker.'
  },
  {
    id: 'NXF-612048',
    serviceId: 'srv-04',
    serviceName: 'Inverter AC Precision Tune-Up & Coil Jet Wash',
    category: 'Appliance Repair',
    date: '2026-10-18',
    timeSlot: '11:00 AM - 12:30 PM',
    customerName: 'Venkatesh A.',
    customerEmail: 'venkatesh.a@nexoraflow.demo',
    customerPhone: '+91 98401 23456',
    address: 'Flat 402, Green Meadows Residency, Tech Zone 1',
    provider: 'CoolBreeze HVAC Techs',
    price: 65,
    tax: 5.2,
    platformFee: 5.0,
    totalPrice: 75.2,
    status: 'Completed',
    createdAt: '2026-10-15T10:00:00Z',
    notes: 'Master bedroom 1.5 ton split AC serviced. Filter replaced and cooling verified.'
  },
  {
    id: 'NXF-481923',
    serviceId: 'srv-02',
    serviceName: 'Emergency Pipe Leak & Drain Diagnostics',
    category: 'Plumbing',
    date: '2026-09-28',
    timeSlot: '04:00 PM - 05:30 PM',
    customerName: 'Venkatesh A.',
    customerEmail: 'venkatesh.a@nexoraflow.demo',
    customerPhone: '+91 98401 23456',
    address: 'Flat 402, Green Meadows Residency, Tech Zone 1',
    provider: 'FlowGuard Plumbing Services',
    price: 89,
    tax: 7.12,
    platformFee: 5.0,
    totalPrice: 101.12,
    status: 'Cancelled',
    createdAt: '2026-09-27T18:40:00Z',
    notes: 'Resolved by building association maintenance team before technician arrived.'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 't-1',
    clientName: 'Priya Narayanan',
    role: 'Homeowner & Software Architect',
    rating: 5,
    service: 'Whole-Home Deep Cleaning',
    comment: 'NexoraFlow made scheduling home cleaning completely effortless. The technicians arrived exactly on time with top-shelf gear and treated our home with immense care.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    date: '2 weeks ago'
  },
  {
    id: 't-2',
    clientName: 'Rahul Verma',
    role: 'Product Designer',
    rating: 5,
    service: 'Smart Home Wi-Fi Mesh & IoT',
    comment: 'Our IoT camera feed was stuttering and dead spots plagued our hallway. The Nexus engineer fixed routing and isolated our devices in 2 hours. Super smooth dashboard experience!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '1 month ago'
  },
  {
    id: 't-3',
    clientName: 'Ananya S. Iyer',
    role: 'Finance Director',
    rating: 5,
    service: 'Electrical Panel Inspection',
    comment: 'The upfront pricing and transparent breakdown won me over. No surprise fees at the door, and the booking confirmation was instant. NexoraFlow sets a new standard for home service apps.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    date: '3 weeks ago'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Your Service',
    description: 'Browse our curated catalog of vetted home, electrical, plumbing, appliance, and tech services with clear upfront pricing.'
  },
  {
    step: '02',
    title: 'Choose Date & Time',
    description: 'Pick convenient morning, afternoon, or evening slots with your preferred certified local expert.'
  },
  {
    step: '03',
    title: 'Instant Confirmation',
    description: 'Receive real-time booking confirmation with assigned provider details and tracking reference number.'
  },
  {
    step: '04',
    title: 'Track & Manage Live',
    description: 'Monitor service progress, view job summaries, and manage changes directly from your dedicated user dashboard.'
  }
];

export const TRUST_BENEFITS = [
  {
    icon: 'ShieldCheck',
    title: '100% Background-Verified Pros',
    description: 'Every specialist undergoes rigorous identity checks, skill audits, and background certification.'
  },
  {
    icon: 'Clock',
    title: 'On-Time Arrival Guarantee',
    description: 'We value your schedule. Our pros arrive within the confirmed window or you receive platform credits.'
  },
  {
    icon: 'CreditCard',
    title: 'Transparent Fixed Pricing',
    description: 'No hidden surcharges or post-job surprise fees. You see exact labor and diagnostic costs before booking.'
  },
  {
    icon: 'Sparkles',
    title: 'Satisfaction Protection',
    description: 'Every job is backed by our 7-day NexoraFlow Service Guarantee. If it is not right, we make it right.'
  }
];
