import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemCard.module.scss';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={item.imageUrl} 
          alt={item.title} 
          width={400} 
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.category}>{item.category}</p>
        <p className={styles.price}>${item.price.toFixed(2)}</p>
        <Link href={`/item/${item.id}`} className={styles.viewButton}>
          View Details
        </Link>
      </div>
    </div>
  );
} 