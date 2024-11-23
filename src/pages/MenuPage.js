// src/pages/MenuPage.js

import React, { useState, useMemo, useContext } from "react";
import styled from "styled-components";
import menuData from "../utils/menuData";
import MenuItem from "../components/MenuItem";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton"; // Import BackButton
import {
  FaGlassMartiniAlt, // for Appetizer
  FaUtensils, // for Meal Type
  FaCoffee, // for Breakfast
  FaHamburger, // for Lunch
  FaLeaf, // for Dietary
  FaCookie, // for Sweet
  FaGlassCheers, // for Non-Alcoholic
  FaTimes,
  FaFilter,
  FaSort,
  FaSearch,
  FaFire,
  FaWineBottle,
} from "react-icons/fa";

// Styled Components

const MenuContainer = styled.div`
  padding: 40px 20px;
  text-align: center;

  h1 {
    margin-bottom: 30px;
    font-size: 2.5rem;
    color: #333;
  }

  .filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
    width: 100%;

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }

    .filter-sections {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;

      @media (min-width: 992px) {
        flex-direction: row;
        gap: 30px;
      }

      .filter-category {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center align on all screen sizes */
        gap: 10px;
        width: 100%;

        /* Removed media query to keep alignment centered on all screen sizes
        @media (min-width: 992px) {
          align-items: flex-start;
          width: auto;
        }
        */

        .filter-title {
          display: flex;
          align-items: center;
          justify-content: center; /* Center the content horizontally */
          gap: 5px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px; /* Increased margin for better spacing */
          text-align: center;
          /* Removed width: 100% to prevent stretching */

          svg {
            color: #4a90e2;
          }
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center; /* Center justify on all screen sizes */

          /* Removed media query to keep tags centered on all screen sizes
          @media (min-width: 992px) {
            justify-content: flex-start;
          }
          */
        }
      }
    }

    .sort-search {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      width: 100%;
      font-weight: bold;

      @media (min-width: 992px) {
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 30px;
        width: auto;
      }

      .sort {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-shrink: 0;
        font-weight: bold;

        label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 1rem;
          color: #333;
          white-space: nowrap;
        }

        .sort-select {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #fff;
          cursor: pointer;
          transition: border-color 0.3s ease;
          font-size: 0.9rem;
          display: flex;
          align-items: center;

          &:hover {
            border-color: #4a90e2;
          }

          &:focus {
            outline: none;
            border-color: #4a90e2;
          }

          svg {
            margin-left: 5px;
          }
        }
      }

      .search {
        display: flex;
        align-items: center;
        gap: 10px;

        label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 1rem;
          font-weight: bold;
          color: #333;
        }

        .search-container {
          position: relative;
          width: 200px;

          input {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 100%;
            transition: border-color 0.3s ease;
            font-size: 0.9rem;
            padding-left: 30px; /* Added padding for search icon */

            &:focus {
              outline: none;
              border-color: #4a90e2;
            }
          }

          svg {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            color: #aaa;
          }
        }
      }
    }

    .clear-filters-container {
      display: flex;
      justify-content: center;
      width: 100%;

      @media (min-width: 992px) {
        justify-content: flex-start;
        width: auto;
      }
    }
  }

  .category {
    margin: 30px 0;

    h2 {
      font-size: 1.8rem;
      color: #4a90e2;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
      justify-content: center; /* Center the category header */

      svg {
        color: #4a90e2;
      }
    }

    hr {
      border: 1px solid #ddd;
      margin-bottom: 20px;
    }
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0 10px;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: 992px) and (max-width: 1199px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 768px) and (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 767px) {
      display: flex;
      flex-direction: column; /* Stack items vertically */
      align-items: center; /* Center items horizontally */
      gap: 20px; /* Add spacing between items */
    }
  }

  p.no-results {
    font-size: 1.2rem;
    color: #666;
    margin-top: 20px;
  }
`;

// Styled component for individual tag buttons
const TagButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #4a90e2;
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? "#4a90e2" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#4a90e2")};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.9rem;
  box-sizing: border-box;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#357ab8" : "#4a90e2")};
    color: #fff;
  }

  &:focus {
    outline: 2px solid rgba(74, 144, 226, 0.5);
    outline-offset: 0px;
  }
`;

// Styled component for the "Clear Filters" button
const ClearFiltersButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ff4d4d;
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? "#ff4d4d" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#ff4d4d")};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#cc0000" : "#ff4d4d")};
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid rgba(255, 77, 77, 0.5);
    outline-offset: 0px;
  }
`;

const MenuPage = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");

  const { addItem, removeItem } = useContext(CartContext);

  // Define filter categories and their respective tags
  const filterCategories = useMemo(() => {
    const categories = {};

    menuData.forEach((item) => {
      item.tags.forEach((tag) => {
        // Determine the group/category of each tag
        if (["Alcoholic", "Non-Alcoholic"].includes(tag)) {
          categories["Beverage Type"] =
            categories["Beverage Type"] || new Set();
          categories["Beverage Type"].add(tag);
        } else if (["Vegan", "Vegetarian", "Gluten-Free"].includes(tag)) {
          categories["Dietary"] = categories["Dietary"] || new Set();
          categories["Dietary"].add(tag);
        } else if (
          ["Breakfast", "Lunch", "Dinner", "Appetizer"].includes(tag)
        ) {
          categories["Meal Type"] = categories["Meal Type"] || new Set();
          categories["Meal Type"].add(tag);
        } else if (["Spicy", "Sweet"].includes(tag)) {
          categories["Flavor Profile"] =
            categories["Flavor Profile"] || new Set();
          categories["Flavor Profile"].add(tag);
        } else {
          categories["Miscellaneous"] =
            categories["Miscellaneous"] || new Set();
          categories["Miscellaneous"].add(tag);
        }
      });
    });

    // Convert sets to arrays and sort them
    const sortedCategories = {};
    Object.keys(categories).forEach((category) => {
      sortedCategories[category] = Array.from(categories[category]).sort();
    });

    return sortedCategories;
  }, []);

  // Handle tag button click
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle clearing all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
    toast.info("All filters have been cleared.", {
      position: "bottom-right",
      autoClose: 1500,
      closeButton: true,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: false,
      icon: <FaTimes />,
    });
  };

  // Filter and sort menu items based on selected tags, sort option, and search query
  const filteredAndSortedMenu = useMemo(() => {
    let filtered = menuData;

    // Tag Filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }

    // Search Filtering
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "priceLowHigh") return a.price - b.price;
      if (sortOption === "priceHighLow") return b.price - a.price;
      if (sortOption === "popularity") return b.popularity - a.popularity;
      return 0;
    });

    return sorted;
  }, [selectedTags, sortOption, searchQuery]);

  // Group menu items by category for display
  const groupedMenu = useMemo(() => {
    return filteredAndSortedMenu.reduce((groups, item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
      return groups;
    }, {});
  }, [filteredAndSortedMenu]);

  // Mapping filter categories to icons
  const filterCategoryIconMapping = {
    "Meal Type": <FaUtensils />,
    Dietary: <FaLeaf />,
    "Beverage Type": <FaGlassCheers />,
    "Flavor Profile": <FaFire />,
    Miscellaneous: <FaFilter />,
  };

  return (
    <MenuContainer>
      <BackButton /> {/* Integrate BackButton here */}
      <h1>Our Delicious Menu</h1>
      <div className="filters">
        {/* Tag Filters */}
        <div className="filter-sections">
          {Object.keys(filterCategories).map((filterCategory) => (
            <div className="filter-category" key={filterCategory}>
              <div className="filter-title">
                {filterCategoryIconMapping[filterCategory] || <FaFilter />}
                {filterCategory}
              </div>

              <div className="tags">
                {filterCategories[filterCategory].map((tag) => (
                  <TagButton
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    selected={selectedTags.includes(tag)}
                    aria-pressed={selectedTags.includes(tag)}
                    aria-label={`Filter by ${tag}`}
                  >
                    {tagIconMapping[tag] || <FaFilter />} {tag}
                  </TagButton>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clear Filters Button */}
        {selectedTags.length > 0 && (
          <div className="clear-filters-container">
            <ClearFiltersButton
              onClick={clearFilters}
              disabled={selectedTags.length === 0}
              aria-label="Clear All Filters"
            >
              <FaTimes /> Clear Filters
            </ClearFiltersButton>
          </div>
        )}

        {/* Sort and Search */}
        <div className="sort-search">
          {/* Sort Dropdown */}
          <div className="sort">
            <label htmlFor="sort-select">
              <FaSort /> Sort By:
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              aria-label="Sort Menu Items"
            >
              <option value="popularity">Popularity</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="search">
            <label htmlFor="search-input">
              <FaSearch /> Search:
            </label>
            <div className="search-container">
              <input
                id="search-input"
                type="text"
                placeholder="Search for menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Menu Items"
              />
              <FaSearch />
            </div>
          </div>
        </div>
      </div>
      {Object.keys(groupedMenu).length === 0 ? (
        <p className="no-results">No menu items match the selected filters.</p>
      ) : (
        Object.keys(groupedMenu).map((category) => (
          <div className="category" key={category}>
            <h2>
              {category} <FaUtensils />
            </h2>
            <hr />
            <div className="menu-grid">
              {groupedMenu[category].map((item) => (
                <MenuItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))
      )}
    </MenuContainer>
  );
};

// Mapping tags to icons for filter categories
const tagIconMapping = {
  Vegan: <FaLeaf />,
  Vegetarian: <FaLeaf />,
  Spicy: <FaFire />,
  "Gluten-Free": <FaLeaf />, // aligned with the previous mapping
  Alcoholic: <FaWineBottle />,
  "Non-Alcoholic": <FaGlassCheers />, // aligned with the previous mapping
  Sweet: <FaCookie />, // aligned with the previous mapping
  Breakfast: <FaCoffee />, // aligned with the previous mapping
  Lunch: <FaHamburger />, // aligned with the previous mapping
  Dinner: <FaUtensils />,
  Appetizer: <FaGlassMartiniAlt />, // aligned with the previous mapping
  Miscellaneous: <FaFilter />,
};

export default MenuPage;
