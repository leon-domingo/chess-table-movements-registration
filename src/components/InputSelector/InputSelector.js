import './InputSelector.scss';

const InputSelector = ({
  inputId,
  labelText,
  value,
  minValue=1,
  stepValue=1,
  changeValue,
  onClickIncrease,
  onClickDecrease,
}) => {
  return (
    <div className="InputSelector">
      <label htmlFor={inputId}>
        {labelText}
      </label>
      <input
        id={inputId}
        type="number"
        min={minValue}
        step={stepValue}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      />
      <div className="InputSelector__buttons">
        <button
          className="InputSelector__buttons__button"
          onClick={onClickIncrease}
        >
          <i className="fas fa-angle-up" />
        </button>

        <button
          className="InputSelector__buttons__button"
          onClick={onClickDecrease}
        >
          <i className="fas fa-angle-down" />
        </button>
      </div>
    </div>
  );
};

export default InputSelector;
