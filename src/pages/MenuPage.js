// src/pages/MenuPage.js

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import menuData from "../utils/menuData";
import MenuItem from "../components/MenuItem";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import {
  FaGlassMartiniAlt,
  FaUtensils,
  FaCoffee,
  FaHamburger,
  FaLeaf,
  FaCookie,
  FaGlassCheers,
  FaTimes,
  FaFilter,
  FaSort,
  FaSearch,
  FaFire,
  FaWineBottle,
} from "react-icons/fa";

// Styled Components

const MenuContainer = styled.div`
  padding: 20px 15px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    text-align: center;
  }

  /* Navigation Tabs */
  .navigation-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .tab {
      padding: 10px 20px;
      margin: 0 5px;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-size: 1rem;
      color: #333;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.3s, border-bottom 0.3s;

      &.active {
        color: #4a90e2;
        border-bottom: 2px solid #4a90e2;
      }

      &:hover {
        color: #4a90e2;
      }
    }
  }

  /* Search and Sort Bar */
  .search-sort-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 20px;

    .search-bar {
      flex: 1;
      position: relative;

      input {
        width: 100%;
        padding: 10px 40px 10px 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 0.9rem;

        &:focus {
          outline: none;
          border-color: #4a90e2;
        }
      }

      svg {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
        font-size: 1rem;
      }
    }

    .sort-dropdown {
      position: relative;

      select {
        padding: 10px 40px 10px 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 0.9rem;
        appearance: none;
        background: transparent;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: #4a90e2;
        }
      }

      svg {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #aaa;
        font-size: 1rem;
      }
    }
  }

  /* Filter Bar */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow-x: auto;
    margin-bottom: 20px;

    .filter-category {
      position: relative;

      .category-button {
        padding: 8px 12px;
        border: 1px solid #4a90e2;
        border-radius: 20px;
        background-color: #fff;
        color: #4a90e2;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.85rem;

        &:hover {
          background-color: #4a90e2;
          color: #fff;
        }

        &.active {
          background-color: #4a90e2;
          color: #fff;
        }
      }

      .dropdown-content {
        display: ${({ activeCategory }) => (activeCategory ? "block" : "none")};
        position: absolute;
        top: 40px;
        left: 0;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;
        z-index: 100;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

        .tag-button {
          padding: 6px 10px;
          border: 1px solid #4a90e2;
          border-radius: 20px;
          background-color: #fff;
          color: #4a90e2;
          cursor: pointer;
          font-size: 0.85rem;
          margin: 5px;

          &:hover {
            background-color: #4a90e2;
            color: #fff;
          }
        }
      }
    }
  }

  /* Clear Filters Button */
  .clear-filters {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    button {
      padding: 6px 12px;
      border: 1px solid #ff4d4d;
      border-radius: 20px;
      background-color: #fff;
      color: #ff4d4d;
      cursor: pointer;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 5px;

      &:hover {
        background-color: #ff4d4d;
        color: #fff;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  /* Menu Items Grid */
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;

    @media (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  /* No Results Message */
  p.no-results {
    font-size: 1rem;
    color: #666;
    margin-top: 15px;
    text-align: center;
  }
`;

const MenuPage = () => {
  const categories = useMemo(
    () => [
      { name: "Food", icon: <FaUtensils /> },
      { name: "Drinks", icon: <FaGlassCheers /> },
      { name: "Desserts", icon: <FaCookie /> },
    ],
    []
  );

  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [activeFilterCategory, setActiveFilterCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Define filter categories and their respective tags
  const filterCategories = useMemo(() => {
    const categoriesMap = {};
    menuData.forEach((item) => {
      item.tags.forEach((tag) => {
        if (["Alcoholic", "Non-Alcoholic"].includes(tag)) {
          categoriesMap["Beverage Type"] =
            categoriesMap["Beverage Type"] || new Set();
          categoriesMap["Beverage Type"].add(tag);
        } else if (["Vegan", "Vegetarian", "Gluten-Free"].includes(tag)) {
          categoriesMap["Dietary"] = categoriesMap["Dietary"] || new Set();
          categoriesMap["Dietary"].add(tag);
        } else if (
          ["Breakfast", "Lunch", "Dinner", "Appetizer"].includes(tag)
        ) {
          categoriesMap["Meal Type"] = categoriesMap["Meal Type"] || new Set();
          categoriesMap["Meal Type"].add(tag);
        } else if (["Spicy", "Sweet"].includes(tag)) {
          categoriesMap["Flavor Profile"] =
            categoriesMap["Flavor Profile"] || new Set();
          categoriesMap["Flavor Profile"].add(tag);
        } else {
          categoriesMap["Miscellaneous"] =
            categoriesMap["Miscellaneous"] || new Set();
          categoriesMap["Miscellaneous"].add(tag);
        }
      });
    });

    // Convert sets to arrays and sort them
    const sortedCategories = {};
    Object.keys(categoriesMap).forEach((category) => {
      sortedCategories[category] = Array.from(categoriesMap[category]).sort();
    });

    return sortedCategories;
  }, []);

  // Handle category tab click
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTags([]);
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
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

  // Filter and sort menu items
  const filteredAndSortedMenu = useMemo(() => {
    let filtered = menuData.filter(
      (item) => item.category === selectedCategory
    );

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
  }, [selectedCategory, selectedTags, sortOption, searchQuery]);

  // Mapping filter categories to icons
  const filterCategoryIconMapping = {
    "Meal Type": <FaUtensils />,
    Dietary: <FaLeaf />,
    "Beverage Type": <FaGlassCheers />,
    "Flavor Profile": <FaFire />,
    Miscellaneous: <FaFilter />,
  };

  // Mapping tags to icons
  const tagIconMapping = {
    Vegan: <FaLeaf />,
    Vegetarian: <FaLeaf />,
    Spicy: <FaFire />,
    "Gluten-Free": <FaLeaf />,
    Alcoholic: <FaWineBottle />,
    "Non-Alcoholic": <FaGlassCheers />,
    Sweet: <FaCookie />,
    Breakfast: <FaCoffee />,
    Lunch: <FaHamburger />,
    Dinner: <FaUtensils />,
    Appetizer: <FaGlassMartiniAlt />,
    Miscellaneous: <FaFilter />,
  };

  return (
    <MenuContainer>
      <BackButton />
      <h1>Our Delicious Menu</h1>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`tab ${
              selectedCategory === category.name ? "active" : ""
            }`}
            onClick={() => handleCategorySelect(category.name)}
          >
            {category.icon} {category.name}
          </div>
        ))}
      </div>

      {/* Search and Sort Bar */}
      <div className="search-sort-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search Menu Items"
          />
          <FaSearch />
        </div>
        <div className="sort-dropdown">
          <select
            value={sortOption}
            onChange={handleSortChange}
            aria-label="Sort Menu Items"
          >
            <option value="popularity">Popularity</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
          <FaSort />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {Object.keys(filterCategories).map((filterCategory) => (
          <div
            key={filterCategory}
            className="filter-category"
            activeCategory={activeFilterCategory === filterCategory}
          >
            <button
              className={`category-button ${
                activeFilterCategory === filterCategory ? "active" : ""
              }`}
              onClick={() =>
                setActiveFilterCategory((prev) =>
                  prev === filterCategory ? null : filterCategory
                )
              }
              aria-expanded={activeFilterCategory === filterCategory}
              aria-label={`Filter by ${filterCategory}`}
            >
              {filterCategoryIconMapping[filterCategory] || <FaFilter />}
              {filterCategory}
            </button>
            {activeFilterCategory === filterCategory && (
              <div className="dropdown-content">
                {filterCategories[filterCategory].map((tag) => (
                  <button
                    key={tag}
                    className="tag-button"
                    onClick={() => toggleTag(tag)}
                    selected={selectedTags.includes(tag)}
                    aria-pressed={selectedTags.includes(tag)}
                    aria-label={`Filter by ${tag}`}
                  >
                    {tagIconMapping[tag] || <FaFilter />} {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear Filters Button */}
      {(selectedTags.length > 0 || searchQuery.trim() !== "") && (
        <div className="clear-filters">
          <button onClick={clearFilters} aria-label="Clear All Filters">
            <FaTimes /> Clear Filters
          </button>
        </div>
      )}

      {/* Display Menu Items */}
      {filteredAndSortedMenu.length === 0 ? (
        <p className="no-results">No menu items match the selected filters.</p>
      ) : (
        <div className="menu-grid">
          {filteredAndSortedMenu.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </MenuContainer>
  );
};

export default MenuPage;
