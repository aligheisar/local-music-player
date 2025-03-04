import { GetContext } from "../context/context";
import Controls from "./Controls";
import MusicInfo from "./MusicInfo";
import TimeIndicator from "./TimeIndicator";

let classes = {
  player: "player",
  cover: "player-cover",
  play: "play",
  small: "small",
};

let Player = ({ isSmall }) => {
  let {
    audioElem,
    musics,
    setIsPlay,
    handleMetadataLoaded,
    handleTimeUpdate,
    currentIndex,
    nextSong,
  } = GetContext();

  return (
    <section className={`${classes.player} ${isSmall ? classes.small : ""}`}>
      <MusicInfo />
      <TimeIndicator />
      <audio
        ref={audioElem}
        src={musics[currentIndex]?.src}
        onEnded={nextSong}
        onPlay={() => setIsPlay(true)}
        onPause={() => setIsPlay(false)}
        onLoadedMetadata={handleMetadataLoaded}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      <Controls />
    </section>
  );
};

export default Player;
