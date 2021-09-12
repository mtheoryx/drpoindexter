import React from "react"
import styled from "styled-components"
import ListSummary from "."

export default {
  title: "Components/ListSummary",
}

const LightBackground = styled.div`
  width: 720px;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid red;
`

const DarkBackground = styled.div`
  width: 720px;
  background-color: #160029;
  margin: 0 auto;
  border: 1px solid red;
`

const sample1 = {
  heading: "Featured Articles",
  link: "https://www.example.com",
}

const sample2 = {
  heading: "Garden Seeds",
  link: "https://www.example.com",
}

export const LightSummary = () => (
  <LightBackground>
    <ListSummary
      theme={"light"}
      heading={sample1.heading}
      link={sample1.link}
    />
  </LightBackground>
)

export const DarkSummary = () => (
  <DarkBackground>
    <ListSummary theme={"dark"} heading={sample2.heading} link={sample2.link} />
  </DarkBackground>
)
