import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Faustina:wght@700&display=swap');
  body {
    font-size: 16px;
  }
`

const fonts = {
  fonts: {
    sans: "'Roboto Slab', sans-serif"
  },
  fontSizes: {
    base: "1em", //16px
    small: "1.125em", //18px
    medium: "1.375em", //22px
    large: "2.375em" //38px
  },
  fontWeights: {
    bold: "700"
  }
}

const lightTheme = Object.assign({
  colors: {
    Background: "#fff6ff",
    LinkHover: "#481380",
    Link: "#160029",
    Border: "#CDCBE7",
  }
}, fonts)

const darkTheme = Object.assign({
  colors: {
    Background: "#160029",
    LinkHover: "#CDCBE7",
    Link: "#CDCBE7",
    Border: "#CDCBE7",
  }
}, fonts)

const StyledFooter = styled.footer`
  background: ${({theme}) => theme.colors.Background};
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 0;
  padding: 0;
  height: 60px;
  align-items: center;
  font-size: ${({theme}) => theme.fontSizes.small};
  font-family: ${({theme}) => theme.fonts.sans};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  border-top: 3px solid ${({theme}) => theme.colors.Border};
  a {
    color: ${({theme}) => theme.colors.Link};
  }
  a:hover {
    color: ${({theme}) => theme.colors.LinkHover};
    text-decoration: underline;
  }
  a:not(:first-child) {
    margin-right: 0;
  }
  .optional1,
  .optional2 {
    display: none;
  }
  @media (min-width: 550px) {
    justify-content: space-between;
    .optional1 {
      display: inline;
    }
  }
  @media (min-width: 800px) {
    justify-content: space-between;
    .optional1,
    .optional2 {
      display: inline;
    }
  }
`

const Footer = ({theme}) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <StyledFooter>
        <span className="essential">
          <a
            href="https://www.dpoindexter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © {new Date().getFullYear()} David Poindexter
          </a>
        </span>

        <a
          href="https://twitter.com/drpoindexter"
          target="_blank"
          rel="noopener noreferrer"
          className="optional1"
        >
          @drpoindexter
        </a>
        <a
          href="https://aws.amazon.com/amplify/"
          target="_blank"
          rel="noopener noreferrer"
          className="optional2"
        >
          AWS Amplify
        </a>
      </StyledFooter>
    </ThemeProvider>
  )
}

export default Footer
