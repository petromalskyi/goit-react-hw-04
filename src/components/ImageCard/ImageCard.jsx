import css from './ImageCard.module.css';

export default function ImageCard({ small, altDescription }) {
  return (
    <div className={css.thumb}>
      <img src={small} alt={altDescription} />
    </div>
  );
}
