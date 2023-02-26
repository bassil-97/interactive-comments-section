import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, insertNewComment, deleteComment } from "../../redux/Slices/comments-slice";
import "./CommentsList.css";

import AddNewComment from '../AddNewComment/AddNewComment';
import Comment from "../Comment/Comment";
import LoadingSpinner from '../UI/LoadingSpinner';

export default function CommentsList() {
  const dispatch = useDispatch();
  const { loading, data }  = useSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddNewComment = (e, replyComment = false, parentComment = null, commentText = null) => {
    if (replyComment === false && commentText === "") {
      return;
    }
    if (replyComment && commentText === '') {
        return;
    }

    let commentData = {
      id: "63f8b133c568c8b6a37d98c3",
      name: "bassilqadi",
      commentText
    };

    if (replyComment === true) {
      commentData.parentId = parentComment._id;
      commentData.depth = parentComment.depth + 1;
    }

    commentData = JSON.stringify(commentData);
    dispatch(insertNewComment(commentData));
    setTimeout(() => {
      dispatch(fetchComments());
    }, 500);
  };

  const displayComments = (allComments) => {
    let comments = [];
    
    for(let comment of Object.values(allComments)) {
      comments.push(
        <Comment 
            key={comment._id} 
            id={comment._id}
            username={comment.author.name} 
            createdAt={comment.createdAt} 
            commentText={comment.commentText} 
            votes={comment.votes}
            comment={comment}
            addComment={handleAddNewComment}
            deleteComment={deleteComment}
            dispatch={dispatch}
          />
      );
      if (comment.children && Object.keys(comment.children).length > 0) {
        //let replies = <ReplayList replays={comment.children} dispatch={dispatch} addComment={handleAddNewComment} deleteComment={deleteComment} />;
        let replies = displayComments(comment.children);
        comments = comments.concat(replies);
      }
    }

    return comments;
  };

  return (
    <div className='comments-list__container'>
        {loading && <LoadingSpinner />}
        {displayComments(data)}
        <AddNewComment addComment={handleAddNewComment} />
    </div>
  )
}
