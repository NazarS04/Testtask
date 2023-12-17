import React, {memo, useCallback, useRef, useState} from 'react';
import Button from "./ui_elements/Button";
import Input from "./ui_elements/Input";
import RadioList from "./ui_elements/RadioList";
import InputFile from "./ui_elements/InputFile";
import {fetchData} from "../utils/fetchData";
import {IUser, IUserResponse} from "../interfaces/UserInterfaces";

const positionsUrl = "https://frontend-test-assignment-api.abz.agency/api/v1/positions"

interface IForm {
  startUrl: string
  changeUrl: (url: string | null) => void
  changeUsers: (arr: IUser[]) => void
}

interface IFieldValues {
  value: string
  isValid: boolean
  regExp: string
  minLength?: number
  maxLength?: number
}

interface IFieldsValues {
  name: IFieldValues
  email: IFieldValues
  phone: IFieldValues

  [key: string]: IFieldValues
}

interface IFieldsOptions {
  name: { [key: string]: string }
  email: { [key: string]: string }
  phone: { [key: string]: string }
}

interface IButtonOptionsRef {
  [key: string]: string
}

interface IToken {
  success: boolean
  token: string
}

function validateFieldAndChangeValue(obj: IFieldValues, fieldValue: string): IFieldValues {
  let isValidLength: null | boolean = null;

  if (obj.minLength && obj.maxLength) {
    isValidLength = obj.minLength <= fieldValue.length && fieldValue.length <= obj.maxLength;
  }

  obj.isValid = isValidLength === null ? new RegExp(obj.regExp).test(fieldValue) : isValidLength && new RegExp(obj.regExp).test(fieldValue);
  obj.value = fieldValue;
  return obj;
}

const tokenUrl: string = "https://frontend-test-assignment-api.abz.agency/api/v1/token";
const addUserUrl: string = "https://frontend-test-assignment-api.abz.agency/api/v1/users"

const Form: React.FC<IForm> = memo(({startUrl, changeUrl, changeUsers}) => {
  const [fieldsValues, setFieldsValues] = useState<IFieldsValues>({
    name: {
      value: "",
      isValid: false,
      regExp: "^[a-zA-Z1-9]+$",
      minLength: 2,
      maxLength: 60
    },
    email: {
      value: "",
      isValid: false,
      regExp: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
      minLength: 2,
      maxLength: 100
    },
    phone: {
      value: "",
      isValid: false,
      regExp: "^[\\+]380([0-9]{9})$"
    },
  });
  const [checkedId, setCheckedId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isError, setIsError] = useState(false);

  const fieldsValuesRef = useRef<IFieldsValues>({} as IFieldsValues);
  const fieldsOptionsRef = useRef<IFieldsOptions>({
    name: {
      className: "form__input",
      name: "name",
      autoComplete: "off",
    },
    email: {
      className: "form__input",
      name: "email",
      autoComplete: "off",
      type: "email",
      minLength: "2", maxLength: "100",
    },
    phone: {
      className: "form__input form__phone",
      name: "phone",
      autoComplete: "off",
      type: "phone"
    }
  });
  const buttonOptionsRef = useRef<IButtonOptionsRef>({type: "submit", className: "form__button"});

  fieldsValuesRef.current = fieldsValues;

  function resetFields() {
    const fieldsValuesCopy: IFieldsValues = JSON.parse(JSON.stringify(fieldsValues));

    for (let key in fieldsValuesCopy) {
      fieldsValuesCopy[key].value = "";
      fieldsValuesCopy[key].isValid = false;
    }

    setFieldsValues(fieldsValuesCopy);
    setCheckedId(1);
    setFile(null);
  }

  const changeFieldsValues = useCallback(function (fieldValue: string, fieldName: string) {
    const fieldsValues: IFieldsValues = fieldsValuesRef.current;
    const newObj: IFieldValues = validateFieldAndChangeValue({...fieldsValues[fieldName]}, fieldValue);

    setFieldsValues({...fieldsValues, [fieldName]: newObj});
  }, [])
  const changeCheckedId = useCallback(function (id: number) {
    setCheckedId(id);
  }, [])
  const changeFile = useCallback((file: File | null) => {
    setFile(file);
  }, [])

  const sendData = async function (checkedId: number | null, file: File | null) {
    try {
      const {token}: IToken = await fetchData(tokenUrl);
      const formData = new FormData();
      formData.append("name", fieldsValuesRef.current.name.value)
      formData.append("email", fieldsValuesRef.current.email.value)
      formData.append("phone", fieldsValuesRef.current.phone.value)
      formData.append("position_id", checkedId!.toString())
      formData.append("photo", file!)
      const res = await fetch(addUserUrl, {
        method: "POST",
        body: formData,
        headers: {
          'Token': token,
        },
      })

      if(!res.ok){
        throw new Error();
      }

      resetFields()
      fetchData<IUserResponse>(startUrl).then(data => {
        changeUsers(data.users);
        changeUrl(data.links.next_url);
      })
    } catch (e) {
      setIsError(true);
    }
  }
  const submitForm: (e: React.MouseEvent<HTMLButtonElement>) => void = useCallback(function (e) {
    e.preventDefault();
    sendData(checkedId, file)
  }, [checkedId, file])

  return <form className="form" id="signUp">
      <div className="form__container container">
        <h2 className="form__title title">Working with POST request</h2>
        <div className="form__wrapper">
          <Input errorText="The field must has a word without spaces. Min length 2 letters. Max length 60 letters."
                 placeholder="Your name"
                 id="input-name"
                 state={fieldsValues.name.value}
                 isValidInput={fieldsValues.name.isValid}
                 changeHandler={changeFieldsValues}
                 inputOptions={fieldsOptionsRef.current.name}/>
          <Input
            errorText="Min length 2 letters. Max length 100 letters. Your email must be like this one: youremail@gmail.com"
            placeholder="Email"
            id="input-email"
            state={fieldsValues.email.value}
            isValidInput={fieldsValues.email.isValid}
            changeHandler={changeFieldsValues}
            inputOptions={fieldsOptionsRef.current.email}/>
          <Input errorText="+38 (XXX) XXX - XX - XX"
                 placeholder="Phone"
                 id="input-phone"
                 state={fieldsValues.phone.value}
                 isValidInput={fieldsValues.phone.isValid}
                 changeHandler={changeFieldsValues}
                 inputOptions={fieldsOptionsRef.current.phone}/>
          <p className="form__select-position-text">Select your position</p>
          <RadioList url={positionsUrl} generalRadioName="position" checkedId={checkedId}
                     changeCheckedId={changeCheckedId}/>
          <InputFile className="form__upload" id="form__upload" changeFile={changeFile}
                     errorText="Min width:70px. Min height 70px. Max size 5MB. The photo must be jpeg/jpg."
                     fileType="image/jpeg" minHeight={70} minWidth={70} maxSize={5}
                     fileName={file?.name ? file?.name : ""}/>
          {!isError && <Button onClick={submitForm} options={buttonOptionsRef.current}
                  isDisabled={!(fieldsValues.name.isValid && fieldsValues.email.isValid && fieldsValues.phone.isValid && file)}>Sign
            Up</Button>}
          {isError && <p className="error">Something was wrong.<br/>Please reload the page.</p>}
        </div>
      </div>
    </form>;
});

export default Form;