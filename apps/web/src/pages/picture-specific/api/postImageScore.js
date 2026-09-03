// Updates the current post based on `postPublicId`, updates fields such as 'title', 'text', and 'isPublished'
export default async function postImageScore(data){
  const apiUrl = "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/v1/images/${data.imagePublicId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      imageId: data.imageId,
      name: data.name,
      startTime: data.startTime,
      endTime: data.endTime,
      finalTime: data.finalTime,
    })
  });
  if(!response.ok){
    throw new Error("Network response is not ok");
  }

  if(response.status === 204 || response.headers.get("content-length") === '0'){
    return null;
  }

  const result = await response.json();
  return result;  
}