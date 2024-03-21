'use client'

import { Suspense, useEffect, useState } from 'react';
import AdCard from '../AdCard/AdCard';
import styles from './AdList.module.scss';
import { useSearchParams } from 'next/navigation';
import { IAd } from '@/static/types/IAd';
import { loadAds } from '@/utils/loadAds';
import { ColorRing } from 'react-loader-spinner';

export default function AdList() {

  const searchParams = useSearchParams();

  const [ads, setAds] = useState<IAd[]>([]);
  const [offset, setOffset] = useState<number>(25);

  const [status, setStatus] = useState<'initial' | 'success' | 'loading'>('initial');

  useEffect(() => {
    setStatus('loading');
    loadAds(searchParams.get('category'), 0)
    .then(newAds => {
      setAds(newAds);
      setStatus('success');
    })
    .catch(err => {
      setAds([]);
    });
  }, [searchParams]);

  const refreshAds = () => {
    setStatus('loading');
    loadAds(searchParams.get('category'), offset)
    .then(newAds => {
      setAds([...ads, ...newAds]);
      setOffset(offset => offset + 25);
      setStatus('success');
    })
    .catch(err => {
      setAds([]);
    });
  };


  return (
    <Suspense>
      <div className={styles.ad_list}>
        <header className={styles.header}>Объявления</header>
        <div className={styles.list}>
          {ads ? ads.map((ad, index) => <AdCard {...ad} key={index} />) : ''}
        </div>
        {
          ads ?
          <button className={styles.load_ads} onClick={refreshAds}>
            {
              status === 'loading'
              ?
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="loader"
                wrapperStyle={{}}
                colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
              />
              :
              <span>Загрузить ещё</span>
            }
          </button>
        :
        ''
        }
      </div>
    </Suspense>
  );
}
