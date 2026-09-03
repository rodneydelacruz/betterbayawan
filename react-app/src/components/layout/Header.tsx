'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

function isMobileNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const langNames: Record<string, string> = {
    en: 'English',
    fil: 'Filipino',
    bis: 'Bisaya',
  };

  const scrollYRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const lockBodyScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    document.body.classList.add('mobile-menu-open');
    document.body.style.top = `-${scrollYRef.current}px`;
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.classList.remove('mobile-menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollYRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    unlockBodyScroll();
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 320);
  }, [unlockBodyScroll]);

  const toggleDropdown = useCallback((index: number, e: React.MouseEvent) => {
    if (isMobileNav()) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === index ? null : index));
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    isAnimatingRef.current = false;
    closeMenu();
  }, [pathname, closeMenu]);

  // Cleanup body scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        closeMenu();
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen, closeMenu]);

  // Escape key to close
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMenu]);

  // Close mobile menu on resize to desktop (debounced)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMobileNav() && mobileMenuOpen) {
          isAnimatingRef.current = false;
          closeMenu();
        }
      }, 150);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, closeMenu]);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [langOpen]);

  // Close language dropdown on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && langOpen) {
        setLangOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [langOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-container">
          <Link href="/">
            <img
              src="/assets/images/logo/better-bayawan-logo.png"
              alt="Better Bayawan Logo"
              className="logo-img"
            />
          </Link>
        </div>

        <nav
          ref={navRef}
          className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Main Navigation"
        >
          <ul>
            <li>
              <Link href="/" className={pathname === '/' ? 'active' : ''}>
                {t('nav-home')}
              </Link>
            </li>
            <li className={`has-dropdown ${openDropdown === 0 ? 'dropdown-open' : ''}`}>
              <Link
                href="/services"
                aria-haspopup="true"
                aria-expanded={openDropdown === 0 ? 'true' : 'false'}
                onClick={(e) => toggleDropdown(0, e)}
              >
                {t('nav-services')}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/services/certificates">{t('dropdown-certificates')}</Link>
                </li>
                <li>
                  <Link href="/services/business">{t('dropdown-business')}</Link>
                </li>
                <li>
                  <Link href="/services/tax-payments">{t('dropdown-tax-payments')}</Link>
                </li>
                <li>
                  <Link href="/services/social-services">{t('dropdown-social-services')}</Link>
                </li>
                <li>
                  <Link href="/services/health">{t('dropdown-health')}</Link>
                </li>
                <li>
                  <Link href="/services/agriculture">{t('dropdown-agriculture')}</Link>
                </li>
                <li>
                  <Link href="/services/infrastructure">{t('dropdown-infrastructure')}</Link>
                </li>
                <li>
                  <Link href="/services/education">{t('dropdown-education')}</Link>
                </li>
                <li>
                  <Link href="/services/public-safety">{t('dropdown-public-safety')}</Link>
                </li>
                <li>
                  <Link href="/services/environment">{t('dropdown-environment')}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/government">{t('nav-government')}</Link>
            </li>
            <li>
              <Link href="/statistics">{t('nav-statistics')}</Link>
            </li>
            <li className={`has-dropdown ${openDropdown === 1 ? 'dropdown-open' : ''}`}>
              <Link
                href="/legislative"
                aria-haspopup="true"
                aria-expanded={openDropdown === 1 ? 'true' : 'false'}
                onClick={(e) => toggleDropdown(1, e)}
              >
                {t('nav-legislative')}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/legislative/ordinance-framework">
                    {t('dropdown-ordinance-framework')}
                  </Link>
                </li>
                <li>
                  <Link href="/legislative/resolution-framework">
                    {t('dropdown-resolution-framework')}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/budget">{t('nav-transparency')}</Link>
            </li>
            <li>
              <Link href="/contact">{t('nav-contact')}</Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div ref={langRef} className={`lang-dropdown${langOpen ? ' open' : ''}`}>
            <button
              type="button"
              className="lang-trigger"
              aria-haspopup="listbox"
              aria-expanded={langOpen ? 'true' : 'false'}
              aria-label="Select language"
              onClick={() => setLangOpen((prev) => !prev)}
            >
              <i className="bi bi-globe2" aria-hidden="true"></i>
              <span className="lang-trigger-label">{langNames[language]}</span>
              <i
                className={`bi bi-chevron-down lang-caret${langOpen ? ' open' : ''}`}
                aria-hidden="true"
              ></i>
            </button>
            <ul className="lang-menu" role="listbox" aria-label="Select language">
              {(['en', 'fil', 'bis'] as const).map((lang) => (
                <li key={lang}>
                  <button
                    type="button"
                    className={`lang-option${language === lang ? ' active' : ''}`}
                    data-lang={lang}
                    role="option"
                    aria-selected={language === lang ? 'true' : 'false'}
                    onClick={() => {
                      setLanguage(lang);
                      setLangOpen(false);
                    }}
                  >
                    <span>{langNames[lang]}</span>
                    <i className="bi bi-check2 lang-check" aria-hidden="true"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="mobile-menu-toggle btn btn-secondary"
          onClick={() => {
            if (isAnimatingRef.current) return;
            if (mobileMenuOpen) {
              closeMenu();
            } else {
              isAnimatingRef.current = true;
              setMobileMenuOpen(true);
              lockBodyScroll();
              setTimeout(() => {
                isAnimatingRef.current = false;
              }, 320);
            }
          }}
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen ? 'true' : 'false'}
        >
          <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}
