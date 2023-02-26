import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { changeCommentVotes, fetchComments } from "../../redux/Slices/comments-slice";
import "./Comment.css";

import AddReplay from '../AddReplay/AddReplay';
import UserAvatar from "../UI/Avatar";

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Comment({ id, username, commentText, createdAt, votes, comment, addComment, deleteComment, dispatch }) {
  const commentWidth = (100 - (comment.depth - 1) * 10) + '%';
  const { userId }  = useSelector(state => state.auth);

  const [showReplayBox, setShowReplayBox] = useState(false);

  const handleShowReplayBox = () => setShowReplayBox(true);

  const handleHideReplayBox = () => setShowReplayBox(false);

  const handleChangeCommentVotes = (commentId, actionType) => {
    dispatch(changeCommentVotes(commentId, actionType));
    setTimeout(() => {
      dispatch(fetchComments());
    }, 500);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(id));
    setTimeout(() => {
      dispatch(fetchComments());
    }, 500);
  };

  return (
    <div className='comment-item__wrapper'>
      <div className='comment-item__container' style={{width: commentWidth, marginBottom: showReplayBox ? "15px": "0px"}} data-aos="zoom-in">
        {comment.depth > 0 && <div className="comment-votes__container">
          <IconButton aria-label="increase" onClick={() =>handleChangeCommentVotes({commentId: id, type: "increase"})}>
            <ThumbUpAltIcon />
          </IconButton>
          <h5>{votes}</h5>
          <IconButton aria-label="decrease" onClick={() => handleChangeCommentVotes({commentId: id, type: "decrease"})} disabled={votes === 0}>
            <ThumbDownAltIcon />
          </IconButton>
        </div>}
        <div className="comment-content">
          <div className="comment-content__header">
            <div className='center gap-3'>
              {/* <img src={comment.author.avatar} alt={username} /> */}
              <UserAvatar letter={username[0]} />
              <h5 className='comment-username'>{username}</h5>
              {comment.author.id === userId && <h6 className='author-eq-user'>you</h6>}
              <h6 className='comment-createdAt'>{createdAt}</h6>
            </div>
            {comment.author.id !== userId && <div className='center gap-2 replay-button'>
              <Button startIcon={<ModeCommentIcon />} onClick={handleShowReplayBox}>
                Replay
              </Button>
            </div>}
            {comment.author.id === userId && <div className='center gap-2'>
              <IconButton onClick={handleDeleteComment}>
                <DeleteIcon sx={{ color: "var(--danger-color)" }} />
              </IconButton>
              <IconButton onClick={handleShowReplayBox}>
                <EditIcon sx={{ color: "var(--options-color)" }} />
              </IconButton>
            </div>}
          </div>
          <div className="comment-text">
            <p>
              {commentText}
            </p>
          </div>
        </div>
      </div>
      {showReplayBox && <AddReplay width={commentWidth} addReplayToComment={addComment} parentComment={comment} closeReplayBox={handleHideReplayBox} />}
    </div>
  )
}
