import React from 'react'
import classes from './Main.module.css'
import Unlogin from './Unlogin/Unlogin'
import Login from './Login/Login'


import axios from "axios"
import { useEffect, useState ,useRef} from "react"


import { sendToBackground } from "@plasmohq/messaging"

import type { InputRef } from 'antd';


export default function Main() {
    const inputRef = useRef<InputRef>(null);

    const [popup, setPopup] = useState(undefined)
    const [tokenRes, setTokenRes] = useState(undefined)



    useEffect(() => {
        ;(async () => {
          if (!tokenRes) {
            const resp = await sendToBackground({
              name: "popup",
              body: {
                id: 123
              }
            })
            //收到background传来的token
            console.log('resp.status',resp.status);
            resp.status&&setPopup(resp.message)
          }
        })()
      }, [])
    
      useEffect(() => {
        ;(async () => {
          if (popup) {
            console.log(popup)
            // 发送 GET 请求
            await axios
              .get("http://gw.shelltogo.cn:65503/User/get_user_info_with_token", {
                headers: {
                  Authorization: `Bearer ${popup}`
                }
              })
              .then((response) => {
                console.log("token Response:", response.data)
                console.log('response.data.status',response.data.status);
                response.data.status&&setTokenRes(response.data)
              })
              .catch((error) => {
                console.error("Error:", error)
              })
          }
        })()
      }, [popup])
    //   console.log('(popup&&tokenRes?.status)',(popup&&tokenRes?.status));
      console.log('popup',popup);
      console.log('(tokenRes)',tokenRes);
  return (
    <div className={classes.Main}>
{        (popup&&tokenRes?.status)?<Login tokenRes={tokenRes} popup={popup}/>:<Unlogin/>}
    </div>
  )
}
