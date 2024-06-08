import React from 'react'
import classes from './Top.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'

export default function 
() {
  return (
    <div className={classes.Top}>
        <div className={classes.logo} >
            <img src={require('../../../assets/logo2.png')} alt="" />
        </div>
        
        <div className={classes.domain}>
            <span>i</span>
Linkyourworld.org
        </div>
        <div className={classes.funcs}>
            <div className={classes.setting}>
            <a href="http://gw.shelltogo.cn:65503/User" target='_blank'><FontAwesomeIcon icon={faGear}  className={classes.icon}/></a>
                
            </div>
            <div className={classes.contact}>
            <a href="http://gw.shelltogo.cn:65503/mail" target='_blank'><FontAwesomeIcon icon={faEnvelope}  className={classes.icon}/></a>

            </div>
            <div className={classes.home}>
            <a href="http://gw.shelltogo.cn:65503" target='_blank'><FontAwesomeIcon icon={faHouse}  className={classes.icon}/></a>
    
            </div>
        </div>
    </div>
  )
}
