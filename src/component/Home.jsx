import React from 'react'
import Feed from './Feed'
import {useStoreState } from 'easy-peasy';


const Home = ({fetchError,isLoading}) => {

  const blogpost = useStoreState((state) => state.searhresults)
  return (
    <main className='Home'>

      {
        isLoading ? <p>Loading posts please wait</p> : null
      }
      {
        !isLoading && fetchError ? <p
          style={{color:'red'}}
        >An Error occured while loading the posts please reload your PAGE</p>
        : null
      }
      {
        !isLoading && !fetchError &&
        (blogpost.length > 0 ? <Feed posts={blogpost}/>:
          <p>No Posts to show</p>
        )}
    </main>
  )
}

export default Home