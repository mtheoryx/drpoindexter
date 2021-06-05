import React from "react"
import styled from "styled-components"

import Logo from "."

export default {
  title: "Components/logo",
}

const LightBackground = styled.div`
  width: 100%;
  height: 100px;
  background-color: #481380;
`

const DarkBackground = styled.div`
  width: 100%;
  height: 100px;
  background-color: #160029;
`

export const lightLogo = () => (
  <LightBackground>
    <Logo theme={"light"} />
  </LightBackground>
)

export const darkLogo = () => (
  <DarkBackground>
    <Logo theme={"dark"} />
  </DarkBackground>
)
