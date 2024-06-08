import React from 'react'
import classes from './Unlogin.module.css'
import { Button} from 'antd';


export default function Unlogin() {
  return (
    <>
   <Button type="primary">
    <a href="http://gw.shelltogo.cn:65503/User" target='_blank'>未登录 点击此处打开网页登录</a>
    </Button>
    </>
  )
}
