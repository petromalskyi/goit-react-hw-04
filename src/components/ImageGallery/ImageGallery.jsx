import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items, onClick }) {
  return (
    <ul className={css.list}>
      {items.map(({ id, urls: { small, regular }, alt_description }) => (
        <li className={css.item} key={id} onClick={onClick}>
          <ImageCard
            small={small}
            altDescription={alt_description}
            regular={regular}
          ></ImageCard>
        </li>
      ))}
    </ul>
  );
}
