import React from "react"
import styled from "styled-components"

import { DefaultIcon } from "."

import { Github } from "."

export default {
  title: "Components/Icons",
}

const LightBackground = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
`

const DarkBackground = styled.div`
  width: 100%;
  height: 60px;
  background-color: #160029;
`

export const githubIcon = () => (
  <>
    <LightBackground>
      <Github theme={"light"} />
    </LightBackground>

    <DarkBackground>
      <Github theme={"dark"} />
    </DarkBackground>
  </>
)
