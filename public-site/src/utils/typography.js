import Typography from "typography"
import grandViewTheme from "typography-theme-grand-view"

// @BEGIN: Typography Customizations
grandViewTheme.headerFontFamily = ["Source Serif Pro", "georgia", "serif"]
grandViewTheme.headerWeight = "700"
grandViewTheme.bodyFontFamily = ["Roboto", "Helvetica", "sans-serif"]
grandViewTheme.bodyWeight = "400"
grandViewTheme.boldWeight = "700"
grandViewTheme.bodyGray = "slate"
// @END: Typography Customizations

const typography = new Typography(grandViewTheme)

export default typography
