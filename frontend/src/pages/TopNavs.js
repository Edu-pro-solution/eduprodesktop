import React, { useState } from "react";
import {
  FiBell,
  FiSettings,
  FiSearch,
  FiLightbulb,
  FiEdit,
  FiClock,
  FiFlag,
} from "react-icons/fi";
import "./TopNavs.css";
import { BsLightbulb } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { FiHome, FiUser } from "react-icons/fi";
import { BsBook } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

import { FiHelpCircle } from "react-icons/fi";
const TopNavs = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDesktopMenu = () => {
    setDesktopMenuOpen(!desktopMenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      {/* Desktop Top Navigation (Full Menu) */}
      <div className="top-nav desktop-only shadowss"></div>

      {/* Mobile Top Navigation (Logo + Profile Icon Only) */}

      {/* Bottom Navigation (Visible on Mobile Only) */}
      <div className="bottom-nav mobile-only">
        <ul className="nav">
          <li className="nav-item">
            <a href="/home">
              <FiHome />
              <span>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/subjects">
              <BsBook />
              <span>All Subjects</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/results">
              <MdOutlineLeaderboard />
              <span>Results</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/profile">
              <FiUser />
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
    </div>
  );
};

export default TopNavs;
