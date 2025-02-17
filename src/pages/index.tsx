import React from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  return (
    <Layout title={translate({message: 'RevyOS - 玄铁生态的 Debian 发行版'})}>
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <img src={useBaseUrl('img/logo.svg')} alt="logo of RevyOS" />
          <p className="hero__subtitle">
            <Translate>针对 XuanTie 生态芯片优化的 Debian 发行版</Translate>
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              <Translate>开始使用</Translate>
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
