This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!


## 需求
    1.popup 打开时,新建标签页时（content.load）读取Host的localstorage 判断登录状态 并将登录状态显示到popup上
    2.记录浏览历史
        每当tab 打开时，获取到该tab的url title timestamp 并将信息记录到 popup上
    3.添加网页到分组，添加网页到每日必读
        每当点击popup添加网页到分组，添加网页到每日必读按钮时 将当前tab的url title timestamp信息分别显示到添加网页到分组，添加网页到每日必读按钮的下面

## 页面设计
   记录浏览历史的开启关闭按钮
   添加到已有分组按钮
    该按钮记录到的信息
   添加到每日必读按钮
    该按钮记录到的信息