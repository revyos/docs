import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

function Logo(){
  const [dark, setDark] = useState(false);
  const { colorMode } = useColorMode();
  useEffect(() => {
    setDark(colorMode === 'dark');
  },[[]])

  return (<img src={useBaseUrl(dark ? 'img/RevyOS-logo-dark.svg' : 'img/RevyOS-logo.svg')} alt="logo of RevyOS" className={styles.logo} />)
}


export default function Home() {
  return (
    <Layout title={translate({ message: 'RevyOS - 玄铁生态的 Debian 发行版' })}>
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <Logo />
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
