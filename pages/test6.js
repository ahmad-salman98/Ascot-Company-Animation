import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [isScrollable, setIsScrollable] = useState(true);
  const [isTransformed, setIsTransformed] = useState(false);

  const imageRef = useRef(null);

  const scale = useMotionValue(1.2);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onWheel = (e) => {
    const delta = e.deltaY * 0.002;
    const newScale = scale.get() + delta;

    // Limit zooming to within the range of 1 to 6.
    if (scrollY > 1500 && scrollY < 2000) {
      if (newScale < 1) {
        scale.set(0.99);
        setZoomScale(0.99);
      } else if (newScale > 6) {
        scale.set(6.01);
        setIsTransformed(true);
        setZoomScale(6.01);
      } else {
        scale.set(newScale);
        setZoomScale(newScale);
      }
    }
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const AddScrollToScreen = () => {
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
      console.log("scroll is", scrollY, "scale is", zoomScale);
      setIsTransformed(zoomScale > 6 ? true : false);
      if (scrollY > 1600 && scrollY < 1900) {
        imageRef.current.click();
        setIsScrollable(false);
        if (zoomScale < 1 || zoomScale > 6) {
          setIsScrollable(true);
        }
      }
    }, [scrollY, zoomScale]);
  };

  useEffect(() => {
    document.body.style.overflowY = isScrollable ? "scroll" : "hidden";
  }, [isScrollable]);

  return (
    <>
      <AddScrollToScreen />
      <div className="height"></div>
      <motion.div
        onWheel={onWheel}
        className={`blue ${
          isTransformed ? "transformMount" : "transformUnmount"
        }`}
        ref={imageRef}
        id="zoomOnScroll"
      >
        <motion.div>
          <motion.img
            src="./logo.svg"
            style={{
              x,
              y,
              scale: isTransformed ? 50 : scale,
              transition: "all 0.5s",
              translateY: isTransformed ? -1000 : 0,
              opacity: isTransformed ? 0 : 100,
            }}
          />
        </motion.div>
      </motion.div>
      <div className="height"></div>
    </>
  );
};

export default App;
