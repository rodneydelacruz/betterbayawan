'use client';

import { useEffect, useRef } from 'react';

const hotlines = [
  { icon: 'bi-shield-fill', label: 'Police', number: '0927 144 1875', tel: '09271441875' },
  { icon: 'bi-heart-fill', label: 'Ambulance', number: '0945 569 0083', tel: '09455690083' },
  { icon: 'bi-fire', label: 'Fire', number: '0955 817 3397', tel: '09558173397' },
  { icon: 'bi-building', label: 'NORECO', number: '0908 864 2365', tel: '09088642365' },
  {
    icon: 'bi-exclamation-triangle-fill',
    label: 'Coast Guard',
    number: '0995 746 8679',
    tel: '09957468679',
  },
  { icon: 'bi-truck', label: 'City Hall', number: '(035) 531-0020', tel: '+63355310020' },
];

export default function HotlineBar() {
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = itemsRef.current;
    if (!container || container.querySelector('.hotline-items-track')) return;

    const originalItems = Array.from(container.children);
    if (originalItems.length === 0) return;

    const track = document.createElement('div');
    track.className = 'hotline-items-track';
    track.setAttribute('aria-label', 'Emergency contacts scrolling');

    let copies = 0;
    while (container.firstChild) track.appendChild(container.firstChild);
    copies = 1;

    const appendCopy = () => {
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        track.appendChild(clone);
      });
      copies += 1;
      track.style.setProperty('--hotline-copies', String(copies));
    };

    const ensureCopies = () => {
      while (track.scrollWidth < container.clientWidth * 2) {
        appendCopy();
      }
    };

    track.style.setProperty('--hotline-copies', String(copies));
    container.appendChild(track);
    ensureCopies();

    window.addEventListener('resize', ensureCopies);
    return () => window.removeEventListener('resize', ensureCopies);
  }, []);

  return (
    <div className="hotline-bar">
      <div className="container">
        <div className="hotline-inner">
          <div className="hotline-items" ref={itemsRef}>
            {hotlines.map((h) => (
              <a key={h.tel} href={`tel:${h.tel}`} className="hotline-item">
                <i className={`bi ${h.icon}`} aria-hidden="true" />
                <span>
                  {h.label}: {h.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}