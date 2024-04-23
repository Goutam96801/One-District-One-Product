const InputBox = ({ name, type, id, value, placeholder, icon, disabled, className, onChange, onKeyDown, defaultValue, min, max }) => {
    return (
      <div className="relative w-[100%] ">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          id={id}
          className={`input-box ${className} placeholder:capitalize`}
          icon={icon}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          min={min}
          max={max}
        />
        <i className={"fi "+ icon + " input-icon"}></i>
      </div>
    );
  };
  
  export default InputBox;
  