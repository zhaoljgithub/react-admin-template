import { Button, Col, Form, Input, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import Styles from "./login.module.scss";
import {
  DoubleRightOutlined,
  CheckCircleOutlined,
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

type FieldType = {
  username?: string;
  password?: string;
  sliderChecked?: boolean;
  codeVal: string
};

export default function Login() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sliderChecked, setSliderChecked] = useState(false);
  const [confirmWords, setConfirmWords] = useState("请将滑块移至右侧");
  const [codeImg] = useState("");
  let isSliderFinish = useRef(false);

  useEffect(()=> {
    refreshCode()
  }, [])

  const onFinish = (values: any) => {
    if (!sliderChecked) {
      message.warning("请滑动滑块");
      return;
    }
    console.log("Success:", values);
    setLoading(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleTriggerMouseDown = (event: any) => {
    console.log(isSliderFinish);
    if (isSliderFinish.current) return;

    const trigger = event.currentTarget;
    // /** @type {HTMLElement} */
    const sliderCheck = trigger.parentElement;
    const sliderWidth = sliderCheck.getBoundingClientRect().width;
    const triggerWidth = trigger.getBoundingClientRect().width;
    const clientXStart = event.clientX;
    const progressDone = sliderWidth - triggerWidth;

    const onMouseMove = (event: any) => {
      const progress = Math.min(
        progressDone,
        Math.max(0, event.clientX - clientXStart)
      );

      sliderCheck.style.setProperty("--slider-check-progress", `${progress}px`);

      console.log(progress);

      if (progress === progressDone) {
        setSliderChecked(true);
        isSliderFinish.current = true;
        setConfirmWords("验证通过");
        onMouseUp();
      }
    };
    
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      if (!isSliderFinish.current) {
        sliderCheck.style.setProperty("--slider-check-progress", `0px`);
      }
      console.log(isSliderFinish);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const iconStyle = {
    color: "#A0A0AB",
    fontSize: "20px",
  };

  const refreshCode = () => {
    console.log('refreshCode')
  }

  

  return (
    <div className={Styles.login}>
      <div className={Styles["login-left"]}>
      </div>
      <div className={Styles["login-right"]}>
        <div className={Styles["login-right-title"]}>
          <h1>您好！</h1>
          <div>
            欢迎登录
          </div>
        </div>
        <Form
          className={Styles["login-form"]}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              className={Styles["login-form-input"]}
              placeholder="请输入用户名"
              prefix={<UserOutlined style={iconStyle} />}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              className={Styles["login-form-input"]}
              placeholder="请输入密码"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={iconStyle} />
                ) : (
                  <EyeInvisibleOutlined style={iconStyle} />
                )
              }
              prefix={<LockOutlined style={iconStyle} />}
            />
          </Form.Item>
          <Form.Item
            name="codeVal"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            
             
             <Row gutter={8}>
                <Col span={14}>
                  <Input
                    className={Styles["login-form-input"]}
                    placeholder="请输入验证码"
                    prefix={<UserOutlined style={iconStyle} />}
                  />
                </Col>
                <Col span={10}>
                  <img src={codeImg} alt="codeImg" onClick={refreshCode}/>
                </Col>
              </Row>
          </Form.Item>

          <Form.Item<FieldType>
            name="sliderChecked"
            rules={[
              {
                validator: () => {
                  if (sliderChecked) return Promise.resolve();
                  return Promise.reject(new Error("请移动滑块"));
                },
              },
            ]}
          >
            <div
              className={`${Styles["slider-check"]} ${
                sliderChecked ? Styles["is-checked"] : null
              } `}
            >
              <div className={Styles["slider-check__progress"]} />
              <div className={Styles["slider-check__text"]}>{confirmWords}</div>
              <div
                className={Styles["slider-check__trigger"]}
                onMouseDown={handleTriggerMouseDown}
              >
                {sliderChecked ? (
                  <CheckCircleOutlined />
                ) : (
                  <DoubleRightOutlined />
                )}
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              loading={loading}
              htmlType="submit"
              style={{ width: "100%" }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
