import React, {memo} from 'react';
import {mergeClasses} from "../../utils/mergeClasses";

interface IInput {
  errorText: string
  state: string
  placeholder: string
  isValidInput: boolean
  id:string
  changeHandler: (value: string, fieldName: string) => void
  inputOptions?: {
    [key: string]: string
  }
}

const Input: React.FC<IInput> = memo(({state, changeHandler, isValidInput, errorText, placeholder, inputOptions,id}) => {
  const options = {...inputOptions};
  const className = mergeClasses("input", options)

  let inputClass = "input__field";

  if (state.length >= 1 && !isValidInput) {
      inputClass = "input__field input__field_invalid";
  }

  return <div className={className}>
    <input className={inputClass} type="text" value={state}
           onChange={(e) => changeHandler(e.target.value, e.target.name)} id={id} {...options}/>
    <label className={state.length >= 1 ? "input__label input__label_active" : "input__label"} htmlFor={id}>{placeholder}</label>
    <p className="input__error">{errorText}</p>
  </div>;
});

export default Input;