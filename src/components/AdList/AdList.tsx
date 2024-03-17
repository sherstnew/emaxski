import AdCard from '../AdCard/AdCard';
import styles from './AdList.module.scss';
import { useSearchParams } from 'next/navigation';

const ads = [
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor elit nec iaculis ultricies. Donec felis ipsum, tempor ac diam quis, commodo maximus felis. Nam sit amet neque vitae nisl imperdiet semper. Praesent aliquet varius nisl, at sodales elit elementum non. Etiam non neque eu enim commodo consequat. Aliquam cursus rhoncus lectus et pellentesque. Vivamus ut lacinia urna. Sed dui velit, fringilla tempus venenatis ac, pretium vitae ligula. Aliquam sit amet augue semper, congue diam et, mollis turpis. Vestibulum vestibulum purus vel sagittis consequat.',
    photos: [
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
    ],
    contacts: '+79104569850',
    category: 'Лыжи',
    date: '2024-03-15T18:25:57.442000',
  },
  {
    description: 'Продам гараж',
    photos: [
      'https://osovet64.ru/wp-content/uploads/e/d/3/ed30dfa14aeb2eafb59e94f2b47b0e7b.png',
    ],
    contacts: 'sherstnev.denis.v@gmail.com',
    category: 'Литература',
    date: '2024-03-15T18:25:57.442000',
  },
];

export default function AdList() {

  const searchParams = useSearchParams();

  return (
    <div className={styles.ad_list}>
      <header className={styles.header}>Объявления</header>
      {ads ? ads.filter(ad => searchParams.get('category') ? ad.category === searchParams.get('category') : true).map((ad, index) => <AdCard {...ad} key={index} />) : ''}
    </div>
  );
}
