import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { Suspense } from "react";
import { HashRouter } from "react-router-dom";
import "./css/github-markdown.scss";
import "./css/highlight.scss";
import "./index.scss";
import App from "./App";
import RouteGuard from "@/components/routeGuard";
import { store } from "./store";
import { ConfigProvider } from "antd";
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const validateMessages = {
  required: "${label}不能为空",
};


let instance: any;

const initQianKun = () => {
  renderWithQiankun({
    // 当前应用在主应用中的生命周期
    // 文档 https://qiankun.umijs.org/zh/guide/getting-started#

    mount(props) {
      render(props.container)
      //  可以通过props读取主应用的参数：msg
      // 监听主应用传值
      props.onGlobalStateChange((msg: string) => {
        console.log(msg)
      })
    },
    bootstrap() { },
    unmount() { 
      // instance.unmount();
      // instance = null;
    },
    update() {}
  })
}

const render = (container?: any) => {
  const root = container ? container : document.getElementById('root')
  root?.setAttribute("class", "ant-css-var"); // 可以全局使用antd css变量
  instance = ReactDOM.createRoot(root!)
  instance.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? '/promptWebMain' : '/'}>
          <RouteGuard>
            <Suspense fallback={<div>Loading...</div>}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#2970FF",
                    colorSuccess: "#2970FF",
                    colorWarning: "#f79009",
                    colorError: "#f04438",
                    borderRadius: 4,
                  },
                  cssVar: { key: "ant-css-var" },
                  hashed: false,
                  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                }}
                form={{ validateMessages }}
              >
                <App />
              </ConfigProvider>
            </Suspense>
          </RouteGuard>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
}


qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()


