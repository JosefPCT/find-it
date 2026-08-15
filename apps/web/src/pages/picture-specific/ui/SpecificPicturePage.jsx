import { useRef, useState } from "react"

import styles from "./SpecificPicturePage.module.css";

export default function SpecificPicturePage(){

  const [userClickCoords, setUserClickCoords] = useState({x: 0, y: 0});
  const [showPopup, setShowPopup] = useState(false);

  const imgRef = useRef(null);

  const imageClickHandler = (e) => {
    if(imgRef.current){
      const rect = imgRef.current.getBoundingClientRect();
      console.log(rect);
      console.log(rect.width);
      console.log(rect.height);
    }

    // Getting coordinates of the click area
    console.log("Clicked Coordinates");
    console.log(e.pageX);
    console.log(e.pageY);
    setUserClickCoords({x: e.pageX, y: e.pageY});
    setShowPopup(prev => !prev);

  }

  return(
    <div>
      <div className={styles.playArea}>
        <div className={styles.imageContainer}>
          <div 
            className={styles.popUpBox}
            style={{ visibility: showPopup ? 'visible' : 'hidden', top: userClickCoords.y, left: userClickCoords.x}} 
          >
            <div className={styles.targetingBox}/>
            <div>
              <label htmlFor="possibleElement">Which element is here?</label>
              <select name="possibleElement" id="possibleElement">
                <option value="">Choose...</option>
                <option value="lightbulb">Lightbulb</option>
                <option value="cellphone">Cellphone</option>
                <option value="sunglasses">Sunglasses</option>
              </select>
            </div>
          </div>
          <img
            ref={imgRef}
            src="https://media.istockphoto.com/id/171114507/photo/junk-in-a-drawer.jpg?s=2048x2048&w=is&k=20&c=xMyVLa4tCppHkovgkUMYtNEVXGEKRv141LUlrU5S4zk=" 
            alt="Picture of different things"
            onClick={imageClickHandler}
          />
          
        </div>
        
      </div>
      <div>
        Test 
        <p>User Click Coordinates: X: {userClickCoords.x}, Y: {userClickCoords.y}</p>
        <p>Showing Popup? {showPopup ? "true" : "false"}</p>
      </div>
    </div>
  )
}