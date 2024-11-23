// src/components/ErrorBoundary.js

import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  padding: 40px 20px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: #ff4d4d;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h1>Something Went Wrong.</h1>
          <p>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
