import Typography from "typography"
import grandViewTheme from "typography-theme-grand-view"

// @BEGIN: Typography Customizations
grandViewTheme.headerFontFamily = ["Source Serif Pro", "georgia", "serif"]
grandViewTheme.headerWeight = "700"
grandViewTheme.bodyFontFamily = ["Roboto", "Helvetica", "sans-serif"]
grandViewTheme.bodyWeight = "400"
grandViewTheme.boldWeight = "700"
grandViewTheme.bodyGray = "slate"
grandViewTheme.bodyColor = "slate"
grandViewTheme.headerColor = "#663399"
grandViewTheme.linkColor = "#663399"
grandViewTheme.overrideThemeStyles = options => ({
  a: {
    color: grandViewTheme.linkColor,
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

const typography = new Typography(grandViewTheme)

export default typography
