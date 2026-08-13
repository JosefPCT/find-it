import MainWrapper from "./providers/MainWrapper";
import { LandingPage } from "../pages/landing";
import { AllPicturesPage } from "../pages/all-pictures";
import { SpecificPicturePage } from "../pages/picture-specific";


const routes = [
  {
    Component: MainWrapper,
    children:[
      { index: true, Component: LandingPage },
      { path: "/all", Component: AllPicturesPage },
      { path: "/pictures/:pictureId", Component: SpecificPicturePage }
    ]
  }
]

export default routes;