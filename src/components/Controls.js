import React from "react";

// Button values are passed as props to get rid of using document.getElementById
export default function Controls({ onProcess, onProcPlay, onPlay, onStop, onToggleP1 }) {
  return (
    <div className="control-panel">
      <nav>
        <button onClick={onProcess} className="btn btn-outline-primary">Preprocess</button>
        <button onClick={onProcPlay} className="btn btn-outline-primary">Proc & Play</button>
        <br />
        <button onClick={onPlay} className="btn btn-outline-primary">Play</button>
        <button onClick={onStop} className="btn btn-outline-primary">Stop</button>
      </nav>
        {/*Toggle function for instrument p1 */}
      <div className="mt-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={() => onToggleP1(false)}
            defaultChecked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            p1: ON
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onChange={() => onToggleP1(true)}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            p1: HUSH
          </label>
        </div>
      </div>
    </div>
  );
}
