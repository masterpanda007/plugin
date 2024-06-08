import React, { useEffect } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classes from './Loading.module.css'

export default  function  Loading() {
    const [count,setcount]=useState(['·'])
    
    useEffect(()=>{
        const timer=setInterval(() => {
            console.log('zhixingle ',count.length<=4)
            if(count.length<4){
                count.push('·')
            setcount([...count])
            }else{
                setcount([])
            }
            
            clearInterval(timer)
            return ()=>{
                clearInterval(timer)
            }
          
        }, 300);
        console.log(typeof(count),count)
    },[count])
   

  return (
    <>
    <FontAwesomeIcon icon={faSpinner} className={classes.loading} />加载中{count}
    </>
  )
}
