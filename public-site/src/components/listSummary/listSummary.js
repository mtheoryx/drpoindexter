import React from "react"
import { Link } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import colors from "../colors"

const lightTheme = Object.assign({
  colors: {
    Text: colors.purpleBlack,
  },
})

const darkTheme = Object.assign({
  colors: {
    Text: colors.lightBlue,
  },
})

const ListSummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  align-items: bottom;
`

const ListSummaryHeader = styled.h3`
  font-family: "'Faustina', serif";
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.Text};
`

const ListSummaryLink = styled(Link)`
  font-family: "'Roboto', sans-serif";
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.Text};
`

const ListSummary = ({ heading, link, theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <ListSummaryWrapper>
        <ListSummaryHeader>{heading}</ListSummaryHeader>
        <ListSummaryLink to={link}>See All</ListSummaryLink>
      </ListSummaryWrapper>
    </ThemeProvider>
  )
}

export default ListSummary
