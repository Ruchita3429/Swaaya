'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import Footer from '@/components/Footer';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear submit status when user makes changes
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                      {submitMessage}
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                      {submitMessage}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#111827] mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.subject ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827]`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
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
                      rows={5}
                      className={`w-full px-4 py-3 border ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] text-[#111827] resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 bg-[#111827] text-white font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
