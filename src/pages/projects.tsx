import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import styles from './projects.module.css';
import InfoCardList, { InfoCardProps } from '../components/InfoCard';

const Intro = () => (
  <div className={styles.intro}>
    <h1 className={styles.introTitle}>
      <Translate>RevyOS 项目列表</Translate>
    </h1>
  </div>
);

const projects: InfoCardProps[] = [
  {
    title: 'th1520-linux-kernel',
    title_en: 'th1520-linux-kernel',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/th1520-linux-kernel',
    subtitle_en: 'revyos/th1520-linux-kernel',
    description: 'TH1520 的 Linux kernel',
    description_en: 'Linux kernel for TH1520',
    link: 'https://github.com/revyos/th1520-linux-kernel'
  },
  {
    title: 'th1520-boot-firmware',
    title_en: 'th1520-boot-firmware',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/th1520-boot-firmware',
    subtitle_en: 'revyos/th1520-boot-firmware',
    description: 'TH1520 的 boot firmware',
    description_en: 'Boot firmware for TH1520',
    link: 'https://github.com/revyos/th1520-boot-firmware'
  },
  {
    title: 'RevyOS anheng-image',
    title_en: 'RevyOS anheng-image',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/anheng-image',
    subtitle_en: 'revyos/anheng-image',
    description: 'RevyOS 安恒镜像构建脚本',
    description_en: 'RevyOS anheng-image build scripts',
    link: 'https://github.com/revyos/anheng-image'
  },
  {
    title: 'RevyOS anheng-profiles',
    title_en: 'RevyOS anheng-profiles',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/anheng-profiles',
    subtitle_en: 'revyos/anheng-profiles',
    description: 'RevyOS 安恒设备支持包',
    description_en: 'RevyOS anheng-profiles device support package',
    link: 'https://github.com/revyos/anheng-profiles'
  },
  {
    title: 'RevyOS (本站)',
    title_en: 'RevyOS (This Site)',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/revyos-docs',
    subtitle_en: 'revyos/revyos-docs',
    description: 'RevyOS 文档站和项目列表',
    description_en: 'RevyOS documentation site and project list',
    link: 'https://github.com/revyos/revyos-docs'
  },
];

const ProjectsInner: React.FC = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <div
      className={styles.container}
    >
      <Intro />
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
