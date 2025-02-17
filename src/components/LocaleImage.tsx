import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

interface LocaleImageProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * 根据 Docusaurus 当前语言动态加载对应的图片。
 * 如果指定语言的图片不存在，则回退到默认图片（输入的 `src` ）。
 * 
 * @param {string} src - 原图片路径，例如 "/img/image-for-flash/BE1.png"
 * @param {string} [alt] - 图片的 alt 
 * @param {string} [className]
 * @returns {JSX.Element}
 */
const LocaleImage: React.FC<LocaleImageProps> = ({ src, alt = "", className = "" }) => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const [name, ext] = src.split(/\.(?=[^.]+$)/);
  const localizedSrc = useBaseUrl(`${name}.${currentLocale}.${ext}`);
  const defaultSrc = useBaseUrl(src);

  return (
    <img src={localizedSrc} alt={alt} className={className} onError={(e) => (e.currentTarget.src = defaultSrc)} />
  );
};

export default LocaleImage;
