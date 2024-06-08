import { Button, Input, Space, Switch } from "antd"
import type { InputRef } from "antd"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Loading from './Loading/Loading'


import classes from "./Login.module.css"

interface LoginProps {
  tokenRes: any // 根据实际类型进行定义
  popup: any // 根据实际类型进行定义
}
interface Tab {
  title: string
  url: string
  favIconUrl: string
}

const Login: React.FC<LoginProps> = ({ tokenRes, popup }) => {
  const inputRef = useRef<InputRef>(null)

  const [tabList, setTab] = useState([])
  const [currentTab, setCurrentTab] = useState<Tab>({
    title: "",
    url: "",
    favIconUrl: ""
  })

  const [webRes, setWebRes] = useState(undefined)
  const [loading, setLoading] = useState([])
  const [addType, setAddType] = useState(true)
  const [title, setTitle] = useState(null)
  const [data, setData] = useState("")
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // tabs 是一个数组，包含了当前活动的标签页对象
      // 可以通过 tabs[0] 来访问第一个标签页对象
      setCurrentTab({
        title: tabs[0].title,
        url: tabs[0].url,
        favIconUrl: tabs[0].favIconUrl
      })
    })
  }, [])
  async function query({ origin, index, currentTab }) {
    setLoading([1])
    setTab((tabList) => [...tabList, currentTab])
    const data = {
      origin: origin || null,
      click_times: 0,
      link: currentTab.url,
      create_time: Date.now(),
      last_modify_time: Date.now(),
      web_unique_id: uuidv4(),
      icon_url: currentTab.favIconUrl || null,
      title: title && !addType ? title : currentTab.title
    }
    let new_webitem = {
      url: currentTab.favIconUrl || null,
      title: title && !addType ? title : currentTab.title,
      link: currentTab.url,
      click_times: 0,
      unique_id: uuidv4(),
      last_modify_time: Date.now(),
      time: Date.now()
    }
    console.log(data, "data")
    // 设置请求的默认配置
    axios.defaults.headers.common["Authorization"] = `Bearer ${popup}`

    index>=0&&
      axios
        .post("http://gw.shelltogo.cn:65503/User/update_general", {
          payload: {
            new_webitem,
            displayingGroupIndex: index
          },
          type: "add",
          object: "webitem",
          field_name: "wl_groups",
          usage: "add webitem for wlgroups"
        })
        .then((response) => {
          console.log("Response:", response.data)
          setLoading(loading=>[...loading,1,2])
          console.log('loading',loading);
          setWebRes(
            (item) => item + "user/update_general 接口成功" + response.data.msg
          )
        })
        .catch((error) => {
          console.error("Error:", error)
          setLoading(loading=>[...loading,0,2])
          console.log('loading',loading);
        })

    //websites 发送 POST 请求
    axios
      .post("http://gw.shelltogo.cn:65503/websites/add", {
        payload: data
      })
      .then((response) => {
        console.log("Response:", response.data)
        setLoading(loading=>[...loading,1,2])
        console.log('loading',loading);
        setWebRes((item) => item + "wensites 接口成功" + response.data.msg)
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading(loading=>[...loading,0,2])
        console.log('loading',loading);
      })
  }
  return (
    <div className={classes.Login}>
        {/* 
        loading.length 表示是否加载
        2表示已经完成
        0表示失败 
        */}
        <span>{loading.length==0?null:(!loading.includes(2)?<Loading />:(!loading.includes(0)?'添加成功🦄🦄':<a href="http://gw.shelltogo.cn:65503/mail" target='_blank'>添加失败  请联系管理员😃</a>))}</span>

      <div className={classes.top}>
      {!addType ? (                                            
          <span> 一键添加关闭您可以自定义默认标题 🐧🐧</span>
          ):(<><img src={currentTab.favIconUrl} alt="" /><span>{currentTab.title+' |'}</span>  {'| '+currentTab.url}</>)}
        
      </div>

      <div className={classes.content}>

        <div className={classes.switch}>
            <div>
            一键添加：
          <Switch
            checked={addType}
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={() => {
              setAddType(!addType)


            }}
          />
            </div>

          {!addType && (
            <div >
              <Input
              size="small" 
                ref={inputRef}
                defaultValue={currentTab.title}
                onChange={(e) => setTitle(e.target.value)}
               
              />

            </div>
          )}
        </div>

        
        <div className={classes.groups}>
          添加到指定分组：
          {tokenRes?.data?.wl_groups.data.map((item, index) => (
            <div
              className={classes.labels}
              onClick={() => {
                if (!addType && !title) {
                  alert("请先输入标题再选择分组")
                  return
                }

                query({ origin: 2, index: index, currentTab: currentTab })
              }}
              key={item.unique_id}>
              {item.name}
            </div>
          ))}
        </div>
        <div className={classes.addto}>
          添加到：
          <Button
            onClick={() => {
              if (!addType && !title) {
                alert("请先输入标题再选择分组")
                return
              }
              // #     1 手动创建
              // #     2 来自插件-加入分组
              // #     3 来自插件-每日必看
              // #     6 来自插件-稍后再看
              // #     4 来自复制别人分享的分组
              // #     5 浏览历史
              query({ origin: 3, index: null, currentTab: currentTab })
            }}>
            每日必看
          </Button>{" "}
          <Button
            onClick={() => {
              if (!addType && !title) {
                alert("请先输入标题再选择分组")
                return
              }
              // #     1 手动创建
              // #     2 来自插件-加入分组
              // #     3 来自插件-每日必看
              // #     6 来自插件-稍后再看
              // #     4 来自复制别人分享的分组
              // #     5 浏览历史
              query({ origin: 6, index: null, currentTab: currentTab })
            }}>

            稍后再看
            
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Login
