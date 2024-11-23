// src/pages/AboutPage.js
import React from "react";
import styled from "styled-components";
import jd from "../assets/johndoe.webp";
import js from "../assets/janesmith.webp";
import mj from "../assets/mikejohnson.webp";
import BackButton from "../components/BackButton"; // Import BackButton

const AboutContainer = styled.div`
  padding: 40px 20px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 2.5rem;
    color: #333;
  }

  p {
    max-width: 800px;
    margin: 0 auto 30px;
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  .team {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    .team-member {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 10px;
      width: 250px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 15px;
      }

      h3 {
        margin-bottom: 10px;
        color: #4a90e2;
      }

      p {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }

  @media (max-width: 768px) {
    .team {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <BackButton /> {/* Integrate BackButton here */}
      <h1>About Us</h1>
      <p>
        At Skip The Server, we believe in providing an exceptional dining
        experience without the wait. Our mission is to deliver delicious,
        chef-crafted dishes made with the freshest ingredients, all available at
        your fingertips. Whether you're craving a hearty meal, a sweet dessert,
        or a refreshing drink, we've got you covered.
      </p>
      <div className="team">
        <div className="team-member">
          <img src={jd} alt="Team Member 1" loading="lazy" />
          <h3>John Doe</h3>
          <p>Head Chef</p>
        </div>
        <div className="team-member">
          <img src={js} alt="Team Member 2" loading="lazy" />
          <h3>Jane Smith</h3>
          <p>Restaurant Manager</p>
        </div>
        <div className="team-member">
          <img src={mj} alt="Team Member 3" loading="lazy" />
          <h3>Mike Johnson</h3>
          <p>Lead Server</p>
        </div>
        {/* Add more team members as needed */}
      </div>
    </AboutContainer>
  );
};

export default AboutPage;
