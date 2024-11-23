// src/pages/ContactPage.js
import React, { useState } from "react";
import styled from "styled-components";
import SuccessModal from "../components/SuccessModal";
import BackButton from "../components/BackButton"; // Import BackButton

const ContactContainer = styled.div`
  padding: 40px 20px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 2.5rem;
    color: #333;
  }

  .contact-info {
    margin-bottom: 30px;

    p {
      font-size: 1rem;
      color: #555;
      margin: 10px 0;
    }
  }

  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    text-align: left;

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    label {
      font-size: 1rem;
      color: #333;
    }

    input,
    textarea {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #4a90e2;
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    button {
      padding: 10px 20px;
      font-size: 1rem;
      background-color: #4a90e2;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #357ab8;
      }
    }
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    setIsModalOpen(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <ContactContainer>
      <BackButton /> {/* Integrate BackButton here */}
      <h1>Contact Us</h1>
      <div className="contact-info">
        <p>
          <strong>Address:</strong> 1234 Culinary Blvd, Flavor Town, FT 56789
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          <strong>Email:</strong> contact@skiptheserver.com
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit} aria-label="Contact Form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            aria-required="true"
          ></textarea>

          <button type="submit" aria-label="Submit Contact Form">
            Submit
          </button>
        </form>
      </div>
      {isModalOpen && (
        <SuccessModal
          message="Thank you for contacting us! We'll get back to you shortly."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </ContactContainer>
  );
};

export default ContactPage;
