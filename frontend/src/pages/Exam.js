// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import CameraFeed from "./CameraFeed";

// const Exam = () => {
//   const { id } = useParams(); // Get the id parameter from the route
//   console.log(id);
//   const [exam, setExam] = useState(null);
//   const [answers, setAnswers] = useState({});

//   const [totalMark, setTotalMark] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [showQuestions, setShowQuestions] = useState(false);
//   const [score, setScore] = useState(null);
//   const [correctAnswers, setCorrectAnswers] = useState({});

//   const [remainingTime, setRemainingTime] = useState(0); // Initialize with 0 instead of null
//   const [timerInterval, setTimerInterval] = useState(null);

//   const [examFinished, setExamFinished] = useState(false);
//   const { currentSession } = useContext(SessionContext);
//   console.log("Session ID:", currentSession._id);
//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   const navigate = useNavigate();

//   const enterFullscreen = () => {
//     const element = document.documentElement;

//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if (element.webkitRequestFullscreen) {
//       // For Safari
//       element.webkitRequestFullscreen();
//     } else if (element.msRequestFullscreen) {
//       // For IE11
//       element.msRequestFullscreen();
//     }
//   };
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape" && !examFinished && remainingTime > 0) {
//         console.log("Escape key pressed. Fullscreen mode will not exit.");
//         event.preventDefault();
//       }
//     };

//     if (showQuestions) {
//       document.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.removeEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [showQuestions, examFinished, remainingTime]);
//   const handleKeyDown = (event) => {
//     console.log("Key pressed:", event.key);
//     console.log("Exam finished:", examFinished);
//     console.log("Remaining time:", remainingTime);

//     if (event.key === "Escape" && !examFinished && remainingTime > 0) {
//       console.log("Escape key pressed. Fullscreen mode will not exit.");
//       event.preventDefault();
//     }
//   };

//   const handleOptionChange = (questionId, option) => {
//     setAnswers({ ...answers, [questionId]: option });
//   };

//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // ... (previous code)

//   const handleOpenDialog = () => {
//     setIsDialogOpen(true);
//   };

//   // const handleCloseDialog = () => {
//   //   setIsDialogOpen(false);
//   // };
//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     // Navigate back to /student/dashboard/manage-online-exam
//     navigate("/student/dashboard/jamb-past-questions");
//   };

//   const handleLogout = () => {
//     // Perform logout action here
//     // For example, clear localStorage and navigate to login page
//     localStorage.clear();
//     navigate("/student/dashboard/jamb-past-questions");
//   };
//   const startTimer = () => {
//     if (!exam || !exam.fromTime || !exam.toTime) {
//       console.error("Exam details are not available.");
//       return;
//     }

//     const defaultDate = new Date(); // Get today's date
//     const examStartTimeStr = `${defaultDate.toDateString()} ${exam.fromTime}`;
//     const examEndTimeStr = `${defaultDate.toDateString()} ${exam.toTime}`;

//     // Convert exam.fromTime to the correct format
//     const examStartTime = new Date(
//       examStartTimeStr.replace(/-/g, "/").replace("T", " ").replace("Z", "")
//     );
//     // Convert exam.toTime to the correct format
//     const examEndTime = new Date(
//       examEndTimeStr.replace(/-/g, "/").replace("T", " ").replace("Z", "")
//     );

//     console.log("Exam start time:", examStartTime);
//     console.log("Exam end time:", examEndTime);

//     let examDuration = 0;

//     const currentTime = new Date();

//     if (currentTime < examStartTime) {
//       examDuration = (examEndTime - examStartTime) / 1000; // Convert milliseconds to seconds
//     } else if (currentTime > examEndTime) {
//       examDuration = 0; // Exam has ended
//     } else {
//       examDuration = (examEndTime - currentTime) / 1000; // Convert milliseconds to seconds
//     }

//     console.log("Exam duration:", examDuration); // Debugging output

//     // Handle unexpected values for examDuration
//     if (isNaN(examDuration) || examDuration < 0) {
//       console.error("Invalid exam duration:", examDuration);
//       return;
//     }

//     setRemainingTime(Math.floor(examDuration));

//     const interval = setInterval(() => {
//       setRemainingTime((prevTime) => {
//         if (prevTime <= 0) {
//           clearInterval(interval);
//           handleLogout(); // Logout when time is up
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     setTimerInterval(interval);
//   };

//   useEffect(() => {
//     startTimer();
//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [exam]);
//   // Event listeners to prevent navigation, context menu, and keyboard shortcuts

//   const getLoggedInUserId = () => {
//     const jwtToken = localStorage.getItem("jwtToken");

//     if (jwtToken) {
//       const decodedToken = jwtDecode(jwtToken);
//       return decodedToken.user._id;
//     }
//     return null;
//   };

//   const fetchExamAndQuestions = async () => {
//     try {
//       const examResponse = await axios.get(
//         `${apiUrl}/api/jamb-exam/${id}/${currentSession._id}`
//       );
//       setExam(examResponse.data);
//       // Set the exam object before calling startTimer
//       console.log("Exam details:", examResponse.data);

//       const token = localStorage.getItem("jwtToken");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const questionsResponse = await axios.get(
//         `${apiUrl}/api/jamb-questions/${id}`,
//         { headers }
//       );
//       const questionsData = questionsResponse.data;
//       console.log("Fetched questions:", questionsData);

//       const correctAnswersData = {};

//       questionsData.forEach((question) => {
//         if (question.questionType === "true_false") {
//           correctAnswersData[question._id] =
//             question.correctAnswer.toLowerCase(); // Convert to lowercase
//         } else if (question.questionType === "theory") {
//           // Handle theory questions
//           // For theory questions, correctAnswer might not be available
//           // You can set it to an empty string or handle it differently based on your requirements
//           correctAnswersData[question._id] = "";
//         } else {
//           correctAnswersData[question._id] =
//             question.options
//               .find((option) => option.isCorrect)
//               ?.option.toLowerCase() || "";
//         }
//       });
//       console.log("Correct Answers Data:", correctAnswersData);
//       setCorrectAnswers(correctAnswersData);

//       setQuestions(questionsData);

//       const calculatedTotalMark = questionsData.reduce(
//         (total, question) => total + parseInt(question.mark),
//         0
//       );
//       setTotalMark(calculatedTotalMark);
//       startTimer();
//     } catch (error) {
//       console.error("Error fetching exam or questions:", error);
//     }
//   };

//   // useEffect(() => {
//   //   fetchExamAndQuestions();
//   // }, [id]);

//   useEffect(() => {
//     fetchExamAndQuestions();
//     return () => {
//       clearInterval(timerInterval); // Clear the timer interval on component unmount
//     };
//   }, [id]);

//   const calculateScore = () => {
//     try {
//       const calculatedScore = questions.reduce((totalScore, question) => {
//         const questionId = question._id;
//         const studentAnswer = answers[questionId] || "";
//         const correctAnswer = correctAnswers[questionId] || "";
//         let questionScore = 0;

//         if (question.questionType === "fill_in_the_blanks") {
//           // If it's a Fill In The Blanks question
//           const possibleAnswers = new Set(
//             question.possibleAnswers
//               .flatMap((answers) => answers.toLowerCase().split(","))
//               .map((answer) => answer.trim())
//           );

//           // Normalize student's answer
//           const normalizedStudentAnswer = studentAnswer.toLowerCase().trim();

//           // Check if the student's answer matches any of the possible answers
//           if (possibleAnswers.has(normalizedStudentAnswer)) {
//             questionScore = question.mark;
//           }
//         } else if (question.questionType === "theory") {
//           // if (studentAnswer.trim() !== "") {
//           //   questionScore = question.mark;
//           // }

//           questionScore = 0;
//         } else {
//           // For other question types (True/False, Multiple Choice)
//           if (
//             studentAnswer.toLowerCase().trim() ===
//             correctAnswer.toLowerCase().trim()
//           ) {
//             questionScore = question.mark;
//           }
//         }

//         return totalScore + questionScore;
//       }, 0);

//       setScore(calculatedScore);
//       handleSubmitExam(calculatedScore);
//     } catch (error) {
//       console.error("Error calculating score:", error);
//       // Handle any errors
//     }
//   };

//   const handleSubmitExam = async (calculatedScore) => {
//     try {
//       console.log("Score before submitting:", calculatedScore); // Log the score before submitting

//       const trimmedExamId = id.trim();
//       const userId = getLoggedInUserId();

//       const token = localStorage.getItem("jwtToken");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const data = {
//         examId: trimmedExamId,
//         answers: answers,
//         userId: userId,
//         score: calculatedScore,
//       };

//       console.log("Data before submitting:", data); // Log the data before submitting
//       console.log("Session ID:", currentSession._id);
//       const response = await axios.post(
//         `${apiUrl}/api/jamb-exams/submit/${currentSession._id}`,
//         data,
//         {
//           headers,
//         }
//       );

//       if (response.status === 200) {
//         setExamFinished(true);
//         // You can navigate to the dashboard or show a success message here
//         // navigate("/student/dashboard/manage-online-exam");
//       } else {
//         console.error("Failed to submit the exam");
//         // Handle the error or show an error message to the user.
//       }
//     } catch (error) {
//       console.error("An error occurred while submitting the exam:", error);
//       // Handle errors, e.g., network issues or other errors
//     }
//   };

//   return (
//     <div>

//       <Typography
//         variant="h6"
//         style={{
//           backgroundColor: "#f0f0f0",
//           padding: "8px",
//           borderRadius: "4px",
//           fontSize: "2rem",
//           color: "#ff0000",
//         }}
//       >
//         Time Remaining: {formatTime(remainingTime)}
//       </Typography>

//       <Button
//         onClick={() => {
//           setShowQuestions(true);
//           enterFullscreen();
//         }}
//       >
//         Start Exam
//       </Button>
//       {showQuestions && (
//         <div>
//           <Grid container spacing={2}>
//             {questions.map((question, index) => (
//               <Grid item xs={12} key={question._id}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">{`Question ${index + 1}: ${
//                       question.questionTitle
//                     }`}</Typography>
//                     {question.options && question.options.length > 0 && (
//                       <div>
//                         <RadioGroup
//                           name={`question_${question._id}`}
//                           value={answers[question._id] || ""}
//                           onChange={(e) =>
//                             handleOptionChange(question._id, e.target.value)
//                           }
//                         >
//                           {question.options.map((option, optionIndex) => (
//                             <FormControlLabel
//                               key={optionIndex}
//                               value={option.option}
//                               control={<Radio />}
//                               label={option.option}
//                             />
//                           ))}
//                         </RadioGroup>
//                       </div>
//                     )}

//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Button variant="contained" color="primary" onClick={calculateScore}>
//             Submit Exam
//           </Button>
//         </div>
//       )}

//       <Dialog open={examFinished} onClose={handleCloseDialog}>
//         <DialogTitle>Exam Completed</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             You have successfully completed the exam. Your score is
//           </Typography>
//           <Typography variant="h6" color="primary">
//             {score} out of {totalMark}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };
// const formatTime = (timeInSeconds) => {
//   const hours = Math.floor(timeInSeconds / 3600);
//   const minutes = Math.floor((timeInSeconds % 3600) / 60);
//   const seconds = timeInSeconds % 60;
//   return `${hours}h ${minutes}m ${seconds}s`;
// };

// export default Exam;

// import React, { useState, useEffect } from "react";

// const Exam = ({ selectedSubjects, totalTime }) => {
//   const questionsData = {
//     Math: [
//       {
//         _id: "q1",
//         questionTitle: "What is 2 + 2?",
//         options: [
//           { option: "3" },
//           { option: "4" },
//           { option: "5" },
//           { option: "6" },
//         ],
//       },
//       {
//         _id: "q2",
//         questionTitle: "What is 10 / 2?",
//         options: [
//           { option: "2" },
//           { option: "5" },
//           { option: "10" },
//           { option: "20" },
//         ],
//       },
//     ],
//     English: [
//       {
//         _id: "q3",
//         questionTitle: "Choose the correct sentence:",
//         options: [
//           { option: "She go to school." },
//           { option: "She goes to school." },
//           { option: "She going to school." },
//           { option: "She went go to school." },
//         ],
//       },
//       {
//         _id: "q4",
//         questionTitle: "What is the past tense of 'run'?",
//         options: [
//           { option: "running" },
//           { option: "ran" },
//           { option: "runned" },
//           { option: "runs" },
//         ],
//       },
//     ],
//   };

//   const [currentSubject, setCurrentSubject] = useState(selectedSubjects[0]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [remainingTime, setRemainingTime] = useState(totalTime * 60);
//   const [examFinished, setExamFinished] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     setCurrentQuestionIndex(0);
//   }, [currentSubject]);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   const handleOptionChange = (questionId, selectedOption) => {
//     setAnswers({ ...answers, [questionId]: selectedOption });
//   };

//   const submitExam = () => {
//     setExamFinished(true);
//   };

//   const questions = questionsData[currentSubject] || [];

//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3 className="text-danger">
//           Time Remaining: {formatTime(remainingTime)}
//         </h3>
//         <button className="btn btn-primary" onClick={submitExam}>
//           Submit Exam
//         </button>
//       </div>

//       <ul className="nav nav-tabs mb-3">
//         {selectedSubjects.map((subject) => (
//           <li className="nav-item" key={subject}>
//             <button
//               className={`nav-link ${
//                 subject === currentSubject ? "active" : ""
//               }`}
//               onClick={() => setCurrentSubject(subject)}
//             >
//               {subject}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {questions.length > 0 && (
//         <div className="card p-3">
//           <h5>
//             Question {currentQuestionIndex + 1}:{" "}
//             {questions[currentQuestionIndex].questionTitle}
//           </h5>
//           <div>
//             {questions[currentQuestionIndex].options.map((option, index) => (
//               <div className="form-check" key={index}>
//                 <input
//                   type="radio"
//                   className="form-check-input"
//                   name={`question_${questions[currentQuestionIndex]._id}`}
//                   value={option.option}
//                   checked={
//                     answers[questions[currentQuestionIndex]._id] ===
//                     option.option
//                   }
//                   onChange={(e) =>
//                     handleOptionChange(
//                       questions[currentQuestionIndex]._id,
//                       e.target.value
//                     )
//                   }
//                 />
//                 <label className="form-check-label">{option.option}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="d-flex justify-content-center mt-3">
//         {questions.map((_, index) => (
//           <button
//             key={index}
//             className={`btn ${
//               index === currentQuestionIndex
//                 ? "btn-primary"
//                 : "btn-outline-primary"
//             } mx-1`}
//             onClick={() => setCurrentQuestionIndex(index)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>

//       <div className="d-flex justify-content-between mt-3">
//         <button
//           className="btn btn-secondary"
//           onClick={prevQuestion}
//           disabled={currentQuestionIndex === 0}
//         >
//           Previous
//         </button>
//         <button
//           className="btn btn-secondary"
//           onClick={nextQuestion}
//           disabled={currentQuestionIndex === questions.length - 1}
//         >
//           Next
//         </button>
//       </div>

//       {examFinished && (
//         <div className="modal d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Exam Completed</h5>
//               </div>
//               <div className="modal-body">
//                 <p>You have successfully completed the exam.</p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setExamFinished(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Exam;

import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import { useLocation } from "react-router-dom";
import "./exam.css";
import ExamResultModal from "./ExamResultModal";
const Exam = ({ totalTime }) => {
  const location = useLocation();
  const defaultSubjects = [
    "Mathematics",
    "English Language",
    "Literature",
    "Biology",
  ];

  // Use subjects from location.state if available, otherwise default subjects
  const subjects = location.state?.subjects?.length
    ? location.state.subjects
    : defaultSubjects;

  const [activeTab, setActiveTab] = useState(subjects[0] || "");
  const [remainingTime, setRemainingTime] = useState(totalTime * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Store selected answers
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const questions = {
    Mathematics: [
      {
        question: "What is 5 + 3?",
        options: { a: "6", b: "7", c: "8", d: "9" },
        correct: "c",
      },
      {
        question: "Solve: 10 - 4 = ?",
        options: { a: "5", b: "6", c: "7", d: "8" },
        correct: "b",
      },
      {
        question: "What is 6 × 7?",
        options: { a: "42", b: "36", c: "48", d: "49" },
        correct: "a",
      },
      {
        question: "Solve: 81 ÷ 9 = ?",
        options: { a: "8", b: "9", c: "10", d: "11" },
        correct: "b",
      },
      {
        question: "What is the square of 12?",
        options: { a: "124", b: "142", c: "144", d: "122" },
        correct: "c",
      },
    ],
    "English Language": [
      {
        question: "Which of these is a noun?",
        options: { a: "Run", b: "Happy", c: "Dog", d: "Quickly" },
        correct: "c",
      },
      {
        question: "Choose the correct spelling.",
        options: { a: "Receive", b: "Recieve", c: "Receeve", d: "Reccieve" },
        correct: "a",
      },
      {
        question: "What is the opposite of 'cold'?",
        options: { a: "Hot", b: "Warm", c: "Cool", d: "Freezing" },
        correct: "a",
      },
      {
        question: "Which sentence is grammatically correct?",
        options: {
          a: "She don't like apples.",
          b: "She doesn't likes apples.",
          c: "She doesn't like apples.",
          d: "She not like apples.",
        },
        correct: "c",
      },
      {
        question: "What is a synonym for 'happy'?",
        options: { a: "Sad", b: "Joyful", c: "Angry", d: "Tired" },
        correct: "b",
      },
    ],
    Literature: [
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: {
          a: "William Shakespeare",
          b: "Charles Dickens",
          c: "Mark Twain",
          d: "Jane Austen",
        },
        correct: "a",
      },
      {
        question: "What is the main theme of 'Animal Farm'?",
        options: {
          a: "Love",
          b: "Revolution",
          c: "Friendship",
          d: "Wealth",
        },
        correct: "b",
      },
      {
        question: "Who is the author of 'Pride and Prejudice'?",
        options: {
          a: "Emily Brontë",
          b: "Jane Austen",
          c: "Charlotte Brontë",
          d: "Virginia Woolf",
        },
        correct: "b",
      },
      {
        question: "Which novel features the character 'Jay Gatsby'?",
        options: {
          a: "Moby Dick",
          b: "The Great Gatsby",
          c: "1984",
          d: "To Kill a Mockingbird",
        },
        correct: "b",
      },
      {
        question: "Who wrote 'Things Fall Apart'?",
        options: {
          a: "Wole Soyinka",
          b: "Chinua Achebe",
          c: "Ngugi wa Thiong'o",
          d: "Toni Morrison",
        },
        correct: "b",
      },
    ],
  };

  const handleAnswerSelection = (option) => {
    setAnswers({
      ...answers,
      [`${activeTab}-${currentQuestionIndex}`]: option,
    });
  };

  const currentQuestions = questions[activeTab] || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const optionLabels = ["A", "B", "C", "D"]; // Define option labels
  const submitExam = () => {
    setShowModal(true);
  };

  const confirmSubmit = () => {
    setShowModal(false);
    setShowResultModal(true); // Show result modal
  };
  return (
    <>
      <TopNav />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3 time-submit-container">
          <h3 className="text-danger">
            Time Remaining: {formatTime(remainingTime)}
          </h3>
          <button className="btn btn-primary" onClick={submitExam}>
            Submit Exam
          </button>
        </div>
      </div>

      <div
        className="container "
        style={{ marginTop: "40px", marginBottom: "100px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="exam-container p-4">
            {/* Tab Navigation */}
            <ul className="nav nav-tabs">
              {subjects.map((subject, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className={`nav-link ${
                      activeTab === subject ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab(subject);
                      setCurrentQuestionIndex(0);
                    }}
                    style={{
                      backgroundColor:
                        activeTab === subject ? "#007bff" : "transparent",
                      color: activeTab === subject ? "white" : "black",
                      fontWeight: activeTab === subject ? "bold" : "normal",
                    }}
                  >
                    {subject}
                  </button>
                </li>
              ))}
            </ul>

            {/* Progress Tracker */}
            <div className=" my-3">
              <button className="btn btn-info">
                Question {currentQuestionIndex + 1} / {currentQuestions.length}
              </button>
            </div>

            {/* Display One Question */}
            <div className="question-box p-4 rounded shadow">
              <p className="fs-5 fw-bold">{currentQuestion?.question}</p>
              <div>
                {Object.entries(currentQuestion?.options || {}).map(
                  ([key, value], index) => (
                    <div key={key} className="option-box">
                      <span className="fw-bold me-2">
                        {optionLabels[index]}.
                      </span>
                      <input
                        type="radio"
                        id={`${activeTab}-${currentQuestionIndex}-${key}`}
                        name={`question-${currentQuestionIndex}`}
                        value={key}
                        checked={
                          answers[`${activeTab}-${currentQuestionIndex}`] ===
                          key
                        }
                        onChange={() => handleAnswerSelection(key)}
                        className="form-check-input custom-radio"
                      />
                      <label
                        htmlFor={`${activeTab}-${currentQuestionIndex}-${key}`}
                        className="ms-2"
                      >
                        {value}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Previous and Next Buttons - Now Closer */}
            <div className="d-flex  gap-2 mt-4">
              <button
                className="btn btn-secondary"
                disabled={currentQuestionIndex === 0}
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
              >
                Previous
              </button>

              <button
                className="btn btn-secondary"
                disabled={currentQuestionIndex === currentQuestions.length - 1}
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
              >
                Next
              </button>
            </div>

            <div className=" my-3">
              <button className="btn btn-info">
                Attempted{" "}
                {
                  Object.keys(answers).filter((key) =>
                    key.startsWith(activeTab)
                  ).length
                }{" "}
                / {currentQuestions.length}
              </button>
            </div>

            {/* Pagination */}
            <div className=" mt-4">
              {currentQuestions.map((_, index) => (
                <button
                  key={index}
                  className={`btn btn-lg btn-sm mx-1 ${
                    currentQuestionIndex === index
                      ? "btn-primary"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submission Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Are you sure you want to submit this exam?</h4>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={confirmSubmit}>
                Yes, Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Exam Result Modal */}
      {showResultModal && (
        <ExamResultModal
          score={85}
          totalScore={100}
          breakdown={[
            {
              subject: "Math",
              visited: 10,
              attempted: 8,
              score: 7,
              aggregate: 90,
            },
            {
              subject: "Science",
              visited: 12,
              attempted: 10,
              score: 8,
              aggregate: 85,
            },
            {
              subject: "English",
              visited: 15,
              attempted: 12,
              score: 10,
              aggregate: 92,
            },
          ]}
          onClose={() => setShowResultModal(false)}
        />
      )}
    </>
  );
};

export default Exam;
