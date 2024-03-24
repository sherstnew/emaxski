'use client';

import styles from './AdCard.module.scss';
import Image from 'next/image';
import phoneIcon from '@/static/icons/phone.svg';
import arrowDownIcon from '@/static/icons/arrow-down.svg';
import calendarIcon from '@/static/icons/calendar.svg';
import crossIcon from '@/static/icons/cross.svg';
import notFoundImg from '@/static/images/notfound.png';
import { useState } from 'react';
import { format } from 'date-fns';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { IAd } from '@/static/types/IAd';
import Link from 'next/link';
import classNames from 'classnames/bind';

import vkIcon from '@/static/icons/vk-colored.svg';
import tgIcon from '@/static/icons/telegram.svg';

const cx = classNames.bind(styles);

export default function AdCard(props: IAd) {
  const [contactsVisible, setContactsVisible] = useState<boolean>(false);

  const [modalImageVisible, setModalImageVisible] = useState<boolean>(false);
  const [imageIncreaseSrc, setImageIncreaseSrc] = useState<
    string | StaticImport
  >(notFoundImg);

  const imagesLength = props.images.length;

  return (
    <>
      {modalImageVisible ? (
        <div
          className={styles.modal_image}
          onClick={() => setModalImageVisible(false)}
        >
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
          <div
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
          </div>
        </div>
      ) : (
        ''
      )}
      <section className={styles.ad_card}>
        <section className={styles.ad_description}>{props.description}</section>
        <section
          className={styles.ad_gallery}
          style={{
            flexDirection: imagesLength === 3 ? 'column' : 'row',
            height:
              imagesLength === 3
                ? window.innerWidth > 768
                  ? '700px'
                  : '300px'
                : 'auto',
          }}
        >
          {props.images
            ? props.images.map((image, index) => (
                <Image
                  unoptimized={true}
                  key={index}
                  loader={() => process.env.NEXT_PUBLIC_BASE_URL + '/' + image}
                  src={process.env.NEXT_PUBLIC_BASE_URL + '/' + image}
                  alt='Фотография'
                  width={0}
                  height={0}
                  className={styles.gallery_image}
                  onClick={(event) => {
                    const target = event.target as HTMLImageElement;
                    if (target) {
                      setImageIncreaseSrc(target.src);
                      setModalImageVisible(true);
                    }
                  }}
                  style={
                    imagesLength === 1
                      ? { width: '25%', maxWidth: '50%', height: '100%' }
                      : imagesLength === 2
                      ? { width: '45%' }
                      : imagesLength === 3
                      ? {
                          width: '50%',
                          height: index === 0 ? '100%' : '49%',
                        }
                      : imagesLength === 4
                      ? {
                          width: '49%',
                          maxHeight: '400px',
                        }
                      : imagesLength > 4
                      ? {
                          width:
                            index < 2
                              ? '49%'
                              : String(100 / (imagesLength - 2) - 5) + '%',
                        }
                      : {}
                  }
                />
              ))
            : ''}
        </section>
        <footer className={styles.ad_footer}>
          <div className={styles.footer_left}>
            <div
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
            </div>
          </div>
          <div className={styles.footer_right}>
            <div className={styles.ad_date}>
              <Image
                src={calendarIcon}
                alt='Календарь'
                width={20}
                height={20}
              />
              <span>{format(props.added_time, 'dd.MM.yyyy')}</span>
            </div>
            <Link
              href={`/?category=${props.category}`}
              className={styles.ad_category}
            >
              {props.category}
            </Link>
          </div>
        </footer>
        {contactsVisible ? (
          <div className={styles.contacts}>
            <Image
              src={
                props.author_platform === 'vk'
                  ? vkIcon
                  : props.author_platform === 'tg'
                  ? tgIcon
                  : ''
              }
              width={30}
              height={30}
              alt='Иконка'
            />
            <Link target='_blank' href={props.author_link}>{props.author_platform_name}</Link>
          </div>
        ) : (
          ''
        )}
      </section>
    </>
  );
}
