import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Post(){

    let { postId } = useParams()
    const [ post, setPost ] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/api/getFromId/${postId}`)
            .then(data => {
                setPost({
                    id: data.data[0].id,
                    title: data.data[0].title,
                    postText: data.data[0].post_text,
                    userName: data.data[0].user_name,
                    likes: data.data[0].likes
                })
                console.log(data)
            })
    }, [])

    const likePost = (id) => {
        axios.post(`http://localhost:3001/api/like/${id}`)
            .then(resp => {
                alert('you liked the post')
            })
    }

    return(
        <div className="post-container">
            <div className="post">
                <h2>{post.title}</h2>
                <p>{post.postText}</p>
                <p>{post.userName}</p>

                <div className="likes">
                    <button onClick={() => {likePost(post.id)}}>Like</button>
                    <p>{post.likes}</p>
                </div>
            </div>

        </div>
    )
}