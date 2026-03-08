import Link from 'next/link';
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { BiPhone, BiEnvelope, BiMap } from 'react-icons/bi';
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h4 className="text-gray-400 font-semibold mb-4 text-lg">{title}</h4>
    <ul className="space-y-3 text-sm">{children}</ul>
  </div>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-green-500 transition-colors duration-300">
      {children}
    </Link>
  </li>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { href: '/products', label: 'All Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/brands', label: 'Brands' },
    { href: '/category/electronics', label: 'Electronics' },
    { href: '/category/mens-fashion', label: "Men's Fashion" },
    { href: '/category/womens-fashion', label: "Women's Fashion" },
  ];

  const accountLinks = [
    { href: '/profile/orders', label: 'Order History' },
    { href: '/wishlist', label: 'Wishlist' },
    { href: '/cart', label: 'Shopping Cart' },
    { href: '/auth/signin', label: 'Sign In' },
    { href: '/auth/register', label: 'Create Account' },
  ];

  const supportLinks = [
    { href: '/help', label: 'Help Center' },
    { href: '/shipping-info', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns & Refunds' },
    { href: '/track-order', label: 'Track Order' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ];

  const contactInfo = [
    { icon: BiPhone, text: '+1 (800) 123-4567' },
    { icon: BiEnvelope, text: 'support@freshcart.com' },
    { icon: BiMap, text: '123 Commerce Street, New York, NY 10001' },
  ];

  const socialIcons = [
    { Icon: FaTwitter, href: 'https://twitter.com/freshcart', hoverColor: 'hover:text-blue-400', label: 'Twitter' },
    { Icon: FaInstagram, href: 'https://instagram.com/freshcart', hoverColor: 'hover:text-pink-500', label: 'Instagram' },
    { Icon: FaYoutube, href: 'https://youtube.com/freshcart', hoverColor: 'hover:text-red-500', label: 'YouTube' },
  ];

  const paymentIcons = [
    { Icon: FaCcVisa, hoverColor: 'hover:text-blue-400' },
    { Icon: FaCcMastercard, hoverColor: 'hover:text-yellow-400' },
    { Icon: FaPaypal, hoverColor: 'hover:text-blue-600' },
  ];

  return (
    <footer className="bg-[#1B1E2C] w-full">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand and Contact Section - Takes more space */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <h3 className="text-white font-bold text-2xl tracking-tight">
              FreshCart
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-gray-400 text-sm pt-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <p key={index} className="flex items-center gap-3">
                    <Icon className="text-green-500 text-xl" />
                    <span>{item.text}</span>
                  </p>
                );
              })}
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-4">
              {socialIcons.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${item.hoverColor} transition-colors duration-300`}
                    aria-label={item.label}
                  >
                    <Icon className="text-2xl" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="Shop">
              {shopLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Account Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="My Account">
              {accountLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="Support">
              {supportLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2">
            <FooterColumn title="Legal">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/80 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 text-gray-400 text-sm">
          <p>© {currentYear} FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {paymentIcons.map((item, index) => {
              const Icon = item.Icon;
              return (
                <Icon
                  key={index}
                  className={`text-white text-3xl transition-colors ${item.hoverColor}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};