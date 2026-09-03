'use client';

import { useState, useEffect, useRef } from 'react';

interface Hotline {
  id: string;
  icon: string;
  label: string;
  number: string;
  tel: string;
  more?: { label: string; tel: string }[];
}

const hotlines: Hotline[] = [
  {
    id: 'police',
    icon: 'bi-shield-fill',
    label: 'Police',
    number: '0927 144 1875',
    tel: '09271441875',
    more: [
      { label: '0998 598 7514', tel: '09985987514' },
      { label: '0998 598 7515', tel: '09985987515' },
    ],
  },
  {
    id: 'ambulance',
    icon: 'bi-heart-fill',
    label: 'Ambulance',
    number: '0945 569 0083',
    tel: '09455690083',
  },
  {
    id: 'fire',
    icon: 'bi-fire',
    label: 'Fire',
    number: '0955 817 3397',
    tel: '09558173397',
    more: [
      { label: '0917 846 0982', tel: '09178460982' },
      { label: '(035) 527-2567', tel: '+63355272567' },
    ],
  },
  {
    id: 'noreco',
    icon: 'bi-building',
    label: 'NORECO',
    number: '0908 864 2365',
    tel: '09088642365',
    more: [{ label: '0998 585 8326', tel: '09985858326' }],
  },
  {
    id: 'coast-guard',
    icon: 'bi-exclamation-triangle-fill',
    label: 'Coast Guard',
    number: '0995 746 8679',
    tel: '09957468679',
  },
  {
    id: 'cityhall',
    icon: 'bi-truck',
    label: 'City Hall',
    number: '(035) 531-0020',
    tel: '+63355310020',
    more: [
      { label: '(035) 531-0020 to 21', tel: '+63355310020' },
      { label: 'Telefax: (035) 430-0020', tel: '+63354300020' },
    ],
  },
];

export default function HotlineBar() {
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenId(null);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="hotline-bar" ref={rootRef}>
      <div className="container">
        <div className="hotline-inner">
          <div className="hotline-groups">
            {hotlines.map((h) => {
              const isOpen = openId === h.id;
              return (
                <div
                  key={h.id}
                  className={`hotline-group${h.more ? ' hotline-group--multi' : ''}${
                    isOpen ? ' open' : ''
                  }`}
                >
                  {h.more ? (
                    <>
                      <div className="hotline-group-head">
                        <a href={`tel:${h.tel}`} className="hotline-item">
                          <i className={`bi ${h.icon}`} aria-hidden="true" />
                          <span>
                            {h.label}: {h.number}
                          </span>
                        </a>
                        <button
                          type="button"
                          className="hotline-toggle"
                          aria-expanded={isOpen ? 'true' : 'false'}
                          aria-label={`More ${h.label} contacts`}
                          aria-controls={`${h.id}-contacts`}
                          onClick={() => toggle(h.id)}
                        >
                          <i className="bi bi-chevron-down" aria-hidden="true"></i>
                        </button>
                      </div>
                      <ul className="hotline-more" id={`${h.id}-contacts`}>
                        {h.more.map((m) => (
                          <li key={m.tel}>
                            <a href={`tel:${m.tel}`}>{m.label}</a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a href={`tel:${h.tel}`} className="hotline-item">
                      <i className={`bi ${h.icon}`} aria-hidden="true" />
                      <span>
                        {h.label}: {h.number}
                      </span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
