import { useEffect, useState } from "react";


import { MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

import { styled } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Question = () => {
  const backgroundStyle = {
    backgroundImage: `url('/static/media/breads.png')`,
  };

  const [fields, setFields] = useState([]); // State for fields
  const [selectedField, setSelectedField] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fullname, setFullname] = useState(""); // New state for fullname
  const [email, setEmail] = useState(""); // New state for email

  const [suggestions, setSuggestions] = useState([]); // New state for suggestions
  const [previewContent, setPreviewContent] = useState(""); // New state for preview content

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  // const handleSubjectChange = (event) => {
  //   setSelectedSubject(event.target.value);
  // };
  // Fetch fields data
  useEffect(() => {
    fetch(`${apiUrl}/api/fields`)
      .then((res) => res.json())
      .then((data) => {
        setFields(data.data || []);
      })
      .catch((err) => console.error("Error fetching fields:", err));
  }, []);
  const handleSubmit = (event, preview = false) => {
    event.preventDefault();
    setLoading(true);

    // Check if all required fields are filled
    if (!fullname || !email || !topic || !difficulty || !selectedField) {
      alert("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const examData = {
      field: selectedField,
      topic,
      difficulty,
      numberOfQuestions,
      preview,
      fullname, // Ensure this is populated with the correct value
      email, // Ensure this is populated with the correct value
    };

    // Ensure that no empty strings are sent in the payload
    examData.field = examData.field.trim();

    // Log exam data for debugging
    console.log("Submitting exam data:", examData);

    fetch(`${apiUrl}/api/generate-gen-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure correct content type
      },
      body: JSON.stringify(examData), // Send the data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (preview) {
          setPreviewContent(data.questions.join("\n"));
        } else {
          navigate("/dashboard/manage-online-exam");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error generating exam questions:", error);
        setLoading(false);
      });
  };

  const handlePreview = (event) => handleSubmit(event, true);

  const handleSave = (event) => handleSubmit(event, false);

  const handleTopicChange = (event) => {
    const value = event.target.value;
    setTopic(value);

    // Replace this with your logic to fetch or filter suggestions
    const allTopics = ["Math", "Science", "History", "Geography"]; // Example topics
    const filteredSuggestions = allTopics.filter((t) =>
      t.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setTopic(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };
  useEffect(() => {
    if (selectedField) {
      fetch(`${apiUrl}/api/generate-field-topic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: selectedField }),
      })
        .then((res) => res.json())
        .then((data) => setTopics(data.topics || []))
        .catch((err) => console.error("Error fetching topics:", err));
    } else {
      setTopics([]);
    }
  }, [selectedField]);

  return (
    <>
      <main style={{ marginBottom: "0" }}>
        <div className="contact-area" style={backgroundStyle}>
          <div className="container py-5">
            <div>
              <div className="row justify-content-between">
                <div className="col-xxl-5 col-xl-6 col-lg-6 mb-4 mb-lg-0">
                  <div className="contact-left-info">
                    <div className="contact-info-left-top mb-4">
                      <h4
                        className="contact-info-title"
                        style={{ color: "#fff" }}
                      >
                        What would you like to practice?
                      </h4>
                    </div>

                    <div className="contact-form mb-5">
                      <form id="contact-form">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className="post-input">
                              <label
                                htmlFor="name"
                                className="post-input-label-defualt"
                                style={{ color: "white" }}
                              >
                                Full Name *
                              </label>
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                id="name"
                                className="form-control"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-6 mb-3">
                            <div className="post-input">
                              <label
                                htmlFor="email"
                                className="post-input-label-default"
                                style={{ color: "white" }}
                              >
                                Email *
                              </label>
                              <div className="post-input">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="Email"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-12 mb-3">
                            <label
                              htmlFor="field"
                              className="post-input-label-defualt"
                              style={{ color: "white" }}
                            >
                              What field would you like to practice *
                            </label>
                            <Select
                              select
                              label="Select the Field"
                              variant="outlined"
                              style={{
                                backgroundColor: "white",
                                border: "none",
                              }}
                              value={selectedField}
                              onChange={(e) => setSelectedField(e.target.value)}
                              fullWidth
                              margin="normal"
                            >
                              {fields.map((field) => (
                                <MenuItem key={field._id} value={field.content}>
                                  {field.content}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-6 col-xl-6 col-lg-6">
                  <div className="mb-3">
                    <label
                      htmlFor="topic"
                      className="post-input-label-defualt"
                      style={{ color: "white" }}
                    >
                      Select the topic you would love to practice *
                    </label>
                    <Select
                      select
                      label="Select Topic"
                      variant="outlined"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      style={{ backgroundColor: "white", border: "none" }}
                      fullWidth
                      margin="normal"
                    >
                      {topics.map((topic, index) => (
                        <MenuItem key={index} value={topic}>
                          {topic}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="difficulty"
                      className="post-input-label-defualt"
                      style={{ color: "white" }}
                    >
                      Select the level of question you want (easy, medium, hard)
                      *
                    </label>
                    <Select
                      select
                      label="Select Difficulty"
                      style={{ backgroundColor: "white", border: "none" }}
                      variant="outlined"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      fullWidth
                      margin="normal"
                    >
                      <MenuItem value="easy">Easy</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="numberOfQuestions"
                      className="post-input-label-defualt"
                      style={{ color: "white" }}
                    >
                      Input the number of questions you want *
                    </label>
                    <div className="post-input">
                      <input
                        type="number"
                        label="Number of Questions"
                        variant="outlined"
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="sasup-theme-btn sasup-theme-btn-2 transition-5"
                onClick={handlePreview}
                style={{
                  marginRight: "20px",
                  backgroundColor: "#ffc107",
                  color: "#0366D6",
                }}
              >
                Preview
              </button>
              <button
                type="submit"
                class="sasup-theme-btn sasup-theme-btn-2 transition-5"
                onClick={handlePreview}
                style={{ backgroundColor: "#ffc107", color: "#0366D6" }}
              >
                Save
              </button>

              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    zIndex: 9999,
                  }}
                >
                  <CircularProgress size={60} />
                </Box>
              )}

              <div className="mt-4">
                <textarea
                  fullWidth
                  multiline
                  rows={8}
                  variant="outlined"
                  label="Question Preview"
                  value={previewContent}
                  InputProps={{ readOnly: true }} // Make it read-only
                  className="form-control"
                  style={{ fontSize: "17.7px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Question;
