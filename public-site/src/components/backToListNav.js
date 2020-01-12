import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { toTitleCase } from "../utils/strings"

const BackToListNavBase = styled.div`
  margin-bottom: 15px;
`

const BackToListNav = ({ destination = "", name = "" }) => (
  <BackToListNavBase>
    <Link to={destination}>&#8656; {toTitleCase(name)}</Link>
  </BackToListNavBase>
)

export default BackToListNav
