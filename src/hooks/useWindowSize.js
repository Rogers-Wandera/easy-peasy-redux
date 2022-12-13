import {useState,useEffect} from 'react';

const useWindowSize = () => {
  const [useWindow, setUseWindow] = useState({
      width: undefined,
      height: undefined
  })


  useEffect(() => {

      const calcutalteWindowSize = () => {
          setUseWindow({
              width: window.innerWidth,
              height: window.innerHeight
          })
      }

      calcutalteWindowSize();

      window.addEventListener("resize", calcutalteWindowSize);

      return () => window.removeEventListener("resize", calcutalteWindowSize)
  },[])

  return useWindow;
}

export default useWindowSize