"use client";

import { useState } from "react";
import { BiPhone, BiEnvelope, BiMap, BiTime } from "react-icons/bi";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaHeadphonesAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { ContactHero } from "./ContactHero";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: BiPhone,
    title: "Phone",
    lines: ["+1 (800) 123-4567", "Mon-Fri from 8am to 6pm"],
  },
  {
    icon: BiEnvelope,
    title: "Email",
    lines: ["support@freshcart.com", "We'll respond within 24 hours"],
  },
  {
    icon: BiMap,
    title: "Office",
    lines: ["123 Commerce Street", "New York, NY 10001", "United States"],
  },
  {
    icon: BiTime,
    title: "Business Hours",
    lines: [
      "Monday - Friday: 8am - 6pm",
      "Saturday: 9am - 4pm",
      "Sunday: Closed",
    ],
  },
];

const socialLinks = [
  { icon: FaTwitter, url: "https://twitter.com/freshcart", label: "Twitter" },
  {
    icon: FaFacebook,
    url: "https://facebook.com/freshcart",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    url: "https://instagram.com/freshcart",
    label: "Instagram",
  },
  { icon: FaYoutube, url: "https://youtube.com/freshcart", label: "YouTube" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
      <ContactHero />
      <section className="container mx-auto px-4 -mt-20 md:-mt-32 pb-24 md:pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Contact Info Column */}
          <div className="flex flex-col gap-6">
            {contactInfo.map((info, idx) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl hover:bg-white/10 transition-colors border-white/20 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {info.title}
                    </h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-gray-300 text-sm mt-0.5">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl border-white/20"
            >
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <SocialIcon />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl border-white/20 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BiEnvelope className="text-green-400 text-xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-300 text-sm">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Select subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="shipping">Shipping</option>
                    <option value="return">Returns</option>
                    <option value="product">Product Question</option>
                    <option value="account">Account</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors resize-none text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center gap-2 px-8 py-3 rounded-xl font-semibold w-full md:w-auto"
                >
                  <FaEnvelope className="text-lg" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 text-center border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Need quick answers?
              </h2>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
                Check our Help Center for common questions about orders,
                delivery, and returns.
              </p>
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 border-white/30 hover:bg-white/10"
              >
                Visit Help Center
                <FaArrowRight className="text-sm" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
