import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import colors from "../colors"

import Logo from "../logo"
import SiteTitle from "../siteTitle"
import SiteNav from "../siteNav"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Faustina:wght@700&display=swap');
  body {
    font-size: 16px;
  }
`
const lightTheme = Object.assign({
  colors: {
    Background: colors.purple,
  },
})

const darkTheme = Object.assign({
  colors: {
    Background: colors.purpleBlack,
  },
})

const StyledSiteHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.Background};
  height: 90px !important;
  border-bottom: 1px solid #cdcbe7;
`

const StyledHeaderWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0px 10px;
`

const StyledNavWrapper = styled.div``

const WordMarkWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SiteHeader = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <StyledSiteHeader>
        <GlobalStyle />
        <StyledHeaderWrapper>
          <WordMarkWrapper>
            <Logo theme={theme} />
            &nbsp;&nbsp;&nbsp;
            <SiteTitle theme={theme} />
          </WordMarkWrapper>
          <StyledNavWrapper>
            <SiteNav theme={theme} />
          </StyledNavWrapper>
        </StyledHeaderWrapper>
      </StyledSiteHeader>
    </ThemeProvider>
  )
}

export default SiteHeader
