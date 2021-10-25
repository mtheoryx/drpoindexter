import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { Link } from "gatsby"
import colors from "../colors"

const fonts = {
  fonts: {
    serif: "'Faustina', serif",
  },
  fontSizes: {
    base: "1.125em", // 16px/18px => 1.125em
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

const StyledNavGroup = styled.nav`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.Text};
  letter-spacing: 0.08rem;
  display: flex;
  justify-content: space-between;
  ol {
    list-style-type: none;
    display: flex;
  }
`
const StyledNavLink = styled.li`
  margin: 0 5px;
  a {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    font-family: ${({ theme }) => theme.fonts.serif};
    color: ${({ theme }) => theme.colors.Text};
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const SiteNav = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <StyledNavGroup>
        <ol>
          <StyledNavLink>
            <Link to="/articles">Articles</Link>
          </StyledNavLink>
          <StyledNavLink>
            <Link to="/garden">Garden</Link>
          </StyledNavLink>
          <StyledNavLink>
            <Link to="/about">About</Link>
          </StyledNavLink>
        </ol>
      </StyledNavGroup>
    </ThemeProvider>
  )
}

export default SiteNav
