import React, { useState } from 'react'
import axios from 'axios'
import './../App.css'

export default function CreatePost(){

    const [ user, setUser ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ text, setText ] = useState('')

    const submitPost = () => {
        axios.post('http://localhost:3001/api/create', {
            user,
            title, 
            text
        })
        alert('Posted!')
    }

    return(
        <div className="create-post">
            <h1>Create Post</h1>
            <div className="upload-post">
                <label>User</label>
                <input type="text" onChange={ event => { setUser(event.target.value) } }/>

                <label>Title</label>
                <input type="text" onChange={ event => { setTitle(event.target.value) } }/>

                <label>Post</label>
                <textarea onChange={ event => { setText(event.target.value) } }/>
                <button onClick={submitPost}>Send</button>
            </div>
        </div>
    )
}