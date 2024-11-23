import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.png";
import { CartContext } from "../contexts/CartContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderContainer = styled.header`
  background-color: #333;
  color: #f5f5f5;
  padding: 4px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 4px 15px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const Navigation = styled.nav`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 20px;

    /* Default styles for larger screens */
    li a,
    li button {
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      color: #f5f5f5;
      border: 2px solid #4a90e2;
      border-radius: 20px;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0 15px; /* Adjusted padding for better fit */
      height: 45px;
      min-width: 120px; /* Added consistent button width for larger screens */

      &:hover {
        background-color: #4a90e2;
        color: #333;
        transform: translateY(-3px);
      }

      &:focus {
        outline: none;
      }
    }

    /* Responsive styles for smaller screens */
    @media (max-width: 768px) {
      flex-direction: column;
      background-color: #333;
      position: absolute;
      top: 70px;
      right: 20px;
      width: 200px; /* Adjusted width for dropdown menu */
      max-height: ${({ isOpen }) =>
        isOpen ? "500px" : "0"}; /* Allow enough space for items */
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      z-index: 99;
      padding: ${({ isOpen }) =>
        isOpen ? "10px" : "0"}; /* Add padding only when open */
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      border-radius: 8px;

      li a,
      li button {
        width: 100%; /* Full-width buttons for mobile */
        margin: 5px auto; /* Center buttons */
      }
    }
  }
`;

const IconButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1.2rem;
    color: #f5f5f5;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #4a90e2;
    }

    .cart-count {
      position: absolute;
      top: -8px;
      right: -12px;
      background-color: #ff4d4d;
      color: #fff;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 0.7rem;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    position: relative;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #f5f5f5;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
    margin-right: 10px; /* Aligns button neatly */
  }
`;

const Header = () => {
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleTrackOrder = () => {
    navigate("/order-status");
  };

  const handleRequestServices = () => {
    navigate("/request-services");
  };

  return (
    <HeaderContainer>
      <Logo to="/">
        <img src={logo} alt="Restaurant Logo" loading="lazy" />
        <h1>Skip The Server</h1>
      </Logo>
      <MobileMenuButton onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      <Navigation isOpen={menuOpen}>
        <ul>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <button onClick={handleTrackOrder}>Track Order</button>
          </li>
          <li>
            <button
              className="request-services"
              onClick={handleRequestServices}
            >
              Services
            </button>
          </li>
        </ul>
      </Navigation>
      <IconButtons>
        <Link to="/checkout" aria-label="Proceed to Checkout">
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </IconButtons>
    </HeaderContainer>
  );
};

export default Header;
