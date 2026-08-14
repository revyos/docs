import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './InfoCard.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { ProjectCategory } from './ProjectCategory';
import { ProjectCategoryLabels } from './ProjectCategory';

export type InfoCardProps = {
  title: string;        // 标题，中文
  title_en?: string;    // 标题，英文
  logo?: string;        // 保留字段以兼容旧数据，新版以分类图标方块代替
  subtitle?: string;
  subtitle_en?: string;
  description?: string;
  description_en?: string;
  link: string;         // Link
  category: ProjectCategory; // 分类枚举，必填
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  title_en,
  subtitle,
  subtitle_en,
  description,
  description_en,
  link,
  category,
}) => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const isEn = currentLocale === 'en';
  const meta = ProjectCategoryLabels[category];
  const displayTitle = isEn ? (title_en ?? title) : title;
  const displaySubtitle = isEn ? (subtitle_en ?? subtitle) : subtitle;
  const displayDescription = isEn ? (description_en ?? description) : description;
  const categoryLabel = isEn ? meta.en : meta.zh;

  return (
    <a
      className={styles.card}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-category={category}
    >
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {meta.icon}
        </span>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{displayTitle}</h3>
          {displaySubtitle && <p className={styles.subtitle}>{displaySubtitle}</p>}
        </div>
        <span className={styles.badge}>{categoryLabel}</span>
      </div>

      {displayDescription && (
        <p className={styles.description}>{displayDescription}</p>
      )}

      <div className={styles.footer}>
        <span className={styles.viewLink}>
          <Translate>在 GitHub 查看</Translate>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  );
};

const InfoCardList: React.FC<{ items: InfoCardProps[] }> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <InfoCard key={item.subtitle || item.link} {...item} />
      ))}
    </>
  );
};

export default InfoCardList;
