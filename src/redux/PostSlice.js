import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    postList:[],
}

const PostSlice = createSlice({
    name:'postlist',
    initialState,
    reducers:{
        addPosts(state,action){
            console.warn(action.payload,"khjhgfhjkjh");
            state.postList.push(action.payload);
        },
        setPostList(state, action) {
            state.postList = action.payload; // Set the entire user list
        },
    }
});

export const {addPosts,setPostList} = PostSlice.actions
export default  PostSlice.reducer;