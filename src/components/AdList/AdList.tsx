'use client'

import { useEffect, useState } from 'react';
import AdCard from '../AdCard/AdCard';
import styles from './AdList.module.scss';
import { useSearchParams } from 'next/navigation';
import { IAd } from '@/static/types/IAd';

export default function AdList() {

  const searchParams = useSearchParams();

  const [ads, setAds] = useState<IAd[]>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pweb/ads`)
    .then(res => res.json())
    .then(data => {
      if (data) {
        setAds(data);
      };
    })
    .catch(err => {
      console.log(err);
    });
  }, [searchParams]);

  return (
    <div className={styles.ad_list}>
      <header className={styles.header}>Объявления</header>
      {ads ? ads.filter(ad => searchParams.get('category') ? ad.category === searchParams.get('category') : true).map((ad, index) => <AdCard {...ad} key={index} />) : ''}
    </div>
  );
}
