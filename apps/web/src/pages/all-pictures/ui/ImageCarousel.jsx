import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

import fetchAllPictures from "../api/fetchAllPictures";

import styles from "./ImageCarousel.module.css";

export default function ImageCarousel(){

  const { isPending, isError, data, error } = useQuery({
      queryKey: ['allPictures'],
      queryFn: () => fetchAllPictures()
})

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  //Autoplay
//   useEffect(() => {
//     const timer = setInterval(handleNext, 4000);
//     return () => clearInterval(timer);
//   }, [currentIndex])

  if(isPending){
    return <span>Loading...</span>
  }

  if(isError){
    return <span>Image has error: {error}</span>
  }

  return(
    <div className={styles.carouselContainer}>
      <button onClick={handlePrev} className={`${styles.arrowBtn} ${styles.left}`}>Prev</button>

      <div className={styles.sliderWrapper}>
        {Array.isArray(data) && data.map((image, index) =>(
          <div
            className={`${styles.slide} ${index === currentIndex ? styles.active : ""}`}
            key={image.url}
          >
            {index === currentIndex && (
              <NavLink to={`/pictures/${image.publicId}`}>
                <img src={image.url} alt={`Slide ${index}`} className={styles.carouselImg} />
              </NavLink>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleNext} className={`${styles.arrowBtn} ${styles.right}`}>Next</button>

      {/* Pagination Dots */}
      <div className={styles.indicators}>
        {Array.isArray(data) && data.map((_, index) => (
          <span 
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}