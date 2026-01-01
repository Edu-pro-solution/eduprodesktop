
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
const Notification = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [points, setPoints] = useState([]);
  const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
  const [showModal, setShowModal] = useState(false);

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
        <button className="active">
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
      <h1>Notification</h1>
    </div>
  </header>

  {/* FLEX CONTAINER */}
  <div className="practice-layout">

    {/* LEFT — 60% */}
{/* LEFT — 60% */}
<section className="practice-left">
  <div className="study-intro">
    <div className="study-icon">📘</div>

    <p className="study-text">
    No new notification
    </p>
  </div>

</section>
  </div>
</main>


    
  </div>
);

};

export default  Notification;
