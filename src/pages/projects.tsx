import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import styles from './projects.module.css';
import InfoCardList, { InfoCardProps } from '../components/InfoCard';

const projects: InfoCardProps[] = [
  {
    title: 'th1520-linux-kernel',
    title_en: 'th1520-linux-kernel',
    logo: '/img/github-mark.svg',
    subtitle: 'th1520-linux-kernel',
    subtitle_en: 'th1520-linux-kernel',
    description: 'TH1520 的 Linux kernel',
    description_en: 'Linux kernel for TH1520',
    link: 'https://github.com/revyos/th1520-linux-kernel'
  },
  {
    title: 'th1520-boot-firmware',
    title_en: 'th1520-boot-firmware',
    logo: '/img/github-mark.svg',
    subtitle: 'th1520-boot-firmware',
    subtitle_en: 'th1520-boot-firmware',
    description: 'TH1520 的 boot firmware',
    description_en: 'Boot firmware kernel for TH1520',
    link: 'https://github.com/revyos/th1520-boot-firmware'
  },
];

const ProjectsInner: React.FC = () => {
  const [dark, setDark] = useState(false);
  const { colorMode } = useColorMode();
  useEffect(() => {
    setDark(colorMode === 'dark');
  }, [[]])

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: dark ? '#1a1a1a' : '#f9f9f9',
        color: dark ? '#fff' : '#333',
        padding: '40px 20px',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: 'px' }}>
        <Translate>RevyOS 项目列表</Translate>
      </h1>
      <div className={styles.cardListContainer}>
        <InfoCardList items={projects} />
      </div>
    </div>
  )
}

const ProjectsPage: React.FC = () => {
  return (
    <Layout
      title={translate({ message: 'RevyOS 项目列表' })}
    >
      <ProjectsInner />
    </Layout>
  );
};

export default ProjectsPage;
