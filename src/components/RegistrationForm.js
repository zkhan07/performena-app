import React, { useState } from "react";
import "./RegistrationForm.css";

const fieldConfigs = [
  {
    name: "fullName",
    label: "Full Name",
    validate: (v) => v.length >= 3,
    error: "Minimum 3 characters required.",
  },
  {
    name: "phone",
    label: "Phone",
    validate: (v) => /^\d{10}$/.test(v),
    error: "Enter a valid 10-digit phone number.",
  },
  {
    name: "email",
    label: "Email",
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    error: "Enter a valid email.",
  },
  {
    name: "city",
    label: "City",
    validate: (v) => v.length >= 3,
    error: "Minimum 3 characters required.",
  },
  {
    name: "favoriteSport",
    label: "Favorite Sport",
    validate: (v) => v.trim() !== "",
    error: "Cannot be empty.",
  },
  {
    name: "favoriteTeam",
    label: "Favorite Team",
    validate: (v) => v.trim() !== "",
    error: "Cannot be empty.",
  },
  {
    name: "favoriteIcon",
    label: "Favorite Sports Icon",
    validate: (v) => v.trim() !== "",
    error: "Cannot be empty.",
  },
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    favoriteSport: "",
    favoriteTeam: "",
    favoriteIcon: "",
  });

  const [currentField, setCurrentField] = useState(0);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const field = fieldConfigs[currentField];
    const value = formData[field.name];

    if (!field.validate(value)) {
      // Invalid input
      setError(field.error);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setFormData((prev) => ({
          ...prev,
          [field.name]: "",
        }));
      }, 500);
    } else {
      // Valid input
      setError("");

      if (currentField < fieldConfigs.length - 1) {
        setCurrentField((prev) => prev + 1);
      } else {
        if (isEditMode) {
          // Exit edit mode after editing
          setIsEditMode(false);
        } else {
          // First submission
          setIsSubmitted(true);
        }
      }
    }
  };

  const handleSave = () => {
    setIsEditMode(false);
    setCurrentField(fieldConfigs.length - 1); // Reset to last field so Submit button appears
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div className="form-container">
      {!isSubmitted || isEditMode ? (
        <>
          {fieldConfigs.map((field, index) => (
            <div
              key={field.name}
              className={`form-field ${
                index < currentField ? "completed" : ""
              } ${index === currentField ? "active" : ""}`}
            >
              {index <= currentField && (
                <>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={shake && index === currentField ? "shake" : ""}
                    autoFocus={index === currentField}
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                  />
                  {index === currentField && error && (
                    <div className="error">{error}</div>
                  )}
                </>
              )}
            </div>
          ))}

          <button className="next-button" onClick={handleNext}>
            {currentField === fieldConfigs.length - 1 ? "Submit" : "Next"}
          </button>
        </>
      ) : (
        <div className="summary-view">
          <h3>Registration Summary</h3>
          {fieldConfigs.map((field) => (
            <div key={field.name} className="summary-field">
              <strong>{field.label}:</strong>{" "}
              {isEditMode ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData[field.name]}</span>
              )}
            </div>
          ))}
          <div className="summary-buttons">
            {isEditMode ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
