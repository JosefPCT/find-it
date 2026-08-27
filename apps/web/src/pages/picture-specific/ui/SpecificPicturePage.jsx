import { useRef, useState } from "react"
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import fetchSpecificImage from "../api/fetchSpecificImage";

import styles from "./SpecificPicturePage.module.css";


export default function SpecificPicturePage(){
  const { pictureId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['specificImage', pictureId], 
    queryFn: () => fetchSpecificImage(pictureId)
  })

  // Defining of states
  const [userClickCoords, setUserClickCoords] = useState({x: 0, y: 0});
  const [showPopup, setShowPopup] = useState(false);
  const [currentUserChoice, setCurrentUserChoice] = useState(null);
  const [foundElements, setFoundElements] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const imgRef = useRef(null);

  // Testing normalizing of coordinates
  //const [userClickCoordsDecimal, setUserClickCoordsDecimal] = useState({x: 0, y: 0});
  // const [boundingRect, setBoundingRect] = useState({});

  // Set the state when user clicks on the image
  // Includes getting the `pageX` and `pageY` from the event object
  // And gets the BoundingRect of the image (width, height, top, left etc..)
  // Sets the decimal value of the coordinates by dividing the coordinate with the current width/height
  const imageClickHandler = (e, value) => {

    // Test to pass a value from another handler to possibly skip some steps
    console.log("Testing passed value from another event handler");
    console.log(value);

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
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    

    // Testing normalizing of coordinates
    // setUserClickCoordsDecimal({x: (e.pageX / rect.width), y: (e.pageY / rect.height) });
    }
  }

  const testTagEventHandler = (e) => {
    console.log("Test tag event handler triggered...");
    imageClickHandler(e, "testValuehere");
  }

  // Handler to keep track of the user selection by updating the state or passing it directly to the validation function
  const selectOnChangeHandler = (e) => {
    console.log("Selected: ", e.target.value);
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    validate(e.target.value);
  }

  // Todo: integrate backend fetching for the tag and its coordinates, will replace the `testTagCoords` object with the returned value
  // The main function to check if the user clicked around the correct area
  // Gets the points of the current targeting box to use for validation, accounts for how big the box is
  const validate = (userChoice) => {
    console.log("Validating...");
    console.log(userChoice);

    const targetTag = data.tags.find(tag => tag.name === userChoice)
    

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
    console.log(`${targetingBoxCoords.topLeft.x} < ${targetTag.x} < ${targetingBoxCoords.topRight.x}`)
    console.log(`${targetingBoxCoords.bottomLeft.x} < ${targetTag.x} < ${targetingBoxCoords.bottomRight.x}`)
    console.log(`${targetingBoxCoords.topLeft.y} < ${targetTag.y} < ${targetingBoxCoords.bottomLeft.y}`)  
    console.log(`${targetingBoxCoords.topRight.y} < ${targetTag.y} < ${targetingBoxCoords.bottomRight.y}`)
    
    if((targetingBoxCoords.topLeft.x <= targetTag.x && targetTag.x <= targetingBoxCoords.topRight.x) &&
      (targetingBoxCoords.bottomLeft.x <= targetTag.x && targetTag.x <= targetingBoxCoords.bottomRight.x)
      ){
      if(((targetingBoxCoords.topLeft.y <= targetTag.y && targetTag.y <= targetingBoxCoords.bottomLeft.y)) &&
        (targetingBoxCoords.topRight.y <= targetTag.y && targetTag.y <= targetingBoxCoords.bottomRight.y)){
        console.log("Hit 2!!");    
        setFoundElements(prev => [...prev, targetTag.publicId])
        setShowSuccessMessage(true);
      } 
    } else {
      setShowErrorMessage(true);
    }

    
  }


  if(isPending){
    return <span>Image is loading...</span>
  }

  if(isError){
    return <span>Error: {error.message}</span>
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
                {data.tags.map(tag => {
                  return foundElements.includes(tag.publicId) ? <option value={tag.name} disabled>{tag.name}</option> : <option value={tag.name}>{tag.name}</option>
                })}

                {/* <option value="lightbulb">Lightbulb</option>
                <option value="cellphone">Cellphone</option>
                <option value="sunglasses">Sunglasses</option> */}
              </select>
            </div>
            { showSuccessMessage ? <div className={styles.successMsg}>You're guess is correct!</div> : ""}
            { showErrorMessage ? <div className={styles.errorMsg}> Not quite</div> : ""}
          </div>
          { data.tags.map(tag => {
            return foundElements.includes(tag.publicId) ? <div className={styles.testTag} style={{ top: `${(tag.y / data.OriginalHeight) * 100}%`, left: `${(tag.x / data.OriginalWidth) * 100}%` }} onClick={testTagEventHandler}></div> : ""
          })}
          <div className={styles.elementsList}>
            <p>Elements to find:</p>
            <ul>
              {data.tags.map((tag) => {
                return foundElements.includes(tag.publicId) ? <li><s>{tag.name}</s></li> : <li>{tag.name}</li>
              })}
            </ul>
          </div>
          {/* <div className={styles.testTag} style={{ top: `${testTagPercentage.y}%`, left: `${testTagPercentage.x}%`}} onClick={testTagEventHandler}></div> */}
          <img
            ref={imgRef}
            src={data.url}
            width={data.OriginalWidth}
            height={data.OriginalHeight} 
            alt="Picture of different things"
            onClick={imageClickHandler}
          />
          
        </div>
        
      </div>
      <div>
        Test 
        <p>User Click Coordinates: X: {userClickCoords.x}, Y: {userClickCoords.y}</p>
        <p>Showing Popup? {showPopup ? "true" : "false"}</p>
        {/* <p>User Click Coordinates: X: {userClickCoordsDecimal.x}, Y: {userClickCoordsDecimal.y}</p> */}
        {foundElements.map((elem) => {
          return <div>{elem}</div>
        })}
        <p>User Params: URL: {pictureId}</p>
        <p>Data Fetching:</p>
        <p>{data.name}</p>
        {data.tags.map((tag) => {
          return(
            <>
              <div>{tag.name}</div>
              <div>{tag.x}</div>
            </>
          )
        })}
      </div>
      <div>
        <img src={data.url} alt="" />
      </div>
    </div>
  )
}