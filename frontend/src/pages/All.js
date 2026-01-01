import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import TopNav from "./TopNav";

import axios from "axios";

const All = () => {
  const [subjects, setSubjects] = useState([]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [examMode, setExamMode] = useState("Practice");
  const [examTime, setExamTime] = useState(selectedSubjects.length * 30); // Default 30 mins per subject
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  console.log(filteredData);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/get-jamb-subject"
        );
        setSubjects(response.data); // Update state with fetched subjects
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else if (selectedSubjects.length < 4) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  // Fetch subjects from backend

  // Update Exam Time when subjects change
  useEffect(() => {
    setExamTime(selectedSubjects.length * 30);
  }, [selectedSubjects]);

  // const handleSubjectChange = (subject) => {
  //   if (selectedSubjects.includes(subject)) {
  //     setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
  //   } else if (selectedSubjects.length < 4) {
  //     setSelectedSubjects([...selectedSubjects, subject]);
  //   }
  // };

  const handleCreateExam = async () => {
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }

    const examData = {
      subjects: selectedSubjects,
      mode: examMode,
      time: examTime,
      shuffleQuestions,
      shuffleOptions,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/exams",
        examData
      );
      if (response.status === 201) {
        alert("Exam created successfully!");
        navigate("/start-exam", { state: { examId: response.data.examId } });
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Failed to create exam. Please try again.");
    }
  };
  const uniqueSubjects = Array.from(
    new Set(subjects.map((subject) => subject.subject))
  ).map((subject) => subjects.find((s) => s.subject === subject));
  console.log("filteredData:", filteredData);
  console.log("Subjects:", subjects);
  console.log("Selected Subjects:", selectedSubjects);

  // useEffect(() => {
  //   if (selectedSubject) {
  //     const filtered = subjects.filter(
  //       (item) => item.subject === selectedSubject
  //     );
  //     setFilteredData(filtered);
  //   } else {
  //     setFilteredData([]);
  //   }
  // }, [selectedSubject, subjects]);
  // const toggleDropdown = (subject) => {
  //   setExpandedSubject(expandedSubject === subject ? null : subject);
  // };

  // const toggleDropdown = (subject) => {
  //   if (expandedSubject === subject) {
  //     setExpandedSubject(null);
  //     setFilteredData([]);
  //   } else {
  //     setExpandedSubject(subject);
  //     const filtered = subjects.filter((item) => item.subject === subject);
  //     setFilteredData(filtered);
  //   }
  // };

  // console.log(filteredData);

  const toggleDropdown = (subjectName) => {
    if (expandedSubject === subjectName) {
      setExpandedSubject(null);
      setFilteredData([]); // Reset when collapsing
    } else {
      setExpandedSubject(subjectName);
      const filtered = subjects.filter(
        (item) =>
          item.subject.trim().toLowerCase() === subjectName.trim().toLowerCase()
      );
      console.log("Filtered Subjects:", filtered);
      setFilteredData(filtered.length > 0 ? filtered : []);
    }
  };

  return (
    <>
      <TopNav />
      <div className="main-wrapper">
        <div className="page-wrapper" style={{ width: "80%", margin: "auto" }}>
          <div className="content" style={{ marginBottom: "100px" }}>
            <h6
              className="sasup-hero-title-4"
              style={{
                color: "#0366D6",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Select the subjects you want to practice (Max: 4)
            </h6>
            <br />
            <div
              className="row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {uniqueSubjects.map((subject) => (
                <div
                  key={subject.subject}
                  className="col-md-2 col-sm-4"
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    id={`subject-${subject.subject}`} // Fixed template literal syntax
                    value={subject.subject}
                    checked={selectedSubjects.includes(subject.subject)}
                    onChange={() => handleSubjectChange(subject.subject)} // Pass only the subject string
                    disabled={
                      !selectedSubjects.includes(subject.subject) &&
                      selectedSubjects.length >= 4
                    }
                    style={{ marginRight: "8px", cursor: "pointer" }}
                  />
                  <label
                    htmlFor={`subject-${subject.subject}`} // Fixed template literal syntax
                    style={{ fontSize: "16px", cursor: "pointer" }}
                  >
                    {subject.subject} {/* Ensure this is a string */}
                  </label>
                </div>
              ))}
            </div>

            <br />
            {/* Three-column layout */}
            <div className="row">
              {/* Column 1: Selected Subjects List */}
              <div className="col-md-4">
                <h5 style={{ textAlign: "center" }}>Selected Subjects</h5>
                {selectedSubjects.length === 0 ? (
                  <p style={{ textAlign: "center", color: "gray" }}>
                    No subject selected
                  </p>
                ) : (
                  <ul className="list-group">
                    {selectedSubjects.map((subject, index) => {
                      const subjectData = subjects.find(
                        (s) => s.subject === subject
                      );
                      return (
                        <li
                          key={index}
                          className="list-group-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleDropdown(subject)}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {subject}
                            <span>
                              {expandedSubject === subject ? "🔽" : "▶️"}
                            </span>
                          </div>

                          {expandedSubject === subject &&
                            filteredData.length > 0 && (
                              <div className="mt-2 p-2 border rounded">
                                <label className="fw-bold">Exam Year:</label>
                                <select className="form-control">
                                  <option value="">-- Select Year --</option>
                                  {filteredData.map((item) => (
                                    <option
                                      key={item._id}
                                      value={item.examYear}
                                    >
                                      {item.examYear}
                                    </option>
                                  ))}
                                </select>

                                <label className="fw-bold mt-2">
                                  Number of Questions:
                                </label>
                                <select className="form-control">
                                  <option value="">-- Select Number --</option>
                                  {filteredData.map((item) => (
                                    <option
                                      key={item._id}
                                      value={item.numQuestions}
                                    >
                                      {item.numQuestions}
                                    </option>
                                  ))}
                                </select>

                                <label className="fw-bold mt-2">
                                  Topic of Interest:
                                </label>
                                <select className="form-control">
                                  <option value="">-- Select Topic --</option>
                                  {filteredData.map((item) => (
                                    <option key={item._id} value={item.topic}>
                                      {item.topic}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Column 2: Student Profile Section */}
              {/* Column 2: Student Profile Section */}
              <div className="col-md-4 text-center">
                {/* Profile Avatar */}
                <div style={{ marginBottom: "20px" }}>
                  <i
                    className="fas fa-user-circle"
                    style={{ fontSize: "200px", color: "#aaa" }}
                  ></i>
                </div>

                {/* Editable Student Name */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontWeight: "bold", display: "block" }}>
                    Student Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // value={studentName}
                    // onChange={(e) => setStudentName(e.target.value)}
                    style={{ textAlign: "center", width: "100%" }}
                  />
                </div>

                {/* Full-Width Start Exam Button */}
                <button
                  className="btn btn-success"
                  style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  <a href="/start-exam">Start Exam</a>
                </button>
              </div>
              {/* Column 3: Exam Settings */}
              <div className="col-md-4">
                <h5 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Exam Settings
                </h5>

                {/* Select Exam Mode */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontWeight: "bold" }}>Select Mode:</label>
                  <select
                    className="form-control"
                    value={examMode}
                    onChange={(e) => setExamMode(e.target.value)}
                  >
                    <option value="Practice">Practice</option>
                    <option value="Test">Test</option>
                    <option value="Corrections">Corrections</option>
                  </select>
                </div>

                {/* Time Selection (Default 30 mins per subject) */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontWeight: "bold" }}>
                    Total Exam Time (minutes):
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={examTime}
                    onChange={(e) => setExamTime(Number(e.target.value))}
                    style={{ textAlign: "center", width: "100%" }}
                  />
                </div>

                {/* Shuffle Options */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontWeight: "bold", display: "block" }}>
                    Shuffle Options:
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="shuffleQuestions"
                      checked={shuffleQuestions}
                      onChange={() => setShuffleQuestions(!shuffleQuestions)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="shuffleQuestions"
                    >
                      Shuffle Questions
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="shuffleOptions"
                      checked={shuffleOptions}
                      onChange={() => setShuffleOptions(!shuffleOptions)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="shuffleOptions"
                    >
                      Shuffle Options
                    </label>
                  </div>
                </div>
                <label className="form-check-label" htmlFor="shuffleQuestions">
                  Instructions
                </label>
                {/* Instruction Button */}
                <button
                  className="btn btn-info"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "5px",
                  }}
                  onClick={() => navigate("/instructions")}
                >
                  Click to View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default All;
