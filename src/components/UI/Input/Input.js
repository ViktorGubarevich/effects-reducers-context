import styles from "./Input.module.css";

const Input = ({ isValid, id, label, type, value, onChange, onBlur }) => (
  <div
    className={`${styles.control} ${isValid === false ? styles.invalid : ""}`}
  >
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>
);

export default Input;
