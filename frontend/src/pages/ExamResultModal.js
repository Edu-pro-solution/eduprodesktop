import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExamResultModal = ({
  score = 0,
  totalScore = 0,
  breakdown = [],
  onClose,
}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Prepare Pie Chart Data
  const pieData = [
    {
      name: "Attempted",
      value: breakdown.reduce((acc, item) => acc + (item.attempted || 0), 0),
    },
    {
      name: "Visited",
      value: breakdown.reduce((acc, item) => acc + (item.visited || 0), 0),
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-overlay ">
      {/* Modal Container */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[75vh] flex flex-col relative overflow-y-auto "
        style={{
          position: "relative",

          maxHeight: "90vh",
        }}
      >
        {/* Content Layout - Left (Score, Table) | Right (Charts) */}
        <div className="row h-full">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%", // Ensure full width
              borderBottom: "1px solid #ccc",
              marginTop: "40px",
              paddingBottom: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem", // Same as text-xl
                fontWeight: "600", // Same as font-semibold
                color: "black",
                flexBasis: "80%", // Take most of the space
              }}
            >
              Exam Result
            </h2>
            <button
              style={{
                fontSize: "1.5rem", // Same as text-2xl
                fontWeight: "bold",
                color: "#6b7280", // Tailwind gray-500
                background: "none",
                border: "none",
                cursor: "pointer",
                flexBasis: "20%", // Button takes less space
                textAlign: "right",
              }}
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Left Section - Score & Table */}
          <div className="col-md-7 d-flex flex-column justify-content-between p-4">
            {/* Score Box */}
            <div
              style={{
                backgroundColor: "#0366D6",
                color: "white",
                padding: "3rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                position: "relative",
                width: "100%",
                margin: "auto",
                textAlign: "center",
              }}
            >
              {/* Print Button at Top Right */}
              <button
                style={{
                  color: "white",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "red",
                }}
                onClick={() => window.print()}
              >
                Print
              </button>

              {/* Small Green Circular "Score" Title */}
              <div style={{ display: "flex" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Score
                </h2>
              </div>

              {/* Large Blue Circular Score Display */}
              <div
                style={{
                  width: "160px",
                  height: "120px",
                  borderRadius: "50%",
                  border: "3px solid white",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: "0 auto",
                }}
              >
                {score}/{totalScore}
              </div>
            </div>

            <div className="mt-4 flex-grow overflow-auto border rounded-lg">
              <div className="overflow-x-auto">
                <table className="table table-bordered w-full min-w-max text-lg">
                  <thead className="bg-gray-300 text-gray-800">
                    <tr className="text-left">
                      <th className="p-3">Subject</th>
                      <th className="p-3">Visited</th>
                      <th className="p-3">Attempted</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Aggregate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.length > 0 ? (
                      <>
                        {breakdown.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }
                          >
                            <td className="p-3 whitespace-nowrap">
                              {item.subject}
                            </td>
                            <td className="p-3">{item.visited}</td>
                            <td className="p-3">{item.attempted}</td>
                            <td className="p-3">{item.score}</td>
                            <td className="p-3">{item.aggregate}</td>
                          </tr>
                        ))}

                        {/* Total Row */}
                        <tr className="bg-blue-200 font-bold text-gray-800">
                          <td className="p-3">Total</td>
                          <td className="p-3">
                            {breakdown.reduce(
                              (acc, item) => acc + item.visited,
                              0
                            )}
                          </td>
                          <td className="p-3">
                            {breakdown.reduce(
                              (acc, item) => acc + item.attempted,
                              0
                            )}
                          </td>
                          <td className="p-3">
                            {breakdown.reduce(
                              (acc, item) => acc + item.score,
                              0
                            )}
                          </td>
                          <td className="p-3">
                            {(
                              breakdown.reduce(
                                (acc, item) => acc + item.aggregate,
                                0
                              ) / breakdown.length
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-4 text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Section - Charts */}
          <div className="col-md-5 d-flex flex-column justify-content-center align-items-center gap-4 p-4">
            {/* Pie Chart */}
            <PieChart width={250} height={250}>
              <Pie
                data={pieData}
                cx={125}
                cy={125}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            {/* Bar Chart */}
            <BarChart width={350} height={200} data={breakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultModal;
