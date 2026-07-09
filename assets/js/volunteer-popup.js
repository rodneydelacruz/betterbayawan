(function () {
  'use strict';

  var STORAGE_KEY = 'bs-vol-popup-v1';
  var SHOW_DELAY_MS = 800;
  // Must be >= longest CSS exit duration (card: 220ms, overlay: 300ms)
  var EXIT_DURATION_MS = 340;

  var _dismissed = false;
  var _previousFocus = null;
  var _scrollbarWidth = 0;
  var _onKeyDown = null;

  // ─── Scroll lock ──────────────────────────────────────────────────────────

  function measureScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function lockScroll() {
    _scrollbarWidth = measureScrollbarWidth();
    // Compensate for the disappearing scrollbar so the layout doesn't jump.
    if (_scrollbarWidth > 0) {
      document.body.style.paddingRight = _scrollbarWidth + 'px';
    }
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  // ─── Focus trap ───────────────────────────────────────────────────────────

  function getFocusable(modal) {
    return Array.prototype.slice.call(
      modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function trapFocus(modal, e) {
    var focusable = getFocusable(modal);
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // ─── Dismiss ──────────────────────────────────────────────────────────────

  function dismiss(overlay) {
    // Guard: only ever execute once regardless of which trigger fired.
    if (_dismissed) return;
    _dismissed = true;

    // Persist across all future visits before any async work.
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}

    // Remove keyboard listener immediately so no further key events fire.
    if (_onKeyDown) {
      document.removeEventListener('keydown', _onKeyDown);
      _onKeyDown = null;
    }

    var modal = overlay.querySelector('.vol-popup');

    // Play card exit animation, then fade backdrop.
    if (modal) modal.classList.add('is-closing');
    overlay.classList.remove('vol-popup-overlay--visible');
    overlay.setAttribute('aria-hidden', 'true');

    // Restore page state immediately — scroll unlock and focus happen before
    // the overlay finishes fading so the page feels responsive at once.
    unlockScroll();
    if (_previousFocus && typeof _previousFocus.focus === 'function') {
      try {
        _previousFocus.focus();
      } catch (e) {}
    }

    // Purge from DOM only after all CSS transitions have finished.
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, EXIT_DURATION_MS);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────

  function init() {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch (e) {}

    var overlay = document.getElementById('vol-popup-overlay');
    if (!overlay) return;
    var modal = overlay.querySelector('.vol-popup');
    if (!modal) return;

    var reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var delay = reducedMotion ? 0 : SHOW_DELAY_MS;

    // ── Event wiring (before show — pointer-events:none prevents accidental triggers) ──

    var closeBtn = overlay.querySelector('.vol-popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dismiss(overlay);
      });
    }

    var skipBtn = overlay.querySelector('.vol-popup-skip');
    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.preventDefault();
        dismiss(overlay);
      });
    }

    // CTA: let the mailto: open first, then dismiss so the popup doesn't
    // linger after the user has clearly taken action.
    var ctaBtn = overlay.querySelector('.vol-popup-cta');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', function () {
        setTimeout(function () {
          dismiss(overlay);
        }, 150);
      });
    }

    // Backdrop tap/click — only fires when the raw overlay is the target,
    // not when clicking inside the card.
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) dismiss(overlay);
    });

    setTimeout(function () {
      // Capture focused element now, before scroll lock shifts layout.
      _previousFocus = document.activeElement;

      // Double requestAnimationFrame, with the scroll lock deliberately split into
      // the FIRST frame and the reveal into the SECOND:
      //
      //   Frame 1 — lockScroll() mutates body layout (scrollbar removal +
      //     paddingRight compensation) while the overlay is still invisible. Doing
      //     this here lets the layout settle a full frame BEFORE the backdrop-filter
      //     ever samples the page. If the lock ran in the same frame as the reveal,
      //     the filter would snapshot a shifting backdrop and flash.
      //   Frame 2 — apply the reveal atomically over the now-stable layout, so the
      //     card's entry animation starts from its committed from-state and the
      //     (already-promoted) backdrop-filter layer simply turns opaque.
      requestAnimationFrame(function () {
        lockScroll();

        requestAnimationFrame(function () {
          overlay.classList.add('vol-popup-overlay--visible');
          overlay.removeAttribute('aria-hidden');

          // Release the card's GPU-layer hint once the entry animation finishes so
          // it doesn't stay permanently promoted after it has served its purpose.
          modal.addEventListener(
            'animationend',
            function () {
              modal.style.willChange = 'auto';
            },
            { once: true }
          );

          var focusTarget = modal.querySelector('.vol-popup-close');
          // preventScroll: true stops the browser from triggering a scroll-into-view
          // on focus, which would cause a mid-animation layout recalculation.
          if (focusTarget) focusTarget.focus({ preventScroll: true });

          // Keyboard listener attached only now — popup is visible and interactive.
          // Attaching earlier would let Escape dismiss the popup before the user
          // ever saw it, permanently writing the "seen" flag to localStorage.
          _onKeyDown = function (e) {
            var key = e.key || e.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
              dismiss(overlay);
              return;
            }
            if ((key === 'Tab' || key === 9) && modal) {
              trapFocus(modal, e);
            }
          };
          document.addEventListener('keydown', _onKeyDown);
        });
      });
    }, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
