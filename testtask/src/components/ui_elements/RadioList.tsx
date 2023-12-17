import React, {memo, useCallback, useEffect, useState} from 'react';
import RadioItem from "./RadioItem";
import {fetchData} from "../../utils/fetchData";
import Preloader from "./Preloader";
import {IPosition, IPositionResponse} from "./../../interfaces/PositionInterfaces";

interface IRadioList {
  checkedId: number | null
  url: string
  generalRadioName: string
  changeCheckedId: (id: number) => void
}

const RadioList: React.FC<IRadioList> = memo(({checkedId, changeCheckedId, url, generalRadioName}) => {
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const setCheckedHandler: (id: number) => void = useCallback(function (id: number) {
    for (let i = 0; i < positions.length; i++) {
      if (id === positions[i].id) {
        changeCheckedId(positions[i].id)
        break;
      }
    }
  }, [positions])

  useEffect(() => {
    (async function () {
      try {
        const response: IPositionResponse = await fetchData(url);

        setPositions(response.positions)
        changeCheckedId(response.positions[0].id)
      } catch (e) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return <ul className="form__positions radio-list">
    {isLoading && <Preloader/>}
    {(!isLoading && !isError) && positions.map(item => {
      return <RadioItem key={item.id} obj={item} generalRadioName={generalRadioName} isChecked={checkedId === item.id}
                        onChange={setCheckedHandler}/>;
    })}
    {isError && <p className="error">Something was wrong.<br/>Please reload the page.</p>}
  </ul>;
});

export default RadioList;