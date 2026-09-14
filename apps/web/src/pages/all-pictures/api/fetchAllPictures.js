export default async function fetchAllPictures(){
  // TODO: Use an environment variable
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const response = await fetch(`${apiUrl}/api/v1/images`);
  if(!response.ok){
    throw new Error("Network response is not ok");
  }

  const images = await response.json();
  console.log(images);

  return images;
}