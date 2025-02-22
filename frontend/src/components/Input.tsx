import { ReactNode } from "react";
import { InputFieldType } from "../types/InputFieldType";

interface Props {
  title: string,
  fieldType: InputFieldType,
  fieldKey: string,
  fieldValue?: string | number,
  fieldChecked?: boolean,
  disabled?: boolean,
  fieldUpdateHandler?: (fieldKey: string, newValue: string | number | boolean) => void,
  children?: ReactNode,
}

const Input = ({title, fieldType, fieldKey, fieldValue, fieldChecked, disabled = false, fieldUpdateHandler, children}: Props) => {
  
  const generateInputField = () => {
    switch(fieldType) {
      case InputFieldType.PlainText: 
        return <p>{fieldValue}</p>;
      case InputFieldType.Text: 
        return <input id={fieldKey} type="text" autoComplete={"off"} value={fieldValue} onChange={(event) => fieldUpdateHandler && fieldUpdateHandler(fieldKey, event.target.value)} disabled={disabled}/>;
      case InputFieldType.Number: 
        return <input id={fieldKey} type="number" value={fieldValue} onChange={(event) => fieldUpdateHandler && fieldUpdateHandler(fieldKey, event.target.value)} disabled={disabled}/>;
      case InputFieldType.TextArea: 
        return <textarea id={fieldKey} value={fieldValue} onChange={(event) => fieldUpdateHandler && fieldUpdateHandler(fieldKey, event.target.value)} disabled={disabled}/>;
      case InputFieldType.Checkbox: 
        return <input id={fieldKey} type="checkbox" checked={fieldChecked} onChange={(event) => fieldUpdateHandler && fieldUpdateHandler(fieldKey, event.target.checked)} disabled={disabled}/>;
      case InputFieldType.Calendar: 
        return <input id={fieldKey} type="date" value={fieldValue} onChange={(event) => fieldUpdateHandler && fieldUpdateHandler(fieldKey, event.target.value)} disabled={disabled}/>;
      case InputFieldType.DateTime: 
        return <input id={fieldKey} type="datetime-local" value={fieldValue} onChange={(event) => fieldUpdateHandler && fieldUpdateHandler(fieldKey, event.target.value)} disabled={disabled}/>;
    }
  }
  
  
  return ( 
    <div className="input-group" key={fieldKey}>
      <div className="label-row">
        <label className="sub-title" htmlFor={fieldKey}>{title}</label>
        {children}
      </div>
      {generateInputField()}
    </div>
  );
}
 
export default Input;