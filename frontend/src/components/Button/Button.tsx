import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
