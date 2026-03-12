import Link from "next/link";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { BiPhone, BiEnvelope, BiMap } from "react-icons/bi";

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="hover:text-green-400 transition-colors duration-200">
    <h4 className="text-white font-bold mb-4 text-lg bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
      {title}
    </h4>
    <ul className="space-y-2 text-sm">{children}</ul>
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="text-gray-300 hover:text-green-400 font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const ContactItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="glass-card mb-3 last:mb-0 hover:bg-green-500/20 transition-all duration-300 group">
    <p className="flex items-center gap-3 text-gray-300 group-hover:text-green-400 transition-all duration-300">
      <Icon className="text-green-400 text-xl shrink-0 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300" />
      <span>{text}</span>
    </p>
  </div>
);

const SocialIcon = ({
  Icon,
  href,
  label,
}: {
  Icon: any;
  href: string;
  label: string;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="glass-card p-3 rounded-lg hover:bg-green-500/20 transition-all duration-300 group"
  >
    <Icon className="text-gray-300 text-xl group-hover:text-green-400 group-hover:scale-110 transition-all duration-300" />
  </Link>
);

const PaymentItem = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-all duration-300 group">
    <Icon className="text-white text-2xl group-hover:text-green-400 group-hover:scale-110 transition-all duration-300" />
    <span className="font-semibold text-gray-200 group-hover:text-green-400 transition-all duration-300">
      {label}
    </span>
  </div>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { href: "/products", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
    { href: "/category/electronics", label: "Electronics" },
    { href: "/category/mens-fashion", label: "Men's Fashion" },
    { href: "/category/womens-fashion", label: "Women's Fashion" },
  ];

  const accountLinks = [
    { href: "/profile/orders", label: "Order History" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Shopping Cart" },
    { href: "/login", label: "Sign In" },
    { href: "/register", label: "Create Account" },
  ];

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/shipping-info", label: "Shipping Info" },
    { href: "/returns", label: "Returns & Refunds" },
    { href: "/track-order", label: "Track Order" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ];

  const contactInfo = [
    { icon: BiPhone, text: "+1 (800) 123-4567" },
    { icon: BiEnvelope, text: "support@freshcart.com" },
    { icon: BiMap, text: "123 Commerce Street, New York, NY 10001" },
  ];

  const socialIcons = [
    {
      Icon: FaTwitter,
      href: "https://twitter.com/freshcart",
      label: "Twitter",
    },
    {
      Icon: FaInstagram,
      href: "https://instagram.com/freshcart",
      label: "Instagram",
    },
    {
      Icon: FaYoutube,
      href: "https://youtube.com/freshcart",
      label: "YouTube",
    },
    {
      Icon: FaFacebookF,
      href: "https://facebook.com/freshcart",
      label: "Facebook",
    },
  ];

  const paymentIcons = [
    { Icon: FaCcVisa, label: "Visa" },
    { Icon: FaCcMastercard, label: "Mastercard" },
    { Icon: FaPaypal, label: "PayPal" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-slate-900 via-[#1B1E2C] to-black/50 backdrop-blur-sm border-t border-green-500/10">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl shadow-lg">
                <img
                  src="/logo.png"
                  alt="FreshCart Logo"
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                FreshCart
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for premium products.
            </p>

            <div className="space-y-3">
              {contactInfo.map((item, idx) => (
                <ContactItem key={idx} icon={item.icon} text={item.text} />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {socialIcons.map((item, idx) => (
                <SocialIcon
                  key={idx}
                  Icon={item.Icon}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          <div className="lg:col-span-2">
            <FooterColumn title="Shop">
              {shopLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="My Account">
              {accountLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Support">
              {supportLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

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
        <div className="border-t border-green-500/20 my-9"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between text-sm py-6">
          {/* Newsletter */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1">
            <div className="glass-card p-3 flex-1 rounded-xl">
              <p className="text-gray-300 text-xs mb-1.5">Stay Updated</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm text-white placeholder-gray-400 text-sm focus:border-green-400 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 transition-colors whitespace-nowrap text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright & Payments */}
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {currentYear} FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {paymentIcons.map((item, idx) => (
                <PaymentItem key={idx} Icon={item.Icon} label={item.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
