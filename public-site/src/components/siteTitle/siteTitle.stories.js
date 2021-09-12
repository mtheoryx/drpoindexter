import React from "react"
import styled from "styled-components"

import SiteTitle from "."

export default {
  title: "Components/SiteTitle",
}

const LightBackground = styled.div`
  width: 100%;
  height: 60px;
  background-color: #481380;
`

const DarkBackground = styled.div`
  width: 100%;
  height: 60px;
  background-color: #160029;
`

export const lightSiteTitle = () => (
  <LightBackground>
    <SiteTitle theme={"light"} />
  </LightBackground>
)

export const darkSiteTitle = () => (
  <DarkBackground>
    <SiteTitle theme={"dark"} />
  </DarkBackground>
)
