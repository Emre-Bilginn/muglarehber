'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './search-modal';

const navLinks = [
  { href: '/kategori/gezilecek-yerler', label: 'Gezilecek Yerler' },
  { href: '/kategori/plajlar', label: 'Plajlar' },
  { href: '/kategori/restoranlar-kafeler', label: 'Restoranlar' },
  { href: '/kategori/aktiviteler', label: 'Aktiviteler' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window?.scrollY > 50);
    };
    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-sky-600 hover:text-sky-700 transition-colors">
              <Compass className="w-6 h-6" />
              <span>Keşfet Muğla</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href ?? ''}
                  href={link?.href ?? '#'}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                >
                  {link?.label ?? ''}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                aria-label="Ara"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                aria-label="Menü"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks?.map((link) => (
                  <Link
                    key={link?.href ?? ''}
                    href={link?.href ?? '#'}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                  >
                    {link?.label ?? ''}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
