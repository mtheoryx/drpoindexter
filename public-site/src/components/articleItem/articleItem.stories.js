import React from "react"
import styled from "styled-components"
import ArticleItem from "./articleItem"

export default {
  title: "Components/ArticleItem",
}

const LightBackground = styled.div`
  width: 720px;
  background-color: #fff;
  margin: 0 auto;
  height: 100vh;
  padding: 20px;
`

const DarkBackground = styled.div`
  width: 720px;
  background-color: #160029;
  margin: 0 auto;
  height: 100vh;
  padding: 20px;
`

const sampleArticle = {
  id: "1",
  title: "Sample Article",
  description: "Sample Description",
}

const sampleLongArticle = {
  id: "2",
  title: "Sample Article Sample Article Sample Article Sample Article",
  description:
    "Sample Description Sample Description Sample Description Sample Description Sample Description Sample Description",
}

export const articleLight = () => (
  <>
    <LightBackground>
      <ArticleItem theme="light" article={sampleArticle} />
      <ArticleItem theme="light" article={sampleLongArticle} />
    </LightBackground>
  </>
)

export const articleDark = () => (
  <>
    <DarkBackground>
      <ArticleItem theme="dark" article={sampleArticle} />
      <ArticleItem theme="dark" article={sampleLongArticle} />
    </DarkBackground>
  </>
)
