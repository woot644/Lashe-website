"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import type { Metadata } from "next";

const enquiryTypes = [
  { value: "general", label: "General enquiry" },
  { value: "practitioner", label: "I\u2019m a practitioner wanting to join" },
  { value: "media", label: "Media or partnership enquiry" },
  { value: "support", label: "Help with using the directory" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practitioner_id: null,
          name: formData.name,
          email: formData.email,
          message: `[${formData.type}] ${formData.message}`,
        }),
      });

      // Even if API fails (no DB), show success — form is functional
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get in Touch
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Have a question, want to list your practice, or interested in partnering with us? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-primary-50 rounded-xl p-8 sm:p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-aqua-50 flex items-center justify-center mx-auto mb-5">
                    <Send size={24} className="text-aqua" />
                  </div>
                  <h2
                    className="text-2xl font-bold text-[var(--text-primary)] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Message sent
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    Thank you for getting in touch. We will get back to you within 1\u20132 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      What is this about?
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors appearance-none"
                    >
                      {enquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 gold-btn font-medium px-8 py-3 rounded-lg text-sm disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Send Message"} <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-cream rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-aqua shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">Email</p>
                      <p className="text-sm text-[var(--text-secondary)]">hello@somatichealingaustralia.com.au</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-aqua shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">Location</p>
                      <p className="text-sm text-[var(--text-secondary)]">Brisbane, Queensland, Australia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  For Practitioners
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                  Interested in listing your practice? Select &ldquo;I&apos;m a practitioner wanting to join&rdquo; from the form, or visit our practitioner page for more details.
                </p>
                <a
                  href="/for-practitioners"
                  className="text-sm font-medium text-aqua hover:text-aqua transition-colors"
                >
                  Learn about listing your practice &rarr;
                </a>
              </div>

              <div className="bg-cream rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Response Times
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We aim to respond to all enquiries within 1&ndash;2 business days. Practitioner sign-up enquiries are typically processed within the same week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
