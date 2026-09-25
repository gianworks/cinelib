import type { IconType } from "react-icons";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "./DropdownButton.module.css";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownButtonProps = {
  icon?: IconType;
  label: string;
  defaultOption: string;
  options: DropdownOption[];
  selectedOption: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string | null) => void;
};

function DropdownButton({
  icon: Icon,
  label,
  defaultOption,
  options,
  selectedOption,
  isOpen,
  onToggle,
  onSelect,
}: DropdownButtonProps) {
  const selectedLabel = options.find(
    (option) => option.value === selectedOption,
  )?.label;

  function handleSelect(option: string) {
    onSelect(option === defaultOption ? null : option);
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
          {selectedLabel ?? label}
          <RiArrowDownSLine className={styles["dropdown-button-icon"]} />
        </div>
      </button>

      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          <button onClick={() => handleSelect(defaultOption)}>
            {defaultOption}
          </button>

          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
