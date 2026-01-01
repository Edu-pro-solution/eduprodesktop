// import { useState } from "react";
// import {
//   FaBell,
//   FaCog,
//   FaHome,
//   FaNewspaper,
//   FaStickyNote,
//   FaTrash,
//   FaChevronDown,
//   FaChevronUp,
// } from "react-icons/fa";
// import AddUser from "./AddUser";
// import "./admin.css";
// import { useLocation } from "react-router-dom";

// const PerHistory = () => {
//   const location = useLocation();
//   const { questions, answers } = location.state || {};

//   const [collapsedSubjects, setCollapsedSubjects] = useState({});

//   if (!questions || !answers) {
//     return <div>No performance data available.</div>;
//   }

//   // Group questions by subject/topic
//   const subjects = {};
// //   questions.forEach((q, i) => {
// //     if (!subjects[q.Topic]) subjects[q.Topic] = [];
// //     subjects[q.Topic].push({ ...q, index: i });
// //   });
// questions.forEach((q) => {
//   const userAnswer = answers[q.key];
//   const correctAnswer = q.Answer?.replace(/<[^>]*>/g, "").trim();

//   if (userAnswer && userAnswer === correctAnswer) {
//     correctAnswers++;
//   }
// });
//   // Calculate total score: 2 marks per question
//   let correctAnswers = 0;
//   Object.values(subjects).forEach((qs) => {
//     qs.forEach((q) => {
//     //   const userAnswer = answers[q.index];
//     const userAnswer = answers[`${q.subject}-${q.localIndex}`];

//       const correctAnswer = q.Answer?.replace(/<[^>]+>/g, "");
//       if (userAnswer === correctAnswer) correctAnswers++;
//     });
//   });

//   const totalQuestions = questions.length;
//   const totalMarks = totalQuestions * 2;
//   const scoredMarks = correctAnswers * 2;
//   const scorePercent = Math.round((scoredMarks / totalMarks) * 100);

//   const toggleCollapse = (subject) => {
//     setCollapsedSubjects((prev) => ({
//       ...prev,
//       [subject]: !prev[subject],
//     }));
//   };

//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="profile">
//           <div className="avatar" />
//           <div className="bell">
//             <FaBell />
//             <span className="badge">23</span>
//           </div>
//         </div>

//         <nav>
//           <button className="active">
//             <FaHome /> Home
//           </button>
//           <button>
//             <FaStickyNote /> Notes
//           </button>
//           <button>
//             <FaNewspaper /> News
//           </button>
//           <button>
//             <FaCog /> Settings
//           </button>
//         </nav>

//         <AddUser open={false} onClose={() => {}} />
//       </aside>

//       {/* Main */}
//       <main className="bodys">
//         <header className="headers result-header">
//           <h1>Performance Report</h1>
//         </header>

//         <div className="result-layout">
//           <section className="result-details">
//             {/* Score Summary */}
//             <div className="score-section">
//               <div className="score-circle">{scoredMarks}/{totalMarks}</div>
//               <div>
//                 <p className="good-job">Good job!</p>
//                 <h3>You scored {scorePercent}%</h3>
//                 <p>
//                   Correct: {correctAnswers} | Wrong: {totalQuestions - correctAnswers}
//                 </p>
//               </div>
//             </div>

//             <hr />

//             {/* Subjects / Topics Review */}
//             <div className="topics">
//               <h3>Subjects Review</h3>

//               {Object.keys(subjects).map((subject) => {
//                 const isCollapsed = collapsedSubjects[subject];
//                 return (
//                   <div key={subject} className="subject-card">
//                     <div
//                       className="subject-header"
//                       onClick={() => toggleCollapse(subject)}
//                       style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
//                     >
//                       <strong>{subject}</strong>
//                       {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
//                     </div>

//                     {!isCollapsed &&
//                       subjects[subject].map((q) => {
//                         // const userAnswer = answers[q.index];
//                         const userAnswer = answers[`${q.subject}-${q.localIndex}`];

//                         const correctAnswer = q.Answer?.replace(/<[^>]+>/g, "");
//                         const isCorrect = userAnswer === correctAnswer;
//                         return (
//                           <div
//                             key={q.index}
//                             className={`topic-card ${isCorrect ? "correct" : "wrong"}`}
//                             style={{ marginLeft: "15px", marginBottom: "10px", padding: "5px", border: "1px solid #ccc" }}
//                           >
//                             <p
//                               dangerouslySetInnerHTML={{ __html: q.Question }}
//                             />
//                             <p>
//                               Your Answer: {userAnswer || "Not answered"} | Correct: {correctAnswer}
//                             </p>
//                           </div>
//                         );
//                       })}
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PerHistory;
import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaHome,
  FaNewspaper,
  FaStickyNote,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AddUser from "./AddUser";
import "./admin.css";
import { useLocation, useNavigate } from "react-router-dom";

const PerHistory = () => {
  const location = useLocation();
 const navigate = useNavigate();
  // ✅ SAFELY destructure FIRST
  const {
    questions = [],
    answers = {},
  } = location.state || {};

  const [collapsedSubjects, setCollapsedSubjects] = useState({});

  if (!questions.length) {
    return <div>No performance data available.</div>;
  }

  // ✅ GROUP QUESTIONS BY SUBJECT
  const subjects = {};
  questions.forEach((q) => {
    if (!subjects[q.subject]) subjects[q.subject] = [];
    subjects[q.subject].push(q);
  });

  // ✅ CALCULATE SCORE (DECLARE FIRST!)
  let correctAnswers = 0;

  questions.forEach((q) => {
    const userAnswer = answers[`${q.subject}-${q.localIndex}`];
    const correctAnswer = q.Answer
      ?.replace(/<[^>]*>/g, "")
      .trim();

    if (userAnswer && userAnswer === correctAnswer) {
      correctAnswers++;
    }
  });

  const totalQuestions = questions.length;
  const totalMarks = totalQuestions * 2;
  const scoredMarks = correctAnswers * 2;
  const scorePercent = Math.round((scoredMarks / totalMarks) * 100);

  const toggleCollapse = (subject) => {
    setCollapsedSubjects((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };
 
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">23</span>
          </div>
        </div>

        <nav>
          <button className="active"  onClick={() => navigate("/dashboard")} >
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

        <AddUser open={false} onClose={() => {}} />
      </aside>

      {/* Main */}
      <main className="bodys">
        <header className="headers result-header">
          <h1>Performance Report</h1>
        </header>

        <div className="result-layout">
          <section className="result-details">
            {/* SCORE SUMMARY */}
            <div className="score-section">
              <div className="score-circle">
                {scoredMarks}/{totalMarks}
              </div>
              <div>
                <p className="good-job">Good job!</p>
                <h3>You scored {scorePercent}%</h3>
                <p>
                  Correct: {correctAnswers} | Wrong:{" "}
                  {totalQuestions - correctAnswers}
                </p>
              </div>
            </div>

            <hr />

            {/* SUBJECT REVIEW */}
            <div className="topics">
              <h3>Subjects Review</h3>

              {Object.keys(subjects).map((subject) => {
                const isCollapsed = collapsedSubjects[subject];

                return (
                  <div key={subject} className="subject-card">
                    <div
                      className="subject-header"
                      onClick={() => toggleCollapse(subject)}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong>{subject}</strong>
                      {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                    </div>

                    {!isCollapsed &&
                      subjects[subject].map((q, index) => {
                        const userAnswer =
                          answers[`${q.subject}-${q.localIndex}`];
                        const correctAnswer = q.Answer
                          ?.replace(/<[^>]*>/g, "")
                          .trim();

                        const isCorrect =
                          userAnswer && userAnswer === correctAnswer;

                        return (
                          <div
                            key={index}
                            className={`topic-card ${
                              isCorrect ? "correct" : "wrong"
                            }`}
                            style={{
                              marginLeft: "15px",
                              marginBottom: "10px",
                              padding: "5px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: q.Question,
                              }}
                            />
                            <p>
                              Your Answer:{" "}
                              {userAnswer || "Not answered"} | Correct:{" "}
                              {correctAnswer}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PerHistory;
