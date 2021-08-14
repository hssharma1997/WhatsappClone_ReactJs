import React, { useState,useEffect } from 'react';
import "./sidebar.css";
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase.js';
import { useStateValue } from './StateProvider';

function Sidebar() {
const [rooms,setRooms]=useState([]);
const [{user},dispatch]=useStateValue();

useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot=>(
        setRooms(snapshot.docs.map(doc=>(
            {
                id:doc.id,
                data:doc.data()

            }
        )

        ))
    ))
}, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
              <Avatar src={user?.photoURL}/>
              <div className="sidebar__headerRight">
                  <IconButton>
                     <DonutLargeIcon/>
                  </IconButton>
                  <IconButton>
                     <ChatIcon/> 
                  </IconButton>
                  <IconButton>
                     <MoreVertIcon/>
                  </IconButton>                  
              </div>

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchIcon/>
             <input type="text" placeholder="Search or start new chat"/>
                </div>
             
                
            </div>
            <div className="sidebar__chats">
               <SidebarChat addnewchat/>
               {rooms.map(room=>(
                   <SidebarChat key={room.id} id={room.id} name={room.data.Name}/>
               ))}
                
            </div>
        </div>
    )
}

export default Sidebar
