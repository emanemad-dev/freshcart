"use client";

import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageCircle,
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

import { FaHeadphonesAlt } from "react-icons/fa";

import { Button } from "@/shared/components/ui/Button";
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
    subtitle: "Available 24/7",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    icon: FiMail,
    title: "Email Us",
    lines: ["support@freshcart.com", "info@freshcart.com"],
    subtitle: "Reply within 24h",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    icon: FiMapPin,
    title: "Visit Us",
    lines: ["123 Commerce Street", "New York"],
    subtitle: "Mon-Fri",
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
  },
  {
    icon: FiClock,
    title: "Business Hours",
    lines: ["Mon-Fri 8AM - 6PM", "Sat 9AM - 4PM"],
    subtitle: "EST",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
];

const socialLinks = [
  { icon: BsTwitter, url: "#" },
  { icon: BsFacebook, url: "#" },
  { icon: BsInstagram, url: "#" },
  { icon: BsYoutube, url: "#" },
];

const faqHighlights = [
  { icon: BsTruck, text: "Shipping Info", color: "text-emerald-500" },
  { icon: BsShieldCheck, text: "Return Policy", color: "text-blue-500" },
  { icon: BsHeadset, text: "24/7 Support", color: "text-purple-500" },
  { icon: BsChatDots, text: "Live Chat", color: "text-amber-500" },
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
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition";

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Contact Us" }]}
        title="Contact Us"
        description="We'd love to hear from you."
        icon={<FaHeadphonesAlt className="text-3xl" />}
      />

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 space-y-16">
          <div className="bg-white rounded-3xl shadow-sm p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
              {/* LEFT */}
              <div className="lg:col-span-5 space-y-6">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;

                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
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

                <div className="p-6 rounded-xl bg-gray-50">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BsChatDots className="text-emerald-500" />
                    Connect With Us
                  </h3>

                  <div className="flex gap-3">
                    {socialLinks.map((social, idx) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={idx}
                          href={social.url}
                          className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm text-gray-600 hover:scale-110 transition"
                        >
                          <Icon />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-7">
                <div className="p-8 rounded-2xl bg-gray-50 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <FiMessageCircle className="text-emerald-600 text-2xl" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Send us a Message
                      </h2>

                      <p className="text-gray-500 text-sm">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-emerald-50 rounded-xl flex items-center gap-3">
                      <FiCheckCircle className="text-emerald-500 text-xl" />
                      <p className="text-emerald-700 text-sm font-medium">
                        Message sent successfully!
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyle}
                        required
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="shipping">Shipping</option>
                      <option value="return">Returns</option>
                      <option value="product">Product Question</option>
                      <option value="account">Account</option>
                    </select>

                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />

                    <Button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                      <FiSend /> Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK HELP */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {faqHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-sm text-center hover:shadow-md transition"
              >
                <item.icon className={`mx-auto text-3xl ${item.color} mb-3`} />
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}

          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 rounded-2xl text-white flex justify-between items-center flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <BsHeadset className="text-2xl" />
              </div>

              <div>
                <h4 className="font-semibold text-xl">Need immediate help?</h4>
                <p className="text-emerald-100 text-sm">
                  Our support team is ready 24/7
                </p>
              </div>
            </div>

            <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-50 transition">
              Start Live Chat
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
