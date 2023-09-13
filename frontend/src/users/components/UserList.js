import React from "react";
import './UserList.css'
import UserItem from './UserItem';
import Card from "../../shared/Components/UIElements/Card";

const UserList = props =>{

    if(props.items.length === 0){
        return (<div className="center">
                <Card>
                    <h2>Not users found.</h2>
                </Card>
                </div>)
    }

    return (<ul className="users-list">
            {props.items.map((user) => {
                return <UserItem key={user.id} id={user.id} placeCount={user.places.length} image={user.image} name={user.name} />
            })}
        </ul>)
};

export default UserList;