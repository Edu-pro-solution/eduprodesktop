
import { useState } from "react";

import {
    FaBell,
    FaCog,
    FaHome,
    FaNewspaper,
    FaStickyNote
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAuth from "../hooks/useAuth";
import AddUser from "./AddUser";
import "./admin.css";
import { useSidebar } from "./SidebarProvider";
import { useNavigate } from "react-router-dom";
const Study = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [points, setPoints] = useState([]);
  const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
  const [showModal, setShowModal] = useState(false);
const [openTerm, setOpenTerm] = useState(null);

const toggleTerm = (term) => {
  setOpenTerm(openTerm === term ? null : term);
};
  const navigate = useNavigate();

 return (
  <div className="dashboard">
    {/* SIDEBAR — 20% */}
    <aside className="sidebar">
      <div className="profile">
        <div className="avatar" />
        <div className="bell">
          <FaBell />
          <span className="badge">23</span>
        </div>
      </div>

      <nav>
        <button className="active"  onClick={() => navigate("/dashboard")}>
          <FaHome /> Home
        </button>
        <button>
          <FaStickyNote /> Notes
        </button>
        <button>
          <FaNewspaper /> News
        </button>
        <button>
          <FaCog /> Settings
        </button>
      </nav>


<AddUser
  open={showModal}
  onClose={() => setShowModal(false)}
/>

    </aside>

 <main className="bodys">
  <header className="headers">
    <div>
      <h1>Study Materials</h1>
    </div>
  </header>

  <div className="study-intro">
    <div className="study-icon">📘</div>

    <p className="study-text">
      Take tests from a very robust repository of contents, with preferred
      settings and filters.
    </p>
  </div>

  <div className="term-list">
    {/* FIRST TERM */}
    <div className="term-card">
      <div
        className="term-header"
        onClick={() => toggleTerm("first")}
      >
        <h4>First Term</h4>
        <span className={`arrow ${openTerm === "first" ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {openTerm === "first" && (
        <div className="term-content">
          <p>
            Covers introductory topics and foundational concepts for the
            academic session.
          </p>
        </div>
      )}
    </div>

    {/* SECOND TERM */}
    <div className="term-card">
      <div
        className="term-header"
        onClick={() => toggleTerm("second")}
      >
        <h4>Second Term</h4>
        <span className={`arrow ${openTerm === "second" ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {openTerm === "second" && (
        <div className="term-content">
          <p>
            Builds on first-term knowledge with deeper applications and
            assessments.
          </p>
        </div>
      )}
    </div>

    {/* THIRD TERM */}
    <div className="term-card">
      <div
        className="term-header"
        onClick={() => toggleTerm("third")}
      >
        <h4>Third Term</h4>
        <span className={`arrow ${openTerm === "third" ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {openTerm === "third" && (
        <div className="term-content">
          <p>
            Focuses on revision, advanced topics, and final examinations.
          </p>
        </div>
      )}
    </div>
  </div>
</main>

    
  </div>
);

};

export default Study;
