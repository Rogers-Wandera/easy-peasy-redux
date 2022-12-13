import React from 'react'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

const NewPost = () => {

  const postTitle = useStoreState((state) => state.postTitle)
  const postBody = useStoreState((state) => state.postBody)
  const blogpost = useStoreState((state) => state.blogpost)

  const setPostTitle = useStoreActions((actions) => actions.setPostTitle)
  const setPostBody = useStoreActions((actions) => actions.setPostBody)
  const addPost = useStoreActions((actions) => actions.addPost)


  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = blogpost.length ? blogpost[blogpost.length -1].id + 1 : 1;
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const newPost = {id, title:postTitle, datetime, body:postBody};
        addPost(newPost)
        navigate("/");
    }
  return (
    <div className='NewPost'>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}  className='form'>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          required
          value={postTitle}
          id="title"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea 
          type="text" 
          value={postBody}
          id="body"
          required
          rows="5"
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button>Add post</button>
      </form>
    </div>
  )
}

export default NewPost