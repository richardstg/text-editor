import React from "react";

const SwitchButton = (props) => {
  return (
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        onChange={props.toggle}
      />
      <label class="form-check-label" for="flexSwitchCheckDefault">
        Code Mode {props.on ? "On" : "Off"}
      </label>
    </div>
  );
};

export default SwitchButton;
