import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import lightLogo from "./ShipLogoLight.svg"
import darkLogo from "./ShipLogoDark.svg"

const StyledLogo = styled.div``

const Logo = ({ theme }) => {
  const image = theme === "light" ? lightLogo : darkLogo
  return (
    <StyledLogo>
      <Link to="/">
        <img
          src={image}
          height="88"
          width="88"
          alt="Ship logo that navigates home"
        />
      </Link>
    </StyledLogo>
  )
}

export default Logo
