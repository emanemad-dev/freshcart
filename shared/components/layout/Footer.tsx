import Link from "next/link";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import { BiPhone, BiEnvelope, BiMap, BiChevronRight } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineSubscriptions } from "react-icons/md";

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3 sm:space-y-4">
    <h4 className="text-white font-bold text-base sm:text-lg relative inline-block">
      {title}
      <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></span>
    </h4>
    <ul className="space-y-2 sm:space-y-2.5 text-sm">{children}</ul>
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
      className="text-gray-400 hover:text-emerald-400 font-medium transition-all duration-300 flex items-center gap-1.5 group"
    >
      <BiChevronRight className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {children}
      </span>
    </Link>
  </li>
);

const ContactItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-start gap-3 group">
    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-all duration-300">
      <Icon className="text-emerald-400 text-base sm:text-lg" />
    </div>
    <span className="text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors duration-300">
      {text}
    </span>
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
    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white text-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
  >
    <Icon className="text-base sm:text-lg" />
  </Link>
);

const PaymentItem = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
    <Icon className="text-white text-lg sm:text-xl group-hover:scale-110 transition-transform" />
    <span className="font-medium text-gray-300 text-xs sm:text-sm">
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
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/best-sellers", label: "Best Sellers" },
    { href: "/sale", label: "Sale %" },
  ];

  const accountLinks = [
    { href: "/profile", label: "My Profile" },
    { href: "/profile/orders", label: "Order History" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Shopping Cart" },
    { href: "/login", label: "Sign In" },
  ];

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/shipping-info", label: "Shipping Info" },
    { href: "/returns", label: "Returns & Refunds" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  const contactInfo = [
    { icon: BiPhone, text: "+1 (800) 123-4567" },
    { icon: BiEnvelope, text: "support@freshcart.com" },
    { icon: BiMap, text: "123 Commerce Street, New York, NY 10001" },
  ];

  const socialIcons = [
    { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  const paymentIcons = [
    { Icon: FaCcVisa, label: "Visa" },
    { Icon: FaCcMastercard, label: "Mastercard" },
    { Icon: FaPaypal, label: "PayPal" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#0B1120] to-[#0F172A] border-t border-emerald-500/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-12 sm:pt-16 pb-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand & Contact - Full width on mobile, 2 cols on tablet, 4 cols on desktop */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 sm:gap-3 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">
                  FC
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white">
                  FreshCart
                </span>
                <p className="text-xs text-emerald-400">Premium Shopping</p>
              </div>
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Your premier destination for premium products. Shop with
              confidence and enjoy exclusive deals, fast shipping, and 24/7
              customer support.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 sm:space-y-3">
              {contactInfo.map((item, idx) => (
                <ContactItem key={idx} icon={item.icon} text={item.text} />
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Footer Columns - Responsive grid */}
          <div className="sm:col-span-2 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              <FooterColumn title="Shop">
                {shopLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="Account">
                {accountLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="Support">
                {supportLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="Company">
                {companyLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterColumn>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-500/10 my-8 sm:my-10"></div>

        {/* Bottom Section - Responsive */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Newsletter */}
          <div className="w-full lg:w-auto flex-1 max-w-md">
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/10 hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <MdOutlineSubscriptions className="text-emerald-400 text-lg" />
                <h5 className="text-white font-semibold text-sm">
                  Stay Updated
                </h5>
              </div>
              <p className="text-gray-400 text-xs mb-3">
                Subscribe to get special offers & updates
              </p>
              <form className="flex flex-col xs:flex-row gap-2">
                <div className="relative flex-1">
                  <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-9 py-2.5 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm text-white placeholder-gray-500 text-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-sm whitespace-nowrap hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright & Payments */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} FreshCart. All rights reserved.
              <br className="xs:hidden" />
              <span className="inline xs:hidden"> </span>
              Made with{" "}
              <FaHeart className="inline text-emerald-400 mx-0.5 animate-pulse" />{" "}
              for shoppers
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              {paymentIcons.map((item, idx) => (
                <PaymentItem key={idx} Icon={item.Icon} label={item.label} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-600 text-xs">
            FreshCart is a registered trademark. All prices are in USD.
          </p>
        </div>
      </div>
    </footer>
  );
};
