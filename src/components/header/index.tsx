import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ss } from "@/utils/storage";
import Styles from "./header.module.scss";

export default function Header() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      type: "group",
      label: (
        <div className={`${Styles["header_avatar__drop"]} border-bottom pd12`}>
          <div></div>
          <div className="txt">{userName}</div>
        </div>
      ),
      children: [
        {
          key: "loginout",
          label: (
            <div className={`${Styles["header_avatar__drop"]}`}>
              <div className="txt">退出系统</div>
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    const name = ss.get("userInfo")?.userName;
    setUserName(name);
  }, []);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "settings") {
      navigate("/settings");
    } else if (key === "loginout") {
      localStorage.clear();
      navigate("/login");
      return;
    }
    console.info(`Click on item ${key}`);
  };
  return (
    <div className="header">
      <div className="logo">
      </div>
      <div className="user">
        {/* <span>{userName} </span> */}
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          {/* <a onClick={(e) => e.preventDefault()}> */}
          <Space>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <span
              style={{ fontSize: "14px", color: "#A0A0AB", fontWeight: 500 }}
            >
              {userName}
            </span>
            <DownOutlined
              style={{ fontSize: "10px", color: "#A0A0AB", fontWeight: 500 }}
            />
          </Space>
          {/* </a> */}
        </Dropdown>
      </div>
    </div>
  );
}
