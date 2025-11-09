import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-image.webp";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Crafting Digital Experiences <br />
            that Inspire & Innovate
          </h1>
          <p>
            We blend creativity and technology to design user-focused digital
            products. Explore our work, connect with our team, and let’s build
            something extraordinary together.
          </p>
          <a href="#contact" className="btn-primary">
            Contact Us
          </a>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
         >
          <img src={heroImage} alt="Hero Banner" />
        </motion.div>

      </div>
    </section>
  );
}
