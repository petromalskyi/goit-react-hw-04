import css from './ImageCard.module.css';

export default function ImageCard({ small, altDescription, regular, onClick }) {
  return (
    <div className={css.thumb}>
      <img
        src={small}
        alt={altDescription}
        data-action={regular}
        onClick={onClick}
      />
    </div>
  );
}
