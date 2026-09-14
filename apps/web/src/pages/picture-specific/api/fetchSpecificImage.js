export default async function fetchSpecificImage(publicId){
  // TODO: Use an environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/api/v1/images/${publicId}`);
  if(!response.ok){
    throw new Error("Network response is not ok");
  }

  const image = await response.json();
  console.log(image);

  return image;
}