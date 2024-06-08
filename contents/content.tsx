import type { PlasmoCSConfig } from "plasmo"
import { useMessage } from "@plasmohq/messaging/hook"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,

}


//   document.body.style.background = "rgb(131, 171, 210)"
//   document.body.style.backgroundImage = "url('./assets/background.jpg')"

const QueryTextAnywhere = () => {
    const { data } = useMessage<string, string>(async (req, res) => {
     
  let descriptionMeta = document.querySelector('meta[name="description"]');
  descriptionMeta = descriptionMeta||document.querySelector('meta[name="og:description"]');
  const description = descriptionMeta ? descriptionMeta.getAttribute('content') : "No description ";
  console.log(description,'description');
  res.send(description) 
    })

    return(
        <></>
    )

  }
export default QueryTextAnywhere;


