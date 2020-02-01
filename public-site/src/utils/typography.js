import Typography from "typography"
import oceanBeachTheme from "typography-theme-ocean-beach"

// @BEGIN: Typography Customizations
// grandViewTheme.headerFontFamily = ["Source Serif Pro", "georgia", "serif"]
// grandViewTheme.headerWeight = "700"
// grandViewTheme.bodyFontFamily = ["Roboto", "Helvetica", "sans-serif"]
// grandViewTheme.bodyWeight = "400"
// grandViewTheme.boldWeight = "700"
// grandViewTheme.bodyGray = "slate"
// grandViewTheme.bodyColor = "slate"
// grandViewTheme.headerColor = "slate"
oceanBeachTheme.linkColor = "#663399"
oceanBeachTheme.overrideThemeStyles = options => ({
  a: {
    color: oceanBeachTheme.linkColor,
    textShadow: `none`,
    textDecoration: `none`,
    backgroundImage: `none`,
  },
  "a:hover": {
    textDecoration: `underline`,
  },
  "h1 a:hover, h1 a:active": {
    color: options.headerColor,
    textDecoration: `underline`,
  },
})
// @END: Typography Customizations

const typography = new Typography(oceanBeachTheme)

export default typography
