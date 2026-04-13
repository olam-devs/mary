'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  type: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  })
  const [status, setStatus] = useState<FormStatus>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    // Simulated submission — replace with your API endpoint or Sanity mutation
    try {
      await new Promise((res) => setTimeout(res, 1800))
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', type: 'general' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
            className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center mb-6"
          >
            <FiCheck size={28} className="text-cream-100" />
          </motion.div>
          <h3 className="font-serif text-earth-900 text-2xl font-bold mb-3">Message Sent!</h3>
          <p className="text-earth-500 text-sm leading-relaxed max-w-sm mb-8">
            Thank you for reaching out. Mary will personally respond within 1–2 business days.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-outline-dark text-xs"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Inquiry Type */}
          <div>
            <label className="label-earth block mb-2">I want to...</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="select-field"
            >
              <option value="general">General Inquiry</option>
              <option value="trip">Request a Custom Trip</option>
              <option value="brand">Brand Partnership / Collaboration</option>
              <option value="media">Media Kit Request</option>
              <option value="social">Social Media Management</option>
            </select>
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="label-earth block mb-2">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="email" className="label-earth block mb-2">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="label-earth block mb-2">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="input-field"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="label-earth block mb-2">Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your travel plans, brand, or project..."
              className="input-field resize-none"
            />
          </div>

          {/* Error state */}
          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3 text-sm">
              <FiAlertCircle size={16} />
              Something went wrong. Please try again or email directly at hello@maryminzalucas.com
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary w-full relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-earth-900/30 border-t-earth-900 rounded-full"
                />
                Sending...
              </motion.span>
            ) : (
              <span className="flex items-center gap-2">
                <FiSend size={15} /> Send Message
              </span>
            )}
          </button>

          <p className="text-earth-400 text-xs text-center">
            Prefer WhatsApp?{' '}
            <a
              href="https://wa.me/255712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:underline"
            >
              Chat directly
            </a>
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
