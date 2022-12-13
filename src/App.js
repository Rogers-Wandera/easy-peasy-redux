import React,{useEffect} from 'react';
import { Route,Routes } from 'react-router-dom';

// components
import Header from './component/Header';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Home from './component/Home';
import NewPost from './component/NewPost';
import PostPage from './component/PostPage';
import About from './component/About';
import Missing from './component/Missing';
import EditPost from './component/EditPost';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

//context


function App() {
  const setBlogPosts = useStoreActions((actions) => actions.setBlogPosts);

  const { data,isLoading,fetchError } = useAxiosFetch("http://localhost:3500/posts");

  useEffect(() => {
    setBlogPosts(data)
  },[data,setBlogPosts])

  return (
    <div className='app'>
        <Header title="Our Blog" />
        <Nav />
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} fetchError={fetchError}/>} />
          <Route path='/post' element={<NewPost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/about' element={<About /> } />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
