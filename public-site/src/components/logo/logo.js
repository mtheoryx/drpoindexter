import React from "react"
import styled from "styled-components"

import lightLogo from "./ShipLogoLight.svg"
import darkLogo from "./ShipLogoDark.svg"

const StyledLogo = styled.div``

const Logo = ({ theme }) => {
  const image = theme === "light" ? lightLogo : darkLogo
  return (
    <StyledLogo>
      <img src={image} height="88" width="88" />
    </StyledLogo>
  )
}

export default Logo
