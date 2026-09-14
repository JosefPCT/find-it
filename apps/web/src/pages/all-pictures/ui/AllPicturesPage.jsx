import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query"

import fetchAllPictures from "../api/fetchAllPictures";
import ImageCarousel from "./ImageCarousel";

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
      <ImageCarousel />
    </>
  )
}