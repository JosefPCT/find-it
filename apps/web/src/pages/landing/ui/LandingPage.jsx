import { NavLink } from "react-router"

export default function LandingPage(){
  const apiUrl = import.meta.env.VITE_API_URL;
  return(
    <>
      Landing Page
      <h1>Welcome to Find-it!</h1>
      <h3>Play a game where you need to correctly tag things in a picture, choose from different pictures</h3>
      <NavLink to='/all'>
        <button>Choose a picture now!</button>
      </NavLink>
      <p>{apiUrl}</p>
    </>
  )
}