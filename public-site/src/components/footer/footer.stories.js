import React from "react"
import styled from "styled-components"
import Footer from "."

export default {
  title: "Components/footer",
}

const LightBackground = styled.div`
  width: 720px;
  background-color: #fff;
  margin: 0 auto;
`

const DarkBackground = styled.div`
  width: 720px;
  background-color: #160029;
  margin: 0 auto;
`

export const footerLight = () => (
  <LightBackground>
    <Footer theme="light" />
  </LightBackground>
)

export const footerDark = () => (
  <DarkBackground>
    <Footer theme="dark" />
  </DarkBackground>
)
