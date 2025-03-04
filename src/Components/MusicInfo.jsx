import { useState } from "react";
import { GetContext } from "../context/context";
import { formatText } from "../Utility/Utility";
import { Favorite } from "./Icons";

let classes = {
  musicInfo: "music-info",
  showLyric: "show-lyric",
  coverLyric: "music-info-cover_lyric",
  cover: "music-info-cover",
  lyric: "music-info-lyric",
  detailsFav: "music-info-details_fav",
  favorite: "music-info-favorite",
  icon: "icon",
  details: "music-info-details",
  title: "music-info-title",
  artist: "music-info-artist",
  play: "play",
};

let MusicInfo = () => {
  let [showLyric, setShowLyric] = useState(false);

  let { musics, currentIndex, isPlay, handleFavorite } = GetContext();

  let music = musics[currentIndex];

  return (
    <section
      className={`${classes.musicInfo} ${showLyric ? classes.showLyric : ""}`}
    >
      <section
        className={classes.coverLyric}
        onClick={() => setShowLyric((prevState) => !prevState)}
      >
        <img
          className={`${classes.cover} ${isPlay ? classes.play : ""}`}
          src={music.coverUrl}
          alt={music.title}
        />
        <article className={classes.lyric}>
          <p
            dangerouslySetInnerHTML={{
              __html: music.lyric ? music.lyric : "Lyric not Available!",
            }}
          ></p>
        </article>
      </section>
      <div className={classes.detailsFav}>
        <div className={classes.details}>
          <p className={classes.title}>{formatText(music.title)}</p>
          <p className={classes.artist}>{formatText(music.artist, 35)}</p>
        </div>
        <button
          className={classes.favorite}
          onClick={() => handleFavorite(music.id)}
        >
          <Favorite
            size={null}
            className={classes.icon}
            fill="white"
            opacity={music.isFavorite ? 0.7 : 0.3}
          />
        </button>
      </div>
    </section>
  );
};

export default MusicInfo;
