import React from "react";
import { useEffect, useState } from "react";

interface RedirectProps {
  windowsLink: string;
  otherLink: string;
  description: string;
}

/**
 * 根据用户的 User-Agent 选择合适的链接，并动态渲染 <a> 标签。
 * @param {string} windowsLink - Windows 用户的跳转链接
 * @param {string} otherLink - 其他系统用户的跳转链接
 * @param {string} description - 显示的文字
 * @returns a标签。
 */
export const RedirectBasedOnUA: React.FC<RedirectProps> = ({ windowsLink, otherLink, description }) => {
  const [targetLink, setTargetLink] = useState<string>("");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isWindows = userAgent.includes("windows");
    setTargetLink(isWindows ? windowsLink : otherLink);
  }, [windowsLink, otherLink]);

  return <a href={targetLink}>{description}</a>; 
};
