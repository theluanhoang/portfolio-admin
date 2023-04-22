import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '.';
import { IBlog } from "../pages/ListBlog";

interface IBlogState {
    listBlog: IBlog[];
  }
interface IBlogsState {
    blogs: IBlogState;
  }

const initialState: IBlogsState = {
    blogs: {
        listBlog: []
    }
}

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<IBlog[]>) => {
            state.blogs.listBlog = action.payload
        },
        updateBlog: (state, action: PayloadAction<IBlog>) => {
            state.blogs.listBlog = state.blogs.listBlog.map((blog) => blog.id === action.payload.id ? action.payload : blog)
        },
        removeBlog: (state, action: PayloadAction<string>) => {
            state.blogs.listBlog = state.blogs.listBlog.filter((blog) => blog.id !== action.payload)
        },
    }
})



export const { setBlogs, updateBlog, removeBlog } = blogsSlice.actions;
export const selectBlogs = (state: RootState) => state.blogs;
export default blogsSlice.reducer;