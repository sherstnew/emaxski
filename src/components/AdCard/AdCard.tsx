'use client';

import styles from './AdCard.module.scss';
import Image from 'next/image';
import phoneIcon from '@/static/icons/phone.svg';
import arrowDownIcon from '@/static/icons/arrow-down.svg';
import calendarIcon from '@/static/icons/calendar.svg';
import crossIcon from '@/static/icons/cross.svg';
import notFoundImg from '@/static/images/notfound.png';
import { MouseEvent, useState } from 'react';
import { format } from 'date-fns';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/navigation';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface IAdCardProps {
  description: string;
  photos: string[];
  contacts: string;
  category: string;
  date: string;
}

export default function AdCard(props: IAdCardProps) {
  const [contactsVisible, setContactsVisible] = useState<boolean>(false);

  const [modalImageVisible, setModalImageVisible] = useState<boolean>(false);
  const [imageIncreaseSrc, setImageIncreaseSrc] = useState<
    string | StaticImport
  >(notFoundImg);

  return (
    <>
      {modalImageVisible ? (
        <div className={styles.modal_image}>
          <button
            type='button'
            className={styles.modal_close}
            onClick={() => setModalImageVisible(false)}
          >
            <Image
              src={crossIcon}
              alt='Закрыть'
              width={40}
              height={40}
              className={styles.cross}
            />
          </button>
          <Image
            loader={() =>
              typeof imageIncreaseSrc == 'string' ? imageIncreaseSrc : ''
            }
            src={imageIncreaseSrc}
            className={styles.image}
            alt='Картинка'
            width={0}
            height={400}
          />
        </div>
      ) : (
        ''
      )}
      <section className={styles.ad_card}>
        <section className={styles.ad_description}>{props.description}</section>
        <section className={styles.ad_gallery}>
          {props.photos
            ? props.photos.map((photo, index) => (
                <Image
                  key={index}
                  loader={() => photo}
                  src={photo}
                  alt='Фотография'
                  width={0}
                  height={200}
                  className={styles.gallery_image}
                  onClick={(event) => {
                    const target = event.target as HTMLImageElement;
                    if (target) {
                      setImageIncreaseSrc(target.src);
                      setModalImageVisible(true);
                    }
                  }}
                />
              ))
            : ''}
        </section>
        <footer className={styles.ad_footer}>
          <div className={styles.footer_left}>
            <button
              type='button'
              className={styles.show_contacts_btn}
              onClick={() =>
                setContactsVisible((contactsVisible) => !contactsVisible)
              }
            >
              <Image src={phoneIcon} alt='Контакты' width={20} height={20} />
              <span>
                {contactsVisible ? 'Скрыть контакты' : 'Показать контакты'}
              </span>
              <Image
                src={arrowDownIcon}
                alt='Контакты'
                width={20}
                height={20}
                className={cx({ arrow: true, reversed: contactsVisible })}
              />
            </button>
          </div>
          <div className={styles.footer_right}>
            <div className={styles.ad_date}>
              <Image
                src={calendarIcon}
                alt='Календарь'
                width={20}
                height={20}
              />
              <span>{format(props.date, 'dd.MM.yyyy')}</span>
            </div>
            <Link href={`/?category=${props.category}`} className={styles.ad_category}>{props.category}</Link>
          </div>
        </footer>
        {
          contactsVisible
          ?
          <div className={styles.contacts}>{props.contacts}</div>
          :
          ""
        }
      </section>
    </>
  );
}