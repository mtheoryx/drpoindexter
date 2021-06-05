import React from "react"
import styled from "styled-components"

import Profile from "."

export default {
  title: "Components/Profile",
}

const LightBackground = styled.div`
  width: auto;
  height: auto;
  background-color: #481380;
  padding: 10px;
`

const DarkBackground = styled.div`
  width: auto;
  height: auto;
  background-color: #160029;
  padding: 10px;
`

export const lightProfileImage = () => (
  <LightBackground>
    <Profile theme={"light"} />
  </LightBackground>
)

export const darkProfileImage = () => (
  <DarkBackground>
    <Profile theme={"dark"} />
  </DarkBackground>
)
