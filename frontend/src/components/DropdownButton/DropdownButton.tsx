import type { IconType } from "react-icons";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "./DropdownButton.module.css";

type DropdownButtonProps = {
  icon?: IconType;
  label: string;
  options: string[];
  selectedOption: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string | null) => void;
};

function DropdownButton({
  icon: Icon,
  label,
  options,
  selectedOption,
  isOpen,
  onToggle,
  onSelect,
}: DropdownButtonProps) {
  function handleSelect(option: string) {
    onSelect(option === "All" ? null : option);
    onToggle();
  }

  return (
    <div>
      <button
        className={`${styles["dropdown-button"]} ${
          isOpen || selectedOption !== null
            ? styles["dropdown-button-active"]
            : ""
        }`}
        onClick={onToggle}
      >
        <div className={styles["dropdown-button-content"]}>
          {Icon && <Icon className={styles["dropdown-button-icon"]} />}
          {selectedOption ?? label}
          <RiArrowDownSLine className={styles["dropdown-button-icon"]} />
        </div>
      </button>

      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          <button onClick={() => handleSelect("All")}>All</button>
          {options.map((option) => (
            <button key={option} onClick={() => handleSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
