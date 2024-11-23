// src/components/Footer.js

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background: #333;
  color: #f5f5f5;
  font-size: 0.8rem;

  a {
    color: #4a90e2;
    text-decoration: none;
  }

  a:hover {
    color: #f5f5f5;
  }

  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 1.5vw, 0.8rem);
    padding: 15px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        © 2024 Skip The Server. Crafted with ❤️ by{" "}
        <a
          href="https://yourteamwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Your Team
        </a>
        .
      </p>
    </FooterContainer>
  );
};

export default Footer;
