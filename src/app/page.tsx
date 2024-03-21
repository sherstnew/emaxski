'use client'

import styles from "./page.module.scss";
import Header from './../components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CreateAd from './../components/CreateAd/CreateAd';
import AdList from './../components/AdList/AdList';

import { useState, Suspense } from 'react';

import { CreateAdVisibleContext } from '@/contexts/CreateAdVisible';

export default function Home() {

  const [createAdVisible, setCreateAdVisible] = useState(false);

  return (
    <CreateAdVisibleContext.Provider value={{createAdVisible: createAdVisible, setCreateAdVisible: setCreateAdVisible}}>
      <Suspense>
        <Header />
        <main className={styles.main}>
          <CreateAd />
          <AdList />
        </main>
        <Footer />
      </Suspense>
    </CreateAdVisibleContext.Provider>
  );
}
