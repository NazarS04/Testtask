import React, {memo} from 'react';
import {mergeClasses} from "../../utils/mergeClasses";

interface IButton {
  options?: {
    [key: string]: string
  }
  children: React.ReactNode
  isButton?: boolean
  isDisabled?: boolean
  onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void
}

const Button: React.FC<IButton> = memo(({onClick,children, isButton = true, isDisabled, options}) => {

  const optionsCopy = {...options};
  const className = mergeClasses("button",optionsCopy);

  if (!isButton) {
    return <a {...optionsCopy} className={className}>{children}</a>
  }

  return <button onClick={onClick} {...optionsCopy} className={className} disabled={isDisabled}>{children}</button>;
});

export default Button;