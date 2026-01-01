import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaHome,
  FaNewspaper,
  FaStickyNote
} from "react-icons/fa";
import AddUser from "./AddUser";
import "./admin.css";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("key");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">23</span>
          </div>
        </div>

        <nav>
          <button className="active"><FaHome /> Home</button>
          <button><FaStickyNote /> Notes</button>
          <button><FaNewspaper /> News</button>
          <button><FaCog /> Settings</button>
        </nav>

        <AddUser open={showModal} onClose={() => setShowModal(false)} />
      </aside>

{/* MAIN */}
<main className="bodys">
  <header className="headers">
    <h1>Payment Details</h1>
  </header>

  <section className="payment-container">

    {/* PRICE */}
    <div className="payment-section">
      <h3>Price</h3>
      <p className="price-text">
        The cost of getting an activation key is <strong>₦1,200</strong>.
      </p>
    </div>

    {/* HOW TO PAY */}
    <div className="payment-section">
      <h3>How to Pay</h3>
      <p>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
        Velit officia consequat duis enim velit mollit. Exercitation veniam
        consequat sunt nostrud amet.
      </p>
    </div>

    {/* AFTER PAYMENT */}
    <div className="payment-section">
      <h3>After Payment</h3>
      <p>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
        Velit officia consequat duis enim velit mollit. Exercitation veniam
        consequat sunt nostrud amet.
      </p>
    </div>

  </section>
</main>

    </div>
  );
};

export default Payment;
