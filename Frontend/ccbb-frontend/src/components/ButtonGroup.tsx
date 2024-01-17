interface Props {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  style?: "primary" | "secondary" | "outline-primary" | "outline-danger";
  disabled?: boolean;
  onClick: (label: string) => void;
}

function ButtonGroup({
  label,
  type = "button",
  style = "primary",
  disabled = false,
  onClick,
}: Props) {
  if (!disabled) {
    return (
      <button
        className={`mt-3 me-3 btn btn-${style}`}
        type={type}
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        className={`mt-3 me-3 btn btn-${style}`}
        type={type}
        onClick={() => onClick(label)}
        disabled
      >
        {label}
      </button>
    );
  }
}

export default ButtonGroup;
