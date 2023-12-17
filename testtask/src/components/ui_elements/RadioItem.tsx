import React, {memo} from 'react';
import {IPosition} from "./../../interfaces/PositionInterfaces";

interface IRadioItem {
  obj: IPosition
  generalRadioName: string
  isChecked: boolean
  onChange: (id: number) => void
}

const RadioItem: React.FC<IRadioItem> = memo(({obj, generalRadioName, isChecked, onChange}) => {
  return <li className="radio-list__item">
    <input type="radio" className="radio-list__radio" id={obj.id.toString() + obj.name} name={generalRadioName}
           checked={isChecked} onChange={() => onChange(obj.id)}/>
    <label className="radio-list__label" htmlFor={obj.id.toString() + obj.name}>{obj.name}</label>
  </li>;
});

export default RadioItem;