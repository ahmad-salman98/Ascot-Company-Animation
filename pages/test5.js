import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const imageRef = useRef(null);

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onWheel = (e) => {
    const delta = e.deltaY * 0.003;
    const newScale = scale.get() + delta;

    // Check if the new scale value is greater than or equal to 1

    if (newScale <= 0.99 || newScale > 15) {
      return;
    }
    if (scrollY > 1600) {
      scale.set(newScale);
      setZoomScale(newScale);
    }
  };

  const AddScrollToScreen = () => {
    // handle scroll to screen
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    // track scroll position
    useEffect(() => {
      console.log("scroll  is", scrollY, "scale is", zoomScale);

      if (scrollY > 1900 && scrollY < 2200) {
        document.body.style.overflowY = "hidden";
      }
      if (zoomScale <= 1.01 || zoomScale >= 14.99) {
        document.body.style.overflowY = "scroll";
      }
      imageRef.current.click();
    }, [scrollY]);
  };

  return (
    <>
      <AddScrollToScreen />
      <div className="height"></div>
      <motion.div onWheel={onWheel} className="blue" ref={imageRef}>
        <motion.div>
          <motion.img
            src="./logo.svg"
            style={{
              x,
              y,
              scale: scale,
              transition: "all",
              transitionDuration: "0.5s",
            }}
          />
        </motion.div>
      </motion.div>
      <div className="height"></div>
    </>
  );
};

export default App;
