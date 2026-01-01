import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./admin.css";

const TopicModal = ({ open, onClose, subject, topics, onSubmit }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    setSelectedTopics([]);
  }, [subject, topics]);

  if (!open) return null;

  const handleCheckboxChange = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTopics.length === topics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics([...topics]);
    }
  };

  const handleSubmit = () => {
    onSubmit(subject, selectedTopics);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h3 className="modal-title">{subject} - Select Topics</h3>
        <p className="modal-subtitle">Choose one or more topics for your practice test.</p>

        <div className="select-all">
          <label className="topic-input">
            <input
              type="checkbox"
              checked={selectedTopics.length === topics.length && topics.length > 0}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>
        </div>

        <div className="topics-list scrollable">
          {topics.map((topic, index) => (
            <label key={index} className="topic-input">
              <input
                type="checkbox"
                checked={selectedTopics.includes(topic)}
                onChange={() => handleCheckboxChange(topic)}
              />
              <span>{topic}</span>
            </label>
          ))}
        </div>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleSubmit}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
