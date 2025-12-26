'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin uppercase tracking-wider text-[#111827] mb-4">
                CONTACT US —
              </h1>
              <p className="text-gray-500 text-base md:text-lg">
                Get in touch with us. We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#111827] mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111827] mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+919136728441"
                      className="text-gray-600 hover:text-[#111827] transition-colors"
                    >
                      +91 9136728441
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111827] mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@swayaaindia.com"
                      className="text-gray-600 hover:text-[#111827] transition-colors"
                    >
                      hello@swayaaindia.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111827] mb-2">
                      Instagram
                    </h3>
                    <a
                      href="https://instagram.com/swayaaindia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#111827] transition-colors"
                    >
                      @swayaaindia
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#111827] mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-[#111827] text-white font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

