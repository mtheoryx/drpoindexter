import React from "react"

import lightProfile from "./profile-image-light.png"
import darkProfile from "./profile-image-dark.png"

const Profile = ({ theme }) => {
  const image = theme === "light" ? lightProfile : darkProfile
  return <img src={image} height="220" width="220" />
}

export default Profile
