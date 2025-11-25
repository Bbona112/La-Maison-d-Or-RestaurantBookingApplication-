'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1000);
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Header */}
      <header className="py-4" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">Contact Us</h1>
          <p className="lead text-white" style={{ color: '#fef3c7' }}>We&apos;d love to hear from you</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Get in Touch</h2>
                <div className="d-flex flex-column gap-4">
                  <div>
                    <h3 className="h6 fw-semibold mb-2 d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                      Address
                    </h3>
                    <p className="text-muted mb-0">
                      123 Restaurant Street
                      <br />
                      City, State 12345
                      <br />
                      United States
                    </p>
                  </div>

                  <div>
                    <h3 className="h6 fw-semibold mb-2 d-flex align-items-center">
                      <i className="bi bi-telephone-fill text-warning me-2"></i>
                      Phone
                    </h3>
                    <p className="text-muted mb-0">
                      <a href="tel:+15551234567" className="text-decoration-none text-muted">
                        (555) 123-4567
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="h6 fw-semibold mb-2 d-flex align-items-center">
                      <i className="bi bi-envelope-fill text-warning me-2"></i>
                      Email
                    </h3>
                    <p className="text-muted mb-0">
                      <a
                        href="mailto:info@lamaisondor.com"
                        className="text-decoration-none text-muted"
                      >
                        info@lamaisondor.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="h6 fw-semibold mb-2 d-flex align-items-center">
                      <i className="bi bi-clock-fill text-warning me-2"></i>
                      Hours
                    </h3>
                    <p className="text-muted mb-0">
                      Monday - Thursday: 5:00 PM - 10:00 PM
                      <br />
                      Friday - Saturday: 5:00 PM - 11:00 PM
                      <br />
                      Sunday: 4:00 PM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="event">Private Event</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="form-control"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="alert alert-success" role="alert">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="alert alert-danger" role="alert">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-100 py-3 fw-semibold"
                    style={{ background: 'linear-gradient(to right, #d97706, #ea580c)', border: 'none' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
