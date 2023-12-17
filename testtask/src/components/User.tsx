import React, {memo} from 'react';
import {IUser} from "../interfaces/UserInterfaces";

const User: React.FC<{user:IUser}> = memo(({user}) => {
  return <div className="item-user">
    <div className="item-user__img">
      <img src={user.photo} alt={user.name + " " + user.position}/>
    </div>
    <p className="item-user__name item-user__text" title={user.name}>{user.name}</p>
    <p className="item-user__text" title={user.position}>{user.position}</p>
    <a className="item-user__link item-user__text" title={user.email} href={"mailto:" + user.email}>{user.email}</a>
    <a className="item-user__link item-user__text" title={user.phone} href={"tel:" + user.phone}>{user.phone}</a>
  </div>;
});

export default User;