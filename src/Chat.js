import React, { useState,useEffect } from 'react';
import './chat.css';
import {Avatar,IconButton} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase'
import firebase from "firebase";
import { useStateValue} from "./StateProvider"

export default function Chat() {
    const [mess,setMess]=useState("")
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState("")
    const [messages,setMessages]=useState([])
    const [{user},dispatch]=useStateValue()

    const sendMessage=(e)=>{
      e.preventDefault();
      console.log(mess)
      db.collection('rooms').doc(roomId).collection('messages').add({
          message:mess,
          name:user.displayName,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setMess("")
    };

    useEffect(()=>{
        if(roomId){
            db.collection("rooms")
            .doc(roomId).
            onSnapshot((snapshot)=>
                setRoomName(snapshot.data().Name)
                )
                db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                    setMessages(snapshot.docs.map((doc)=>doc.data()))
                ))
        }
    }
    ,[roomId])

    return (
        <div className="chat__area">

            <div className="chat__header">
             <Avatar/>

             <div className="chat__headerInfo">
                 <h3>{roomName}</h3>
                 <p>Last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
             </div>

             <div className="chat__headerRight">
                 <IconButton>
                  <SearchOutlinedIcon/>
                 </IconButton>

                 <IconButton>
                  <AttachFileIcon/>
                 </IconButton>

                 <IconButton>
                  <MoreVertIcon/>
                 </IconButton>
             </div>
            </div>

            <div className="chat__body">
                {messages.map((message)=>(
                 <p className={`chat__message ${message.name===user.displayName && "chat__receiver"} `}>
                 <span className="chat__name">{message.name}</span>
                {message.message}
             <span className="time__stamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
             </p>
                ))}
           
            
            

            </div>

            <div className="chat__footer">
             <InsertEmoticonIcon/>
             <form>
                 <input value={mess} type="text" placeholder="Type a message" onChange={(e)=>{
                     setMess(e.target.value)}}/>
                 <button onClick={sendMessage}>Send</button>
             </form>
             <MicIcon/>
            </div>            
        </div>
    )
}
