import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import colors from "../colors"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Faustina:wght@700&display=swap');
  body {
    font-size: 16px;
  }
`

const fonts = {
  fonts: {
    serif: "'Faustina', serif",
  },
  fontSizes: {
    base: "1.5em", // 16px/24px => 1.5em
  },
  fontWeights: {
    bold: "700",
  },
}

const lightTheme = Object.assign(
  {
    colors: {
      Text: colors.whitePink,
    },
  },
  fonts
)

const darkTheme = Object.assign(
  {
    colors: {
      Text: colors.lightBlue,
    },
  },
  fonts
)

const StyledSiteTitle = styled.h1`
  font-size: 1.5em;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.Text};
  letter-spacing: 0.08rem;
`

const SiteTitle = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <StyledSiteTitle>David Poindexter</StyledSiteTitle>
    </ThemeProvider>
  )
}

export default SiteTitle
