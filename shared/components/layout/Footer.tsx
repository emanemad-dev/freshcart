// import Link from 'next/link';
// import {
//   FaCcVisa,
//   FaCcMastercard,
//   FaPaypal,
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaYoutube,
// } from 'react-icons/fa';
// import { BiPhone, BiEnvelope, BiMap } from 'react-icons/bi';

// const FooterColumn = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div>
//     <h4 className="text-white font-semibold mb-4 text-lg">{title}</h4>
//     <ul className="space-y-3 text-sm">{children}</ul>
//   </div>
// );

// const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
//   <li>
//     <Link
//       href={href}
//       className="text-gray-300 hover:text-green-500 transition-colors duration-300"
//     >
//       {children}
//     </Link>
//   </li>
// );

// const ContactItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
//   <p className="flex items-center gap-3 text-gray-400 transition-colors duration-300 hover:text-green-500">
//     <Icon className="text-green-500 text-xl" />
//     <span>{text}</span>
//   </p>
// );

// const SocialIcon = ({ Icon, href, label }: { Icon: any; href: string; label: string }) => (
//   <Link
//     href={href}
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label={label}
//     className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition-colors"
//   >
//     <Icon className="text-white text-lg" />
//   </Link>
// );

// const PaymentItem = ({ Icon, label }: { Icon: any; label: string }) => (
//   <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full hover:bg-green-500 transition-colors">
//     <Icon className="text-white text-2xl" />
//     <span>{label}</span>
//   </div>
// );

// export const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const shopLinks = [
//     { href: '/products', label: 'All Products' },
//     { href: '/categories', label: 'Categories' },
//     { href: '/brands', label: 'Brands' },
//     { href: '/category/electronics', label: 'Electronics' },
//     { href: '/category/mens-fashion', label: "Men's Fashion" },
//     { href: '/category/womens-fashion', label: "Women's Fashion" },
//   ];

//   const accountLinks = [
//     { href: '/profile/orders', label: 'Order History' },
//     { href: '/wishlist', label: 'Wishlist' },
//     { href: '/cart', label: 'Shopping Cart' },
//     { href: '/login', label: 'Sign In' },
//     { href: '/register', label: 'Create Account' },
//   ];

//   const supportLinks = [
//     { href: '/help', label: 'Help Center' },
//     { href: '/shipping-info', label: 'Shipping Info' },
//     { href: '/returns', label: 'Returns & Refunds' },
//     { href: '/track-order', label: 'Track Order' },
//   ];

//   const legalLinks = [
//     { href: '/privacy', label: 'Privacy Policy' },
//     { href: '/terms', label: 'Terms of Service' },
//     { href: '/cookies', label: 'Cookie Policy' },
//   ];

//   const contactInfo = [
//     { icon: BiPhone, text: '+1 (800) 123-4567' },
//     { icon: BiEnvelope, text: 'support@freshcart.com' },
//     { icon: BiMap, text: '123 Commerce Street, New York, NY 10001' },
//   ];

//   const socialIcons = [
//     { Icon: FaTwitter, href: 'https://twitter.com/freshcart', label: 'Twitter' },
//     { Icon: FaInstagram, href: 'https://instagram.com/freshcart', label: 'Instagram' },
//     { Icon: FaYoutube, href: 'https://youtube.com/freshcart', label: 'YouTube' },
//     { Icon: FaFacebookF, href: 'https://facebook.com/freshcart', label: 'Facebook' },
//   ];

//   const paymentIcons = [
//     { Icon: FaCcVisa, label: 'Visa' },
//     { Icon: FaCcMastercard, label: 'Mastercard' },
//     { Icon: FaPaypal, label: 'PayPal' },
//   ];

//   return (
//     <footer className="bg-[#1B1E2C] w-full text-gray-300">
//       <div className="container mx-auto px-4 pt-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
//           {/* Brand & Contact */}
//           <div className="sm:col-span-2 lg:col-span-4 space-y-4">
//             <h3 className="text-white font-bold text-2xl tracking-tight">FreshCart</h3>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.
//             </p>

//             <div className="space-y-3 pt-4">
//               {contactInfo.map((item, idx) => (
//                 <ContactItem key={idx} icon={item.icon} text={item.text} />
//               ))}
//             </div>

//             <div className="flex items-center gap-3 pt-4">
//               {socialIcons.map((item, idx) => (
//                 <SocialIcon key={idx} Icon={item.Icon} href={item.href} label={item.label} />
//               ))}
//             </div>
//           </div>

//           {/* Footer Columns */}
//           <div className="lg:col-span-2">
//             <FooterColumn title="Shop">
//               {shopLinks.map((link) => (
//                 <FooterLink key={link.href} href={link.href}>
//                   {link.label}
//                 </FooterLink>
//               ))}
//             </FooterColumn>
//           </div>

//           <div className="lg:col-span-2">
//             <FooterColumn title="My Account">
//               {accountLinks.map((link) => (
//                 <FooterLink key={link.href} href={link.href}>
//                   {link.label}
//                 </FooterLink>
//               ))}
//             </FooterColumn>
//           </div>

//           <div className="lg:col-span-2">
//             <FooterColumn title="Support">
//               {supportLinks.map((link) => (
//                 <FooterLink key={link.href} href={link.href}>
//                   {link.label}
//                 </FooterLink>
//               ))}
//             </FooterColumn>
//           </div>

//           <div className="lg:col-span-2">
//             <FooterColumn title="Legal">
//               {legalLinks.map((link) => (
//                 <FooterLink key={link.href} href={link.href}>
//                   {link.label}
//                 </FooterLink>
//               ))}
//             </FooterColumn>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700/80 my-12"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center pb-12 text-sm">
//           <p>© {currentYear} FreshCart. All rights reserved.</p>
//           <div className="flex items-center gap-6 mt-4 md:mt-0">
//             {paymentIcons.map((item, idx) => (
//               <PaymentItem key={idx} Icon={item.Icon} label={item.label} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

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
  <div className="transition-transform duration-300 hover:translate-y-1">
    <h4 className="text-white font-semibold mb-4 text-lg">{title}</h4>
    <ul className="space-y-3 text-sm">{children}</ul>
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
      className="text-gray-300 hover:text-green-500 font-medium transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

const ContactItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <p className="flex items-center gap-3 text-gray-400 transition-colors duration-300 hover:text-green-500">
    <Icon className="text-green-500 text-xl" />
    <span>{text}</span>
  </p>
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
    className="bg-gray-700 p-2 rounded-full hover:bg-green-500 transition-colors transition-transform hover:scale-110"
  >
    <Icon className="text-white text-lg" />
  </Link>
);

const PaymentItem = ({ Icon, label }: { Icon: any; label: string }) => (
  <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full hover:bg-green-500 transition-colors transition-transform hover:scale-105">
    <Icon className="text-white text-2xl" />
    <span>{label}</span>
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
    <footer className="bg-[#1B1E2C] w-full text-gray-300">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="FreshCart Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-2xl font-bold text-primary">FreshCart</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices.
            </p>

            <div className="space-y-3 pt-4">
              {contactInfo.map((item, idx) => (
                <ContactItem key={idx} icon={item.icon} text={item.text} />
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
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
        <div className="border-t border-gray-700/80 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 text-sm">
          <p>© {currentYear} FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            {paymentIcons.map((item, idx) => (
              <PaymentItem key={idx} Icon={item.Icon} label={item.label} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
