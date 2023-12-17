import React, {useEffect, useState} from 'react';
import Button from "./ui_elements/Button";
import Preloader from "./ui_elements/Preloader";
import {IUser, IUserResponse} from "../interfaces/UserInterfaces";
import User from "./User";
import {fetchData} from "../utils/fetchData";

interface IUsers {
  nextUrl: string | null
  setNextUrl: (url: string | null) => void
  users: IUser[]
  setUsers: (arr: IUser[]) => void
}

const Users: React.FC<IUsers> = ({nextUrl, setNextUrl, users, setUsers}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const request: () => Promise<void> = async function () {
    if (!nextUrl) {
      return;
    }
    if (!isLoading) {
      setIsLoading(true)
    }

    try {
      const data: IUserResponse = await fetchData(nextUrl);

      setUsers([...users, ...data.users]);
      setNextUrl(data.links.next_url);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false)
    }
  }

  function onClickHandler(): void {
    request();
  }

  useEffect((): void => {
    request();
  }, [])

  return <section id="users" className="users">
    <div className="users__container container">
      <h2 className="users__title title">Working with GET request</h2>
      {!!users.length && <div className="users__items">
        {users.map((user: IUser) => {
          return <User key={user.id} user={user}/>
        })}
      </div>}
      {isLoading && <Preloader/>}
      {(!isLoading && nextUrl && !isError) &&
        <Button onClick={onClickHandler} options={{className: "users__button"}}>Show more</Button>}
      {isError && <p className="error">Something was wrong.<br/>Please reload the page.</p>}
    </div>
  </section>;
};

export default Users;