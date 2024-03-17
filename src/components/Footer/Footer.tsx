import styles from './Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import vkIcon from '@/static/icons/vk-colored.svg';
import phoneIcon from '@/static/icons/phone.svg';
import viberIcon from '@/static/icons/viber.svg';
import whatsappIcon from '@/static/icons/whatsapp.svg';
import mailIcon from '@/static/icons/mail.svg';

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer_section}>
        <Image src={vkIcon} alt="ВКонтакте" width={30} height={30} className={styles.icon} />
        <Link href="https://vk.com/esldsdd" target='_blank'>vk.com/esldsdd</Link>
      </section>
      <section className={styles.footer_section}>
        <Image src={phoneIcon} alt="Телефон" width={30} height={30} className={styles.icon} />
        <Image src={viberIcon} alt="Viber" width={30} height={30} className={styles.icon} />
        <Image src={whatsappIcon} alt="Whatsapp" width={30} height={30} className={styles.icon} />
        <Link href={`tel:+79342434522`}>+7 (934) 243 45 22</Link>
      </section>
      <div className={styles.footer_section}>
        <Image src={mailIcon} alt="E-Mail" width={30} height={30} className={styles.icon} />
        <Link href={`mailto:info@emaxski.ru`}>info@emaxski.ru</Link>
      </div>
    </footer>
  );
}
