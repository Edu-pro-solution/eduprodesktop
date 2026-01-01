import { FaBell, FaCog, FaHome, FaNewspaper, FaStickyNote } from "react-icons/fa";
import { MdDownload, MdLightbulb } from "react-icons/md";
import { useState } from "react";
import AddUser from "./AddUser";
import "./admin.css";

const notificationsData = [
  {
    id: 1,
    type: "update",
    title: "Content update",
    message: "New topics added",
    date: "14 Aug, 2020 at 3:34pm",
    icon: <MdDownload />
  },
  {
    id: 2,
    type: "practice",
    title: "Practice recommendations",
    message: "Improve your surds by taking this test prepared for you!",
    date: "14 Aug, 2020 at 3:34pm",
    icon: <MdLightbulb />
  },
  {
    id: 3,
    type: "practice",
    title: "Practice recommendations",
    message: "Improve your surds by taking this test prepared for you!",
    date: "14 Aug, 2020 at 3:34pm",
    icon: <MdLightbulb />
  },
  {
    id: 4,
    type: "practice",
    title: "Practice recommendations",
    message: "Improve your surds by taking this test prepared for you!",
    date: "14 Aug, 2020 at 3:34pm",
    icon: <MdLightbulb />
  }
];

const AllNoti = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">{notifications.length}</span>
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

        <AddUser open={showModal} onClose={() => setShowModal(false)} />
      </aside>

      {/* MAIN */}
      <main className="bodys">
        <header className="headers notifications-header">
          <h1>Notifications</h1>

          <button
            className="clear-btn"
            onClick={() => setNotifications([])}
          >
            Clear all notifications
          </button>
        </header>

        {/* NOTIFICATION LIST */}
        <section className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div key={item.id} className="notification-card">
                <div className="notification-icon">
                  {item.icon}
                </div>

                <div className="notification-content">
                  <h4>{item.title}</h4>
                  <p>{item.message}</p>
                  <span>{item.date}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default AllNoti;
