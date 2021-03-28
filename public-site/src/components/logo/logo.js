import React from "react"
import styled from "styled-components"

import lightLogo from "./ShipLogoLight.svg"
import darkLogo from "./ShipLogoDark.svg"

const Logo = ({ theme }) => {
  const image = theme === "light" ? lightLogo : darkLogo
  return <img src={image} />
}

export default Logo
