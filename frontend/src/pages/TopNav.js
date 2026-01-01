import React, { useState } from "react";
import {
  FiUser,
  FiBell,
  FiSettings,
  FiHome,
  FiSearch,
  FiLightbulb,
  FiEdit,
  FiClock,
  FiFlag,
} from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import "./TopNav.css";
import { BsLightbulb } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import lg from "./edu.PNG";
import { FaClipboardList } from "react-icons/fa";
import {
  AiOutlineHistory,
  AiOutlineStar,
  AiOutlineTrophy,
  AiOutlineMessage,
  AiOutlineBook,
  AiOutlineRobot,
} from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { MdLibraryBooks } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import "./TopNav.css";
import { FiHelpCircle } from "react-icons/fi";
const TopNav = () => {
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

      <div className="top-nav desktop-only shadowss">
        <div className="header">
          <div className="header-left">
            <a
              className="logo"
              href="/vision"
              style={{ fontWeight: "800", color: "black", fontSize: "25px" }}
            >
              <img src={lg} style={{ width: "150px", height: "40px" }} />
            </a>
          </div>
          <ul className="nav user-menu">
            <li className="nav-item">
              <a href="/brain-dump">
                <AiOutlineHistory /> Result History
              </a>
            </li>
            <li className="nav-item">
              <a href="/brain-dump">
                <AiOutlineStar /> Bookmarks
              </a>
            </li>
            <li className="nav-item">
              <a href="/brain-dump">
                <AiOutlineTrophy /> Leader Board
              </a>
            </li>
            <li className="nav-item">
              <a href="/brain-dump">
                <AiOutlineMessage /> Feedback
              </a>
            </li>
            <li className="nav-item">
              <p>
                <a href="/brain-dump">
                  <GiNotebook /> Science Note
                </a>
              </p>
            </li>
            <li className="nav-item">
              <a href="/refinement">
                <AiOutlineRobot /> AI Tutor
              </a>
            </li>
            <li className="nav-item">
              <a href="/sprint">
                <MdLibraryBooks /> Jamb Syllabus
              </a>
            </li>
            <li className="nav-item">
              <a href="/retrospect">
                <MdLibraryBooks /> Waec Syllabus
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                style={{ fontSize: "30px" }}
              >
                <FiBell />
                <span className="badge">2</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a href="/settings" className="dropdown-toggle">
                <FiSettings />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle"
                onClick={toggleDesktopMenu}
              >
                <FiUser />
              </a>
              <div
                className={`dropdown-menu ${desktopMenuOpen ? "show" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <a className="dropdown-item" href="/profile">
                  My Profile
                </a>
                <a className="dropdown-item" href="/settings">
                  Settings
                </a>
                <a className="dropdown-item" href="/login">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Top Navigation (Logo + Profile Icon Only) */}
      <div className="top-nav mobile-only" style={{ textDecoration: "none" }}>
        <a className="logo" href="/" style={{ textDecoration: "none" }}>
          <img src={lg} style={{ width: "150px", height: "40px" }} />
        </a>

        <div className="nav-icons">
          {/* Notification Icon */}
          <li className="nav-item dropdown">
            <a href="#" className="dropdown-toggle">
              <FiBell />
              <span className="badge">2</span>
            </a>
          </li>
          <a
            href="javascript:void(0);"
            className="dropdown-toggle"
            onClick={toggleMobileMenu}
          >
            <FiUser />
          </a>

          {/* Settings Icon */}
        </div>

        {/* Profile Dropdown Menu */}
        <div
          className={`dropdown-menu ${mobileMenuOpen ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <a className="dropdown-item" href="/profile">
            My Profile
          </a>
          <a className="dropdown-item" href="/settings">
            Settings
          </a>
          <a className="dropdown-item" href="/login">
            Logout
          </a>
        </div>
      </div>

      {/* Bottom Navigation (Visible on Mobile Only) */}
      <div className="bottom-nav mobile-only">
        <ul className="nav">
          <li className="nav-item">
            <a href="/vision">
              <FiHome />

              <span>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/brain-dump">
              <FaClipboardList />

              <span>Idea</span>
            </a>
          </li>

          <li className="nav-item">
            <a href="/refinement">
              <FaQuestionCircle />

              <span>Ask Me</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/retrospect">
              <AiOutlineBarChart />
              <span>Statistics</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/sprint">
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

export default TopNav;
