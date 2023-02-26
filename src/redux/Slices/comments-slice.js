import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    return axios
      .get("http://localhost:5000/api/comments/")
      .then((response) => response.data.comments);
  }
);

export const insertNewComment = createAsyncThunk(
  "comments/insertNewComment",
  async (commentData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "http://localhost:5000/api/comments/add-new-comment",
        {
          method: "POST",
          body: commentData,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      return data["comment"];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeCommentVotes = createAsyncThunk(
  "comments/changeCommentVotes",
  async ({ commentId, type }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/change-comment-votes/${commentId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ actionType: type }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();
      return data["comment"];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(
        `http://localhost:5000/api/comments/delete-comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    // fetch comments
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = Object.values(action.payload);
      state.error = "";
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    // Add New Comment
    builder.addCase(insertNewComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertNewComment.fulfilled, (state, action) => {
      state.loading = false;
      //state.data.push(action.payload);
      state.error = "";
    });
    builder.addCase(insertNewComment.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    // Update Comment Votes
    builder.addCase(changeCommentVotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeCommentVotes.fulfilled, (state, action) => {
      state.loading = false;
      // let elementPos = state.data.findIndex(
      //   (x) => x._id === action.payload._id
      // );
      // state.data.splice(elementPos, 1, action.payload);
      state.error = "";
    });
    builder.addCase(changeCommentVotes.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    // Delete Comment
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default commentsSlice.reducer;
