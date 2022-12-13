import { action, computed, createStore, thunk } from "easy-peasy";

import api from '../api/posts';

export const store = createStore({
    blogpost: [],
    setBlogPosts: action((state,payload) => {
        state.blogpost = payload;
    }),
    searhresults: [],
    setSearchResults: action((state,payload) => {
        state.searhresults = payload;
    }),
    editTitle: "",
    setEditTitle: action((state,payload) => {
        state.editTitle = payload;
    }),
    editBody: "",
    setEditBody: action((state,payload) => {
        state.editBody = payload;
    }),
    search: "",
    setSearch: action((state,payload) => {
        state.search = payload;
    }),
    postTitle: "",
    setPostTitle: action((state,payload) => {
        state.postTitle = payload;
    }),
    postBody: "",
    setPostBody: action((state,payload) => {
        state.postBody = payload;
    }),

    postCount: computed((state) => state.blogpost.length),
    getPostById: computed((state) => {
        return (id) => state.blogpost.find(post => post.id === parseInt(id))
    }),
    addPost: thunk(async (actions,newPost,helpers) => {
        const {blogpost} = helpers.getState();
        try {
            const response = await api.post("/posts", newPost)
            actions.setBlogPosts([...blogpost, response.data]);
            actions.setPostTitle("");
            actions.setPostBody("");
          } catch (err) {
            console.log('Error', err.message);
          }
    }),

    delelePost: thunk(async(actions,id,helpers) => {
        const {blogpost} = helpers.getState();
       try {
            await api.delete(`/posts/${id}`);
            const filterPosts = blogpost.filter((post) => post.id !== id);
            actions.setBlogPosts(filterPosts);
       } catch (err) {
        console.log('Error', err.message);
       }
    }),

    editedPost: thunk(async(actions,editPost,helpers) => {
        const {blogpost} = helpers.getState();
        const {id} = editPost;
        try {
            const response = await api.put(`/posts/${id}`,editPost);
            actions.setBlogPosts(blogpost.map((blog) => 
              blog.id === id ? {...response.data} : blog
            ))
            actions.setEditBody("")
            actions.setEditTitle("")
          } catch (err) {
            console.log('Error', err.message);
          }
    })
})