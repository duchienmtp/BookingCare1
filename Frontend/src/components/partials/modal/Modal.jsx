import React, { useState, useEffect } from "react";
import "./Modal.scss";

const Modal = (props) => {
  const { handleCloseModalProps, isSuccessModal } = props;

  const handleCloseModal = () => {
    handleCloseModalProps();
  };

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal__container">
        {isSuccessModal ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="confirmation-modal__icon confirmation-modal__icon--success"
              viewBox="0 0 60 60"
            >
              <circle cx="30" cy="30" r="29" />
              <path
                fill="#fff"
                d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154L29.294 41.541a3.3 3.3 0 0 1-5.032.529z"
              />
            </svg>
            <div className="confirmation-modal__content">
              <h3 className="confirmation-modal__title">Awesome!</h3>
              <p className="confirmation-modal__message">
                Your booking has been confirmed. Check your email for details,
                including your reservation number.
              </p>
              <button
                type="button"
                className="confirmation-modal__button"
                onClick={handleCloseModal}
              >
                Got it
              </button>
            </div>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="confirmation-modal__icon confirmation-modal__icon--fail"
              viewBox="0 0 60 60"
            >
              <circle cx="30" cy="30" r="29" />
              <path
                fill="#fff"
                d="M30 18c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
              />
              <path
                fill="#fff"
                d="M34.4 25.6c-.8-.8-2-.8-2.8 0L30 27.2l-1.6-1.6c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8L27.2 30l-1.6 1.6c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6L30 32.8l1.6 1.6c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6.8-.8.8-2 0-2.8L32.8 30l1.6-1.6c.8-.8.8-2 0-2.8z"
              />
            </svg>
            <div className="confirmation-modal__content">
              <h3 className="confirmation-modal__title">Oops!</h3>
              <p className="confirmation-modal__message">
                There was an error with your booking. Please try again later or
                contact our support team.
              </p>
              <button
                type="button"
                className="confirmation-modal__button"
                onClick={handleCloseModal}
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
