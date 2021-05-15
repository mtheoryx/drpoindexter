import React from "react"
import styled from "styled-components"

import SiteNav from "."

export default {
  title: "Dashboard/SiteNav",
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

export const lightSiteNav = () => (
  <LightBackground>
    <SiteNav theme={"light"} />
  </LightBackground>
)

export const darkSiteNav = () => (
  <DarkBackground>
    <SiteNav theme={"dark"} />
  </DarkBackground>
)
