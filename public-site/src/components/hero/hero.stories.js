import React from "react"
import styled from "styled-components"

import Hero from "."

export default {
  title: "Composites/Hero",
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

export const lightHero = () => <Hero theme={"light"} />

export const darkHero = () => <Hero theme={"dark"} />
