import React, { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import styles from './projects.module.css';
import InfoCardList, { InfoCardProps } from '../components/InfoCard';
import { ProjectCategory, ProjectCategoryLabels } from '../components/ProjectCategory';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import projects from '../data/projects';

const Intro = () => (
  <div className={styles.intro}>
    <h1 className={styles.introTitle}>
      <Translate>RevyOS 项目列表</Translate>
    </h1>
  </div>
);

const ProjectsInner: React.FC = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const isEn = currentLocale === 'en';

  // Group projects by category
  const grouped = useMemo(() => {
    return projects.reduce((acc, item) => {
      const cat = item.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, typeof projects>);
  }, [projects]);

  return (
    <div className={styles.container}>
      <Intro />
      {Object.entries(grouped).map(([cat, items]) => {
        const labelObj = Object.prototype.hasOwnProperty.call(ProjectCategoryLabels, cat)
          ? ProjectCategoryLabels[cat as keyof typeof ProjectCategoryLabels]
          : null;
        const categoryLabel = labelObj
          ? (isEn ? labelObj.en : labelObj.zh)
          : (isEn ? "Unknown Category" : "未知分类");
        return (
          <div key={cat} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              {categoryLabel}
            </h2>
            <div className={styles.cardListContainer}>
              <InfoCardList items={items} />
            </div>
          </div>
        );
      })}
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
