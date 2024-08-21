// src/components/Modal.js
import React from 'react';
import './Modal.css'; // Add CSS for modal styling

const Modal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
