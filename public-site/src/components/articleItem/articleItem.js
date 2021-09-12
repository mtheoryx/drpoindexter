import React from "react"
import { Link } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import colors from "../colors"

const fonts = {
  fonts: {
    sans: "'Roboto Slab', serif",
    serif: "'Faustina', serif",
  },
  fontSizes: {
    base: "1em", //16px
    small: "1.125em", //18px
    medium: "1.375em", //22px
    large: "2.375em", //38px
  },
  fontWeights: {
    bold: "700",
    normal: "400",
  },
}

const lightTheme = Object.assign(
  {
    colors: {
      Background: "#fff",
      LinkHover: colors.purple,
      Link: colors.purpleBlack,
      Border: colors.lightBlue,
      TextColor: colors.purpleBlack,
    },
  },
  fonts
)

const darkTheme = Object.assign(
  {
    colors: {
      Background: colors.purpleBlack,
      LinkHover: colors.lightBlue,
      Link: colors.lightBlue,
      Border: colors.lightBlue,
      TextColor: colors.whitePink,
    },
  },
  fonts
)

const ArticleItemTitle = styled(Link)`
  display: block;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.375em;
  margin-bottom: 0.5em;
  color: ${(props) => props.theme.colors.Link};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.LinkHover};
  }
`
const ArticleItemDescription = styled.p`
  font-family: "Roboto Slab", serif;
  color: ${(props) => props.theme.colors.TextColor};
  -webkit-line-clamp: 2;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
`
const StyledArticleItem = styled.div`
  background-color: ${(props) => props.theme.colors.Background};
  color: ${(props) => props.theme.colors.TextColor};
  border: 3px solid;
  border-color: ${(props) => props.theme.colors.Border};
  padding: 0.8em;
  margin: 0 0 1em 0;
`

const ArticleItem = ({ article, theme, link = "/" }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <StyledArticleItem key={article.id}>
        <ArticleItemTitle to={link}>{article.title}</ArticleItemTitle>
        {article.description && (
          <ArticleItemDescription>{article.description}</ArticleItemDescription>
        )}
      </StyledArticleItem>
    </ThemeProvider>
  )
}

export default ArticleItem
