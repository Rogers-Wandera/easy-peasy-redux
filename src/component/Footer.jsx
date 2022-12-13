import React from 'react'
import { useStoreState } from 'easy-peasy';

const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <div>
      <h3>{`${postCount} Blog Posts`}</h3>
    </div>
  )
}

export default Footer