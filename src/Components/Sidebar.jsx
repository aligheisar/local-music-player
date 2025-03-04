import { useRef, useState, useEffect } from "react";
import { GetContext } from "../context/context";
import Player from "./Player";

let classes = {
  sidebarHandle: "handle",
};

let Sidebar = () => {
  let [sidebarWidth, setSidebarWidth] = useState(380);

  let { musics } = GetContext();

  let handle = useRef();
  let sidebar = useRef();

  useEffect(() => {
    handle.current.addEventListener("mousedown", () => {
      document.body.style.cursor = "col-resize";
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    });

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let mouseMove = (event) => {
    let newWidth = event.clientX;
    if (newWidth > 500) newWidth = 500;
    if (newWidth < 300) newWidth = 300;
    setSidebarWidth(newWidth);
  };
  let mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.body.style.cursor = "unset";
  };

  return (
    <aside ref={sidebar} style={{ width: `${sidebarWidth}px` }}>
      {musics.length > 0 ? <Player isSmall={sidebarWidth <= 370} /> : null}
      <span ref={handle} className={classes.sidebarHandle}></span>
    </aside>
  );
};

export default Sidebar;
