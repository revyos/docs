import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import styles from './projects.module.css';
import InfoCardList, { InfoCardProps } from '../components/InfoCard';
import { ProjectCategory, ProjectCategoryLabels } from '../components/ProjectCategory';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Intro = () => (
  <div className={styles.intro}>
    <h1 className={styles.introTitle}>
      <Translate>RevyOS 项目列表</Translate>
    </h1>
  </div>
);

const projects: InfoCardProps[] = [
  {
    title: 'TH1520 Linux 内核',
    title_en: 'TH1520 Linux kernel',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/th1520-linux-kernel',
    subtitle_en: 'revyos/th1520-linux-kernel',
    description: '适用于 TH1520 芯片的 Linux kernel',
    description_en: 'Linux kernel for TH1520',
    link: 'https://github.com/revyos/th1520-linux-kernel',
    category: ProjectCategory.Kernel,
  },
  {
    title: 'TH1520 Boot Firmware',
    title_en: 'TH1520 Boot Firmware',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/th1520-boot-firmware',
    subtitle_en: 'revyos/th1520-boot-firmware',
    description: '适用于 TH1520 芯片的 boot firmware',
    description_en: 'Boot firmware for TH1520',
    link: 'https://github.com/revyos/th1520-boot-firmware',
    category: ProjectCategory.Firmware,
  },
  {
    title: 'SG2044 Linux 内核',
    title_en: 'SG2044 Linux kernel',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/sg2044-vendor-kernel',
    subtitle_en: 'revyos/sg2044-vendor-kernel',
    description: '适用于 SG2044 芯片的 Linux kernel',
    description_en: 'Linux kernel for SG2044',
    link: 'https://github.com/revyos/sg2044-vendor-kernel',
    category: ProjectCategory.Kernel,
  },
  {
    title: 'SG2042 Linux 内核',
    title_en: 'SG2042 Linux kernel',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/sg2042-vendor-kernel',
    subtitle_en: 'revyos/sg2042-vendor-kernel',
    description: '适用于 SG2042 芯片的 Linux kernel',
    description_en: 'Linux kernel for SG2042',
    link: 'https://github.com/revyos/sg2042-vendor-kernel',
    category: ProjectCategory.Kernel,
  },
  {
    title: 'TH1520 系统镜像构建脚本',
    title_en: 'TH1520 System Image Build Scripts',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/mkimg-th1520',
    subtitle_en: 'revyos/mkimg-th1520',
    description: 'TH1520 系统镜像构建脚本',
    description_en: 'System image build scripts for TH1520',
    link: 'https://github.com/revyos/mkimg-th1520',
    category: ProjectCategory.BuildScripts,
  },
  {
    title: 'SG2042 系统镜像构建脚本',
    title_en: 'SG2042 System Image Build Scripts',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/mkimg-sg2042',
    subtitle_en: 'revyos/mkimg-sg2042',
    description: 'SG2042 系统镜像构建脚本',
    description_en: 'System image build scripts for SG2042',
    link: 'https://github.com/revyos/mkimg-sg2042',
    category: ProjectCategory.BuildScripts,
  },
  {
    title: 'RevyOS 文档站',
    title_en: 'RevyOS Docs',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/revyos-docs',
    subtitle_en: 'revyos/revyos-docs',
    description: 'RevyOS 文档站和项目列表',
    description_en: 'RevyOS documentation site and project list',
    link: 'https://github.com/revyos/revyos-docs',
    category: ProjectCategory.Documentation,
  },
];

const ProjectsInner: React.FC = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isEn = currentLocale === 'en';

  // Group projects by category
  const grouped = projects.reduce((acc, item) => {
    const key = item.category || '';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, InfoCardProps[]>);

  return (
    <div className={styles.container}>
      <Intro />
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>
            {isEn
              ? ProjectCategoryLabels[cat as ProjectCategory].en
              : ProjectCategoryLabels[cat as ProjectCategory].zh}
          </h2>
          <div className={styles.cardListContainer}>
            <InfoCardList items={items} />
          </div>
        </div>
      ))}
    </div>
  );
};

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
