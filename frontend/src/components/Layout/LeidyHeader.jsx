import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LeidyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => router.pathname === path;

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl text-green-700">
              <i className="fas fa-spray-can"></i>
            </div>
            <div className="text-2xl font-bold">
              Leidy<span className="text-green-500">Cleaner</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 list-none">
              <li>
                <Link href="/" className={`font-semibold transition-colors ${isActive('/') ? 'text-green-600' : 'text-green-900 hover:text-green-500'}`}>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/servicos" className={`font-semibold transition-colors ${isActive('/servicos') ? 'text-green-600' : 'text-green-900 hover:text-green-500'}`}>
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/sobre" className={`font-semibold transition-colors ${isActive('/sobre') ? 'text-green-600' : 'text-green-900 hover:text-green-500'}`}>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className={`font-semibold transition-colors ${isActive('/contato') ? 'text-green-600' : 'text-green-900 hover:text-green-500'}`}>
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden bg-transparent border-none text-2xl text-green-900 cursor-pointer"
          >
            <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full border-t border-gray-200">
            <ul className="list-none p-4 space-y-3">
              <li>
                <Link href="/" className="block font-semibold text-green-900 py-3 px-4 hover:bg-gray-100 rounded hover:text-green-600 transition" onClick={closeMobileMenu}>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="block font-semibold text-green-900 py-3 px-4 hover:bg-gray-100 rounded hover:text-green-600 transition" onClick={closeMobileMenu}>
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="block font-semibold text-green-900 py-3 px-4 hover:bg-gray-100 rounded hover:text-green-600 transition" onClick={closeMobileMenu}>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="block font-semibold text-green-900 py-3 px-4 hover:bg-gray-100 rounded hover:text-green-600 transition" onClick={closeMobileMenu}>
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/contato" className="block px-6 py-2 bg-green-700 text-white font-semibold rounded-full text-center hover:bg-green-900 transition mt-2" onClick={closeMobileMenu}>
                  Solicitar Orçamento
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
