import React from "react"
import SiteHeader from "."

export default {
  title: "Composites/SiteHeader",
}

export const lightSiteHeader = () => <SiteHeader theme={"light"} />

export const darkSiteHeader = () => <SiteHeader theme={"dark"} />
