// src/components/MenuItem.js

import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import fallbackImage from "../assets/fallback.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaLeaf,
  FaFire,
  FaWineBottle,
  FaUtensils,
} from "react-icons/fa";

const MenuItemCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: scale(1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 767px) {
    max-width: 90%;
    margin-bottom: 40px;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    background-color: #f9f9f9;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 12px; /* Adds rounded edges */
    }
  }

  .details {
    padding: 15px;
    text-align: left;
    text-align: justify;
    line-height: 1.5;

    h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
        background-color: #eef2f3;
        color: #4a90e2;
        padding: 4px 8px;
        border-radius: 15px;
        font-size: 0.8rem;
      }
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 10px;

      .stars {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .num-reviews {
        font-size: 0.8rem;
        color: #666;
      }
    }

    p {
      margin: 5px 0;
      font-size: 0.9rem;
      color: #666;
    }

    .price {
      font-weight: bold;
      font-size: 1.2rem;
      color: #4a90e2;
      margin-top: 10px;
    }
  }
`;

const AddToCartButton = styled.button`
  margin-top: auto;
  padding: 10px 15px;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #357ab8;
  }

  &:disabled {
    background-color: #a0c4e3;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

// Styled Components for the Customization Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.modalBg || "#fff"};
  padding: 30px;
  border-radius: ${({ theme }) => theme.borderRadius || "10px"};
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    margin-top: 0;
    color: #333;
  }

  .customization-options {
    margin: 20px 0;
    text-align: left;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: #333;

    input {
      margin-right: 10px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor || "#333"};

  &:hover {
    color: ${({ theme }) => theme.accentColor || "#4a90e2"};
  }
`;

const ConfirmButton = styled.button`
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ab8;
  }

  &:disabled {
    background-color: #a0c4e3;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #333333;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #aaa;
  }
`;

// Mapping tags to icons
const tagIconMapping = {
  Vegan: <FaLeaf />,
  Vegetarian: <FaLeaf />,
  Spicy: <FaFire />,
  "Gluten-Free": <FaUtensils />,
  Alcoholic: <FaWineBottle />,
  "Non-Alcoholic": <FaUtensils />,
  Sweet: <FaUtensils />,
  Breakfast: <FaUtensils />,
  Lunch: <FaUtensils />,
  Dinner: <FaUtensils />,
  Appetizer: <FaUtensils />,
};

const MenuItem = React.memo(
  ({
    id,
    image,
    name,
    tags,
    price,
    description,
    customizations,
    rating,
    numReviews,
  }) => {
    const [imgSrc, setImgSrc] = useState(image);
    const { addItem } = useContext(CartContext);
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    // Customization State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleError = () => {
      setImgSrc(fallbackImage);
    };

    const handleAddToCartClick = () => {
      if (customizations && customizations.length > 0) {
        // Open customization modal
        setIsModalOpen(true);
      } else {
        // No customizations, add directly
        handleAddItem({});
      }
    };

    const handleAddItem = (customizationsSelected) => {
      setIsAdding(true);
      addItem({
        id,
        name,
        price,
        customizations: customizationsSelected,
      });

      toast.success(`${name} has been added to your cart!`, {
        position: "bottom-right",
        autoClose: 1500,
        closeButton: true,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: false,
        icon: "🛒",
      });

      setIsAdding(false);
    };

    const handleCustomizationChange = (category, option) => {
      setSelectedOptions((prev) => {
        const currentOptions = Array.isArray(prev[category])
          ? prev[category]
          : [];
        if (currentOptions.includes(option)) {
          // Remove the option
          return {
            ...prev,
            [category]: currentOptions.filter((opt) => opt !== option),
          };
        } else {
          // Add the option
          return {
            ...prev,
            [category]: [...currentOptions, option],
          };
        }
      });
    };

    const handleConfirmCustomization = () => {
      handleAddItem(selectedOptions);
      setIsModalOpen(false);
      setSelectedOptions({});
    };

    const handleCancelCustomization = () => {
      setIsModalOpen(false);
      setSelectedOptions({});
    };

    // Function to render star ratings
    const renderStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating - fullStars >= 0.5;

      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`star-full-${i}`} color="#FFD700" />);
      }

      if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="star-half" color="#FFD700" />);
      }

      while (stars.length < 5) {
        stars.push(
          <FaRegStar key={`star-empty-${stars.length}`} color="#FFD700" />
        );
      }

      return stars;
    };

    return (
      <>
        <MenuItemCard>
          <div className="image-wrapper">
            <img src={imgSrc} alt={name} loading="lazy" onError={handleError} />
          </div>
          <div className="details">
            <h3>
              {name}{" "}
              {tags.includes("Vegan") || tags.includes("Vegetarian") ? (
                <FaLeaf title="Vegetarian/Vegan" />
              ) : null}
            </h3>
            <div className="tags">
              {tags.map((tag, index) => (
                <span key={index}>
                  {tagIconMapping[tag] || <FaUtensils />} {tag}
                </span>
              ))}
            </div>
            <div className="rating">
              <div className="stars">{renderStars(rating)}</div>
              <div className="num-reviews">({numReviews} reviews)</div>
            </div>
            <p>{description}</p>
            <p className="price">${price.toFixed(2)}</p>
          </div>
          <AddToCartButton
            onClick={handleAddToCartClick}
            aria-label={`Add ${name} to Order`}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Order"}
          </AddToCartButton>
        </MenuItemCard>

        {/* Customization Modal */}
        {isModalOpen && (
          <ModalOverlay
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCancelCustomization();
              }
            }}
            role="dialog"
            aria-modal="true"
          >
            <ModalContent>
              <CloseButton
                onClick={handleCancelCustomization}
                aria-label="Close Customization Modal"
              >
                &times;
              </CloseButton>
              <h2>Customize Your {name}</h2>
              {customizations &&
              Array.isArray(customizations) &&
              customizations.length > 0 ? (
                customizations.map((customization, index) => (
                  <div key={index} className="customization-options">
                    <h4>{customization.name}</h4>
                    {Array.isArray(customization.options) ? (
                      customization.options.map((option, idx) => (
                        <label key={idx}>
                          <input
                            type={
                              customization.removable ? "checkbox" : "radio"
                            }
                            name={customization.name}
                            value={option}
                            checked={
                              customization.removable
                                ? Array.isArray(
                                    selectedOptions[customization.name]
                                  ) &&
                                  selectedOptions[customization.name].includes(
                                    option
                                  )
                                : selectedOptions[customization.name] === option
                            }
                            onChange={() =>
                              customization.removable
                                ? handleCustomizationChange(
                                    customization.name,
                                    option
                                  )
                                : setSelectedOptions((prev) => ({
                                    ...prev,
                                    [customization.name]: option,
                                  }))
                            }
                            aria-label={
                              customization.removable
                                ? `Toggle ${option}`
                                : `Select ${option}`
                            }
                          />
                          {customization.removable
                            ? ` Remove ${option}`
                            : ` Add ${option}`}
                        </label>
                      ))
                    ) : (
                      <span>No options available</span>
                    )}
                  </div>
                ))
              ) : (
                <p>No customization options available for this item.</p>
              )}
              <div className="buttons">
                <CancelButton onClick={handleCancelCustomization}>
                  Cancel
                </CancelButton>
                <ConfirmButton
                  onClick={handleConfirmCustomization}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Confirm"}
                </ConfirmButton>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </>
    );
  }
);

export default MenuItem;
