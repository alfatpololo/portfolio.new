import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#home');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  // Scroll handler untuk halaman utama
  useEffect(() => {
    if (router.pathname === '/') {
      const handleScroll = () => {
        const sections = ['#home', '#work'];
        let active = '#home';

        sections.forEach((section) => {
          const element = document.querySelector(section);
          if (element && window.scrollY >= element.offsetTop - 50) {
            active = section;
          }
        });

        setActiveSection(active);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Tetapkan activeSection berdasarkan halaman lain
      setActiveSection(router.pathname);
    }
  }, [router.pathname]);

  // Scroll ke atas untuk halaman About
  useEffect(() => {
    if (router.pathname === '/About') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [router.pathname]);

  const handleClick = (section: string) => async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await router.push('/');
    setMenuOpen(false); // Tutup menu saat navigasi
    setActiveSection(section);
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur-md z-50 rounded-xl shadow-lg">
      <div className="px-4 py-2 flex items-center justify-between lg:justify-center">
        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            className="text-white w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex absolute lg:relative lg:top-0 left-1/2 transform lg:-translate-x-1/2 lg:translate-y-0 translate-y-12 bg-black lg:bg-transparent p-6 lg:p-0 rounded-lg lg:rounded-none z-40 space-y-4 lg:space-y-0 lg:space-x-6`}
        >
          {[
            { id: '#home', label: 'H', text: 'Home', href: '/' },
            { id: '#work', label: 'W', text: 'Work', href: '/' },
            { id: '/About', label: 'A', text: 'About', href: '/About' },
            { id: '/Contact', label: 'C', text: 'Contact', href: '/Contact' },
          ].map(({ id, href, label, text }) => (
            <Link
              key={id}
              href={href}
              scroll={false}
              className={`${
                activeSection === id ? 'text-white' : 'text-gray-300'
              } hover:text-white flex items-center gap-2`}
              onClick={id === '#home' || id === '#work' ? handleClick(id) : () => setMenuOpen(false)}
            >
              <span
                className={`border border-current text-center w-6 h-6 flex items-center justify-center rounded-[4px] text-[10px] ${
                  activeSection === id ? 'bg-white text-slate-800' : 'text-white'
                }`}
              >
                {label}
              </span>
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
