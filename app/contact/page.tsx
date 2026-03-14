"use client";

import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageCircle,
  FiHelpCircle,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import {
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsFacebook,
  BsHeadset,
  BsChatDots,
  BsShieldCheck,
  BsTruck,
} from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { motion } from "framer-motion";
import { PageHeader } from "@/shared/components/layout/PageHeader";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: FiPhone,
    title: "Phone Support",
    lines: ["+1 (800) 123-4567", "+1 (212) 987-6543"],
    subtitle: "Available 24/7 for urgent calls",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    icon: FiMail,
    title: "Email Us",
    lines: ["support@freshcart.com", "info@freshcart.com"],
    subtitle: "We reply within 24 hours",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    icon: FiMapPin,
    title: "Visit Us",
    lines: ["123 Commerce Street", "New York, NY 10001", "United States"],
    subtitle: "Mon-Fri, 9AM - 5PM",
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
  {
    icon: FiClock,
    title: "Business Hours",
    lines: [
      "Mon-Fri: 8:00 AM - 6:00 PM",
      "Sat: 9:00 AM - 4:00 PM",
      "Sun: Closed",
    ],
    subtitle: "EST Timezone",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
];

const socialLinks = [
  {
    icon: BsTwitter,
    url: "https://twitter.com/freshcart",
    label: "Twitter",
    bgHover: "hover:bg-blue-50",
    textHover: "hover:text-blue-500",
  },
  {
    icon: BsFacebook,
    url: "https://facebook.com/freshcart",
    label: "Facebook",
    bgHover: "hover:bg-blue-50",
    textHover: "hover:text-blue-600",
  },
  {
    icon: BsInstagram,
    url: "https://instagram.com/freshcart",
    label: "Instagram",
    bgHover: "hover:bg-pink-50",
    textHover: "hover:text-pink-600",
  },
  {
    icon: BsYoutube,
    url: "https://youtube.com/freshcart",
    label: "YouTube",
    bgHover: "hover:bg-red-50",
    textHover: "hover:text-red-600",
  },
];

const faqHighlights = [
  {
    icon: BsTruck,
    text: "Shipping Info",
    color: "text-emerald-500",
  },
  {
    icon: BsShieldCheck,
    text: "Return Policy",
    color: "text-blue-500",
  },
  {
    icon: BsHeadset,
    text: "24/7 Support",
    color: "text-purple-500",
  },
  {
    icon: BsChatDots,
    text: "Live Chat",
    color: "text-amber-500",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Contact Us" }]}
        title="Contact Us"
        description="We'd love to hear from you. Get in touch with our team."
        icon={<FiPhone className="text-3xl" />}
      />

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 space-y-12">
          {/* Contact Section */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left */}
              <div className="lg:col-span-5 space-y-6">
                {/* Cards */}
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 border border-gray-200 rounded-xl hover:shadow-md transition"
                    >
                      <div
                        className={`${info.bgColor} w-12 h-12 flex items-center justify-center rounded-xl`}
                      >
                        <Icon className={`${info.textColor} text-xl`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {info.title}
                        </h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-gray-600 text-sm">
                            {line}
                          </p>
                        ))}
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                          <FiCheckCircle className="text-emerald-500" />
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Social */}
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BsChatDots className="text-emerald-500" />
                    Connect With Us
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {socialLinks.map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 ${social.bgHover} ${social.textHover} transition hover:scale-110`}
                        >
                          <Icon className="text-lg" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-7 space-y-6">
                {/* Form */}
                <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <FiMessageCircle className="text-emerald-600 text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Send us a{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                          Message
                        </span>
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        We'll get back to you within 24 hours
                      </p>
                    </div>
                  </div>

                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                      <FiCheckCircle className="text-emerald-500 text-xl" />
                      <p className="text-emerald-700 text-sm font-medium">
                        Message sent successfully! We'll respond soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">📦 Order Inquiry</option>
                        <option value="shipping">🚚 Shipping</option>
                        <option value="return">🔄 Returns</option>
                        <option value="product">❓ Product Question</option>
                        <option value="account">👤 Account</option>
                        <option value="other">💬 Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                    >
                      <FiSend /> Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
            <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FiHelpCircle className="text-emerald-500" /> Quick Help
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {faqHighlights.map((item, idx) => (
                <button
                  key={idx}
                  className="group p-5 border border-gray-200 rounded-xl hover:shadow-md transition text-center"
                >
                  <item.icon
                    className={`mx-auto text-3xl ${item.color} mb-3 group-hover:scale-110 transition`}
                  />
                  <p className="text-sm text-gray-600">{item.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Live Chat CTA */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 rounded-2xl text-white shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <BsHeadset className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-xl">
                    Need immediate help?
                  </h4>
                  <p className="text-emerald-100 text-sm">
                    Our support team is ready 24/7
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-medium hover:bg-emerald-50 transition shadow">
                Start Live Chat
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
