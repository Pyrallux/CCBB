interface Props {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  style?:
    | "primary"
    | "secondary"
    | "outline-primary"
    | "outline-secondary"
    | "outline-danger"
    | "outline-dark";
  margin?: boolean;
  onClick: (label: string) => void;
}

function ButtonGroup({
  label,
  type = "button",
  style = "primary",
  margin = true,
  onClick,
}: Props) {
  if (margin) {
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
        className={`btn btn-${style}`}
        type={type}
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    );
  }
}

export default ButtonGroup;
