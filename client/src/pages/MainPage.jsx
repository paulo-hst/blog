import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function MainPage(){

    const [ postList, setPostList ] = useState([])
    let history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:3001/api/get')
            .then(data => {
                setPostList(data.data)
            })
    }, [])

    const likePost = (id) => {
        axios.post(`http://localhost:3001/api/like/${id}`)
            .then(resp => {
                alert('you liked the post')
            })
    }

    return(
        <div className="main-page">
            <h1>Main Page</h1>
                {postList.map((item, key) => (
                    <div 
                        className="posts"
                        key={key}
                        
                    >
                        <h2 onClick={() => {history.push(`/post/${item.id}`)}}>{item.title}</h2>
                        <p>
                            {item.post_text.length > 200
                            ? item.post_text.substring(0,200) + ' ...'
                            : item.post_text}
                        </p>
                        <p>{item.user_name}</p>
                        <div className="likes">
                            <button onClick={() => {likePost(item.id)}}>Like</button>
                            <p>{item.likes}</p>
                        </div>
                    </div>  
                ))}
        </div>
    )
}