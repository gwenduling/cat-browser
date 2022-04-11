import "./button.scss";

function Button (props: Props) {
  let buttonClass = "button-component";
  if (props.block) {
    buttonClass += " -block";
  }

  if (props.disabled) {
    buttonClass += " -disabled";
  }

  if (props.success) {
    buttonClass += " -success";
  }

  return (
    <button
      className={buttonClass}
      onClick={() => props.onClick()}
      type="button"
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
}

export default Button;

interface Props {
  content: string;
  block?: boolean;
  disabled?: boolean;
  success?: boolean;
  onClick: () => void;
}
