'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { nav, site } from '@/data/site';
import { scrollToTarget, startScroll, stopScroll } from '@/engine';
import { Logo } from './Logo';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement.classList;
    root.add('menu-open');
    root.remove('frame-away');
    stopScroll();
    menu.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !menu.current || !toggle.current) return;
      const items = [toggle.current, ...menu.current.querySelectorAll<HTMLElement>('a')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      root.remove('menu-open');
      startScroll();
    };
  }, [open]);

  const current = (href: string) => (href === pathname ? 'page' : undefined);

  // Scrolling is paused while the menu is open: a link to a section of this same page has to
  // restart it before moving there.
  const follow = (href: string) => (e: MouseEvent) => {
    setOpen(false);
    const url = new URL(href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    e.preventDefault();
    document.documentElement.classList.remove('menu-open');
    startScroll();
    scrollToTarget(url.hash);
  };

  return (
    <>
      <header className="header" data-home={pathname === '/'}>
        <Link className="header__logo" href="/" aria-label="ETAL 2026, página inicial" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Principal">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="header__link" href={item.href} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggle}
          className="header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="header__toggle-node" aria-hidden="true" />
          {open ? 'Fechar' : 'Menu'}
        </button>
      </header>

      {/* A sibling of the header, not a child: the header slides away with translate, and a fixed
          overlay inside it would take the sliding header as its box. */}
      <div ref={menu} id="menu" className="menu" data-open={open} inert={!open}>
        <nav aria-label="Menu">
          <ul className="menu__list">
            {[...nav, { label: 'Inscrição', href: '/#inscricao' }].map((item) => (
              <li key={item.href}>
                <Link className="menu__link led" href={item.href} aria-current={current(item.href)} onClick={follow(item.href)}>
                  <span className="menu__node" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="menu__meta">
          {site.dates.weekdays}, {site.venue.city}
        </p>
      </div>
    </>
  );
}
