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
    title: 'TH1520 Linux 内核(旧版本)',
    title_en: 'TH1520 Linux kernel (Old Version)',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/thead-kernel',
    subtitle_en: 'revyos/thead-kernel',
    description: '适用于 TH1520 芯片的旧版本 Linux kernel (5.10.113)',
    description_en: 'Old version of Linux kernel for TH1520 (5.10.113)',
    link: 'https://github.com/revyos/thead-kernel',
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
    title: 'K230 系统镜像构建脚本',
    title_en: 'K230 System Image Build Scripts',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/mkimg-k230',
    subtitle_en: 'revyos/mkimg-k230',
    description: 'K230 系统镜像构建脚本',
    description_en: 'System image build scripts for K230',
    link: 'https://github.com/revyos/mkimg-k230',
    category: ProjectCategory.BuildScripts,
  },
  {
    title: 'Xuantie C900 Bugs',
    title_en: 'Xuantie C900 Bugs',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/xuantie-c900-bugs',
    description: 'Xuantie C900 系列 CPU 硬件问题追踪',
    description_en: 'Xuantie C900-series CPU hardware bugs tracking',
    link: 'https://github.com/revyos/xuantie-c900-bugs',
    category: ProjectCategory.Documentation,
  },
  {
    title: 'RevyOS Docs Repo',
    title_en: 'RevyOS Docs Repo',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/docs',
    description: 'RevyOS 文档仓库',
    description_en: 'RevyOS documentation repository',
    link: 'https://github.com/revyos/docs',
    category: ProjectCategory.Documentation,
  },
  {
    title: 'External Docs',
    title_en: 'External Docs',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/external-docs',
    description: 'RevyOS 支持芯片的文档仓库',
    description_en: 'External documentation repository for RevyOS supported chips',
    link: 'https://github.com/revyos/external-docs',
    category: ProjectCategory.Documentation,
  },
  {
    title: 'T-HEAD U-Boot',
    title_en: 'T-HEAD U-Boot',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/thead-u-boot',
    description: 'T-HEAD 通用 U-Boot 固件',
    description_en: 'T-HEAD universal U-Boot firmware',
    link: 'https://github.com/revyos/thead-u-boot',
    category: ProjectCategory.Firmware,
  },
  {
    title: 'Linuxboot SG204x',
    title_en: 'Linuxboot SG204x',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/linuxboot-sg204x',
    description: '适用于 SG204x 的 LinuxBoot',
    description_en: 'LinuxBoot for SG204x',
    link: 'https://github.com/revyos/linuxboot-sg204x',
    category: ProjectCategory.Firmware,
  },
  {
    title: 'K230 Linux 内核',
    title_en: 'K230 Linux kernel',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/k230-linux-kernel',
    description: '适用于 K230 芯片的 Linux kernel',
    description_en: 'Linux kernel for K230',
    link: 'https://github.com/revyos/k230-linux-kernel',
    category: ProjectCategory.Kernel,
  },
  {
    title: 'Electron',
    title_en: 'Electron',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/debian-electron',
    description: 'Electron 包',
    description_en: 'Electron package',
    link: 'https://github.com/revyos/debian-electron',
    category: ProjectCategory.Electron,
  },
  {
    title: 'Code OSS',
    title_en: 'Code OSS',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/debian-code-oss',
    description: 'Code OSS 包',
    description_en: 'Code OSS package',
    link: 'https://github.com/revyos/debian-code-oss',
    category: ProjectCategory.Electron,
  },
  {
    title: 'Chromium',
    title_en: 'Chromium',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/chromium',
    description: 'Chromium 浏览器',
    description_en: 'Chromium browser package',
    link: 'https://github.com/revyos/chromium',
    category: ProjectCategory.Electron,
  },
  {
    title: 'Chromium 109.0.5414.119',
    title_en: 'Chromium 109.0.5414.119',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/chromium-109.0.5414.119',
    description: 'Chromium 109 版本',
    description_en: 'Chromium version 109.0.5414.119',
    link: 'https://github.com/revyos/chromium-109.0.5414.119',
    category: ProjectCategory.Electron,
  },
  {
    title: 'lmbench3',
    title_en: 'lmbench3',
    logo: '/img/github-mark.svg',
    subtitle: 'revyos/lmbench3',
    description: '适配 RevyOS 的 lmbench3 基准测试套件',
    description_en: 'lmbench3 benchmarking suite adapted for RevyOS',
    link: 'https://github.com/revyos/lmbench3',
    category: ProjectCategory.Benchmark,
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
