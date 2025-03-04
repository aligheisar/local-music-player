import { useEffect, useRef } from "react";
import { GetContext } from "../context/context";

let classes = {
  timeIndicator: "player-indicator",
  barContainer: "player-bar-container",
  barHeader: "player-bar-header",
  bar: "player-bar",
};

let TimeIndicator = () => {
  let {
    currentIndex,
    currentTime,
    musics,
    progress,
    isMouseDown,
    setIsMouseDown,
    audioElem,
  } = GetContext();

  let bar = useRef(null);

  useEffect(() => {
    if (!isMouseDown) return;
    let dbl = (evnet) => {
      evnet.preventDefault();
    };
    document.addEventListener("dragstart", dbl);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("dragstart", dbl);
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseDown]);

  let mouseDown = (event) => {
    if (
      !event.target.classList.contains(classes.barContainer) &&
      !event.target.classList.contains(classes.barHeader) &&
      !event.target.classList.contains(classes.bar)
    )
      return;
    setIsMouseDown(true);
    let box = bar.current.getBoundingClientRect();
    let newPersent = (event.clientX - box.left) / box.width;
    let { duration } = audioElem.current;
    audioElem.current.currentTime = newPersent * duration;
  };

  let mouseMove = (event) => {
    if (!isMouseDown) return;
    event.preventDefault();
    let box = bar.current.getBoundingClientRect();
    let newPersent = (event.clientX - box.left) / box.width;
    let { duration } = audioElem.current;
    audioElem.current.currentTime = newPersent * duration;
  };
  let mouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <section className={classes.timeIndicator}>
      <span>{currentTime}</span>
      <div
        ref={bar}
        className={classes.barContainer}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <span
          className={classes.barHeader}
          style={{ left: progress + "%" }}
        ></span>
        <div style={{ width: progress + "%" }} className={classes.bar}></div>
      </div>
      <span>{musics[currentIndex].duration}</span>
    </section>
  );
};

export default TimeIndicator;
