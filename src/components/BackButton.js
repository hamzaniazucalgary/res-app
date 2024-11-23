// src/components/BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa"; // Optional: For adding an icon

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #357ab8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid #357ab8;
    outline-offset: 2px;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Navigate back if history exists
    } else {
      navigate("/"); // Fallback to home if no history
    }
  };

  // Determine if the back action is possible
  const canGoBack = window.history.length > 1;

  return (
    <Button onClick={handleBack} disabled={!canGoBack} aria-label="Go Back">
      <FaArrowLeft /> {/* Optional: Add an icon */}
      Back
    </Button>
  );
};

export default BackButton;
