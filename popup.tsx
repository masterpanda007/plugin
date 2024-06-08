import axios from "axios"
import { useEffect, useState ,useRef} from "react"
import { v4 as uuidv4 } from "uuid"

import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"




import classes from "./popup.module.css"

import { Button, Input, Space, Switch } from 'antd';
import type { InputRef } from 'antd';
import Back from "./components/Back/Back";


 function  IndexPopup() {
  

//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

//     chrome.tabs.sendMessage(tabs[0].id, '随便写点发过去的消息', res => {

// console.log(res);
//   })
(async()=>{
  const csResponse = await sendToContentScript({
    name: "content",
    body: 'body'
  })
  
  
  console.log('desc',csResponse);
})()
              
  return (
    <div
      className={classes.container}
>
                <Back />
    
    </div>
  )
}

export default IndexPopup
