import style from "./CastCard.module.css";

type CastCardProps = {
  name: string;
  character: string;
  profilePath?: string | null;
};

function CastCard({ name, character, profilePath }: CastCardProps) {
  return (
    <div className={style["cast-card"]}>
      <div className={style["profile"]}>
        <img
          src={
            profilePath
              ? `https://image.tmdb.org/t/p/w185${profilePath}`
              : undefined
          }
          alt={`${name}'s Profile`}
        />
      </div>
      <div className={style["info"]}>
        <p className={style["name"]}>{name}</p>
        <p>{character}</p>
      </div>
    </div>
  );
}

export default CastCard;
