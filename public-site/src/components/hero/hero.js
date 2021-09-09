import React from "react"
// import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import styled, { ThemeProvider } from "styled-components"
import colors from "../colors"
import Profile from "../profile"
import LightHero from "./hero-image-light.png"
import DarkHero from "./hero-image-dark.png"

// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Faustina:wght@700&display=swap');
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');
//   body {
//     font-size: 16px;
//   }
// `

const fonts = {
  fonts: {
    serif: "'Faustina', serif",
    sansSerif: "'Roboto', sans-serif",
  },
  fontSizes: {
    base: "1.5em", // 16px/24px => 1.5em
  },
  fontWeights: {
    bold: "700",
    regular: "400",
    light: "100",
  },
}

const lightTheme = Object.assign(
  {
    colors: {
      Text: colors.whitePink,
    },
    backgroundImage: LightHero,
  },
  fonts
)

const darkTheme = Object.assign(
  {
    colors: {
      Text: colors.lightBlue,
    },
    backgroundImage: DarkHero,
  },
  fonts
)

const StyledHero = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${({ theme }) => theme.backgroundImage});
  background-size: cover;
  color: ${({ theme }) => theme.colors.Text};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`

const StyledHeroWrapper = styled.div`
  height: 360px;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const StyledIntroWrapper = styled.div`
  margin-right: 30px;
`

const StyledTagline = styled.div`
  font-size: 1.5rem;
`

const StyledIntro = styled.div`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 1.1875rem;
  span {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  margin-top: 30px;
  max-width: 500px;
`

const Hero = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <StyledHero>
        <StyledHeroWrapper>
          <Profile theme={theme} />
          <StyledIntroWrapper>
            <StyledTagline>
              I'm David, a software engineer and cloud architect.
            </StyledTagline>
            <StyledIntro>
              I specialize in <span>serverless</span> development, cloud{" "}
              <span>architecture</span> and implementation, and{" "}
              <span>write</span> about my experiences along the way.
            </StyledIntro>
          </StyledIntroWrapper>
        </StyledHeroWrapper>
      </StyledHero>
    </ThemeProvider>
  )
}

export default Hero
