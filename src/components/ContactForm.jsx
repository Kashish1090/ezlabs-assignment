import React, { useState } from "react";

const API_URL = "https://vernanbackend.ezlab.in/api/contact-us/";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Validation function
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) e.email = "Enter a valid email";
    }
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (form.phone.length < 7) e.phone = "Enter a valid phone number";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccessMsg("✅ Form Submitted Successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        const data = await res.text();
        console.error("Error:", data);
        setErrors({ submit: "Submission failed, please try again." });
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrors({ submit: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact-inner">
        <div className="contact-left">
          <h2>Contact Us</h2>
          <p>
            Have a question or want to work with us? Fill out the form below and
            we’ll get back to you soon.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </label>
          </div>

          <div className="form-row">
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </label>
          </div>

          <div className="form-row">
            <label>
              Message
              <textarea
                name="message"
                placeholder="Write your message..."
                rows="4"
                value={form.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <div className="error">{errors.message}</div>}
            </label>
          </div>

          {errors.submit && <div className="error">{errors.submit}</div>}
          {successMsg && <div className="success">{successMsg}</div>}

          <div className="form-actions">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm({ name: "", email: "", phone: "", message: "" });
                setErrors({});
                setSuccessMsg("");
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
