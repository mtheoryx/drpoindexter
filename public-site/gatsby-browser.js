import Amplify, { Analytics } from "aws-amplify"
import awsconfig from "./src/aws-exports"
//Dark Theme for code block highlighting
require("prismjs/themes/prism-tomorrow.css")

Amplify.configure(awsconfig)

export const onRouteUpdate = ({ location }) => {
  Analytics.record({
    name: "pageVisit",
    attributes: { page: location.pathname },
  })
}
