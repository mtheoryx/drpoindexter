import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { Link } from "gatsby"

import colors from "../colors"
import { MarkGithub } from "@styled-icons/octicons"

const darkTheme = Object.assign({
  colors: {
    Text: "#FFFFFF",
  },
})

const lightTheme = Object.assign({
  colors: {
    Text: colors.purpleBlack,
  },
})

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  a {
    color: ${({ theme }) => theme.colors.Text};
    cursor: pointer;
  }
`

export const Github = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <StyledIcon>
        <a
          href="https://github.com/mtheoryx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MarkGithub />
        </a>
      </StyledIcon>
    </ThemeProvider>
  )
}
