import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { toTitleCase } from "../../utils/strings"

const BackToListNavBase = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  /* To avoid jitter in the UI */
  border: 1px solid transparent;

  &:active {
    font-weight: normal;
    background: #fafafa;
  }
  &:hover {
    color: #663399;
    cursor: pointer;
    border: 1px solid #eaeaea;
    border-radius: 3px;
  }
  a {
    box-sizing: border-box;
    text-decoration: none;
    color: #663399;
    display: inline-block;
    width: 100%;
  }
  a:visited {
    text-decoration: none;
    color: #663399;
  }
  a:active {
    color: #333;
  }
`

const BackToListNav = ({ destination = "#", name = "Back" }) => (
  <BackToListNavBase>
    <Link to={destination}>&#8656; {toTitleCase(name)}</Link>
  </BackToListNavBase>
)

export default BackToListNav
