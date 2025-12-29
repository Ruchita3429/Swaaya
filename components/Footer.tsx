import Link from 'next/link';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <Container>
        <div className="py-12 md:py-16 lg:py-20">
          {/* Main Footer Content - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12">
            {/* Column 1: Brand */}
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-[#111827] mb-4">
                SWAYAA.
              </h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                Handcrafted Indian print kurtis made with traditional artistry. 
                Discover authentic designs in pure cotton - Kalamkari, Hand Block, 
                Ajrak and more.
              </p>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] mb-4">
                COMPANY
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delivery"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] mb-4">
                GET IN TOUCH
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+1234567890"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors block"
                  >
                    
                    +91 9136728441
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@forever.com"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors block"
                  >
                    swayaaindia.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/forever"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-gray-500 hover:text-pink-500 transition-colors block"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500">
              © {new Date().getFullYear()} FOREVER. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}


