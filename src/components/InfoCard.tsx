import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import styles from './InfoCard.module.css'
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type InfoCardProps = {
  title: string;        // 标题，中文
  title_en?: string;    // 标题，英文
  logo?: string;        // logo， xx.xx -> xx.dark.xx for night mode
  subtitle?: string;
  subtitle_en?: string;
  description?: string;
  description_en?: string;
  link: string;         // Link
};

export const InfoCard: React.FC<InfoCardProps> = ({ title, title_en, logo, subtitle, subtitle_en, description, description_en, link }) => {
  const [dark, setDark] = useState(false);
  const { colorMode } = useColorMode();
  useEffect(() => {
    setDark(colorMode === 'dark');
  }, [[]])
  const [name, ext] = logo.split(/\.(?=[^.]+$)/);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const isEn = currentLocale === 'en';

  return (
    <div className={styles.card}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {logo &&
            (dark ?
              <img src={useBaseUrl(`${name}.dark.${ext}`)} alt={title} style={{ width: 40, height: 40, borderRadius: '50%' }} onError={(e) => (e.currentTarget.src = useBaseUrl(logo))} />
              :
              <img src={useBaseUrl(logo)} alt={title} style={{ width: 40, height: 40, borderRadius: '50%' }} />
            )
          }
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1em' }}>
              {isEn ? (title_en != null ? title_en : title) : title}
            </h3>
            <p className={styles.subTitle} style={{ margin: 0 }}>
              {isEn ? (subtitle_en != null ? subtitle_en : subtitle) : subtitle}
            </p>
          </div>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: '0.85em', color: dark ? '#aaa' : '#555' }}>
          {isEn ? (description_en != null ? description_en : description) : description}
        </p>
      </div>
      <div className={styles.cardActions}>
        <button className={styles.visitButton} onClick={() => window.open(link, '_blank')}>
          <Translate>访问项目</Translate>
        </button>
      </div>
    </div>
  );
};


const InfoCardList: React.FC<{ items: InfoCardProps[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <InfoCard key={index} {...item} />
      ))}
    </>
  );
};

export default InfoCardList;
