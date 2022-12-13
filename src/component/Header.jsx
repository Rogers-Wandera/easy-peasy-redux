import React from 'react'
import { FaLaptop,FaTabletAlt,FaMobileAlt } from 'react-icons/fa';

import useWindowSize from '../hooks/useWindowSize';

const Header = ({title}) => {
  const {width} = useWindowSize();
  return (
    <header>
      <h2>{title}</h2>
      {
        width < 768 ? <FaMobileAlt /> 
        :width < 992 ? <FaTabletAlt /> : <FaLaptop />
      }
    </header>
  )
}

export default Header