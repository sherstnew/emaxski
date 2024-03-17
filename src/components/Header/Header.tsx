'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useContext, useState, useEffect } from 'react';
import { CreateAdVisibleContext } from '@/contexts/CreateAdVisible';
import { animateScroll } from 'react-scroll';
import { useSearchParams } from 'next/navigation';

import companyLogo from '@/static/logos/company.png';
import arrowDownIcon from '@/static/icons/arrow-down.svg';
import vkIcon from '@/static/icons/vk-colored.svg';
import plusIcon from '@/static/icons/plus.svg';

import skisIcon from '@/static/icons/catalog/skis.png';
import skiPolesIcon from '@/static/icons/catalog/skipoles.png';
import skiFasteningIcon from '@/static/icons/catalog/skifastening.png';
import skiTrainingIcon from '@/static/icons/catalog/skitraining.png';
import skiRollersIcon from '@/static/icons/catalog/skirollers.png';
import sportPitIcon from '@/static/icons/catalog/sportpit.png';

import jacketIcon from '@/static/icons/catalog/jacket.png';
import bagIcon from '@/static/icons/catalog/bag.png';
import accessoryIcon from '@/static/icons/catalog/accessory.png';
import ointmentIcon from '@/static/icons/catalog/ointment.png';
import shoesIcon from '@/static/icons/catalog/shoes.png';
import bookIcon from '@/static/icons/catalog/book.png';

import pulseIcon from '@/static/icons/catalog/pulse.png';
import toolsIcon from '@/static/icons/catalog/tools.png';
import bootsIcon from '@/static/icons/catalog/boots.png';
import biatlonIcon from '@/static/icons/catalog/biatlon.png';

export default function Header() {
  const { setCreateAdVisible } = useContext(CreateAdVisibleContext);

  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const searchParams = useSearchParams();

  const createAd = () => {
    setCategoriesVisible(false);
    setCreateAdVisible(true);
    animateScroll.scrollToTop({ duration: 500, smooth: true });
  };

  useEffect(() => {
    setCategoriesVisible(false);
  }, [searchParams]);

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <div className={styles.menu_left}>
          <Link href="/" className={styles.logo}>
            <Image src={companyLogo} alt='Emaxski' width={155} height={36} />
          </Link>
          <button
            className={styles.categories + ' ' + styles.button}
            onClick={() =>
              setCategoriesVisible((categoriesVisible) => !categoriesVisible)
            }
          >
            <span className={styles.categories_title}>Категории объявлений</span>
            <Image
              src={arrowDownIcon}
              alt='Развернуть меню'
              width={20}
              height={20}
            />
          </button>
        </div>
        {categoriesVisible ?
        <div className={styles.catalog}>
          <div className={styles.catalog_col}>
            <Link href="/?category=Лыжи" className={styles.catalog_item}>
              <Image src={skisIcon} alt="Лыжи" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжи</span>
            </Link>
            <Link href="/?category=Лыжные палки" className={styles.catalog_item}>
              <Image src={skiPolesIcon} alt="Лыжные палки" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные палки</span>
            </Link>
            <Link href="/?category=Лыжные крепления" className={styles.catalog_item}>
              <Image src={skiFasteningIcon} alt="Лыжные крепления" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные крепления</span>
            </Link>
            <Link href="/?category=Лыжные тренажеры" className={styles.catalog_item}>
              <Image src={skiTrainingIcon} alt="Лыжные тренажеры" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные тренажеры</span>
            </Link>
            <Link href="/?category=Лыжероллеры" className={styles.catalog_item}>
              <Image src={skiRollersIcon} alt="Лыжероллеры" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжероллеры</span>
            </Link>
            <Link href="/?category=Спортивное питание" className={styles.catalog_item}>
              <Image src={sportPitIcon} alt="Спортивное питание" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Спортивное питание</span>
            </Link>
          </div>
          <div className={styles.catalog_col}>
            <Link href="/?category=Одежда" className={styles.catalog_item}>
              <Image src={jacketIcon} alt="Одежда" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Одежда</span>
            </Link>
            <Link href="/?category=Сумки, чехлы" className={styles.catalog_item}>
              <Image src={bagIcon} alt="Сумки, чехлы" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Сумки, чехлы</span>
            </Link>
            <Link href="/?category=Аксессуары" className={styles.catalog_item}>
              <Image src={accessoryIcon} alt="Аксессуары" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Аксессуары</span>
            </Link>
            <Link href="/?category=Лыжные мази" className={styles.catalog_item}>
              <Image src={ointmentIcon} alt="Лыжные мази" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные мази</span>
            </Link>
            <Link href="/?category=Лыжные ботинки" className={styles.catalog_item}>
              <Image src={shoesIcon} alt="Лыжные ботинки" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные ботинки</span>
            </Link>
            <Link href="/?category=Литература" className={styles.catalog_item}>
              <Image src={bookIcon} alt="Литература" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Литература</span>
            </Link>
          </div>
          <div className={styles.catalog_col}>
            <Link href="/?category=Пульсометры" className={styles.catalog_item}>
              <Image src={pulseIcon} alt="Пульсометры" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Пульсометры</span>
            </Link>
            <Link href="/?category=Инструменты" className={styles.catalog_item}>
              <Image src={toolsIcon} alt="Инструменты" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Инструменты</span>
            </Link>
            <Link href="/?category=Обувь" className={styles.catalog_item}>
              <Image src={bootsIcon} alt="Обувь" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Обувь</span>
            </Link>
            <Link href="/?category=Биатлон" className={styles.catalog_item}>
              <Image src={biatlonIcon} alt="Биатлон" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Биатлон</span>
            </Link>
          </div>
        </div>
      : ''}
        <div className={styles.menu_right}>
          <Link
            href='https://vk.com/esldsdd'
            target='_blank'
            className={styles.vk + ' ' + styles.button}
          >
            <Image src={vkIcon} alt='ВКонтакте' width={30} height={30} />
            <span className={styles.vk_title}>Наша группа</span>
          </Link>
          <button
            className={styles.new_ad + ' ' + styles.button}
            onClick={createAd}
          >
            <Image src={plusIcon} alt='Новое объявление' width={30} height={30} />
            <span className={styles.new_ad_title}>Подать объявление</span>
          </button>
        </div>
      </div>
    </header>
  );
}
