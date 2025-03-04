import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import * as musicMetadata from "music-metadata-browser";

let Context = createContext();

export let GetContext = () => useContext(Context);

export default function ContextProvider({ children }) {
  let [musics, setMusics] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [currentTime, setCurrentTime] = useState("00:00");
  let [progress, setProgress] = useState(0);
  let [isPlay, setIsPlay] = useState(false);
  let [isMouseDown, setIsMouseDown] = useState(false);

  let audioElem = useRef(null);

  let getPersent = useCallback(() => {
    if (audioElem.current) {
      let { currentTime, duration } = audioElem.current;
      return (currentTime / duration) * 100;
    }
    return 0;
  }, []);

  let formatTime = (min, sec) => {
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  let getTime = (inputSec) => {
    let min = Math.floor(inputSec / 60);
    let sec = Math.floor(inputSec % 60);
    return formatTime(min, sec);
  };

  let fileChange = async (event) => {
    let files = Array.from(event.currentTarget.files);
    let tracks = await Promise.all(
      files.map(async (item) => {
        let metadata = await musicMetadata.parseBlob(item);
        let { title, artist, album, genre, year, picture } = metadata.common;
        let { duration } = metadata.format;
        let lyric = metadata.native["ID3v2.3"]
          .find((item) => item.id === "USLT")
          ?.value.text.replace(/\n/g, "<br/>");
        console.log(lyric);
        let coverUrl = picture
          ? URL.createObjectURL(new Blob([picture[0].data]))
          : null;
        return {
          id: uuid(),
          title: title || item.name.split(".")[0],
          artist,
          album,
          genre,
          year,
          lyric,
          coverUrl,
          duration: getTime(duration),
          src: URL.createObjectURL(item),
          coverSrc: coverUrl,
          isFavorite: false,
        };
      }),
    );
    if (tracks.length > 0) setMusics(tracks);
  };

  let playMusic = () => {
    if (audioElem.current) {
      audioElem.current.play();
    }
  };

  let pauseMusic = () => {
    audioElem.current.pause();
  };

  let stopMusic = () => {
    audioElem.current.currentTime = 0;
  };

  let nextSong = () => {
    if (currentIndex === musics.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevState) => prevState + 1);
    }
    setTimeout(playMusic, 0);
  };

  let prevSong = () => {
    if (currentIndex === 0) {
      setCurrentIndex(musics.length - 1);
    } else {
      setCurrentIndex((prevState) => prevState - 1);
    }
    setTimeout(playMusic, 0);
  };

  let fiveBack = () => {
    let { currentTime } = audioElem.current;
    if (currentTime < 5) {
      audioElem.current.currentTime = 0;
      return;
    }
    audioElem.current.currentTime = currentTime - 5;
  };

  let fiveForward = () => {
    let { currentTime, duration } = audioElem.current;
    if (currentTime + 5 > duration) {
      nextSong();
      return;
    }
    audioElem.current.currentTime = currentTime + 5;
  };

  let handleSelect = (index) => {
    if (index === currentIndex) stopMusic();
    else {
      setCurrentIndex(index);
    }
    setTimeout(playMusic, 0);
  };

  let handleDelete = (event, index) => {
    event.stopPropagation();
    setMusics((prevState) => {
      let newList = prevState.filter((_, i) => i !== index);
      if (newList.length === 0) {
        pauseMusic();
        setCurrentIndex(0);
      } else {
        console.log(currentIndex);
        console.log(index);
        setTimeout(() => {
          console.log(currentIndex);
          console.log(index);
          if (index === currentIndex) {
            if (currentIndex === newList.length) {
              setCurrentIndex((prevState) => prevState - 1);
            } else {
              setCurrentIndex(index);
            }
            playMusic();
          } else if (index < currentIndex) {
            if (currentIndex >= newList.length) setCurrentIndex(0);
            setCurrentIndex((prevState) => index);
          }
        }, 0);
      }
      return newList;
    });
  };

  let handleFavorite = (id) => {
    setMusics((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    );
  };

  let handleTimeUpdate = () => {
    let sec = audioElem.current.currentTime;
    setCurrentTime(getTime(sec));

    setProgress(getPersent());
  };

  let values = {
    musics,
    audioElem,
    fileChange,
    isPlay,
    setIsPlay,
    isMouseDown,
    setIsMouseDown,
    handleDelete,
    handleSelect,
    handleFavorite,
    handleTimeUpdate,
    currentTime,
    currentIndex,
    progress,
    playMusic,
    pauseMusic,
    nextSong,
    prevSong,
    fiveBack,
    fiveForward,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
}
