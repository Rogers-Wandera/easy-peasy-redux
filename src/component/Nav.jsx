import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';

const Nav = () => {

  const search = useStoreState((state) => state.search)
  const blogpost = useStoreState((state) => state.blogpost)
  const setSearch = useStoreActions((actions) => actions.setSearch)
  const setSearchResults = useStoreActions((actions) => actions.setSearchResults)

  useEffect(() => {
    const filterResults = blogpost.filter(post => 
      (post.body).toLowerCase().includes(search.toLowerCase()) || 
      (post.title).toLowerCase().includes(search.toLowerCase()))

      setSearchResults(filterResults.reverse())
  },[blogpost,search,setSearchResults])


  return (
    <nav className='nav'>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search blog</label>
        <input 
          type="text" 
          id='search'
          placeholder='Search...'
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav