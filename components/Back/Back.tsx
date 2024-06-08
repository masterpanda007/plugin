import React from 'react'
import classes from './Back.module.css'
import Top from './Top/Top'
import Main from './Main/Main'

export default function Back() {
  return (
    <div className={classes.Back}>
        <Top/>

        <Main/>

    <div className={classes.main}>

    </div>
    </div>
  )
}
