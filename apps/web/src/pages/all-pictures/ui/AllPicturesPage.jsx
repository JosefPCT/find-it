import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query"

import fetchAllPictures from "../api/fetchAllPictures";

export default function AllPicturesPage(){

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['allPictures'],
    queryFn: () => fetchAllPictures()
  })

  if(isPending){
    return <span>Loading....</span>
  }

  if(isError){
    return <span>Error: {error.message}</span>
  }

  return(
    <>
      All Pictures Page
      <NavLink to='/pictures/test'>Test Picture</NavLink>
      <ul>
        { Array.isArray(data) && data.map((image) => {
          return (
            <>
              <div>{image.name}</div>
              <div><NavLink to={`/pictures/${image.publicId}`}>To Image</NavLink></div>
              <div>{image.publicId}</div>
              <img src={image.url} alt="Test pic" />
            </>
          )
        })}
      </ul>
    </>
  )
}