import React from 'react';
import './CustomeCheckbox.css';

function CustomCheckbox({ label, isChecked, onCheckboxChange }) {
  const handleCheckboxChange = () => {
    onCheckboxChange(!isChecked);
  };

  return (
    <div className='form-control '>
        <label className={`custom-checkbox  ${isChecked ? 'checked' : ''}`}>
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
        />
        <span className="checkbox-checkmark"></span>
         {label}
        </label>
    </div>
  );
}

export default CustomCheckbox;
