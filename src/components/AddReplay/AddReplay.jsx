import React, { useRef } from 'react';
import { useSelector } from "react-redux";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddReplay({ addReplayToComment, parentComment, closeReplayBox, width }) {
    const { isLoggedIn } = useSelector(state => state.auth);
    const userCommentReplayRef = useRef();
  
    const handleAddReplayToComment = () => {
        addReplayToComment(null, true, parentComment, userCommentReplayRef.current.value);
        userCommentReplayRef.current.value = null;
        closeReplayBox();
    };

    return (
      <div className='add-new-comment__container' style={{width: width}} data-aos="fade-right">
        <IconButton onClick={closeReplayBox} className="close-replay-box__btn">
          <CloseIcon />
        </IconButton>
          <img src="https://avatars.githubusercontent.com/u/61696257?v=4" alt="user-avatar" />
          <textarea ref={userCommentReplayRef} name="user-replay-to-comment" id="user-replay-to-comment" cols="70" rows="4" placeholder={`Replay to comment...`}></textarea>
          <button type='button' className='btn' onClick={handleAddReplayToComment} disabled={!isLoggedIn}>
            REPLAY
          </button>
      </div>
    );
}
