export default async function fetchSpecificImage(publicId){
  // TODO: Use an environment variable
  const apiUrl = "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/v1/images/${publicId}`);
  if(!response.ok){
    throw new Error("Network response is not ok");
  }

  const image = await response.json();
  console.log(image);

  return image;
}