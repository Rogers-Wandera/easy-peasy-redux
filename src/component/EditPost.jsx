import React, {useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';

const EditPost = () => {

  const editTitle = useStoreState((state) => state.editTitle)
  const editBody = useStoreState((state) => state.editBody)
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
  const setEditBody = useStoreActions((actions) => actions.setEditBody)
  const editedPost = useStoreActions((actions) => actions.editedPost)
  const getPostById = useStoreState((state) => state.getPostById);

  const navigate = useNavigate();

  const { id } = useParams();
  const post = getPostById(id)

  useEffect(() => {
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditTitle,setEditBody])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editPost = {id, title:editTitle, datetime, body:editBody};
      editedPost(editPost)
      navigate("/")
  }
  return (
    <div className='NewPost'>
      {
        post && 
        <>
          <h1>New Post</h1>
          <form onSubmit={(e) => e.preventDefault()}  className='form'>
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              required
              value={editTitle}
              id="title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="body">Body</label>
            <textarea 
              type="text" 
              value={editBody}
              id="body"
              required
              rows="5"
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type='button'
              onClick={() => handleEdit(post.id)}
            >Edit post</button>
          </form>
        </>
      }
       {
        !post && 
        <div>
          <h2>Opps Looks like no post Found</h2>
          <p>Well that's disapointing</p>
          <p><Link to='/'>
            Visit our Posts Page
          </Link></p>
        </div>
      }
    </div>
  )
}

export default EditPost