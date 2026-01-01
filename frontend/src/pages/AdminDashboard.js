import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavs from "./TopNavs";
import "./TopNavs.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "./useAuth";
import moment from "moment";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import "./admin.css";
import useFetch from "./useFetch";

const AdminDashboard = () => {
  const { user } = useAuth(); // Access the authenticated user

  const [refinements, setRefinements] = useState([]);
  const [ideaId, setIdeaId] = useState(null);
  const [description, setDescription] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalss, setShowModalss] = useState(false);
  const [refineId, setRefineId] = useState(null);

  // Pagination State
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, loading, fetchedData, error, reFetch } =
    useFetch(`/jamb-exams`);
  // const [data, setData] = useState([]);
  const [anchorElMap, setAnchorElMap] = useState({});

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL.trim();

  // const { data, loading, error, reFetch } = useFetch("/get-exam");

  const handleManageQuestions = (examId) => {
    console.log(examId); // Add a log to check if examId is correct
    navigate(`/student/dashboard/jamb-past-questions/${examId}`);
  };

  const handleOpenMenu = async (event, item) => {
    try {
      // Get user's local time
      const userLocalTime = new Date();

      // Convert exam start time to Date object
      const startTime = new Date(item.date);
      const fromTime24Hours = convertTo24HourFormat(item.fromTime);
      const fromTimeParts = fromTime24Hours.split(":");
      startTime.setHours(parseInt(fromTimeParts[0], 10));
      startTime.setMinutes(parseInt(fromTimeParts[1], 10));

      // Convert exam end time to Date object
      const endTime = new Date(item.date);
      const toTime24Hours = convertTo24HourFormat(item.toTime);
      const toTimeParts = toTime24Hours.split(":");
      endTime.setHours(parseInt(toTimeParts[0], 10));
      endTime.setMinutes(parseInt(toTimeParts[1], 10));

      // Check if the student has submitted the exam
      const examTaken = item.submittedAnswers.some(
        (answer) => answer.userId === user._id // Compare logged-in user's ID with submittedAnswers userId
      );

      // If the exam has been submitted
      if (examTaken) {
        // Check if the exam time has elapsed
        if (userLocalTime > endTime) {
          alert(
            "You have already taken this exam, and the exam time has ended."
          );
          return; // Prevent further action if the time has elapsed
        } else {
          alert(
            "You have already taken this exam, but the exam time hasn't finished. You can continue."
          );
        }
      }

      // Check if it's still within the exam time window
      if (userLocalTime >= startTime && userLocalTime <= endTime) {
        setAnchorElMap((prev) => ({
          ...prev,
          [item._id]: event.currentTarget,
        }));
      } else {
        alert("It's not yet time for this exam, or the exam time has ended.");
      }
    } catch (error) {
      console.error("Error handling menu open event:", error);
    }
  };

  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };

  // Function to get user's local time
  const getUserLocalTime = () => {
    try {
      const userLocalTime = new Date();
      return userLocalTime;
    } catch (error) {
      console.error("Failed to get user's local time:", error);
      throw new Error("Failed to get user's local time.");
    }
  };

  // Function to convert time to 24-hour format
  const convertTo24HourFormat = (time12Hour) => {
    const [time, modifier] = time12Hour.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  // Handle pagination
  // useEffect(() => {
  //   const fetchVisions = async () => {
  //     try {
  //       // Get the token from localStorage or a global state
  //       const token = localStorage.getItem("jwtToken"); // Change this based on your actual method of storing the token

  //       if (!token) {
  //         console.error("No authentication token found");
  //         return;
  //       }
  //       console.log("API URL:", `${apiUrl}/api/get-all`);
  //       console.log("Auth Token:", token);

  //       // Add token to the headers
  //       const response = await axios.get(`${apiUrl}/api/get-all`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Adding the token to Authorization header
  //         },
  //       });
  //       console.log("Full Response:", response);

  //       setVisions(response.data); // Assuming the API response contains the visions
  //     } catch (error) {
  //       console.error("Error fetching visions:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVisions();
  // }, []);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // const updateTableData = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/get-all`);
  //     setVisions(response.data); // Update the visions state with the new list
  //   } catch (error) {
  //     console.error("Error fetching updated visions:", error);
  //   }
  // };

  return (
    <div>
      <body style={{ backgroundColor: "#e5e9ee" }}>
        <div>
          <div className="main-wrapper">
            <TopNavs />
            <div
              className="page-wrapper"
              style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
            >
              <div className="content">
                <div className="card">
                  <div className="card-body">
                    {loading ? (
                      <p>Loading...</p>
                    ) : data?.length === 0 ? (
                      <p className="text-center">
                        No exams scheduled yet. Please add exams to get started.
                      </p>
                    ) : (
                      <div className="table-responsive dataview">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Class Name</th>
                              <th>Subject</th>
                              <th>Exam Year</th>
                              <th>Exam Date</th>
                              <th>Time</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.map((item, index) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.className}</td>
                                <td>{item.subject}</td>
                                <td>{item.year}</td>
                                <td>
                                  {item.date
                                    ? new Date(item.date).toLocaleDateString()
                                    : ""}
                                </td>
                                <td>
                                  {item.fromTime} -- {item.toTime}
                                </td>
                                <td>
                                  <Dropdown>
                                    <Dropdown.Toggle variant="secondary">
                                      ⋮
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleManageQuestions(item._id)
                                        }
                                      >
                                        Manage Questions
                                      </Dropdown.Item>
                                      <Dropdown.Item>Delete Exam</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default AdminDashboard;
