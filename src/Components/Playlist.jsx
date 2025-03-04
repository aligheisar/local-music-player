import { Trash } from "./Icons";
import { GetContext } from "../context/context";

let classes = {
  playlist: "playlist",
  item: "playlist-item",
  icon: "playlist-icon",
  cover: "playlist-cover",
  detailsCover: "playlist-detail_cover",
  details: "playlist-details",
  title: "playlist-title",
  artist: "playlist-artist",
};

export default function Playlist() {
  let { musics, currentIndex, handleDelete, handleSelect } = GetContext();

  return (
    <section className={classes.playlist}>
      {musics.map((item, index) => (
        <div
          onClick={() => handleSelect(index)}
          key={item.id}
          className={`${classes.item} ${
            currentIndex === index ? "active" : ""
          }`}
        >
          <div className={classes.detailsCover}>
            <img
              className={classes.cover}
              src={item.coverUrl}
              alt={item.title}
            />
            <div className={classes.details}>
              <p className={classes.title}>{item.title}</p>
              <p className={classes.artist}>{item.artist}</p>
            </div>
          </div>
          <Trash
            className={classes.icon}
            size={18}
            onClick={(event) => handleDelete(event, index)}
          />
        </div>
      ))}
    </section>
  );
}
