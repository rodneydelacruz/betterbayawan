#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const filePath = 'C:\\Projects\\betterbayawan\\react-app\\src\\contexts\\LanguageContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Bisaya/Cebuano translations for React app
const bisayaTranslations = `  bis: {
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

    // Emergency Hotlines CTA
    'emergency-cta-heading': 'Sa Uhog sa Emergency, Andam Kitang Makatabang',
    'emergency-cta-subtitle': 'I-save kini nga mga numero. Dali nga makaabot sa saktong responder.',
    'emergency-call-cdrrmo': 'Tawag sa CDRRMO: 0936 464 1233',
    'emergency-view-all': 'Tan-awa ang Tanang Hotline',

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
    'footer-lgu-portal': 'LGU Bayawan Portal',
    'footer-lgu-facebook': 'LGU Bayawan Facebook',
    'footer-copyright-text': '© 2026 BetterBayawan.org. All rights reserved.',
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
    'page-title': 'BetterBayawan.org | Civic Portal',
    'meta-description': 'Better Bayawan - Imong digital gateway sa LGU Bayawan City services.',
    'meta-keywords': 'Bayawan City, Negros Oriental, LGU, government services',
  },`;

// Find and replace the bis section
const bisStart = content.indexOf('  bis: {');
const bisEnd = content.indexOf('  },', bisStart) + 2;

if (bisStart !== -1 && bisEnd !== -1) {
  const before = content.slice(0, bisStart);
  const after = content.slice(bisEnd);
  content = before + bisayaTranslations + after;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated Bisaya translations in LanguageContext.tsx');
} else {
  console.log('Could not find bis section');
}