
// import { useState } from "react";

// import {
//     FaBell,
//     FaCog,
//     FaHome,
//     FaNewspaper,
//     FaStickyNote
// } from "react-icons/fa";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import useAuth from "../hooks/useAuth";
// import AddUser from "./AddUser";
// import "./admin.css";
// import { useSidebar } from "./SidebarProvider";
// const PracticeExam = () => {
//   const { user } = useAuth(); // Access the authenticated user
//   const [points, setPoints] = useState([]);
//   const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
//   const [showModal, setShowModal] = useState(false);
// const [openTerm, setOpenTerm] = useState(null);
// const [practiceMode, setPracticeMode] = useState("topic");
// const [hours, setHours] = useState(1);
// const [minutes, setMinutes] = useState(0);

// const toggleTerm = (term) => {
//   setOpenTerm(openTerm === term ? null : term);
// };
//   const [selected, setSelected] = useState("");

//   const handleClick = (type) => {
//     setSelected(type);
//     console.log("Selected practice type:", type);
//   };

//  return (
//   <div className="dashboard">
//     {/* SIDEBAR — 20% */}
//     <aside className="sidebar">
//       <div className="profile">
//         <div className="avatar" />
//         <div className="bell">
//           <FaBell />
//           <span className="badge">23</span>
//         </div>
//       </div>

//       <nav>
//         <button className="active">
//           <FaHome /> Home
//         </button>
//         <button>
//           <FaStickyNote /> Notes
//         </button>
//         <button>
//           <FaNewspaper /> News
//         </button>
//         <button>
//           <FaCog /> Settings
//         </button>
//       </nav>


// <AddUser
//   open={showModal}
//   onClose={() => setShowModal(false)}
// />

//     </aside>
// <main className="bodys">
//   <header className="headers">
//     <div>
//       <h1>Practice Exam</h1>
//     </div>
//   </header>

//   {/* FLEX CONTAINER */}
//   <div className="practice-layout">

//     {/* LEFT — 60% */}
// {/* LEFT — 60% */}
// <section className="practice-left">
//   <div className="study-intro">
//     <div className="study-icon">📘</div>

//     <p className="study-text">
//       Take tests from a very robust repository of contents, with preferred
//       settings and filters.
//     </p>
//   </div>

//   {/* PRACTICE MODE */}
//   <div className="practice-mode">
//     <h4>Select Practice Mode</h4>

//     <div className="mode-options">
//       <button
//         className={practiceMode === "topic" ? "active" : ""}
//         onClick={() => setPracticeMode("topic")}
//       >
//         Practice by Topic
//       </button>

//       <button
//         className={practiceMode === "year" ? "active" : ""}
//         onClick={() => setPracticeMode("year")}
//       >
//         Practice by Year
//       </button>

//       <button
//         className={practiceMode === "mixed" ? "active" : ""}
//         onClick={() => setPracticeMode("mixed")}
//       >
//         Mixed Practice
//       </button>
//     </div>
//   </div>

//   {/* TIMER SETUP */}
//   <div className="timer-setup">
//     <h4>Set Exam Duration</h4>

//     <div className="timer-box">
//       {/* HOURS */}
//       <div className="time-unit">
//         <button onClick={() => setHours((h) => Math.min(h + 1, 5))}>▲</button>
//         <span>{String(hours).padStart(2, "0")}</span>
//         <button onClick={() => setHours((h) => Math.max(h - 1, 0))}>▼</button>
//         <small>Hours</small>
//       </div>

//       <span className="colon">:</span>

//       {/* MINUTES */}
//       <div className="time-unit">
//         <button
//           onClick={() =>
//             setMinutes((m) => (m + 5) % 60)
//           }
//         >
//           ▲
//         </button>
//         <span>{String(minutes).padStart(2, "0")}</span>
//         <button
//           onClick={() =>
//             setMinutes((m) => (m - 5 + 60) % 60)
//           }
//         >
//           ▼
//         </button>
//         <small>Minutes</small>
//       </div>
//     </div>
//   </div>
// </section>


//     {/* RIGHT — 20% */}
//     <aside className="practice-right">
//       <div className="practice-filter">
//         <h4> Select Practice Type</h4>
// <div>

//      <h5> Select Exam Type</h5>
//     <select>
       
//           <option value="">Objectives</option>
//           <option value="topic">Theory</option>
//           <option value="year">Fill in the gap</option>
//           <option value="mixed">Blank</option>
//         </select>
// </div>
    
//  <div>
//       <p>
//         1. Select subjects, number of questions and topics of your choice to properly revise areas in a particular subject.
//       </p>

//       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//         <button
//           onClick={() => handleClick("Practice by Topic")}
//           className={selected === "Practice by Topic" ? "active-btn" : ""}
//         >
//           Practice by Topic
//         </button>
//         <button
//           onClick={() => handleClick("Theory")}
//           className={selected === "Theory" ? "active-btn" : ""}
//         >
//           Theory
//         </button>
//         <button
//           onClick={() => handleClick("Fill in the gap")}
//           className={selected === "Fill in the gap" ? "active-btn" : ""}
//         >
//           Fill in the gap
//         </button>
//         <button
//           onClick={() => handleClick("Blank")}
//           className={selected === "Blank" ? "active-btn" : ""}
//         >
//           Blank
//         </button>
//       </div>


// <p>2. Select subjects, number and year of previous questions of your choice. </p>
//     <select>
       
//           <option value="">Practice by Topic</option>
//           <option value="topic">Theory</option>
//           <option value="year">Fill in the gap</option>
//           <option value="mixed">Blank</option>
//         </select>
// </div>
    
//       </div>
//     </aside>

//   </div>
// </main>


    
//   </div>
// );

// };

// export default PracticeExam;
import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaHome,
  FaNewspaper,
  FaStickyNote,
  FaPlus
} from "react-icons/fa";
import "./admin.css";
import { useNavigate } from "react-router-dom";

const PracticeExam = () => {
  const [withTimer, setWithTimer] = useState(false);
  const [hours, setHours] = useState(30);
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">23</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="active"  onClick={() => navigate("/dashboard")}><FaHome /> Home</button>
          <button><FaStickyNote /> Notes</button>
          <button><FaNewspaper /> News</button>
          <button><FaCog /> Settings</button>
        </nav>

        <button className="add-user">
          <FaPlus /> Add User
          <small>4 users added</small>
        </button>
      </aside>

      {/* MAIN BODY */}
      <main className="body">
        <h1 className="page-title">Practice Exam</h1>

        <div className="practice-layout">
          {/* LEFT */}
          <section className="practice-left">
            <div className="intro-box">
              <div className="intro-icon">📄✏️</div>
              <p>
                Take tests from a very robust repository of contents,
                with preferred settings and filters.
              </p>
            </div>

            <div className="timer-section">
              <h4>Set practice mode</h4>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={withTimer}
                  onChange={() => setWithTimer(!withTimer)}
                />
                With Timer
              </label>

              {withTimer && (
                <div className="timer-box">
                  <div className="time-group">
                    <label>Hours</label>
                    <div className="time-control">
                      <button onClick={() => setHours(h => h + 1)}>▲</button>
                      <span>{hours}</span>
                      <button onClick={() => setHours(h => Math.max(h - 1, 0))}>▼</button>
                    </div>
                  </div>

                  <span className="colon">:</span>

                  <div className="time-group">
                    <label>Minutes</label>
                    <div className="time-control">
                      <button onClick={() => setMinutes(m => (m + 1) % 60)}>▲</button>
                      <span>{minutes.toString().padStart(2, "0")}</span>
                      <button onClick={() => setMinutes(m => (m - 1 + 60) % 60)}>▼</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT */}
          <aside className="practice-right">
            <h4>💡 Select practice type</h4>

            <label className="select-label">Select exam type</label>
            <select className="select-box">
              <option>Objectives</option>
            </select>

            <p className="desc">
              1. Select subjects, number of questions and topics of your choice
              to properly revise areas in a particular subject.
            </p>

        <button
      className="primary-btn"
      onClick={() => navigate("/topic")}
    >
      Practice by Subject
    </button>

            <p className="desc">
              2. Select subjects, number and year of previous questions of your choice.
            </p>

            <button className="primary-btn outline">Practice by Year</button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PracticeExam;
