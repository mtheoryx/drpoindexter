import React from "react"
import BackToListNav from "./backToListNav"

export default {
  title: "Back to List Nav",
  component: BackToListNav,
}

export const NoProps = () => <BackToListNav />

export const WithProps = () => <BackToListNav destination="#" name="Test" />

export const WithLongProps = () => (
  <BackToListNav destination="#" name="Back to the DevTips" />
)
