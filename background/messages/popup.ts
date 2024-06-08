// listen message from popup.ts

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  async function querySomeApi(id: string) {
    let token = ""
    console.log(id + "do someing with id")
       chrome.tabs.query(
        { url: "http://gw.shelltogo.cn:65503/*" },
        
        function (tabs) {
          console.log(tabs);
          if (tabs.length == 0) {
    return  res.send({
                message:'no tab',
                status: false
            })

          }
          tabs.forEach(function (tab) {

            chrome.scripting.executeScript(
              {
                target: { tabId: tab.id },
                func: () => localStorage.getItem("token") // 使用箭头函数来定义函数
              },
              function (results) {
                token = results[0].result as string // 使用类型断言来标记返回值的类型
                


                if (token) {
                  console.log(token, "token")
                  chrome.storage.local.set({ token: token })
                  res.send({
                    message:token,
                    status: true
                  })
                }else{
                  res.send({
                    message:'no token',
                    status: false
                })

                }
              }
            )
          })
        }
      )


    return token
  }

 await querySomeApi(req.body.id)


}

export default handler
