import React, {memo, useRef, useState} from 'react';
import {mergeClasses} from "../../utils/mergeClasses";

interface IInputFile {
  id: string
  changeFile: (file: File | null) => void
  errorText: string
  fileType: string
  minWidth: number
  minHeight: number
  maxSize: number
  fileName:string
  className?: string
}

const InputFile: React.FC<IInputFile> = memo(({id, className, changeFile,
                                                errorText, fileType, maxSize, minWidth,
                                                minHeight, fileName}) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);

  function readFile() {
    const file: File | undefined = inputFile.current?.files![0]

    if(inputFile.current?.value){
      inputFile.current.value = "";
    }

    if (!file) {
      setIsError(false);
      changeFile(null);
      return;
    }

    if (file.size > maxSize * 1000000 || file.type !== fileType) {
      setIsError(true);
      changeFile(null);
      return;
    }

    const fileRiderToUrl = new FileReader();
    fileRiderToUrl.onload = function () {
      const img = new Image();

      img.onload = function () {
        if (img.width < minWidth || img.height < minHeight) {
          setIsError(true);
          changeFile(null);
          return;
        }

        if(isError){
          setIsError(false);
        }
        changeFile(file);
      }
      if (typeof fileRiderToUrl.result === "string") {
        img.src = fileRiderToUrl.result;
      }
    }
    fileRiderToUrl.readAsDataURL(file);
  }

  return <div className={className ? "upload " + className : "upload"}>
    <div className={isError ? "upload__input-cont upload__input-cont_invalid" : "upload__input-cont"}>
      <label className="upload__label" htmlFor={id}>Upload</label>
      <input className="upload__input" type="file" id={id} onChange={readFile} ref={inputFile} accept={fileType}/>
      <p className="upload__text">{fileName.length ? fileName : "Upload your photo"}</p>
    </div>
    <p className="input__error">{errorText}</p>
  </div>;
});

export default InputFile;