import { useState } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import "./admin.css";

const AddUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleSave = () => {
    if (!username.trim()) return;
    console.log("New user:", username);
    setUsername("");
    setShowModal(false);
  };

  return (
    <>
      {/* ADD USER CARD */}
      <div className="add-user" onClick={() => setShowModal(true)}>
        <span>+</span>
        <div>
          <strong>Add User</strong>
          <small>4 users added</small>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>

            <div className="modal-icon">
              <FaUserCircle />
            </div>

            <h3>Add a User</h3>
            <p className="modal-text">
              Create a temporary profile for an additional user. Guest accounts
              can be edited by the owner’s account only.
            </p>

            <input
              type="text"
              placeholder="Enter user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button className="primary-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
