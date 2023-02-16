import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [isScrollable, setIsScrollable] = useState(true);

  const imageRef = useRef(null);

  const scale = useMotionValue(1.2);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  console.log("scale isssssssss ", scale);
  const onWheel = (e) => {
    const delta = e.deltaY * (zoomScale > 5 ? 0.03 : 0.008);
    const newScale = scale.get() + delta;

    // Limit zooming to within the range of 1 to 50.
    if (scrollY > 1500 && scrollY < 2000) {
      if (newScale < 1) {
        scale.set(0.99);
        setZoomScale(0.99);
      } else if (newScale > 100) {
        scale.set(100.01);
        setZoomScale(100.01);
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
      if (scrollY > 1600 && scrollY < 1900) {
        imageRef.current.click();
        setIsScrollable(false);
        if (zoomScale < 1 || zoomScale > 100) {
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
      <div
        onWheel={onWheel}
        className="blue"
        ref={imageRef}
        id="zoomOnScroll"
        style={{ position: "relative" }}
      >
        <motion.img
          src="./logo.svg"
          style={{
            x,
            y,
            scale: zoomScale > 90 ? 100 : scale,
            transition: "all 1s",
            translateY: zoomScale * -20 - 84,
            translateX: zoomScale,
          }}
        />

        {/* phone  */}
        <div
          className="phoneDiv "
          style={{
            bottom: -180,
            transform: `rotate(${(1 - zoomScale / 100) * -65}deg)`,
            transformOrigin: "100% 100%",
            right: 50,
            opacity: (zoomScale - 50) / 50,
          }}
        >
          <motion.img src="./phone.svg" />
        </div>

        {/* hand  */}
        <div
          className="phoneDiv"
          style={{
            bottom: -50,
            transform: `rotate(${(1 - zoomScale / 100) * 65 - 5}deg)`,
            right: 0,
            transformOrigin: "100% 100%",
            opacity: (zoomScale - 50) / 50,
          }}
        >
          <motion.img src="./hand.svg" />
        </div>

        {/* title  */}
        <h4 className="placeTitle" style={{ top: zoomScale > 80 ? 0 : 1000 }}>
          Commerce Arabia . . <br />
          Personalized e-commerce
        </h4>

        {/* text */}
        <p className="placeText" style={{ top: zoomScale > 80 ? 200 : 1000 }}>
          commerce Arabia is an e-commerce platform bult from the ground up to
          support the mena markets and arabic language functionlisties and
          tools. we bring you the best UI/UX practices to make sure you leave a
          leasting impression on your targeted audience.
        </p>

        {/* button  */}
        <div
          className="placeButton"
          style={{ opacity: zoomScale > 80 ? 100 : 0 }}
        >
          View Our Products
        </div>

        {/* largest circle  */}
        <div
          className="circle1"
          style={{
            width: (zoomScale / 100) * 490,
            height: (zoomScale / 100) * 490,
          }}
        />

        {/* upper circle  */}
        <div
          className="circle2"
          style={{
            width: (zoomScale / 100) * 350,
            height: (zoomScale / 100) * 350,
          }}
        />

        {/* lower circle  */}
        <div
          className="circle3"
          style={{
            width: (zoomScale / 100) * 200,
            height: (zoomScale / 100) * 200,
          }}
        />

        {/* starts  */}
        <div
          className="stars "
          style={{
            width: (zoomScale / 100) * 350,
            height: (zoomScale / 100) * 350,
          }}
        >
          <motion.img src="./stars.svg" />
        </div>
      </div>

      <div className="height"></div>
    </>
  );
};

export default App;
