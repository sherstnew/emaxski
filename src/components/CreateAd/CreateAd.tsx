'use client';

import { useState, useContext } from 'react';
import Image from 'next/image';
import styles from './CreateAd.module.scss';
import classNames from 'classnames/bind';
import { ChangeEvent } from 'react';
import { CreateAdVisibleContext } from '@/contexts/CreateAdVisible';

import crossIcon from '@/static/icons/cross.svg';
import arrowDownIcon from '@/static/icons/arrow-down.svg';

const cx = classNames.bind(styles);

export default function CreateAd() {

  const { createAdVisible, setCreateAdVisible } = useContext(CreateAdVisibleContext);

  const [adText, setAdText] = useState('');

  const [files, setFiles] = useState<string[]>([]);

  const handleFiles = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = URL.createObjectURL(evt.target.files[0]);
      setFiles([...files, file]);
      return () => URL.revokeObjectURL(file);
    }
  };

  return (
    <div className={styles.create}>
      <div
        className={styles.hide}
        onClick={() => setCreateAdVisible(!createAdVisible)}
      >
        <span className={styles.hide_title}>{createAdVisible ? 'Свернуть' : 'Развернуть'}</span>
        {
          createAdVisible ?
          <Image src={crossIcon} alt='Свернуть' width={30} height={30} className={styles.cross} />
          :
          <Image src={arrowDownIcon} alt='Развернуть' width={30} height={30} className={styles.arrowdown} />
        }
      </div>
      <header className={styles.create_header}>Новое объявление</header>
      <div className={cx({ create_subheader: true, hidden: !createAdVisible })}>
        <span className={styles.bold}>Важно!</span>
        <span> Не забудьте указать контакты для связи с вами!</span>
      </div>
      <div className={cx({ ad_text: true, hidden: !createAdVisible })}>
        <textarea
          className={styles.textarea}
          placeholder='Введите текст вашего объявления'
          onChange={(evt) => setAdText(evt.target.value)}
          maxLength={500}
        ></textarea>
        <div className={styles.limit}>
          Осталось {500 - adText.length} символов
        </div>
      </div>
      <input
        type='text'
        className={cx({ contacts: true, hidden: !createAdVisible })}
        placeholder='Контакты для связи с вами'
      />
      <div className={cx({ photos: true, hidden: !createAdVisible })}>
        <header className={styles.photos_header}>Фотографии</header>
        <div className={styles.photos_gallery}>
          {files
            ? files.map((file, index) => (
                <Image
                  src={file}
                  key={index}
                  alt='Изображение'
                  width={0}
                  height={0}
                  className={styles.file_preview}
                />
              ))
            : ''}
        </div>
        <div className={styles.photos_btns}>
          <label className={styles.add_photo + ' ' + styles.button}>
            <input
              type='file'
              className={styles.file_input}
              onChange={handleFiles}
            />
            Добавить фото
          </label>
          <button className={styles.publish + ' ' + styles.button}>
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
}
