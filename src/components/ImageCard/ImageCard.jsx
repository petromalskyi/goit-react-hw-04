import css from './ImageCard.module.css';

export default function ImageCard({ small, altDescription, regular }) {
  return (
    <div className={css.thumb}>
      <img src={small} alt={altDescription} data-action={regular} />
    </div>
  );
}
