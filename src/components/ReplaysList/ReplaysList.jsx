import React from 'react';
import "./ReplaysList.css";

import Comment from '../Comment/Comment';

export default function ReplaysList({ replays, dispatch, addComment, deleteComment }) {
  console.log(replays)
  return (
    <div className='comment-replays__list'>
        {Object.values(replays)?.map(comment => <Comment  
            key={comment._id} 
            id={comment._id}
            username={comment.author.name} 
            createdAt={comment.createdAt} 
            commentText={comment.commentText} 
            votes={comment.votes}
            comment={comment}
            addComment={addComment}
            deleteComment={deleteComment}
            dispatch={dispatch}
          />)
        }
    </div>
  )
}
