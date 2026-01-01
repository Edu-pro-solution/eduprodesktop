import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaHome,
  FaNewspaper,
  FaStickyNote,
  FaTrash
} from "react-icons/fa";
import AddUser from "./AddUser";
import "./admin.css";
import { useNavigate } from "react-router-dom";

const ResultHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">23</span>
          </div>
        </div>

        <nav>
          <button className="active" onClick={() => navigate("/dashboard")}><FaHome /> Home</button>
          <button><FaStickyNote /> Notes</button>
          <button><FaNewspaper /> News</button>
          <button><FaCog /> Settings</button>
        </nav>

        <AddUser open={showModal} onClose={() => setShowModal(false)} />
      </aside>

      {/* MAIN */}
      <main className="bodys">
        <header className="headers result-header">
          <h1>Result History</h1>
          <button className="delete-btn"><FaTrash /></button>
        </header>

        <div className="result-layout">

          {/* LEFT LIST */}
          <aside className="result-list">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="result-item active">
                <div className="result-icon">📋</div>
                <div>
                  <p className="result-score">Scored 79%</p>
                  <span>14 Aug, 2020 at 3:34pm</span>
                </div>
              </div>
            ))}
          </aside>

          {/* RIGHT DETAILS */}
          <section className="result-details">
            <div className="date-card">
              <h2>3 August, 2020</h2>
              <p>3:45 pm</p>
            </div>

            <div className="score-section">
              <div className="score-circle">280/400</div>
              <div>
                <p className="good-job">Good job, Boluwatife.</p>
                <h3>You scored 78%!</h3>
              </div>
            </div>

            <div className="stats">
              <div>
                <p>Average Time Per Question</p>
                <span>1 minute 4 seconds</span>
              </div>
              <div>
                <p>Total Time Used</p>
                <span>23 minutes 45 seconds</span>
              </div>
              <div>
                <p>Subjects Taken</p>
                <span>English, Mathematics, Chemistry, Physics</span>
              </div>
            </div>

            <hr />

            <div className="topics">
              <h3>Topics Review</h3>

              <div className="topic-card">
                <p><strong>English Language</strong></p>
                <span>2 Topic(s)</span>
              </div>

              <div className="topic-progress">
                Fundamentally paramount human
                <span>2/5</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ResultHistory;
