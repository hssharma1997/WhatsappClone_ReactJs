import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
import React,{useState,useEffect}  from 'react'
import db from './firebase';
import {Link} from 'react-router-dom'

function SidebarChat({addnewchat,name,id}) {
    const [seed,setSeed]=useState("");
    const[messages,setMessages]=useState("")

    useEffect((id)=>{
db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
.onSnapshot(snapshot=>(
    setMessages(snapshot.docs.map((doc)=>doc.data()))

))
    },[id])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])


     const createChat=()=>{
        const roomName= prompt("Please Enter name for Chat")
        if(roomName){
            db.collection('rooms').add({
                Name:roomName
            })
        }
     }
    return (
        !addnewchat?
        (<Link to={`/rooms/${id}`}>
             <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h3>{name}</h3>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
            </Link>
           ):(
        <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
        </div>)

    )
}

export default SidebarChat
