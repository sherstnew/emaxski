'use client';

import { useState, useContext, FormEvent } from 'react';
import Image from 'next/image';
import styles from './CreateAd.module.scss';
import classNames from 'classnames/bind';
import { ChangeEvent } from 'react';
import { CreateAdVisibleContext } from '@/contexts/CreateAdVisible';
import { categories } from '@/static/data/categories';
import { Montserrat } from "next/font/google";

import crossIcon from '@/static/icons/cross.svg';
import arrowDownIcon from '@/static/icons/arrow-down.svg';
import likeIcon from '@/static/icons/like.svg';

interface IUploadeImageResponse {
  filename: string;
}

const cx = classNames.bind(styles);
const font = Montserrat({ subsets: ["latin", "cyrillic"] });

export default function CreateAd() {
  const { createAdVisible, setCreateAdVisible } = useContext(
    CreateAdVisibleContext
  );

  const [adText, setAdText] = useState('');
  const [contacts, setContacts] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const [invalidClass, setInvalidClass] = useState(false);

  const [modalThanksVisible, setModalThanksVisible] = useState(false);

  const [files, setFiles] = useState<string[]>([]);

  const createAd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (adText !== "" && contacts !== "" && category !== "" && price !== "" && contacts.includes("://") && (contacts.includes("vk.") || contacts.includes("t.me")) && Number(price)) {
      const currentDate = new Date();
      const addedTime = currentDate.toISOString();

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pweb/ad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author_platform: contacts.split('/')[2].split('.')[0],
          author_platform_id: 0,
          author_link: contacts,
          author_platform_name: 'Аноним',
          category: category,
          price: Number(price),
          description: adText,
          images: files,
          added_time: addedTime,
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data === 'ok') {
          setModalThanksVisible(true);
          setAdText('');
          setContacts('');
          setCategory('');
          setPrice('');
          setFiles([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      setInvalidClass(true);
    }
  };

  const handleFiles = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const file = evt.target.files[0];

      const extension = file.name.split('.').pop();

      let formData = new FormData();
      formData.append('extension', extension || '');
      formData.append('file', file);

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadImage`, {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer 20bc39bb77ede5d1351c315037dfcbc6c8bff91624469900adda1ba9e93912fd',
        },
        body: formData,
      })
        .then((res: any) => res.json())
        .then((data: IUploadeImageResponse) => {
          if (data) {
            setFiles([...files, "static/" + data.filename]);
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form className={cx({create: true, rolled: !createAdVisible})} onClick={() => !createAdVisible ? setCreateAdVisible(true) : ''} onSubmit={(event) => createAd(event)}>
        <div
          className={styles.hide}
          onClick={() => setCreateAdVisible(!createAdVisible)}
        >
          <span className={styles.hide_title}>
            {createAdVisible ? 'Свернуть' : 'Развернуть'}
          </span>
          {createAdVisible ? (
            <Image
              src={crossIcon}
              alt='Свернуть'
              width={30}
              height={30}
              className={styles.cross}
            />
          ) : (
            <Image
              src={arrowDownIcon}
              alt='Развернуть'
              width={30}
              height={30}
              className={styles.arrowdown}
            />
          )}
        </div>
        <header className={styles.create_header}>Новое объявление</header>
        <div
          className={cx({ create_subheader: true, hidden: !createAdVisible })}
        >
          <span className={styles.bold}>Важно!</span>
          <span> Не забудьте указать контакты для связи с вами!</span>
        </div>
        <div className={cx({ ad_text: true, hidden: !createAdVisible })}>
          <textarea
            className={cx({textarea: true, invalid: adText === "" && invalidClass})}
            placeholder='Введите текст вашего объявления'
            onChange={(evt) => setAdText(evt.target.value)}
            value={adText}
            maxLength={500}
          ></textarea>
          <div className={styles.limit}>
            Осталось {500 - adText.length} символов
          </div>
        </div>
        <input
          type='text'
          className={cx({ contacts: true, hidden: !createAdVisible, invalid: contacts === "" && invalidClass && !(contacts.includes("://") && (contacts.includes("vk.") || contacts.includes("t.me"))) })}
          placeholder='Контакты для связи с вами (ссылка ВК или Телеграм)'
          onChange={(evt) => setContacts(evt.target.value)}
          value={contacts}
        />
        <select className={cx({ category: true, hidden: !createAdVisible, invalid: category === "" && invalidClass })} onChange={(evt) => setCategory(evt.target.value)} value={category}>
          <option value="">Выберите категорию</option>
          {
            categories.map((category, index) => (
              <option className={styles.category_option} key={index} value={category.title} style={font.style}>
                {
                  category.title
                }
              </option>
            ))
          }
        </select>
        <input
          type='number'
          className={cx({ price: true, hidden: !createAdVisible, invalid: (price === "" || price === "0") && invalidClass })}
          placeholder='Цена (в ₽)'
          onChange={(evt) => setPrice(evt.target.value)}
          value={price}
        />
        <div className={cx({ photos: true, hidden: !createAdVisible })}>
          <header className={styles.photos_header}>Фотографии</header>
          <div className={styles.photos_gallery}>
            {files
              ? files.map((file, index) => (
                  <Image
                    loader={() => `${process.env.NEXT_PUBLIC_BASE_URL}/${file}`}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${file}`}
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
            <button type="submit" className={styles.publish + ' ' + styles.button}>
              Опубликовать
            </button>
          </div>
        </div>
      </form>

      {modalThanksVisible ? (
        <div className={styles.modal_thanks}>
          <div className={styles.thanks}>
            <Image
              src={likeIcon}
              alt='Палец вверх'
              className={styles.thanks_like}
            />
            <header className={styles.thanks_header}>
              Ваше объявление отправлено!
            </header>
            <span className={styles.thanks_subheader}>
              В ближайшее время наш модератор проверит его и добавит на сайт.
            </span>
          </div>
          <div

            className={styles.modal_close}
            onClick={() => setModalThanksVisible(false)}
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
    </>
  );
}
