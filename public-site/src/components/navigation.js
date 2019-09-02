import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const BaseNavigation = ({ className }) => (
  <nav className={className}>
    <Link to="/work/" activeClassName="active">
      Work
    </Link>
    <Link to="/writing/" activeClassName="active">
      Writing
    </Link>
    <Link to="/projects/" activeClassName="active">
      Projects
    </Link>
    <Link to="/opensource/" activeClassName="active">
      Open Source
    </Link>
    <Link to="/stream/" activeClassName="active">
      Stream
    </Link>
    <Link to="/contact/" activeClassName="active">
      Contact
    </Link>
    <Link to="/about/" activeClassName="active">
      About
    </Link>
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
