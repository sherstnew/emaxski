'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useContext, useState, useEffect } from 'react';
import { CreateAdVisibleContext } from '@/contexts/CreateAdVisible';
import { animateScroll } from 'react-scroll';
import { useSearchParams } from 'next/navigation';

import logo from '@/static/logos/logo_mobile.png';
import arrowDownIcon from '@/static/icons/arrow-down.svg';
import burgerMenuIcon from '@/static/icons/burger-menu.svg';
import vkIcon from '@/static/icons/vk.svg';
import vkBlueIcon from '@/static/icons/vk-blue.svg';
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

const cx = classNames.bind(styles);

export default function Header() {
  const { setCreateAdVisible } = useContext(CreateAdVisibleContext);

  const [categoriesVisible, setCategoriesVisible] = useState<boolean>(false);
  const [width, setWidth] = useState(0);

  const searchParams = useSearchParams();

  const createAd = () => {
    setCategoriesVisible(false);
    setCreateAdVisible(createAdVisible => !createAdVisible);
    animateScroll.scrollToTop({ duration: 500, smooth: true });
  };

  useEffect(() => {
    setCategoriesVisible(false);
  }, [searchParams]);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <div className={styles.menu_left}>
          <Link href="/" className={styles.logo}>
            <Image src={logo} alt='Emaxski' width={160} height={45} />
          </Link>
          <div
            className={styles.categories}
            onClick={() =>
              setCategoriesVisible((categoriesVisible) => !categoriesVisible)
            }
          >
            <span className={styles.categories_title}>Категории объявлений</span>
            {
              width !== 0 ?
                <Image
                  src={width < 768 ? burgerMenuIcon : arrowDownIcon}
                  alt='Развернуть меню'
                  width={35}
                  height={35}
                  className={cx({reversed: categoriesVisible && categoriesVisible !== null})}
                />
              :
              ''
            }
          </div>
        </div>
        <div className={cx({catalog: true, showed: categoriesVisible && categoriesVisible !== null, hidden: !categoriesVisible && categoriesVisible !== null})}>
          <div className={styles.catalog_col}>
            <Link href="/?category=лыжи" className={styles.catalog_item}>
              <Image src={skisIcon} alt="Лыжи" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжи</span>
            </Link>
            <Link href="/?category=палки" className={styles.catalog_item}>
              <Image src={skiPolesIcon} alt="Палки" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные палки</span>
            </Link>
            <Link href="/?category=крепления" className={styles.catalog_item}>
              <Image src={skiFasteningIcon} alt="Лыжные крепления" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные крепления</span>
            </Link>
            <Link href="/?category=тренажеры" className={styles.catalog_item}>
              <Image src={skiTrainingIcon} alt="Лыжные тренажеры" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные тренажеры</span>
            </Link>
            <Link href="/?category=лыжероллеры" className={styles.catalog_item}>
              <Image src={skiRollersIcon} alt="Лыжероллеры" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжероллеры</span>
            </Link>
            <Link href="/?category=спорт. питание" className={styles.catalog_item}>
              <Image src={sportPitIcon} alt="Спортивное питание" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Спортивное питание</span>
            </Link>
          </div>
          <div className={styles.catalog_col}>
            <Link href="/?category=одежда" className={styles.catalog_item}>
              <Image src={jacketIcon} alt="Одежда" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Одежда</span>
            </Link>
            <Link href="/?category=сумки" className={styles.catalog_item}>
              <Image src={bagIcon} alt="Сумки, чехлы" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Сумки, чехлы</span>
            </Link>
            <Link href="/?category=аксессуары" className={styles.catalog_item}>
              <Image src={accessoryIcon} alt="Аксессуары" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Аксессуары</span>
            </Link>
            <Link href="/?category=смазка" className={styles.catalog_item}>
              <Image src={ointmentIcon} alt="Лыжные мази" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные мази</span>
            </Link>
            <Link href="/?category=л. ботинки" className={styles.catalog_item}>
              <Image src={shoesIcon} alt="Лыжные ботинки" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Лыжные ботинки</span>
            </Link>
            <Link href="/?category=литература" className={styles.catalog_item}>
              <Image src={bookIcon} alt="Литература" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Литература</span>
            </Link>
          </div>
          <div className={styles.catalog_col}>
            <Link href="/?category=пульсометры" className={styles.catalog_item}>
              <Image src={pulseIcon} alt="Пульсометры" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Пульсометры</span>
            </Link>
            <Link href="/?category=инструменты" className={styles.catalog_item}>
              <Image src={toolsIcon} alt="Инструменты" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Инструменты</span>
            </Link>
            <Link href="/?category=обувь" className={styles.catalog_item}>
              <Image src={bootsIcon} alt="Обувь" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Обувь</span>
            </Link>
            <Link href="/?category=биатлон" className={styles.catalog_item}>
              <Image src={biatlonIcon} alt="Биатлон" width={40} height={40} className={styles.catalog_icon} />
              <span className={styles.catalog_category}>Биатлон</span>
            </Link>
          </div>
        </div>
        <div className={styles.menu_right}>
          <Link
            href='https://vk.com/emaxski'
            target='_blank'
            className={styles.vk + ' ' + styles.button}
          >
            <Image src={width > 768 ? vkIcon : vkBlueIcon} alt='ВКонтакте' width={30} height={30} />
            <span className={styles.vk_title}>Наша группа</span>
          </Link>
          <div
            className={styles.new_ad + ' ' + styles.button}
            onClick={createAd}
          >
            <Image src={plusIcon} alt='Новое объявление' width={30} height={30} />
            <span className={styles.new_ad_title}>Подать объявление</span>
          </div>
        </div>
      </div>
    </header>
  );
}
