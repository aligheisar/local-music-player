import { GetContext } from "../context/context";
import { FastBack, FastForward, Next, Pause, Play, Prev } from "./Icons";

let classes = {
  container: "player-button-container",
  button: "player-button",
  playPause: "play_pause",
  secendryButton: "secendry-button",
  prevNext: "prev_next",
  play: "play",
};

let Controls = () => {
  let {
    isPlay,
    playMusic,
    pauseMusic,
    prevSong,
    nextSong,
    fiveBack,
    fiveForward,
  } = GetContext();

  return (
    <section className={classes.container}>
      <button
        className={`${classes.button} ${classes.prevNext}`}
        onClick={prevSong}
        name="prev"
      >
        <Prev opacity={0.8} />
      </button>
      <button
        className={`${classes.button} ${classes.secendryButton}`}
        onClick={fiveBack}
      >
        <FastBack opacity={0.8} />
      </button>
      <button
        className={`${classes.button} ${classes.playPause} ${
          isPlay ? classes.play : ""
        }`}
        onClick={isPlay ? pauseMusic : playMusic}
      >
        {isPlay ? <Pause opacity={0.8} /> : <Play />}
      </button>
      <button
        className={`${classes.button} ${classes.secendryButton}`}
        onClick={fiveForward}
      >
        <FastForward opacity={0.8} />
      </button>
      <button
        className={`${classes.button} ${classes.prevNext}`}
        onClick={nextSong}
        name="next"
      >
        <Next opacity={0.8} />
      </button>
    </section>
  );
};

export default Controls;
