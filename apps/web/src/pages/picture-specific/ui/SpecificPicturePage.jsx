import { useRef, useState } from "react"

import styles from "./SpecificPicturePage.module.css";

export default function SpecificPicturePage(){

  // Defining of states
  const [userClickCoords, setUserClickCoords] = useState({x: 0, y: 0});
  const [showPopup, setShowPopup] = useState(false);
  const [currentUserChoice, setCurrentUserChoice] = useState(null);

  const imgRef = useRef(null);

  // Testing, (middle (screw) of a blue cutter)
  const defaultImageSize = { width: 1600, height: 1403}
  const testTagCoords = { x: 1314, y: 755}
  const testTagPercentage = { x: (testTagCoords.x / defaultImageSize.width) * 100, y: (testTagCoords.y / defaultImageSize.height) * 100}

  console.log("Test tag console:");
  console.log(testTagPercentage.x);
  console.log(testTagPercentage.y)

  // Testing normalizing of coordinates
  const [userClickCoordsDecimal, setUserClickCoordsDecimal] = useState({x: 0, y: 0});
  // const [boundingRect, setBoundingRect] = useState({});

  // Set the state when user clicks on the image
  // Includes getting the `pageX` and `pageY` from the event object
  // And gets the BoundingRect of the image (width, height, top, left etc..)
  // Sets the decimal value of the coordinates by dividing the coordinate with the current width/height
  const imageClickHandler = (e) => {
    if(imgRef.current){
      const rect = imgRef.current.getBoundingClientRect();
      console.log(rect);
      console.log(rect.width);
      console.log(rect.height);
    

    // Getting coordinates of the click area
    console.log("Clicked Coordinates");
    console.log(e.pageX);
    console.log(e.pageY);
    setUserClickCoords({x: e.pageX, y: e.pageY});
    setShowPopup(prev => !prev);

    // Testing normalizing of coordinates
    setUserClickCoordsDecimal({x: (e.pageX / rect.width), y: (e.pageY / rect.height) });
    
    }
  }

  const testTagEventHandler = (e) => {
    console.log("Test tag event handler triggered...");
    imageClickHandler(e);
  }

  // Handler to keep track of the user selection by updating the state or passing it directly to the validation function
  const selectOnChangeHandler = (e) => {
    console.log("Selected: ", e.target.value);
    validate(e.target.value);
  }

  // Todo: integrate backend fetching for the tag and its coordinates, will replace the `testTagCoords` object with the returned value
  // The main function to check if the user clicked around the correct area
  // Gets the points of the current targeting box to use for validation, accounts for how big the box is
  const validate = (userChoice) => {
    console.log("Validating...");
    console.log(userChoice);

    console.log("User clicked coordinates:");
    console.log(`X: ${userClickCoords.x}, Y: ${userClickCoords.y}`);

    const targetingBoxCoords = {
      topLeft: { x: userClickCoords.x - 10, y: userClickCoords.y - 10},
      topRight: { x: userClickCoords.x + 10, y: userClickCoords.y - 10},
      bottomLeft: {x: userClickCoords.x - 10, y: userClickCoords.y + 10},
      bottomRight: {x: userClickCoords.x + 10, y: userClickCoords.y + 10}

    }

    console.log(`Top Left: x: ${targetingBoxCoords.topLeft.x}, y: ${targetingBoxCoords.topLeft.y}`);
    console.log(`Top Right: x: ${targetingBoxCoords.topRight.x}, y: ${targetingBoxCoords.topRight.y}`);

    console.log("Iterating targeting box object:");
    for(const [key, value] of Object.entries(targetingBoxCoords)) {
      console.log(`Key: ${key}`);
      for(const [key1, value1] of Object.entries(value)){
        console.log(`${key1}: ${value1}`);
      }
    }

    // The actual validation of coordinates

    let hit = false;
    console.log(`${targetingBoxCoords.topLeft.x} < ${testTagCoords.x} < ${targetingBoxCoords.topRight.x}`)
    console.log(`${targetingBoxCoords.topLeft.y} < ${testTagCoords.y} < ${targetingBoxCoords.topRight.y}`)  
    if((targetingBoxCoords.topLeft.x <= testTagCoords.x && testTagCoords.x <= targetingBoxCoords.topRight.x) &&
      (targetingBoxCoords.bottomLeft.x <= testTagCoords.x && testTagCoords.x <= targetingBoxCoords.bottomRight.x)
      ){
      console.log("HIT!");
    }
    if(((targetingBoxCoords.topLeft.y <= testTagCoords.y && testTagCoords.y <= targetingBoxCoords.topRight.y)) &&
        (targetingBoxCoords.bottomLeft.y <= testTagCoords.y && testTagCoords.y <= targetingBoxCoords.bottomLeft.y)){
      console.log("Hit 2!!");      
    }
    // if(targetingBoxCoords.topLeft.x < testTagCoords.x &&  testTagCoords.x < targetingBoxCoords.topRight.x){
    //   console.log("HIT!!!!")
    // }
  }

  return(
    <div>
      <div className={styles.playArea}>
        <div className={styles.imageContainer}>
          <div className={styles.popUpBox} style={{ visibility: showPopup ? 'visible' : 'hidden', top: userClickCoords.y, left: userClickCoords.x}}>
            <div className={styles.targetingBox}/>
            <div className={styles.selectionContainer}>
              <label htmlFor="possibleElement">Which element is here?</label>
              <select name="possibleElement" id="possibleElement" onChange={selectOnChangeHandler}>
                <option value="">Choose...</option>
                <option value="lightbulb">Lightbulb</option>
                <option value="cellphone">Cellphone</option>
                <option value="sunglasses">Sunglasses</option>
              </select>
            </div>
            <div className={styles.errorMsg}>Not quite!</div>
            <div className={styles.successMsg}>You got it!</div>
          </div>
          <div className={styles.testTag} style={{ top: `${testTagPercentage.y}%`, left: `${testTagPercentage.x}%`}} onClick={testTagEventHandler}></div>
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
        <p>User Click Coordinates: X: {userClickCoordsDecimal.x}, Y: {userClickCoordsDecimal.y}</p>
      </div>
    </div>
  )
}