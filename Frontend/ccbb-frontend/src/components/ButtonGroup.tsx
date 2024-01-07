interface Props {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  style?: "primary" | "secondary" | "outline-primary";
  onClick: (label: string) => void;
}

function ButtonGroup({
  label,
  type = "button",
  style = "primary",
  onClick,
}: Props) {
  return (
    <button
      className={`mt-3 btn btn-${style}`}
      type={type}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

export default ButtonGroup;
