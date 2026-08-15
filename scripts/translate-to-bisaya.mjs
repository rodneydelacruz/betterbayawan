#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const filePath = 'C:\\Projects\\betterbayawan\\assets\\js\\translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// Bisaya/Cebuano translations for key UI strings
const bisayaTranslations = {
  // Navigation
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
  
  // Stats
  'stats-title': 'Estadistika sa Munisipalidad',
  'stats-subtitle': 'Datos ug estadistika mahitungod sa Bayawan City, Negros Oriental',
  'stats-demographics': 'Demographics Breakdown',
  'stats-economic': 'Economic Indicators',
  'stats-barangay': 'Population by Barangay',
  'stats-population': 'Populasyon',
  'stats-land-area': 'Lawas sa Yuta',
  'stats-density': 'Density sa Populasyon',
  'stats-households': 'Mga Balay',
  'stats-growth-rate': 'Rate sa Pagkatubo',
  
  // Breadcrumbs
  'breadcrumb-home': 'Home',
  'breadcrumb-services': 'Mga Serbisyo',
  'breadcrumb-government': 'Gobyerno',
  'breadcrumb-budget': 'Budget ug Transparency',
  'breadcrumb-contact': 'Contact',
  'breadcrumb-faq': 'FAQ',
  'breadcrumb-accessibility': 'Accessibility',
  'breadcrumb-statistics': 'Estadistika',
  'breadcrumb-legislative': 'Lehislatura',
  'breadcrumb-news': 'Balita',
  'breadcrumb-sitemap': 'Sitemap',
  'breadcrumb-privacy': 'Privacy Policy',
  'breadcrumb-terms': 'Terms of Use',
  
  // Hero
  'hero-welcome': 'Welcome sa BetterBayawan.org',
  'hero-subtitle': 'Access government services, information, ug resources para sa mga tawo sa Bayawan City, Negros Oriental.',
  'hero-browse': 'Browse Services',
  'hero-contact': 'Contact Us',
  'hero-search-placeholder': 'Pangita ug serbisyo...',
  
  // Common
  'search-placeholder': 'Pangita...',
  'search-no-results': 'Walay nakit-ang resulta',
  'loading': 'Loading...',
  'error': 'Error',
  'retry': 'Usab',
  'close': 'Sarang',
  'save': 'Save',
  'cancel': 'Cancel',
  'submit': 'Submit',
  'next': 'Sunod',
  'previous': 'Una',
  'back': 'Balik',
  'continue': 'Padayon',
  'view-all': 'Tan-awon Tanan',
  'read-more': 'Basa Pa',
  'show-more': 'Ipakita Pa',
  'show-less': 'Ipakita Gamay',
  
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
  'footer-follow-us': 'Follow Us',
  'footer-facebook': 'Facebook',
  'footer-twitter': 'Twitter',
  'footer-linkedin': 'LinkedIn',
  'footer-github': 'GitHub',
  'footer-discord': 'Discord',
  'footer-copyright': '© 2026 betterbayawan.org. All rights reserved.',
  'footer-license': 'MIT License | CC BY 4.0',
  'footer-disclaimer': 'Not an official government website.',
  'footer-cost': 'Cost to the People of Bayawan City =',
  'footer-cost-value': '₱0',
  'footer-bayawan-quiz': 'Bayawan Quiz',
  'footer-lgu-portal': 'Official LGU Bayawan Portal',
  'footer-lgu-facebook': 'LGU Bayawan Facebook',
  
  // Homepage
  'home-solano-at-a-glance': 'Bayawan City at a Glance',
  'home-weather-and-map-of-solano': 'Weather ug Map sa Bayawan City',
  'home-brief-history-of-solano': 'Brief History sa Bayawan City',
  'home-solano-quiz': 'Bayawan Quiz',
  'home-take-the-quiz': 'Take the Quiz',
  'home-evaluate-your-familiarity': 'Evaluate your familiarity with the city...',
  'home-interactive-map-showing': 'Interactive map showing Bayawan City Hall...',
  
  // Appointment
  'appointment-cta-heading': "Enhancing Appointment Services sa LGU Bayawan City Mayor's Office",
  'appointment-cta-subtitle': 'Schedule your appointment online',
  'appointment-cta-button': 'Book Appointment',
  
  // Services
  'services-subtitle': 'Browse all services offered by the City of Bayawan',
  'services-search-placeholder': 'Search services...',
  'services-categories': 'Service Categories',
  'services-all': 'All Services',
  
  // Government
  'gov-subtitle': 'Meet the leadership ug offices serving Bayawan City',
  'gov-mayor': 'City Mayor',
  'gov-vice-mayor': 'City Vice Mayor',
  'gov-sb-subtitle': 'City Councilors serving the people of Bayawan City',
  'gov-sb-member': 'SP Member',
  'gov-barangays': 'Mga Barangay sa Bayawan City',
  'gov-barangay-captain': 'Barangay Captain',
  'gov-departments': 'Mga Departamento',
  'gov-department-head': 'Department Head',
  
  // Legislative
  'legislative-title': 'Legislative Documents',
  'legislative-ordinances': 'Ordinances',
  'legislative-resolutions': 'Resolutions',
  'legislative-search': 'Search documents...',
  'legislative-year': 'Year',
  'legislative-number': 'Number',
  'legislative-title-col': 'Title',
  'legislative-date': 'Date',
  'legislative-status': 'Status',
  
  // Budget
  'budget-title': 'Budget Transparency',
  'budget-income': 'Income',
  'budget-expenses': 'Expenses',
  'budget-projects': 'Projects',
  'budget-year': 'Fiscal Year',
  'budget-download': 'Download Report',
  
  // News
  'news-title': 'News ug Announcements',
  'news-subtitle': 'Latest updates from the City of Bayawan',
  'news-read-more': 'Read More',
  'news-no-news': 'No news available at this time.',
  
  // Contact
  'contact-title': 'Contact Us',
  'contact-subtitle': 'Get in touch with us',
  'contact-address': 'Address',
  'contact-phone': 'Phone',
  'contact-email': 'Email',
  'contact-hours': 'Office Hours',
  'contact-form-name': 'Name',
  'contact-form-email': 'Email',
  'contact-form-subject': 'Subject',
  'contact-form-message': 'Message',
  'contact-form-submit': 'Send Message',
  
  // Emergency
  'emergency-hotlines': 'Emergency Hotlines',
  'emergency-police': 'Police (PNP)',
  'emergency-fire': 'Fire (BFP)',
  'emergency-medical': 'Medical',
  'emergency-disaster': 'Disaster (MDRRMO)',
  'emergency-call': 'Tawag',
  
  // Language
  'language-select': 'Pinili ang Pinulongan',
  'language-en': 'English',
  'language-fil': 'Filipino',
  'language-bis': 'Bisaya',
  
  // PWA
  'pwa-install': 'Install App',
  'pwa-dismiss': 'Dismiss',
  'pwa-update-available': 'Update Available',
  'pwa-refresh': 'Refresh',
  
  // Offline
  'offline-title': 'You are Offline',
  'offline-message': 'No internet connection. Some features may not work.',
  'offline-emergency-hotlines': 'Emergency Hotlines - Bayawan City, Negros Oriental',
  
  // Weather
  'weather-current': 'Current Weather',
  'weather-humidity': 'Humidity',
  'weather-wind': 'Wind',
  'weather-location': 'Bayawan City, Negros Oriental',
  
  // Map
  'map-title': 'Map sa Bayawan City',
  'map-attribution': 'Bayawan City Hall, Negros Oriental 6221',
  
  // Quiz
  'quiz-title': 'Bayawan Quiz',
  'quiz-subtitle': 'How well do you know Bayawan City, Negros Oriental?',
  'quiz-start': 'Start Quiz',
  'quiz-question': 'Question',
  'quiz-score': 'Score',
  'quiz-try-again': 'Try Again',
  
  // History
  'history-title': 'Brief History sa Bayawan City',
  'history-1760': '1760 - Foundation',
  'history-1872': '1872 - Parish Established',
  'history-1901': '1901 - American Period',
  'history-1947': '1947 - Municipality',
  'history-2000': '2000 - Cityhood',
  
  // Services Detail
  'service-requirements': 'Requirements',
  'service-fees': 'Fees',
  'service-processing-time': 'Processing Time',
  'service-office': 'Office',
  'service-contact': 'Contact',
  'service-online': 'Online Application',
  'service-walkin': 'Walk-in',
  
  // Certificates
  'cert-birth': 'Birth Certificate',
  'cert-death': 'Death Certificate',
  'cert-marriage': 'Marriage Certificate',
  'cert-cenomar': 'CENOMAR',
  
  // Business
  'biz-permit': 'Business Permit',
  'biz-renewal': 'Business Permit Renewal',
  'biz-new': 'New Business Registration',
  'biz-barangay': 'Barangay Clearance',
  
  // Health
  'health-title': 'Health Services',
  'health-hospitals': 'Mga Hospital sa Bayawan City',
  'health-rhu': 'Rural Health Unit',
  'health-bhs': 'Barangay Health Stations',
  'health-services': 'Mga Serbisyo sa Kalusugan',
  
  // Social
  'social-title': 'Social Services',
  'social-mswdo': 'MSWDO',
  'social-senior': 'Senior Citizen',
  'social-pwd': 'PWD',
  'social-solo-parent': 'Solo Parent',
  'social-4ps': '4Ps',
  
  // Agriculture
  'agri-title': 'Agriculture Services',
  'agri-seedo': 'SEEDO',
  'agri-market': 'Public Market',
  'agri-slaughterhouse': 'Slaughterhouse',
  
  // Environment
  'env-title': 'Environment Services',
  'env-waste': 'Waste Management',
  'env-cleanup': 'Cleanup Drive',
  'env-tree': 'Tree Planting',
  
  // Infrastructure
  'infra-title': 'Infrastructure Services',
  'infra-permits': 'Building Permits',
  'infra-projects': 'DPWH Projects',
  'infra-roads': 'Road Maintenance',
  
  // Education
  'edu-title': 'Education Services',
  'edu-schools': 'Mga Paaralan',
  'edu-scholarship': 'Scholarship',
  'edu-als': 'ALS',
  
  // Public Safety
  'safety-title': 'Public Safety',
  'safety-pnp': 'PNP',
  'safety-bfp': 'BFP',
  'safety-mdrrmo': 'MDRRMO',
  'safety-traffic': 'Traffic Management',
  
  // Tax
  'tax-title': 'Tax Payments',
  'tax-rpt': 'Real Property Tax',
  'tax-business': 'Business Tax',
  'tax-online': 'Online Payment',
  
  // Metadata
  'page-title': 'betterbayawan.org | Official Portal',
  'meta-description': 'Better Bayawan - Your digital gateway to LGU Bayawan City services.',
  'meta-keywords': 'Bayawan City, Negros Oriental, LGU, government services',
  
  // Accessibility
  'a11y-skip': 'Skip to main content',
  'a11y-menu': 'Menu',
  'a11y-search': 'Search',
  'a11y-language': 'Language',
  'a11y-theme': 'Theme',
  
  // Time/Date
  'date-today': 'Today',
  'time-philippine': 'Philippine Time',
  'currency-usd-php': 'USD to PHP',
  'currency-rate': 'Exchange Rate',
  
  // Buttons
  'btn-submit': 'Submit',
  'btn-cancel': 'Cancel',
  'btn-save': 'Save',
  'btn-delete': 'Delete',
  'btn-edit': 'Edit',
  'btn-view': 'View',
  'btn-download': 'Download',
  'btn-print': 'Print',
  'btn-share': 'Share',
  
  // Status
  'status-pending': 'Pending',
  'status-approved': 'Approved',
  'status-rejected': 'Rejected',
  'status-processing': 'Processing',
  'status-completed': 'Completed',
  
  // Errors
  'error-404': 'Page Not Found',
  'error-500': 'Server Error',
  'error-network': 'Network Error',
  'error-unauthorized': 'Unauthorized',
  'error-forbidden': 'Forbidden',
  
  // Success
  'success-saved': 'Saved Successfully',
  'success-submitted': 'Submitted Successfully',
  'success-updated': 'Updated Successfully',
  'success-deleted': 'Deleted Successfully',
};

// Find the bis section and replace it
const bisStart = content.indexOf('  bis: {');
const bisEndMarker = content.indexOf('};', bisStart);
let nextSectionStart = content.indexOf('};', bisEndMarker + 2);
if (nextSectionStart === -1) nextSectionStart = content.length;

// Get the end of the bis section (before the closing };)
const bisEnd = content.indexOf('};', bisStart);

// Build new bis section
let newBisSection = '  bis: {\n';
for (const [key, value] of Object.entries(bisayaTranslations)) {
  newBisSection += `    '${key}': '${value}',\n`;
}
newBisSection += '  }';

// Replace the bis section
const beforeBis = content.slice(0, bisStart);
const afterBis = content.slice(bisEnd + 2); // Skip the };

content = beforeBis + newBisSection + afterBis;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Bisaya translations in translations.js');
console.log(`Added ${Object.keys(bisayaTranslations).length} Bisaya translations`);