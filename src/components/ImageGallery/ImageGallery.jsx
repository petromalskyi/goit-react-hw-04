import css from './ImageGallery.module.css';

export default function ImageGallery({ items }) {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li className={css.item} key={item.id}>
          <div className={css.thumb}>
            <img src={item.urls.regular} alt="item.alt_description" />
          </div>
        </li>
      ))}
    </ul>
  );
}
