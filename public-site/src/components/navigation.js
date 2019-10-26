import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { toTitleCase } from "../utils/strings"

const BaseNavigation = ({ className, navLinks }) => (
  <nav className={className}>
    {navLinks
      .filter(item => item.published === true)
      .map((item, i) => (
        <Link to={item.link} key={i} activeClassName="active">
          {toTitleCase(item.name)}
        </Link>
      ))}
  </nav>
)

const Navigation = styled(BaseNavigation)`
  a {
    color: #f8f8f8;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    color: #ffffff;
  }
  a.active {
    color: #ffffff;
    text-decoration: underline;
  }
  a:not(:last-child) {
    margin-right: 10px;
  }
`
export default Navigation
