import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items, onClick }) {
  return (
    <ul className={css.list}>
      {items.map(({ id, urls: { small, regular }, alt_description }) => (
        <li className={css.item} key={id}>
          <ImageCard
            small={small}
            altDescription={alt_description}
            regular={regular}
            onClick={onClick}
          ></ImageCard>
        </li>
      ))}
    </ul>
  );
}
