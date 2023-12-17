import React, {useCallback, useState} from 'react';
import Button from "./ui_elements/Button";
import Users from "./Users";
import Form from "./Form";
import {IUser} from "../interfaces/UserInterfaces";
import TestAssigment from "./TestAssigment";

const startUrl = "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6";

const Main: React.FC = () => {
  const [nextUrl, setNextUrl] = useState<string | null>(startUrl);
  const [users, setUsers] = useState<IUser[]>([]);

  const changeUrl = useCallback(function (url:string|null):void{
    setNextUrl(url);
  },[])

  const changeUsers = useCallback(function (arr:IUser[]):void{
    setUsers(arr);
  },[])


  return <main>
    <TestAssigment/>
    <Users nextUrl={nextUrl} setNextUrl={changeUrl} users={users} setUsers={changeUsers}/>
    <Form changeUrl={changeUrl} changeUsers={changeUsers} startUrl={startUrl}/>
  </main>;
};

export default Main;