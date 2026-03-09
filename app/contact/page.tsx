'use client';

import { useState } from 'react';
import { BiPhone, BiEnvelope, BiMap, BiTime } from 'react-icons/bi';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: BiPhone,
    title: 'Phone',
    lines: ['+1 (800) 123-4567', 'Mon-Fri from 8am to 6pm'],
    bg: 'bg-green-100'
  },
  {
    icon: BiEnvelope,
    title: 'Email',
    lines: ['support@freshcart.com', "We'll respond within 24 hours"],
    bg: 'bg-green-100'
  },
  {
    icon: BiMap,
    title: 'Office',
    lines: ['123 Commerce Street', 'New York, NY 10001', 'United States'],
    bg: 'bg-green-100'
  },
  {
    icon: BiTime,
    title: 'Business Hours',
    lines: ['Monday - Friday: 8am - 6pm', 'Saturday: 9am - 4pm', 'Sunday: Closed'],
    bg: 'bg-green-100'
  }
];

const socialLinks = [
  { icon: FaTwitter, url: 'https://twitter.com/freshcart', label: 'Twitter' },
  { icon: FaFacebook, url: 'https://facebook.com/freshcart', label: 'Facebook' },
  { icon: FaInstagram, url: 'https://instagram.com/freshcart', label: 'Instagram' },
  { icon: FaYoutube, url: 'https://youtube.com/freshcart', label: 'YouTube' }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a question or need help? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Column */}
        <div className="flex flex-col gap-6">
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`${info.bg} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 text-sm mt-0.5">{line}</p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Social Icons */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <SocialIcon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BiEnvelope className="text-green-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600 mt-1 text-sm">Fill out the form and we'll get back to you</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input type="text" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input type="email" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="shipping">Shipping Question</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="product">Product Question</option>
                  <option value="account">Account Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-start">
                <Button 
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-3 px-6 py-3 rounded-lg"
                >
                  <BiEnvelope className="text-xl text-white" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>

          {/* Help Center */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Looking for quick answers?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
            </p>
            <Button variant="outline" className="inline-flex items-center gap-2">
              Visit Help Center →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}