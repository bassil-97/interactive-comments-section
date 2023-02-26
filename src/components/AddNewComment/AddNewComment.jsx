import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import "./AddNewComment.css"

export default function AddNewComment({ addComment }) {
    const { isLoggedIn } = useSelector(state => state.auth);
    const userCommentRef = useRef();
  
    const handleAddNewComment = () => {
      addComment(null, false, null, userCommentRef.current.value);
      userCommentRef.current.value = null;
    };

    return (
      <div className='add-new-comment__container' data-aos="fade-right">
          <img src="https://avatars.githubusercontent.com/u/61696257?v=4" alt="user-avatar" />
          <textarea ref={userCommentRef} name="user-comment" id="user-comment" cols="70" rows="4" placeholder={`Add a comment...`}></textarea>
          <button type='button' className='btn' onClick={handleAddNewComment} disabled={!isLoggedIn}>
            SEND
          </button>
      </div>
    );
}
