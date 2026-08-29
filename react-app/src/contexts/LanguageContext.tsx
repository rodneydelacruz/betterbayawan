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
    'section-leadership': 'City Leadership',
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

    // Service Categories

    // FAQ Page

    // Common Labels
    'label-fee': 'Fee:',
    'label-time': 'Time:',
    'label-free': 'Free',
    'label-walk-in': 'Walk-in',

    // Health Page
    'health-page-title': 'Health Services',
    'health-page-desc': 'Medical consultations, vaccinations, and health programs',
    'health-page-badge': 'Health',
    'health-consultation': 'Medical Consultation',
    'health-consultation-desc': 'Free consultation at Rural Health Units',
    'health-vaccination': 'Vaccination Programs',
    'health-vaccination-desc': 'Free immunization for children and adults',
    'label-schedule-varies': 'Schedule varies',
    'label-by-appointment': 'By appointment',
    'label-free-subsidy': 'Free (subsidy)',
    'label-1-3-days': '1-3 days',
    'health-maternal': 'Maternal Care',
    'health-maternal-desc': 'Prenatal and postnatal health services',
    'health-medicine': 'Medicine Assistance',
    'health-medicine-desc': 'Financial assistance for medicines through CSWDO',
    'health-stat-hospitals': 'District Hospital',
    'health-stat-mho': 'City Health Office',
    'health-stat-barangays': 'Barangays Served',
    'health-bayawan-district-hospital': 'Bayawan City District Hospital',
    'health-bayawan-district-hospital-desc':
      'A Level 1 government general hospital providing inpatient and outpatient services to the residents of Bayawan City.',
    'health-zamora-street-ubos': 'Zamora St., Ubos, Bayawan City',
    'health-section-hospitals': 'Hospitals in Bayawan City',
    'health-section-mho': 'City Health Office',
    'health-section-bhs': 'Barangay Health Stations',
    'health-bhs-subtitle': 'Barangay Health Stations/Centers serving all barangays of Bayawan City',
    'health-mho-title': 'Bayawan City Health Office',
    'health-mho-desc':
      'The City Health Office provides primary healthcare services including a lying-in facility and laboratory services. It serves as the main public health center for the city.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Laboratory Services',
    'health-service-immunization': 'Immunization',
    'health-service-prenatal': 'Prenatal Care',
    'health-service-family-planning': 'Family Planning',
    'health-service-tb-dots': 'TB-DOTS',
    'health-hivcare-cta-eyebrow': 'Official DOH-Sourced Directory',
    'health-hivcare-cta-heading': 'Find HIV Treatment & Care Facilities Near You',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Facilities Nationwide',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly Search',
    'health-hivcare-cta-stat-verified': 'DOH-Verified Listings',

    // Agriculture Page

    // Ordinance Framework Page

    // Resolution Framework Page

    // Business Services Page

    // Tax & Payments Page

    // Social Services Page

    // Education Page

    // Infrastructure Page

    // Public Safety Page

    // Environment Page

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
    'popular-services-subtitle': 'Quick access to frequently requested city services',
    'popular-browse-directory': 'Browse complete directory',

    // Homepage - Stats
    'stats-at-a-glance': 'Bayawan City at a Glance',
    'stats-view-statistics': 'View Statistics',
    'stats-population-label': 'Population',
    'stats-population-source': '2024 Census (PSA)',
    'stats-barangays-label': 'Barangays',
    'stats-barangays-source': 'Administrative Units',
    'stats-municipality-label': 'City',
    'stats-municipality-source': 'Via Plebiscite, Dec. 23, 2000',
    'stats-land-area-label': 'Land Area',
    'stats-land-area-source': 'Total Land Area',

    // Homepage - Weather & Map
    'weather-map-title': 'Weather and Map of Bayawan City',
    'weather-mainly-clear': 'Mainly clear',
    'weather-location': 'Bayawan City, Negros Oriental',

    // Homepage - History
    'history-title': 'Brief History of Bayawan City',
    'history-1751':
      'Spanish friars established the first settlement in the area now known as Bayawan City.',
    'history-1872':
      'The settlement, then known as Tolong Nuevo, was formally organized as a pueblo (town).',
    'history-1953':
      'The name Tolong Nuevo was changed to Bayawan by virtue of Republic Act 694.',
    'history-2000':
      'Bayawan was converted into a component city, and residents ratified cityhood in a plebiscite held on December 23, 2000.',
    'history-geography-title': 'Vast Land Area',
    'history-geography-desc':
      "Bayawan City spans 699.08 km², one of the largest cities in the Visayas, accounting for about 13% of the province's land area.",
    'history-agriculture-title': 'Agricultural Capital of Negros Oriental',
    'history-agriculture-desc':
      'Farming, fishing, and trading are the city\'s main economic activities. Bayawan is recognized as the "Agricultural Capital of Negros Oriental" and the "Rice Granary of the South".',

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
      "Evaluate your familiarity with the city's heritage, cultural identity, and geographic significance through an interactive knowledge assessment designed to showcase one of Negros Oriental's most prominent cities.",
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
    'section-leadership': 'Pamunuan ng Lungsod',
    'title-mayor': 'Punong Lungsod',
    'title-vice-mayor': 'Bise Alkalde',
    'btn-view-officials': 'Tingnan Lahat ng Opisyal',

    // Contact Section
    'section-contact': 'Impormasyon sa Pakikipag-ugnayan',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-address': 'Adres',
    'contact-hours': 'Lunes-Biyernes: 8:00 AM - 5:00 PM',
    'contact-response': 'Sasagutin namin sa loob ng 24 na oras',
    'contact-municipal-hall': 'City Hall',

    // Services Page

    // Service Categories

    // FAQ Page

    // Common Labels - Filipino
    'label-fee': 'Bayad:',
    'label-time': 'Oras:',
    'label-free': 'Libre',
    'label-walk-in': 'Walk-in',

    // Health Page - Filipino
    'health-page-title': 'Serbisyong Pangkalusugan',
    'health-page-desc': 'Mga konsultasyong medikal, bakuna, at programa sa kalusugan',
    'health-page-badge': 'Kalusugan',
    'health-consultation': 'Konsultasyong Medikal',
    'health-consultation-desc': 'Libreng konsultasyon sa Rural Health Units',
    'health-vaccination': 'Mga Programa sa Bakuna',
    'health-vaccination-desc': 'Libreng immunization para sa mga bata at matatanda',
    'label-schedule-varies': 'Iba-iba ang iskedyul',
    'label-by-appointment': 'Sa pamamagitan ng appointment',
    'label-free-subsidy': 'Libre (subsidiya)',
    'label-1-3-days': '1-3 araw',
    'health-maternal': 'Pangangalaga sa Ina',
    'health-maternal-desc': 'Serbisyo sa kalusugan bago at pagkatapos manganak',
    'health-medicine': 'Tulong sa Gamot',
    'health-medicine-desc': 'Tulong pinansyal para sa gamot sa pamamagitan ng CSWDO',
    'health-stat-hospitals': 'Ospital ng Distrito',
    'health-stat-mho': 'Opisina ng Kalusugan ng Panlungsod',
    'health-stat-barangays': 'Mga Barangay na Pinaglilingkuran',
    'health-bayawan-district-hospital': 'Bayawan City District Hospital',
    'health-bayawan-district-hospital-desc':
      'Isang antas-1 na pampublikong pangkalahatang ospital na nagbibigay ng serbisyo para sa mga residente ng Bayawan City.',
    'health-zamora-street-ubos': 'Zamora St., Ubos, Bayawan City',
    'health-section-hospitals': 'Mga Ospital sa Bayawan City',
    'health-section-mho': 'Opisina ng Kalusugan ng Panlungsod',
    'health-section-bhs': 'Mga Barangay Health Station',
    'health-bhs-subtitle':
      'Barangay Health Stations/Centers na naglilingkod sa lahat ng barangay ng Bayawan City',
    'health-mho-title': 'Opisina ng Kalusugan ng Panlungsod ng Bayawan City',
    'health-mho-desc':
      'Ang City Health Office ay nagbibigay ng pangunahing serbisyo sa kalusugan kabilang ang lying-in facility at laboratory services. Ito ang pangunahing public health center ng Lungsod.',
    'health-service-lying-in': 'Lying-in Facility',
    'health-service-laboratory': 'Serbisyo sa Laboratoryo',
    'health-service-immunization': 'Immunisasyon',
    'health-service-prenatal': 'Pangangalaga Bago Manganak',
    'health-service-family-planning': 'Pagpaplano ng Pamilya',
    'health-service-tb-dots': 'TB-DOTS',
    'health-hivcare-cta-eyebrow': 'Opisyal na Direktoryo mula sa DOH',
    'health-hivcare-cta-heading': 'Hanapin ang Pasilidad para sa Paggamot at Pangangalaga sa HIV',
    'health-hivcare-cta-desc':
      'A searchable, mobile-first web directory of all 338 DOH-designated HIV treatment and care facilities in the Philippines, sourced from DOH Circular No. 2026-0065.',
    'health-hivcare-cta-btn': 'Find HIV Care Facilities',
    'health-hivcare-cta-stat-facilities': 'Pasilidad sa Buong Bansa',
    'health-hivcare-cta-stat-mobile': 'Mobile-Friendly na Paghahanap',
    'health-hivcare-cta-stat-verified': 'Beripikado ng DOH',

    // Agriculture Page - Filipino

    // Ordinance Framework Page - Filipino

    // Resolution Framework Page - Filipino

    // Business Services Page - Filipino

    // Tax & Payments Page - Filipino

    // Social Services Page - Filipino

    // Education Page - Filipino

    // Infrastructure Page - Filipino

    // Public Safety Page - Filipino

    // Environment Page - Filipino

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
      'Mabilis na access sa mga madalas na hinihinging serbisyo ng Lungsod',
    'popular-browse-directory': 'Tingnan ang kumpletong direktoryo',

    // Homepage - Stats
    'stats-at-a-glance': 'Isang Tingin sa Bayawan City',
    'stats-view-statistics': 'Tingnan ang Estadistika',
    'stats-population-label': 'Populasyon',
    'stats-population-source': '2024 Senso (PSA)',
    'stats-barangays-label': 'Mga Barangay',
    'stats-barangays-source': 'Mga Yunit Administratibo',
    'stats-municipality-label': 'Lungsod',
    'stats-municipality-source': 'Sa Pamamagitan ng Plebisito, Dis. 23, 2000',
    'stats-land-area-label': 'Lawak ng Lupa',
    'stats-land-area-source': 'Kabuuang Lawak ng Lungsod',

    // Homepage - Weather & Map
    'weather-map-title': 'Panahon at Mapa ng Bayawan City',
    'weather-mainly-clear': 'Halos maaliwalas',
    'weather-location': 'Bayawan City, Negros Oriental',

    // Homepage - History
    'history-title': 'Maikling Kasaysayan ng Bayawan City',
    'history-1751':
      'Itinatag ng mga paring Espanyol ang unang pamayanan sa lugar na kilala ngayon bilang Bayawan City.',
    'history-1872':
      'Ang pamayanan, na kilala noon bilang Tolong Nuevo, ay pormal na inorganisa bilang isang pueblo (bayan).',
    'history-1953':
      'Ang pangalang Tolong Nuevo ay pinalitan ng Bayawan sa bisa ng Republic Act 694.',
    'history-2000':
      'Ang Bayawan ay naging isang component city, at pinagtibay ng mga residente ang pagkalungsod sa isang plebisito na ginanap noong Disyembre 23, 2000.',
    'history-geography-title': 'Malawak na Lupain',
    'history-geography-desc':
      "Sinasaklaw ng Bayawan City ang 699.08 km², isa sa pinakamalaking siyudad sa Visayas, na umaabot sa mga 13% ng kabuuang lawak ng probinsya.",
    'history-agriculture-title': 'Agrikultural na Kabisera ng Negros Oriental',
    'history-agriculture-desc':
      'Ang pagsasaka, pangingisda, at pangangalakal ang pangunahing kabuhayan ng siyudad. Kilala ang Bayawan bilang "Agricultural Capital of Negros Oriental" at "Rice Granary of the South".',

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
      'Suriin ang iyong kaalaman sa pamana, pagkakakilanlan sa kultura, at kahalagahang heograpiko ng Lungsod sa pamamagitan ng isang interactive na pagtatasa ng kaalaman na idinisenyo upang ipakita ang isa sa mga pinakatanyag na lokasyon ng Negros Oriental.',
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

    // Weather & Map
    'weather-map-title': 'Weather ug Map sa Bayawan City',
    'weather-location': 'Bayawan City, Negros Oriental',

    // History Section
    'history-title': 'Mubo nga Kasaysayan sa Bayawan City',
    'history-1751': 'Gitukod sa mga paring Espanyol ang unang pamuyo sa lugar nga karon nailhan nga Bayawan City.',
    'history-1872': 'Ang pamuyo, kaniadto gitawag nga Tolong Nuevo, pormal nga giorganisa ingon nga pueblo (lungsod).',
    'history-1953': 'Ang ngalang Tolong Nuevo gibag-o ngadto sa Bayawan pinaagi sa Republic Act 694.',
    'history-2000': 'Ang Bayawan nahimong component city, ug gipamatud-an sa mga residente ang pagkahimo og siyudad sa plebisito nga gipahigayon sa Disyembre 23, 2000.',
    'history-geography-title': 'Halapad nga Yuta',
    'history-geography-desc': 'Ang Bayawan City may gilapdang 699.08 km², usa sa pinakadako nga siyudad sa Visayas, mga 13% sa tibuok nga katapok sa probinsiya.',
    'history-agriculture-title': 'Agrikultural nga Kapital sa Negros Oriental',
    'history-agriculture-desc': 'Ang pagpanguma, pangisda, ug pamaligya mao ang pangunang panginabuhian sa siyudad. Ilado ang Bayawan isip "Agricultural Capital of Negros Oriental" ug "Rice Granary of the South".',

    // News Section

    // Footer
    'footer-quick-links': 'Quick Links',
    'footer-faq': 'FAQ',
    'footer-sitemap': 'Sitemap',
    'footer-privacy': 'Privacy Policy',
    'footer-terms': 'Terms of Use',
    'footer-accessibility': 'Accessibility',
    'footer-lgu-portal': 'Official LGU Bayawan Portal',
    'footer-lgu-facebook': 'LGU Bayawan Facebook',
    'footer-copyright-text': '© 2026 betterbayawan.org. All rights reserved.',
    'footer-copyright-disclaimer': 'Not an official government website.',
    'footer-cost': 'Cost to the People of Bayawan City =',

    // Services Page

    // Government Page

    // Legislative Page

    // Budget Page

    // News Page

    // Contact Page
    'contact-address': 'Address',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-hours': 'Office Hours',

    // Emergency Hotlines

    // Language

    // PWA

    // Offline

    // Common

    // Accessibility

    // Services Detail

    // Certificate Services

    // Business Services

    // Health Services
    'health-page-title': 'Health Services',
    'health-bhs-subtitle': 'Barangay Health Stations/Centers nga nag-alagad sa tanang barangay sa Bayawan City',
    'health-mho-title': 'City Health Office',

    // Social Services

    // Agriculture Services

    // Environment Services

    // Infrastructure Services

    // Education Services

    // Public Safety

    // Tax Services

    // FAQ

    // Sitemap

    // Privacy

    // Terms

// Metadata

    // Quiz
    'quiz-title': 'Bayawan Quiz',
    'quiz-subtitle': 'Kasano kabalo ka sa Bayawan City, Negros Oriental?',
    'quiz-description':
      'Evaluate imong familiarity sa heritage, cultural identity, ug geographic significance sa syudad pinaagi sa interactive nga knowledge assessment.',
    'quiz-take': 'Take the Quiz',
    'footer-Bayawan City-quiz': 'Bayawan Quiz',
  },
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
