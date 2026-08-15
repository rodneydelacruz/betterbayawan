'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation data
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-services': 'Services',
    'nav-government': 'Government',
    'nav-statistics': 'Statistics',
    'nav-legislative': 'Legislative',
    'nav-transparency': 'Transparency',
    'nav-contact': 'Contact',

    // Appointment CTA
    'appointment-cta-heading': "Enhancing Appointment Services of LGU Bayawan City Mayor's Office",
    'appointment-cta-subtitle': 'No lines. No back-and-forth. Just efficient appointments.',
    'appointment-schedule-btn': 'Schedule Appointment',
    'appointment-create-btn': 'Create Account',

    // Hero Section
    'hero-welcome': 'Welcome to BetterBayawan.org',
    'hero-subtitle':
      'Access government services, information, and resources for the people of Bayawan City, Negros Oriental.',
    'hero-find-service': 'Find a Service',

    // Popular Services
    'section-popular': 'Popular Services',
    'service-certificates': 'Certificates',
    'service-certificates-desc': 'Birth, marriage, death certificates',
    'service-business': 'Business Permits',
    'service-business-desc': 'New permits and renewals',
    'service-tax': 'Tax Payments',
    'service-tax-desc': 'Property and business taxes',
    'service-social': 'Social Services',
    'service-social-desc': 'Senior citizen & PWD services',
    'service-health': 'Health Services',
    'service-health-desc': 'Medical assistance & programs',
    'btn-view-all-services': 'View All Services',

    // Latest Updates
    'section-updates': 'Latest Updates',
    'btn-view-all': 'View All',

    // Municipal Leadership
    'section-leadership': 'Municipal Leadership',
    'title-mayor': 'City Mayor',
    'title-vice-mayor': 'City Vice Mayor',
    'btn-view-officials': 'View All Officials',

    // Contact Section
    'section-contact': 'Contact Information',
    'contact-phone': 'Phone',
    'contact-email': 'Email',
    'contact-address': 'Address',
    'contact-hours': 'Mon-Fri: 8:00 AM - 5:00 PM',
    'contact-response': "We'll respond within 24 hours",
    'contact-municipal-hall': 'City Hall',

    // Services Page
    'services-title': 'Municipal Services Directory',
    'services-subtitle': 'Browse all services offered by the City of Bayawan',
    'life-events-title': 'Browse by Life Event',
    'life-events-subtitle': "Find services based on what's happening in your life",
    'life-starting-business': 'Starting a Business',
    'life-getting-married': 'Getting Married',
    'life-having-baby': 'Having a Baby',
    'life-financial-help': 'Need Financial Help',
    'life-senior': 'Senior Citizen Services',
    'life-pwd': 'Person with Disability',
    'life-building': 'Building/Home Improvement',
    'life-trouble': 'Got in Trouble',

    // Service Categories
    'cat-certificates': 'Certificates & Vital Records',
    'cat-certificates-desc': 'Birth, death, marriage certificates, and other vital records.',
    'cat-business': 'Business & Trade',
    'cat-business-desc': 'Business permits, licenses, and trade registration services.',
    'cat-social': 'Social Services',
    'cat-social-desc':
      'Welfare programs, senior citizen services, PWD benefits, and financial aid.',
    'cat-health': 'Health & Wellness',
    'cat-health-desc': 'Vaccination programs, health certificates, and medical assistance.',
    'cat-tax': 'Taxation & Payments',
    'cat-tax-desc': 'Property tax, business tax, payments, and tax clearance.',
    'cat-agriculture': 'Agriculture',
    'cat-agriculture-desc':
      'Agricultural loans, crop insurance, fertilizer assistance, and training.',
    'cat-infrastructure': 'Infrastructure',
    'cat-infrastructure-desc':
      'Construction permits, road maintenance requests, and public facilities.',
    'cat-education': 'Education & Scholarship',
    'cat-education-desc': 'Scholarship programs, student assistance, and educational grants.',
    'cat-safety': 'Public Safety',
    'cat-safety-desc': 'Emergency services, disaster preparedness, and community safety programs.',
    'cat-environment': 'Environment',
    'cat-environment-desc': 'Environmental permits, waste management, and conservation programs.',

    // FAQ Page
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Find answers to common questions about municipal services',
    'faq-general': 'General Questions',
    'faq-certificates': 'Certificates & Documents',
    'faq-business': 'Business & Permits',
    'faq-payments': 'Payments & Fees',
    'faq-social': 'Social Services',
    'faq-technical': 'Technical Questions',
    'faq-still-questions': 'Still have questions?',
    'faq-contact-help':
      "If you didn't find the answer you were looking for, please don't hesitate to contact us.",

    // Common Labels
    'label-fee': 'Fee:',
    'label-time': 'Time:',
    'label-free': 'Free',
    'label-varies': 'Varies',
    'label-walk-in': 'Walk-in',
    'label-seasonal': 'Seasonal',
    'label-1-day': '1 day',
    'label-1-2-days': '1-2 days',
    'label-3-5-days': '3-5 days',
    'section-responsible-offices': 'Responsible Offices',

    // Health Page
    'health-page-title': 'Health Services',
    'health-page-desc': 'Medical consultations, vaccinations, and health programs',
    'health-page-badge': 'Health',
    'health-consultation': 'Medical Consultation',
    'health-consultation-desc': 'Free consultation at Rural Health Units',
    'health-vaccination': 'Vaccination Programs',
    'health-vaccination-desc': 'Free immunization for children and adults',
    'health-prenatal': 'Prenatal Care',
    'health-prenatal-desc': 'Free prenatal checkups and services',
    'health-dental': 'Dental Services',
    'health-dental-desc': 'Basic dental care and extraction',
    'health-stats-title': 'Health Statistics',
    'health-rhu': 'Rural Health Units',
    'health-bhw': 'Barangay Health Workers',
    'health-hospitals-title': 'Hospitals in the Area',
    'label-schedule-varies': 'Schedule varies',
    'label-by-appointment': 'By appointment',
    'label-free-subsidy': 'Free (subsidy)',
    'label-1-3-days': '1-3 days',
    'health-maternal': 'Maternal Care',
    'health-maternal-desc': 'Prenatal and postnatal health services',
    'health-medicine': 'Medicine Assistance',
    'health-medicine-desc': 'Financial assistance for medicines through MSWDO',
    'health-stat-facilities': 'Total Health Facilities',
    'health-stat-hospitals': 'Major Hospitals',
    'health-stat-bhs': 'Barangay Health Stations',
    'health-stat-mho': 'City Health Office',
    'health-section-hospitals': 'Hospitals in Bayawan City',
    'health-section-mho': 'City Health Office',
    'health-section-bhs': 'Barangay Health Stations',
    'health-bhs-subtitle': '22 Barangay Health Stations/Centers serving all barangays of Bayawan City',
    'health-mho-title': 'Bayawan City Health Office',
    'health-mho-desc':
      'The City Health Office provides primary healthcare services including a lying-in facility and laboratory services. It serves as the main public health center for the municipality.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Laboratory Services',
    'health-service-immunization': 'Immunization',
    'health-service-prenatal': 'Prenatal Care',
    'health-service-family-planning': 'Family Planning',
    'health-service-tb-dots': 'TB-DOTS',
    'health-pltciluis-a-tiam-medical-center': 'PLTCI-Luis A. Tiam Medical Center',
    'health-a-tertiary-level-philhealthaccredited-private':
      'A tertiary level, PhilHealth-accredited private hospital providing comprehensive medical services.',
    'health-national-highway-Bayawan City': 'National Highway, Bayawan City',
    'health-medical-mission-group-hospital-health-services':
      'Medical Mission Group Hospital & Health Services Cooperative',
    'health-also-known-as-new-mmg-hospital-providing-quality':
      'Also known as New MMG Hospital, providing quality healthcare services to the community.',
    'health-bintawan-road-brgy-quezon': 'Bintawan Road, Brgy. Quezon',
    'health-salubris-inc-salubris-medical-center': 'SALUBRIS, INC. (Salubris Medical Center)',
    'health-private-medical-center-offering-various':
      'Private medical center offering various healthcare and diagnostic services.',
    'health-aggub-bhs': 'Aggub BHS',
    'health-bagahabag-bhs': 'Bagahabag BHS',
    'health-bangaan-bhs': 'Bangaan BHS',
    'health-bangar-bhs': 'Bangar BHS',
    'health-buenavista-bhs': 'Buenavista BHS',
    'health-calaocan-bhs': 'Calaocan BHS',
    'health-commando-bhs': 'Commando BHS',
    'health-concepcion-bhs': 'Concepcion BHS',
    'health-curifang-bhs': 'Curifang BHS',
    'health-dadap-bhs': 'Dadap BHS',
    'health-lactawan-bhs': 'Lactawan BHS',
    'health-nangalisan-bhs': 'Nangalisan BHS',
    'health-ocapon-bhs': 'Ocapon BHS',
    'health-osmea-bhs': 'Osmeña BHS',
    'health-paitan-bhs': 'Paitan BHS',
    'health-pilar-bhs': 'Pilar BHS',
    'health-poblacion-bhs': 'Poblacion BHS',
    'health-quezon-bhs': 'Quezon BHS',
    'health-quirino-bhs': 'Quirino BHS',
    'health-roxas-bhs': 'Roxas BHS',
    'health-tucal-bhs': 'Tucal BHS',
    'health-uddiawan-bhs': 'Uddiawan BHS',
    'health-hivcare-cta-eyebrow': 'Official DOH-Sourced Directory',
    'health-hivcare-cta-heading': 'Find HIV Treatment & Care Facilities Near You',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Facilities Nationwide',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly Search',
    'health-hivcare-cta-stat-verified': 'DOH-Verified Listings',

    // Agriculture Page
    'agri-page-title': 'Agriculture Services',
    'agri-page-desc': 'Support for farmers and agricultural development',
    'agri-page-badge': 'Agriculture',
    'agri-seedling': 'Seedling Distribution',
    'agri-seedling-desc': 'Free seeds and seedlings for farmers',
    'agri-equipment': 'Farm Equipment',
    'agri-equipment-desc': 'Equipment rental and assistance',
    'agri-livelihood': 'Livelihood Programs',
    'agri-livelihood-desc': 'Training and support for farmers',
    'agri-office-mao': 'City Agriculture Office',
    'agri-office-mao-desc':
      'RSBSA registration, certifications, rice/corn programs, livestock, fishery services',

    // Ordinance Framework Page
    'ord-page-title': 'Ordinance Framework',
    'ord-page-desc': 'City Ordinances enacted by the Sangguniang Panlungsod ng Bayawan',
    'ord-page-badge': 'Legislative',
    'ord-what-is': 'What is an Ordinance?',
    'ord-what-is-p1':
      'A City Ordinance is a local law enacted by the Sangguniang Panlungsod (City Council) that governs the municipality and its residents. Ordinances have the force and effect of law within the territorial jurisdiction of the municipality.',
    'ord-what-is-p2':
      'Ordinances may cover various subjects including but not limited to: taxation, business regulations, public safety, environmental protection, traffic management, and zoning.',
    'ord-categories-title': 'Ordinance Categories',
    'ord-cat-revenue': 'Revenue & Taxation',
    'ord-cat-business': 'Business & Trade',
    'ord-cat-safety': 'Public Safety',
    'ord-cat-environment': 'Environment',
    'ord-cat-traffic': 'Traffic & Transportation',
    'ord-cat-zoning': 'Zoning & Land Use',
    'ord-2025-title': '2025 Ordinances',
    'ord-2025-subtitle': 'Official ordinances enacted by the Sangguniang Panlungsod ng Bayawan in 2025',
    'ord-table-number': 'Ordinance No.',
    'ord-table-title': 'Title',
    'ord-table-date': 'Session Date',
    'ord-view-all': 'View All Ordinances on SB Website',

    // Resolution Framework Page
    'reso-page-title': 'Resolution Framework',
    'reso-page-desc': 'Resolutions passed by the Sangguniang Panlungsod ng Bayawan',
    'reso-page-badge': 'Legislative',
    'reso-what-is': 'What is a Resolution?',
    'reso-what-is-p1':
      'A resolution is a formal expression of the opinion or will of the Sangguniang Panlungsod. Unlike ordinances, resolutions do not have the force and effect of law but serve as official statements of the legislative body.',
    'reso-what-is-p2':
      'Resolutions are commonly used for: commendations, requests to higher government agencies, expressions of support or opposition, and administrative matters of the Sangguniang Panlungsod.',
    'reso-types-title': 'Types of Resolutions',
    'reso-type-commendation': 'Commendation',
    'reso-type-request': 'Request/Appeal',
    'reso-type-support': 'Support/Endorsement',
    'reso-type-condolence': 'Condolence',
    'reso-type-authorization': 'Authorization',
    'reso-type-appropriation': 'Appropriation',
    'reso-2026-title': '2026 Resolutions',
    'reso-2026-subtitle': 'Official resolutions passed by the Sangguniang Panlungsod ng Bayawan in 2026',
    'reso-2025-title': '2025 Resolutions',
    'reso-2025-subtitle': 'Official resolutions passed by the Sangguniang Panlungsod ng Bayawan in 2025',
    'reso-table-number': 'Resolution No.',
    'reso-table-title': 'Title',
    'reso-table-date': 'Session Date',
    'reso-view-all': 'View All Resolutions on SB Website',

    // Business Services Page
    'biz-page-title': 'Business Services',
    'biz-page-desc': 'Permits, licenses, and support for businesses in Bayawan City',
    'biz-page-badge': 'Business',
    'biz-permit-new': 'Business Permit (New)',
    'biz-permit-new-desc': "Apply for a new mayor's permit for your business",
    'biz-permit-renew': 'Business Permit Renewal',
    'biz-permit-renew-desc': 'Renew your annual business permit',
    'biz-closure': 'Business Closure',
    'biz-closure-desc': 'Process business closure and clearance',
    'biz-cedula': 'Cedula (CTC)',
    'biz-cedula-desc': 'Community tax certificate for individuals and businesses',
    'biz-online-badge': 'Online Services via Filipizen',
    'biz-online-title': 'Online Business Transactions',
    'biz-online-subtitle':
      'Complete your business transactions online through the official Filipizen portal',
    'biz-billing': 'Business Online Billing & Payment',
    'biz-billing-desc': 'View and pay your business tax bills online',

    // Tax & Payments Page
    'tax-page-title': 'Tax & Payments',
    'tax-page-desc': 'Property tax, business tax, and other municipal payments',
    'tax-page-badge': 'Tax & Payments',
    'tax-property': 'Real Property Tax',
    'tax-property-desc': 'Annual tax on land and improvements',
    'tax-business': 'Business Tax',
    'tax-business-desc': 'Quarterly and annual business tax payments',
    'tax-online-badge': 'Online Services via Filipizen',
    'tax-online-title': 'Online Tax Transactions',
    'tax-online-subtitle':
      'Complete your tax payments online through the official Filipizen portal',

    // Social Services Page
    'social-page-title': 'Social Services',
    'social-page-desc': 'Support programs for vulnerable sectors and communities',
    'social-page-badge': 'Social Services',
    'social-senior': 'Senior Citizen ID',
    'social-senior-desc': 'ID for citizens 60 years and above',
    'social-pwd': 'PWD ID',
    'social-pwd-desc': 'Identification for persons with disabilities',
    'social-assistance': 'Financial Assistance',
    'social-assistance-desc': 'Emergency financial aid for medical, burial, and education',

    // Education Page
    'edu-page-title': 'Education Services',
    'edu-page-desc': 'Scholarship programs and educational assistance',
    'edu-page-badge': 'Education',
    'edu-scholarship': 'Scholarship Programs',
    'edu-scholarship-desc': 'Municipal scholarships for students',
    'edu-training': 'Educational Assistance',
    'edu-training-desc': 'Financial aid for education',

    // Infrastructure Page
    'infra-page-title': 'Infrastructure Services',
    'infra-page-desc': 'Building permits, construction, and engineering services',
    'infra-page-badge': 'Infrastructure',
    'infra-building': 'Building Permit',
    'infra-building-desc': 'Permit for new construction and renovation',
    'infra-occupancy': 'Occupancy Permit',
    'infra-occupancy-desc': 'Certificate of occupancy for completed buildings',
    'infra-engineering': 'Engineering Services',
    'infra-engineering-desc': 'Technical assistance and plan review',

    // Public Safety Page
    'safety-page-title': 'Public Safety Services',
    'safety-page-desc': 'Emergency response and disaster preparedness',
    'safety-page-badge': 'Public Safety',
    'safety-disaster': 'Emergency Response',
    'safety-disaster-desc': '24/7 emergency response and rescue services',
    'safety-relief': 'Disaster Assistance',
    'safety-relief-desc': 'Relief goods and evacuation support',
    'safety-preparedness': 'Disaster Preparedness',
    'safety-preparedness-desc': 'Training and resources for disaster readiness',

    // Environment Page
    'env-page-title': 'Environment Services',
    'env-page-desc': 'Waste management and environmental protection',
    'env-page-badge': 'Environment',
    'env-waste': 'Garbage Collection',
    'env-waste-desc': 'Waste collection schedules by barangay',
    'env-recycling': 'Recycling Program',
    'env-recycling-desc': 'Segregation and recycling initiatives',

    // Header Dropdown Items
    'dropdown-certificates': 'Certificates',
    'dropdown-business': 'Business',
    'dropdown-tax-payments': 'Tax Payments',
    'dropdown-social-services': 'Social Services',
    'dropdown-health': 'Health',
    'dropdown-agriculture': 'Agriculture',
    'dropdown-infrastructure': 'Infrastructure',
    'dropdown-education': 'Education',
    'dropdown-public-safety': 'Public Safety',
    'dropdown-environment': 'Environment',
    'dropdown-ordinance-framework': 'Ordinance Framework',
    'dropdown-resolution-framework': 'Resolution Framework',

    // Homepage - Hero
    'hero-browse-services': 'Browse Services',
    'hero-contact-us': 'Contact Us',
    'hero-search-placeholder': 'e.g., birth certificate, business permit',
    'hero-popular': 'Popular:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Business Permit',
    'hero-real-property-tax': 'Real Property Tax',

    // Homepage - Popular Services
    'popular-services-subtitle': 'Quick access to frequently requested municipal services',
    'popular-browse-directory': 'Browse complete directory',

    // Homepage - Stats
    'stats-at-a-glance': 'Bayawan City at a Glance',
    'stats-view-statistics': 'View Statistics',
    'stats-population-label': 'Population',
    'stats-population-source': '2024 Census',
    'stats-barangays-label': 'Barangays',
    'stats-barangays-source': 'Administrative Units',
    'stats-municipality-label': 'Municipality',
    'stats-municipality-source': 'Income Classification',
    'stats-land-area-label': 'Land Area',
    'stats-land-area-source': 'Total Municipal Area',

    // Homepage - Weather & Map
    'weather-map-title': 'Weather and Map of Bayawan City',
    'weather-mainly-clear': 'Mainly clear',
    'weather-location': 'Bayawan City, Negros Oriental',

    // Homepage - History
    'history-title': 'Brief History of Bayawan City',
    'history-1760':
      'The original name of the town was Bintauan, then a Gaddang settlement that is now a barangay of Villaverde.',
    'history-1767':
      'The town was formally founded by Father Alejandro Vidal, a Dominican priest who led a Spanish mission.',
    'history-1768':
      'Named Lungabang, from the Gaddang word for cave, lungab. Later changed to Lumabang by the Spaniards.',
    'history-1851':
      'Governor General Antonio Urbiztondo declared Lumabang a barrio of Bayombong for insufficient inhabitants and revenue.',
    'history-1853':
      'The first Bisayas arrived, brought by Don Diego Lumicao, a former gobernadorcillo.',
    'history-1889':
      'Renamed Bayawan City in honor of Governor General ___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___. The town was redeveloped by Father Juan Villaverde with 14 parallel wide streets, each 20 meters wide, forming 100 square blocks.',
    'history-1957':
      "The barrios of Ibung and Bintawan were separated to form the town of Ibung, later renamed as Villaverde. Bayawan City's land area was reduced to 13,980 hectares.",
    'history-once-largest-title': 'Once the Largest',
    'history-once-largest-desc':
      'Bayawan City was the largest municipality in the province until Caliat and Bintawan were separated to become Quezon and Villaverde respectively.',
    'history-urban-planning-title': 'Urban Planning',
    'history-urban-planning-desc':
      'The 1889 redevelopment created a grid of 100 square blocks, each with an aggregate area of one hectare, with streets running north-south and east-west.',

    // Homepage - News
    'news-announcement': 'Announcement',
    'news-project': 'Project',
    'news-advisory': 'Advisory',
    'news-business-permit-title': 'Business Permit Renewal 2025',
    'news-business-permit-desc':
      'Deadline for business permit renewal is set for January 20, 2025. Early renewal is encouraged.',
    'news-market-title': 'New Public Market Wing Opens',
    'news-market-desc':
      'The renovated wing of the Bayawan City Public Market is now open to vendors and the public.',
    'news-power-title': 'Scheduled Power Interruption',
    'news-power-desc': 'Maintenance scheduled for Barangay Osmeña on Dec 1, 8:00 AM - 5:00 PM.',

    // Homepage - Quiz CTA
    'quiz-title': '___Bayawan City_QUIZ___',
    'quiz-subtitle': 'How well do you know Bayawan City, Negros Oriental?',
    'quiz-description':
      "Evaluate your familiarity with the municipality's heritage, cultural identity, and geographic significance through an interactive knowledge assessment designed to showcase one of Negros Oriental's most prominent localities.",
    'quiz-take': 'Take the Quiz',

    // Footer
    'footer-tagline':
      'Empowering the people of Bayawan City with transparent access to the services, programs, and public funds of LGU Bayawan City.',
    'footer-quick-links': 'Quick Links',
    'footer-resources': 'Resources',
    'footer-Bayawan City-quiz': '___Bayawan City_QUIZ___',
    'footer-sitemap': 'Sitemap',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Terms of Use',
    'footer-privacy': 'Privacy Policy',
    'footer-accessibility': 'Accessibility',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Freedom of Information',
    'footer-lgu-portal': 'Official LGU Bayawan City Portal',
    'footer-sb': 'Sangguniang Panlungsod',
    'footer-lgu-facebook': 'LGU Bayawan City Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Cost to the People of Bayawan City =',
    'footer-volunteer': 'Volunteer with us',
    'footer-contribute': 'Contribute code with us',
    'footer-copyright-text': 'betterbayawan.org',
    'footer-copyright-disclaimer':
      'All public information sourced from official government portals.',
    'footer-skip-to-main': 'Skip to main content',
  },
  fil: {
    // Navigation - Filipino
    'nav-home': 'Tahanan',
    'nav-services': 'Mga Serbisyo',
    'nav-government': 'Pamahalaan',
    'nav-statistics': 'Estadistika',
    'nav-legislative': 'Lehislatura',
    'nav-transparency': 'Transparensiya',
    'nav-contact': 'Makipag-ugnayan',

    // Appointment CTA
    'appointment-cta-heading':
      'Pagpapahusay ng Serbisyo sa Appointment ng Opisina ng Alkalde ng LGU Bayawan City',
    'appointment-cta-subtitle': 'Walang pila. Walang pabalik-balik. Mahusay na appointment lang.',
    'appointment-schedule-btn': 'Mag-iskedyul ng Appointment',
    'appointment-create-btn': 'Gumawa ng Account',

    // Hero Section
    'hero-welcome': 'Maligayang Pagdating sa betterbayawan.org',
    'hero-subtitle':
      'I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Bayawan City, Negros Oriental.',
    'hero-find-service': 'Maghanap ng Serbisyo',

    // Popular Services
    'section-popular': 'Mga Sikat na Serbisyo',
    'service-certificates': 'Mga Sertipiko',
    'service-certificates-desc': 'Sertipiko ng kapanganakan, kasal, at kamatayan',
    'service-business': 'Mga Permit sa Negosyo',
    'service-business-desc': 'Bagong permit at pag-renew',
    'service-tax': 'Pagbabayad ng Buwis',
    'service-tax-desc': 'Buwis sa ari-arian at negosyo',
    'service-social': 'Serbisyong Panlipunan',
    'service-social-desc': 'Serbisyo para sa senior citizen at PWD',
    'service-health': 'Serbisyong Pangkalusugan',
    'service-health-desc': 'Tulong medikal at mga programa',
    'btn-view-all-services': 'Tingnan Lahat ng Serbisyo',

    // Latest Updates
    'section-updates': 'Pinakabagong mga Update',
    'btn-view-all': 'Tingnan Lahat',

    // Municipal Leadership
    'section-leadership': 'Pamunuan ng Munisipalidad',
    'title-mayor': 'Punong Bayan',
    'title-vice-mayor': 'Bise Punong Bayan',
    'btn-view-officials': 'Tingnan Lahat ng Opisyal',

    // Contact Section
    'section-contact': 'Impormasyon sa Pakikipag-ugnayan',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-address': 'Adres',
    'contact-hours': 'Lunes-Biyernes: 8:00 AM - 5:00 PM',
    'contact-response': 'Sasagutin namin sa loob ng 24 na oras',
    'contact-municipal-hall': 'Munisipyo',

    // Services Page
    'services-title': 'Direktoryo ng Serbisyong Munisipal',
    'services-subtitle': 'Tingnan ang lahat ng serbisyong inaalok ng Munisipalidad ng Bayawan City',
    'life-events-title': 'Maghanap Ayon sa Pangyayari sa Buhay',
    'life-events-subtitle': 'Hanapin ang mga serbisyo batay sa nangyayari sa iyong buhay',
    'life-starting-business': 'Magsimula ng Negosyo',
    'life-getting-married': 'Magpakasal',
    'life-having-baby': 'Magkaanak',
    'life-financial-help': 'Kailangan ng Tulong Pinansyal',
    'life-senior': 'Serbisyo para sa Senior Citizen',
    'life-pwd': 'Taong may Kapansanan',
    'life-building': 'Pagtatayo/Pagpapabuti ng Bahay',
    'life-trouble': 'Nalagay sa Problema',

    // Service Categories
    'cat-certificates': 'Mga Sertipiko at Vital Records',
    'cat-certificates-desc':
      'Sertipiko ng kapanganakan, kamatayan, kasal, at iba pang vital records.',
    'cat-business': 'Negosyo at Kalakalan',
    'cat-business-desc':
      'Mga permit sa negosyo, lisensya, at serbisyo sa pagpaparehistro ng kalakalan.',
    'cat-social': 'Serbisyong Panlipunan',
    'cat-social-desc':
      'Mga programa sa kapakanan, serbisyo para sa senior citizen, benepisyo ng PWD, at tulong pinansyal.',
    'cat-health': 'Kalusugan at Kagalingan',
    'cat-health-desc': 'Mga programa sa bakuna, health certificates, at tulong medikal.',
    'cat-tax': 'Pagbubuwis at Pagbabayad',
    'cat-tax-desc': 'Buwis sa ari-arian, buwis sa negosyo, pagbabayad, at tax clearance.',
    'cat-agriculture': 'Agrikultura',
    'cat-agriculture-desc':
      'Mga pautang sa agrikultura, insurance sa pananim, tulong sa pataba, at pagsasanay.',
    'cat-infrastructure': 'Imprastraktura',
    'cat-infrastructure-desc':
      'Mga permit sa konstruksyon, kahilingan sa pagpapanatili ng kalsada, at pampublikong pasilidad.',
    'cat-education': 'Edukasyon at Iskolarship',
    'cat-education-desc':
      'Mga programa sa iskolarship, tulong sa estudyante, at mga grant sa edukasyon.',
    'cat-safety': 'Kaligtasan ng Publiko',
    'cat-safety-desc':
      'Mga serbisyong pang-emergency, paghahanda sa sakuna, at mga programa sa kaligtasan ng komunidad.',
    'cat-environment': 'Kapaligiran',
    'cat-environment-desc':
      'Mga permit sa kapaligiran, pamamahala ng basura, at mga programa sa konserbasyon.',

    // FAQ Page
    'faq-title': 'Mga Madalas Itanong',
    'faq-subtitle':
      'Hanapin ang mga sagot sa mga karaniwang tanong tungkol sa mga serbisyong munisipal',
    'faq-general': 'Mga Pangkalahatang Tanong',
    'faq-certificates': 'Mga Sertipiko at Dokumento',
    'faq-business': 'Negosyo at Permit',
    'faq-payments': 'Pagbabayad at Bayarin',
    'faq-social': 'Serbisyong Panlipunan',
    'faq-technical': 'Mga Teknikal na Tanong',
    'faq-still-questions': 'May tanong pa ba kayo?',
    'faq-contact-help':
      'Kung hindi ninyo nakita ang sagot na hinahanap, huwag mag-atubiling makipag-ugnayan sa amin.',

    // Common Labels - Filipino
    'label-fee': 'Bayad:',
    'label-time': 'Oras:',
    'label-free': 'Libre',
    'label-varies': 'Nag-iiba',
    'label-walk-in': 'Walk-in',
    'label-seasonal': 'Pana-panahon',
    'label-1-day': '1 araw',
    'label-1-2-days': '1-2 araw',
    'label-3-5-days': '3-5 araw',
    'section-responsible-offices': 'Mga Responsableng Opisina',

    // Health Page - Filipino
    'health-page-title': 'Serbisyong Pangkalusugan',
    'health-page-desc': 'Mga konsultasyong medikal, bakuna, at programa sa kalusugan',
    'health-page-badge': 'Kalusugan',
    'health-consultation': 'Konsultasyong Medikal',
    'health-consultation-desc': 'Libreng konsultasyon sa Rural Health Units',
    'health-vaccination': 'Mga Programa sa Bakuna',
    'health-vaccination-desc': 'Libreng immunization para sa mga bata at matatanda',
    'health-prenatal': 'Prenatal Care',
    'health-prenatal-desc': 'Libreng prenatal checkups at serbisyo',
    'health-dental': 'Serbisyong Dental',
    'health-dental-desc': 'Basic dental care at bunot',
    'health-stats-title': 'Estadistika ng Kalusugan',
    'health-rhu': 'Rural Health Units',
    'health-bhw': 'Barangay Health Workers',
    'health-hospitals-title': 'Mga Ospital sa Lugar',
    'label-schedule-varies': 'Iba-iba ang iskedyul',
    'label-by-appointment': 'Sa pamamagitan ng appointment',
    'label-free-subsidy': 'Libre (subsidiya)',
    'label-1-3-days': '1-3 araw',
    'health-maternal': 'Pangangalaga sa Ina',
    'health-maternal-desc': 'Serbisyo sa kalusugan bago at pagkatapos manganak',
    'health-medicine': 'Tulong sa Gamot',
    'health-medicine-desc': 'Tulong pinansyal para sa gamot sa pamamagitan ng MSWDO',
    'health-stat-facilities': 'Kabuuang Pasilidad sa Kalusugan',
    'health-stat-hospitals': 'Mga Pangunahing Ospital',
    'health-stat-bhs': 'Mga Barangay Health Station',
    'health-stat-mho': 'Opisina ng Kalusugan ng Munisipalidad',
    'health-section-hospitals': 'Mga Ospital sa Bayawan City',
    'health-section-mho': 'Opisina ng Kalusugan ng Munisipalidad',
    'health-section-bhs': 'Mga Barangay Health Station',
    'health-bhs-subtitle':
      '22 Barangay Health Stations/Centers na naglilingkod sa lahat ng barangay ng Bayawan City',
    'health-mho-title': 'Opisina ng Kalusugan ng Munisipalidad ng Bayawan City',
    'health-mho-desc':
      'Ang City Health Office ay nagbibigay ng pangunahing serbisyo sa kalusugan kabilang ang lying-in facility at laboratory services. Ito ang pangunahing public health center ng munisipalidad.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Serbisyo sa Laboratoryo',
    'health-service-immunization': 'Immunisasyon',
    'health-service-prenatal': 'Pangangalaga Bago Manganak',
    'health-service-family-planning': 'Pagpaplano ng Pamilya',
    'health-service-tb-dots': 'TB-DOTS',
    'health-pltciluis-a-tiam-medical-center': 'PLTCI-Luis A. Tiam Medical Center',
    'health-a-tertiary-level-philhealthaccredited-private':
      'A tertiary level, PhilHealth-accredited pribadong hospital nagbibigay ng komprehensibong mga serbisyong medikal.',
    'health-national-highway-Bayawan City': 'Pambansa Highway, Bayawan City',
    'health-medical-mission-group-hospital-health-services':
      'Medical Mission Group Hospital & Health Mga serbisyo Cooperative',
    'health-also-known-as-new-mmg-hospital-providing-quality':
      'Also known as Bagong MMG Hospital, nagbibigay ng quality mga serbisyo sa kalusugan sa ang community.',
    'health-bintawan-road-brgy-quezon': 'Bintawan Road, Brgy. Quezon',
    'health-salubris-inc-salubris-medical-center': 'SALUBRIS, INC. (Salubris Medical Center)',
    'health-private-medical-center-offering-various':
      'Pribado medical center offering various healthcare and diagnostic mga serbisyo.',
    'health-aggub-bhs': 'Aggub BHS',
    'health-bagahabag-bhs': 'Bagahabag BHS',
    'health-bangaan-bhs': 'Bangaan BHS',
    'health-bangar-bhs': 'Bangar BHS',
    'health-buenavista-bhs': 'Buenavista BHS',
    'health-calaocan-bhs': 'Calaocan BHS',
    'health-commando-bhs': 'Commando BHS',
    'health-concepcion-bhs': 'Concepcion BHS',
    'health-curifang-bhs': 'Curifang BHS',
    'health-dadap-bhs': 'Dadap BHS',
    'health-lactawan-bhs': 'Lactawan BHS',
    'health-nangalisan-bhs': 'Nangalisan BHS',
    'health-ocapon-bhs': 'Ocapon BHS',
    'health-osmea-bhs': 'Osmeña BHS',
    'health-paitan-bhs': 'Paitan BHS',
    'health-pilar-bhs': 'Pilar BHS',
    'health-poblacion-bhs': 'Poblacion BHS',
    'health-quezon-bhs': 'Quezon BHS',
    'health-quirino-bhs': 'Quirino BHS',
    'health-roxas-bhs': 'Roxas BHS',
    'health-tucal-bhs': 'Tucal BHS',
    'health-uddiawan-bhs': 'Uddiawan BHS',
    'health-hivcare-cta-eyebrow': 'Opisyal na Direktoryo mula sa DOH',
    'health-hivcare-cta-heading': 'Hanapin ang Pasilidad para sa Paggamot at Pangangalaga sa HIV',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Pasilidad sa Buong Bansa',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly na Paghahanap',
    'health-hivcare-cta-stat-verified': 'Beripikado ng DOH',

    // Agriculture Page - Filipino
    'agri-page-title': 'Serbisyong Agrikultura',
    'agri-page-desc': 'Suporta para sa mga magsasaka at pag-unlad ng agrikultura',
    'agri-page-badge': 'Agrikultura',
    'agri-seedling': 'Pamamahagi ng Binhi',
    'agri-seedling-desc': 'Libreng buto at binhi para sa mga magsasaka',
    'agri-equipment': 'Kagamitan sa Bukid',
    'agri-equipment-desc': 'Renta at tulong sa kagamitan',
    'agri-livelihood': 'Mga Programa sa Kabuhayan',
    'agri-livelihood-desc': 'Pagsasanay at suporta para sa mga magsasaka',
    'agri-office-mao': 'Opisina ng Agrikultura ng Munisipalidad',
    'agri-office-mao-desc':
      'Pagpaparehistro sa RSBSA, mga sertipikasyon, programa sa palay/mais, livestock, serbisyo sa pangisdaan',

    // Ordinance Framework Page - Filipino
    'ord-page-title': 'Balangkas ng Ordinansa',
    'ord-page-desc': 'Mga ordinansang ipinasa ng Sangguniang Panlungsod ng Bayawan',
    'ord-page-badge': 'Lehislatura',
    'ord-what-is': 'Ano ang Ordinansa?',
    'ord-what-is-p1':
      'Ang munisipal na ordinansa ay lokal na batas na ipinasa ng Sangguniang Panlungsod (Konseho ng Munisipalidad) na namamahala sa munisipalidad at mga residente nito. Ang mga ordinansa ay may bisa at epekto ng batas sa saklaw ng munisipalidad.',
    'ord-what-is-p2':
      "Ang mga ordinansa ay maaaring sumasaklaw sa iba't ibang paksa kabilang ngunit hindi limitado sa: pagbubuwis, regulasyon sa negosyo, kaligtasang pampubliko, proteksyon sa kapaligiran, pamamahala ng trapiko, at zoning.",
    'ord-categories-title': 'Mga Kategorya ng Ordinansa',
    'ord-cat-revenue': 'Kita at Pagbubuwis',
    'ord-cat-business': 'Negosyo at Kalakalan',
    'ord-cat-safety': 'Kaligtasang Pampubliko',
    'ord-cat-environment': 'Kapaligiran',
    'ord-cat-traffic': 'Trapiko at Transportasyon',
    'ord-cat-zoning': 'Zoning at Paggamit ng Lupa',
    'ord-2025-title': 'Mga Ordinansa ng 2025',
    'ord-2025-subtitle':
      'Mga opisyal na ordinansang ipinasa ng Sangguniang Panlungsod ng Bayawan sa 2025',
    'ord-table-number': 'Numero ng Ordinansa',
    'ord-table-title': 'Pamagat',
    'ord-table-date': 'Petsa ng Sesyon',
    'ord-view-all': 'Tingnan Lahat ng Ordinansa sa SB Website',

    // Resolution Framework Page - Filipino
    'reso-page-title': 'Balangkas ng Resolusyon',
    'reso-page-desc': 'Mga resolusyong ipinasa ng Sangguniang Panlungsod ng Bayawan',
    'reso-page-badge': 'Lehislatura',
    'reso-what-is': 'Ano ang Resolusyon?',
    'reso-what-is-p1':
      'Ang resolusyon ay pormal na pagpapahayag ng opinyon o kalooban ng Sangguniang Panlungsod. Hindi tulad ng mga ordinansa, ang mga resolusyon ay walang bisa at epekto ng batas ngunit nagsisilbing opisyal na pahayag ng lehislatura.',
    'reso-what-is-p2':
      'Ang mga resolusyon ay karaniwang ginagamit para sa: mga pagpupugay, mga kahilingan sa mas mataas na ahensya ng pamahalaan, mga pagpapahayag ng suporta o pagtutol, at mga administratibong bagay ng Sangguniang Panlungsod.',
    'reso-types-title': 'Mga Uri ng Resolusyon',
    'reso-type-commendation': 'Pagpupugay',
    'reso-type-request': 'Kahilingan/Apela',
    'reso-type-support': 'Suporta/Endorsement',
    'reso-type-condolence': 'Pakikiramay',
    'reso-type-authorization': 'Awtorisasyon',
    'reso-type-appropriation': 'Apropriyasyon',
    'reso-2026-title': 'Mga Resolusyon ng 2026',
    'reso-2026-subtitle':
      'Mga opisyal na resolusyong ipinasa ng Sangguniang Panlungsod ng Bayawan sa 2026',
    'reso-2025-title': 'Mga Resolusyon ng 2025',
    'reso-2025-subtitle':
      'Mga opisyal na resolusyong ipinasa ng Sangguniang Panlungsod ng Bayawan sa 2025',
    'reso-table-number': 'Numero ng Resolusyon',
    'reso-table-title': 'Pamagat',
    'reso-table-date': 'Petsa ng Sesyon',
    'reso-view-all': 'Tingnan Lahat ng Resolusyon sa SB Website',

    // Business Services Page - Filipino
    'biz-page-title': 'Serbisyo sa Negosyo',
    'biz-page-desc': 'Mga permit, lisensya, at suporta para sa mga negosyo sa Bayawan City',
    'biz-page-badge': 'Negosyo',
    'biz-permit-new': 'Permit ng Negosyo (Bago)',
    'biz-permit-new-desc': "Mag-apply ng bagong mayor's permit para sa iyong negosyo",
    'biz-permit-renew': 'Pag-renew ng Permit ng Negosyo',
    'biz-permit-renew-desc': 'I-renew ang taunang permit ng negosyo',
    'biz-closure': 'Pagsasara ng Negosyo',
    'biz-closure-desc': 'Proseso ng pagsasara at clearance ng negosyo',
    'biz-cedula': 'Sedula (CTC)',
    'biz-cedula-desc': 'Community tax certificate para sa mga indibidwal at negosyo',
    'biz-online-badge': 'Online Services sa pamamagitan ng Filipizen',
    'biz-online-title': 'Online na Transaksyon sa Negosyo',
    'biz-online-subtitle':
      'Kumpletuhin ang iyong mga transaksyon sa negosyo online sa pamamagitan ng opisyal na portal ng Filipizen',
    'biz-billing': 'Online Billing at Pagbabayad ng Negosyo',
    'biz-billing-desc': 'Tingnan at bayaran ang iyong business tax bills online',

    // Tax & Payments Page - Filipino
    'tax-page-title': 'Buwis at Pagbabayad',
    'tax-page-desc': 'Buwis sa ari-arian, buwis sa negosyo, at iba pang bayarin sa munisipalidad',
    'tax-page-badge': 'Buwis at Pagbabayad',
    'tax-property': 'Real Property Tax',
    'tax-property-desc': 'Taunang buwis sa lupa at mga pagpapabuti',
    'tax-business': 'Buwis sa Negosyo',
    'tax-business-desc': 'Quarterly at taunang pagbabayad ng buwis sa negosyo',
    'tax-online-badge': 'Online Services sa pamamagitan ng Filipizen',
    'tax-online-title': 'Online na Transaksyon sa Buwis',
    'tax-online-subtitle':
      'Kumpletuhin ang iyong mga pagbabayad ng buwis online sa pamamagitan ng opisyal na portal ng Filipizen',

    // Social Services Page - Filipino
    'social-page-title': 'Serbisyong Panlipunan',
    'social-page-desc': 'Mga programa ng suporta para sa mga vulnerable na sektor at komunidad',
    'social-page-badge': 'Serbisyong Panlipunan',
    'social-senior': 'Senior Citizen ID',
    'social-senior-desc': 'ID para sa mga mamamayang 60 taong gulang pataas',
    'social-pwd': 'PWD ID',
    'social-pwd-desc': 'Pagkakakilanlan para sa mga may kapansanan',
    'social-assistance': 'Tulong Pinansyal',
    'social-assistance-desc': 'Emergency na tulong pinansyal para sa medikal, libing, at edukasyon',

    // Education Page - Filipino
    'edu-page-title': 'Serbisyong Pang-edukasyon',
    'edu-page-desc': 'Mga programa ng iskolarship at tulong pang-edukasyon',
    'edu-page-badge': 'Edukasyon',
    'edu-scholarship': 'Mga Programa ng Iskolarship',
    'edu-scholarship-desc': 'Mga iskolarship ng munisipalidad para sa mga estudyante',
    'edu-training': 'Tulong Pang-edukasyon',
    'edu-training-desc': 'Tulong pinansyal para sa edukasyon',

    // Infrastructure Page - Filipino
    'infra-page-title': 'Serbisyong Imprastraktura',
    'infra-page-desc': 'Building permits, konstruksyon, at serbisyong engineering',
    'infra-page-badge': 'Imprastraktura',
    'infra-building': 'Building Permit',
    'infra-building-desc': 'Permit para sa bagong konstruksyon at renovation',
    'infra-occupancy': 'Occupancy Permit',
    'infra-occupancy-desc': 'Certificate of occupancy para sa natapos na mga gusali',
    'infra-engineering': 'Serbisyong Engineering',
    'infra-engineering-desc': 'Teknikal na tulong at pagsusuri ng plano',

    // Public Safety Page - Filipino
    'safety-page-title': 'Serbisyong Pangkaligtasan',
    'safety-page-desc': 'Tugon sa emergency at paghahanda sa kalamidad',
    'safety-page-badge': 'Kaligtasang Pampubliko',
    'safety-disaster': 'Tugon sa Emergency',
    'safety-disaster-desc': '24/7 na tugon at serbisyong rescue sa emergency',
    'safety-relief': 'Tulong sa Kalamidad',
    'safety-relief-desc': 'Relief goods at suporta sa paglikas',
    'safety-preparedness': 'Paghahanda sa Kalamidad',
    'safety-preparedness-desc': 'Pagsasanay at mga resources para sa disaster readiness',

    // Environment Page - Filipino
    'env-page-title': 'Serbisyong Pangkapaligiran',
    'env-page-desc': 'Pamamahala ng basura at proteksyon sa kapaligiran',
    'env-page-badge': 'Kapaligiran',
    'env-waste': 'Pangongolekta ng Basura',
    'env-waste-desc': 'Mga iskedyul ng pangongolekta ng basura ayon sa barangay',
    'env-recycling': 'Programa sa Recycling',
    'env-recycling-desc': 'Segregasyon at mga inisyatiba sa recycling',

    // Header Dropdown Items
    'dropdown-certificates': 'Mga Sertipiko',
    'dropdown-business': 'Negosyo',
    'dropdown-tax-payments': 'Pagbabayad ng Buwis',
    'dropdown-social-services': 'Serbisyong Panlipunan',
    'dropdown-health': 'Kalusugan',
    'dropdown-agriculture': 'Agrikultura',
    'dropdown-infrastructure': 'Imprastraktura',
    'dropdown-education': 'Edukasyon',
    'dropdown-public-safety': 'Kaligtasang Pampubliko',
    'dropdown-environment': 'Kapaligiran',
    'dropdown-ordinance-framework': 'Balangkas ng Ordinansa',
    'dropdown-resolution-framework': 'Balangkas ng Resolusyon',

    // Homepage - Hero
    'hero-browse-services': 'Tingnan ang mga Serbisyo',
    'hero-contact-us': 'Makipag-ugnayan',
    'hero-search-placeholder': 'hal., birth certificate, business permit',
    'hero-popular': 'Sikat:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Permit sa Negosyo',
    'hero-real-property-tax': 'Buwis sa Ari-arian',

    // Homepage - Popular Services
    'popular-services-subtitle':
      'Mabilis na access sa mga madalas na hinihinging serbisyo ng munisipalidad',
    'popular-browse-directory': 'Tingnan ang kumpletong direktoryo',

    // Homepage - Stats
    'stats-at-a-glance': 'Isang Tingin sa Bayawan City',
    'stats-view-statistics': 'Tingnan ang Estadistika',
    'stats-population-label': 'Populasyon',
    'stats-population-source': '2024 Senso',
    'stats-barangays-label': 'Mga Barangay',
    'stats-barangays-source': 'Mga Yunit Administratibo',
    'stats-municipality-label': 'Munisipalidad',
    'stats-municipality-source': 'Klasipikasyon ng Kita',
    'stats-land-area-label': 'Lawak ng Lupa',
    'stats-land-area-source': 'Kabuuang Lawak ng Munisipalidad',

    // Homepage - Weather & Map
    'weather-map-title': 'Panahon at Mapa ng Bayawan City',
    'weather-mainly-clear': 'Halos maaliwalas',
    'weather-location': 'Bayawan City, Negros Oriental',

    // Homepage - History
    'history-title': 'Maikling Kasaysayan ng Bayawan City',
    'history-1760':
      'Ang orihinal na pangalan ng bayan ay Bintauan, isang pamayanan ng Gaddang na ngayon ay barangay ng Villaverde.',
    'history-1767':
      'Ang bayan ay pormal na itinatag ni Padre Alejandro Vidal, isang paring Dominikano na namuno sa isang misyong Espanyol.',
    'history-1768':
      'Pinangalanang Lungabang, mula sa salitang Gaddang na lungab na nangangahulugang kuweba. Kalaunan ay binago ng mga Espanyol sa Lumabang.',
    'history-1851':
      'Idineklara ni Gobernador Heneral Antonio Urbiztondo ang Lumabang bilang baryo ng Bayombong dahil sa kakulangan ng mga naninirahan at kita.',
    'history-1853':
      'Dumating ang mga unang Bisaya, dinala ni Don Diego Lumicao, isang dating gobernadorcillo.',
    'history-1889':
      'Pinalitan ang pangalan ng Bayawan City bilang parangal kay Gobernador Heneral ___HISTORICAL_RAMON_Bayawan City_Y_LLANDERAL___. Ang bayan ay muling binuo ni Padre Juan Villaverde na may 14 na magkakahanay na malapad na kalye, bawat isa ay 20 metro ang lapad, na bumubuo ng 100 parisukat na bloke.',
    'history-1957':
      'Ang mga baryo ng Ibung at Bintawan ay pinaghiwalay upang bumuo ng bayan ng Ibung, na kalaunan ay pinalitan ng pangalang Villaverde. Ang lawak ng lupa ng Bayawan City ay nabawasan sa 13,980 ektarya.',
    'history-once-largest-title': 'Dating Pinakamalaki',
    'history-once-largest-desc':
      'Ang Bayawan City ang pinakamalaking munisipalidad sa probinsya hanggang sa pinaghiwalay ang Caliat at Bintawan upang maging Quezon at Villaverde.',
    'history-urban-planning-title': 'Pagpaplano ng Lungsod',
    'history-urban-planning-desc':
      'Ang muling pagbuo noong 1889 ay lumikha ng grid na may 100 parisukat na bloke, bawat isa ay may kabuuang lawak na isang ektarya, na may mga kalye na patungo sa hilaga-timog at silangan-kanluran.',

    // Homepage - News
    'news-announcement': 'Anunsyo',
    'news-project': 'Proyekto',
    'news-advisory': 'Abiso',
    'news-business-permit-title': 'Pag-renew ng Permit sa Negosyo 2025',
    'news-business-permit-desc':
      'Ang deadline para sa pag-renew ng permit sa negosyo ay Enero 20, 2025. Hinihikayat ang maagang pag-renew.',
    'news-market-title': 'Bagong Wing ng Pampublikong Palengke Bukas Na',
    'news-market-desc':
      'Ang na-renovate na wing ng Pampublikong Palengke ng Bayawan City ay bukas na sa mga nagtitinda at publiko.',
    'news-power-title': 'Nakaiskedyul na Pagkaputol ng Kuryente',
    'news-power-desc':
      'Maintenance na nakaiskedyul para sa Barangay Osmeña sa Dis 1, 8:00 AM - 5:00 PM.',

    // Homepage - Quiz CTA
    'quiz-title': '___Bayawan City_QUIZ___',
    'quiz-subtitle': 'Gaano mo kakilala ang Bayawan City, Negros Oriental?',
    'quiz-description':
      'Suriin ang iyong kaalaman sa pamana, pagkakakilanlan sa kultura, at kahalagahang heograpiko ng munisipalidad sa pamamagitan ng isang interactive na pagtatasa ng kaalaman na idinisenyo upang ipakita ang isa sa mga pinakatanyag na lokalidad ng Negros Oriental.',
    'quiz-take': 'Subukin ang Quiz',

    // Footer
    'footer-tagline':
      'Pagbibigay-kapangyarihan sa mga tao ng Bayawan City na may transparent na access sa mga serbisyo, programa, at pampublikong pondo ng LGU Bayawan City.',
    'footer-quick-links': 'Mga Mabilisang Link',
    'footer-resources': 'Mga Mapagkukunan',
    'footer-Bayawan City-quiz': '___Bayawan City_QUIZ___',
    'footer-sitemap': 'Mapa ng Site',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Mga Tuntunin ng Paggamit',
    'footer-privacy': 'Patakaran sa Privacy',
    'footer-accessibility': 'Aksesibilidad',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Kalayaan sa Impormasyon',
    'footer-lgu-portal': 'Opisyal na Portal ng LGU Bayawan City',
    'footer-sb': 'Sangguniang Panlungsod',
    'footer-lgu-facebook': 'LGU Bayawan City Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Gastos sa mga Tao ng Bayawan City =',
    'footer-volunteer': 'Mag-volunteer sa amin',
    'footer-contribute': 'Mag-ambag ng code sa amin',
    'footer-copyright-text': 'betterbayawan.org',
    'footer-copyright-disclaimer':
      'Lahat ng pampublikong impormasyon ay mula sa mga opisyal na portal ng pamahalaan.',
    'footer-skip-to-main': 'Lumaktaw sa pangunahing nilalaman',
  },
  bis: {
    // Navigation - Bisaya
    'nav-home': 'Home',
    'nav-services': 'Mga Serbisyo',
    'nav-government': 'Gobyerno',
    'nav-statistics': 'Estadistika',
    'nav-legislative': 'Lehislatura',
    'nav-transparency': 'Transparency',
    'nav-contact': 'Contact',
    'nav-budget': 'Budget',
    'nav-news': 'Balita',
    'nav-faq': 'FAQ',
    'nav-sitemap': 'Sitemap',
    'nav-privacy': 'Privacy',
    'nav-terms': 'Terms',
    'nav-accessibility': 'Accessibility',

    // Appointment CTA
    'appointment-cta-heading':
      "Enhancing Appointment Services sa LGU Bayawan City Mayor's Office",
    'appointment-cta-subtitle': 'Schedule imong appointment online',
    'appointment-schedule-btn': 'Book Appointment',
    'appointment-create-btn': 'Create Account',

    // Hero Section
    'hero-welcome': 'Welcome sa BetterBayawan.org',
    'hero-subtitle':
      'Access government services, information, ug resources para sa mga tawo sa Bayawan City, Negros Oriental.',
    'hero-find-service': 'Pangita ug Serbisyo',

    // Popular Services
    'section-popular': 'Popular nga Serbisyo',
    'service-certificates': 'Mga Sertipiko',
    'service-certificates-desc': 'Birth, marriage, ug death certificates',
    'service-business': 'Business Permit',
    'service-business-desc': 'Bag-o ug renewal sa permit',
    'service-tax': 'Tax Payment',
    'service-tax-desc': 'Real property ug business tax',
    'service-social': 'Social Services',
    'service-social-desc': 'Services para sa senior citizens ug PWD',
    'service-health': 'Health Services',
    'service-health-desc': 'Medical assistance ug programs',
    'btn-view-all-services': 'View All Services',

    // Latest Updates
    'section-updates': 'Labing Bag-ong Updates',
    'btn-view-all': 'View All',

    // Municipal Leadership
    'section-leadership': 'City Leadership',
    'title-mayor': 'City Mayor',
    'title-vice-mayor': 'City Vice Mayor',
    'btn-view-officials': 'View All Officials',

    // Stats Section
    'stats-title': 'City Statistics',
    'stats-subtitle': 'Demographics ug economic data para sa Bayawan City',
    'stats-population': 'Population',
    'stats-land-area': 'Land Area',
    'stats-density': 'Population Density',
    'stats-households': 'Households',
    'stats-growth-rate': 'Growth Rate',
    'stats-barangays': 'Barangays',
    'stats-barangay-population': 'Population by Barangay',
    'stats-barangay-population-desc': 'Interactive chart sa population distribution',

    // Weather & Map
    'weather-map-title': 'Weather ug Map sa Bayawan City',
    'weather-location': 'Bayawan City, Negros Oriental',
    'weather-humidity': 'Humidity',
    'weather-wind': 'Wind',
    'weather-sunrise': 'Sunrise',
    'weather-sunset': 'Sunset',
    'map-attribution': 'Bayawan City Hall, Negros Oriental 6221',
    'map-interactive-desc': 'Interactive map nagpakita sa location sa Bayawan City Hall',

    // History Section
    'history-title': 'Brief History sa Bayawan City',
    'history-1760': '1760 — Foundation',
    'history-1760-desc':
      'Bayawan City gihimo nga parish nga gipangalan sa Santo Niño.',
    'history-1872': '1872 — Establishment',
    'history-1872-desc':
      'Gihimong municipality ang Bayawan sa ilalum sa Spanish colonial government.',
    'history-1901': '1901 — American Period',
    'history-1901-desc':
      'Gihimong municipality sa ilalum sa American administration.',
    'history-1947': '1947 — Post-War',
    'history-1947-desc':
      'Re-established nga municipality pagkatapos sa WWII.',
    'history-2000': '2000 — Cityhood',
    'history-2000-desc':
      'Naging component city sa Negros Oriental pinaagi sa RA 8983.',

    // News Section
    'news-title': 'News ug Announcements',
    'news-subtitle': 'Labing bag-ong updates gikan sa City of Bayawan',
    'news-read-more': 'Basa Pa',
    'news-no-news': 'Walay available nga balita karon.',

    // Footer
    'footer-quick-links': 'Quick Links',
    'footer-services': 'Mga Serbisyo',
    'footer-government': 'Gobyerno',
    'footer-transparency': 'Transparency',
    'footer-contact': 'Contact',
    'footer-faq': 'FAQ',
    'footer-sitemap': 'Sitemap',
    'footer-privacy': 'Privacy Policy',
    'footer-terms': 'Terms of Use',
    'footer-accessibility': 'Accessibility',
    'footer-bayawan-quiz': 'Bayawan Quiz',
    'footer-lgu-portal': 'Official LGU Bayawan Portal',
    'footer-lgu-facebook': 'LGU Bayawan Facebook',
    'footer-copyright-text': '© 2026 betterbayawan.org. All rights reserved.',
    'footer-copyright-license': 'MIT License | CC BY 4.0',
    'footer-copyright-disclaimer': 'Not an official government website.',
    'footer-cost': 'Cost to the People of Bayawan City =',
    'footer-cost-value': '₱0',

    // Services Page
    'services-title': 'Mga Serbisyo sa Siyudad',
    'services-subtitle': 'Browse tanan nga serbisyo nga inalok sa City of Bayawan',
    'services-search-placeholder': 'Pangita ug serbisyo...',
    'services-categories': 'Mga Kategorya sa Serbisyo',
    'services-all': 'Tanan nga Serbisyo',

    // Government Page
    'gov-title': 'City Government',
    'gov-subtitle': 'Meet the leadership ug offices nga nag-alagad sa Bayawan City',
    'gov-mayor': 'City Mayor',
    'gov-vice-mayor': 'City Vice Mayor',
    'gov-sb-title': 'Sangguniang Panlungsod',
    'gov-sb-subtitle': 'City Councilors nga nag-alagad sa tawo sa Bayawan City',
    'gov-sb-member': 'SP Member',
    'gov-barangays': 'Mga Barangay sa Bayawan City',
    'gov-departments': 'Mga Departamento',
    'gov-department-head': 'Department Head',

    // Legislative Page
    'legislative-title': 'Legislative Documents',
    'legislative-ordinances': 'Ordinances',
    'legislative-resolutions': 'Resolutions',
    'legislative-search': 'Pangita ug documents...',
    'legislative-year': 'Tuig',
    'legislative-number': 'Numero',
    'legislative-title-col': 'Title',
    'legislative-date': 'Petsa',
    'legislative-status': 'Status',

    // Budget Page
    'budget-title': 'Budget Transparency',
    'budget-income': 'Kita',
    'budget-expenses': 'Gastos',
    'budget-projects': 'Mga Proyekto',
    'budget-year': 'Fiscal Year',
    'budget-download': 'Download Report',
    'budget-dpwh-projects': 'DPWH Infrastructure Projects sa Bayawan City',

    // News Page
    'news-page-title': 'News ug Announcements',
    'news-page-subtitle': 'Labing bag-ong updates gikan sa City of Bayawan',

    // Contact Page
    'contact-page-title': 'Contact Us',
    'contact-page-subtitle': 'Makig-uyab sa amoa',
    'contact-address': 'Address',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-hours': 'Office Hours',
    'contact-form-name': 'Ngalan',
    'contact-form-email': 'Email',
    'contact-form-subject': 'Subject',
    'contact-form-message': 'Mensahe',
    'contact-form-submit': 'Padala ug Mensahe',

    // Emergency Hotlines
    'emergency-hotlines': 'Emergency Hotlines',
    'emergency-police': 'Police (PNP)',
    'emergency-fire': 'Fire (BFP)',
    'emergency-medical': 'Medical',
    'emergency-disaster': 'Disaster (MDRRMO)',
    'emergency-call': 'Tawag',

    // Language
    'language-select': 'Pili ang Pinulongan',
    'language-en': 'English',
    'language-fil': 'Filipino',
    'language-bis': 'Bisaya',

    // PWA
    'pwa-install': 'Install App',
    'pwa-dismiss': 'Dismiss',
    'pwa-update-available': 'Update Available',
    'pwa-refresh': 'Refresh',

    // Offline
    'offline-title': 'Offline ka',
    'offline-message': 'Walay internet connection. Unsaon pag work ang uban nga features.',
    'offline-emergency-hotlines': 'Emergency Hotlines - Bayawan City, Negros Oriental',

    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'retry': 'Usab',
    'close': 'Sarang',
    'save': 'Save',
    'cancel': 'Cancel',
    'submit': 'Submit',
    'back': 'Balik',
    'continue': 'Padayon',
    'view-all': 'Tan-awon Tanan',
    'read-more': 'Basa Pa',
    'show-more': 'Ipakita Pa',
    'show-less': 'Ipakita Gamay',

    // Accessibility
    'a11y-skip': 'Skip to main content',
    'a11y-menu': 'Menu',
    'a11y-search': 'Search',
    'a11y-language': 'Pinulongan',
    'a11y-theme': 'Theme',

    // Services Detail
    'service-requirements': 'Mga Requirements',
    'service-fees': 'Mga Bayad',
    'service-processing-time': 'Processing Time',
    'service-office': 'Opisina',
    'service-contact': 'Contact',
    'service-online': 'Online Application',
    'service-walkin': 'Walk-in',

    // Certificate Services
    'cert-birth': 'Birth Certificate',
    'cert-death': 'Death Certificate',
    'cert-marriage': 'Marriage Certificate',
    'cert-cenomar': 'CENOMAR',
    'cert-birth-desc': 'Get certified copy sa birth certificate nga narehistro sa Bayawan City',
    'cert-death-desc': 'Get certified copy sa death certificate',
    'cert-marriage-desc': 'Get certified copy sa marriage certificate',

    // Business Services
    'biz-permit': 'Business Permit',
    'biz-renewal': 'Business Permit Renewal',
    'biz-new': 'New Business Registration',
    'biz-barangay': 'Barangay Clearance',
    'biz-page-desc': 'Permits, licenses, ug support para sa mga negosyo sa Bayawan City',

    // Health Services
    'health-page-title': 'Health Services',
    'health-subtitle': 'Medical ug health services sa Bayawan City',
    'health-hospitals': 'Mga Hospital sa Bayawan City',
    'health-rhu': 'Rural Health Unit',
    'health-bhs': 'Barangay Health Stations',
    'health-bhs-subtitle': '22 Barangay Health Stations/Centers nga nag-alagad sa tanang barangay sa Bayawan City',
    'health-mho-title': 'City Health Office',

    // Social Services
    'social-page-title': 'Social Services',
    'social-subtitle': 'Social welfare programs ug services',
    'social-mswdo': 'MSWDO',
    'social-senior': 'Senior Citizen',
    'social-pwd': 'PWD',
    'social-solo-parent': 'Solo Parent',
    'social-4ps': '4Ps',

    // Agriculture Services
    'agri-page-title': 'Agriculture Services',
    'agri-subtitle': 'Agricultural support ug services',
    'agri-seedo': 'SEEDO',
    'agri-market': 'Public Market',
    'agri-slaughterhouse': 'Slaughterhouse',

    // Environment Services
    'env-page-title': 'Environment Services',
    'env-subtitle': 'Environmental protection ug management',
    'env-waste': 'Waste Management',
    'env-cleanup': 'Cleanup Drive',
    'env-tree': 'Tree Planting',

    // Infrastructure Services
    'infra-page-title': 'Infrastructure Services',
    'infra-subtitle': 'Building permits ug infrastructure projects',
    'infra-permits': 'Building Permits',
    'infra-projects': 'DPWH Projects',
    'infra-roads': 'Road Maintenance',

    // Education Services
    'edu-page-title': 'Education Services',
    'edu-subtitle': 'Educational programs ug services',
    'edu-schools': 'Mga Paaralan',
    'edu-scholarship': 'Scholarship',
    'edu-als': 'ALS',

    // Public Safety
    'safety-page-title': 'Public Safety',
    'safety-subtitle': 'Emergency ug safety services',
    'safety-pnp': 'PNP',
    'safety-bfp': 'BFP',
    'safety-mdrrmo': 'MDRRMO',
    'safety-traffic': 'Traffic Management',

    // Tax Services
    'tax-page-title': 'Tax Payments',
    'tax-subtitle': 'Online ug walk-in tax payment options',
    'tax-rpt': 'Real Property Tax',
    'tax-business': 'Business Tax',
    'tax-online': 'Online Payment',

    // FAQ
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Common questions ug answers',

    // Sitemap
    'sitemap-title': 'Sitemap',
    'sitemap-subtitle': 'Complete list sa tanang pages',

    // Privacy
    'privacy-title': 'Privacy Policy',
    'privacy-subtitle': 'How we handle imong data',

    // Terms
    'terms-title': 'Terms of Use',
    'terms-subtitle': 'Terms ug conditions sa paggamit',

// Metadata
    'page-title': 'betterbayawan.org | Official Portal',
    'meta-description': 'Better Bayawan - Imong digital gateway sa LGU Bayawan City services.',
    'meta-keywords': 'Bayawan City, Negros Oriental, LGU, government services',

    // Quiz
    'quiz-title': 'Bayawan Quiz',
    'quiz-subtitle': 'Kasano kabalo ka sa Bayawan City, Negros Oriental?',
    'quiz-description':
      'Evaluate imong familiarity sa heritage, cultural identity, ug geographic significance sa syudad pinaagi sa interactive nga knowledge assessment.',
    'quiz-take': 'Take the Quiz',
    'footer-Bayawan City-quiz': 'Bayawan Quiz',
  },},
};

type Language = 'en' | 'fil' | 'bis';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('BetterBayawan_lang') as Language;
    if (savedLang && ['en', 'fil', 'bis'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('BetterBayawan_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
