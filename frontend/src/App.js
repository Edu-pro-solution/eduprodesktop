import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import All from "./pages/All";
import Ask from "./pages/Ask";
import Cbt from "./pages/Cbt";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Download from "./pages/Download";
import Exam from "./pages/Exam";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import PracticeExam from "./pages/PracticeExam";
import Pricing from "./pages/Pricing";
import Question from "./pages/Question";
import Recommend from "./pages/Recommend";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Study from "./pages/Study";
import Notification from "./pages/Notification";
import AllNoti from "./pages/AllNoti";
import History from "./pages/History";
import ResultHistory from "./pages/ResultHistory";
import BreakHistory from "./pages/BreakHistory";
import Activate from "./pages/Activate";
import Payment from "./pages/Payment";
import Topic from "./pages/Topic";
import Start from "./pages/Start";
import PerHistory from "./pages/PerHistory";
import StudyMat from "./pages/StudyMat";

const App = () => {
    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cbt" element={<Cbt />} />
          <Route path="/practice" element={<Practice />} />
    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Cbt />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/recommendation" element={<Recommend />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/home" element={<Home />} />
        
         
          <Route path="/study" element={<Study />} />
          <Route path="/practice-exam" element={<PracticeExam />} />
          <Route path="/study-material" element={<StudyMat />} />
          <Route path="/dashboards" element={<AdminDashboard />} />
          <Route path="/practice-for-utme" element={<All />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/all-notification" element={<AllNoti />} />
          <Route path="/result-history" element={<ResultHistory />} />
          <Route path="/start-test" element={<Start />} />
          <Route path="/result-history-breakdown" element={<BreakHistory />} />
          <Route path="/performance-history" element={<PerHistory />} />
          <Route path="/history" element={<History />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/download" element={<Download />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-exam" element={<Exam />} />
          <Route path="/cbt" element={<Cbt />} />
          <Route path="/question" element={<Question />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
