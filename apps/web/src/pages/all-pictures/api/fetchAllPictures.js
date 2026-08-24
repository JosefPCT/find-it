export default async function fetchAllPictures(){
  // TODO: Use an environment variable
  const apiUrl = "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/v1/images`);
  if(!response.ok){
    throw new Error("Network response is not ok");
  }

  const images = await response.json();
  console.log(images);

  return images;
}