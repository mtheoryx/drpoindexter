import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Navigation from "./navigation"

const SiteHeading1 = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
)

const StyledSiteHeading1 = styled(SiteHeading1)`
  margin: 0;
`

const HeaderWrapper = ({ className, children }) => (
  <div className={className}>{children}</div>
)

const StyledHeaderWrapper = styled(HeaderWrapper)`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
`

const Header = ({ className, children }) => (
  <header className={className}>{children}</header>
)

const StyledHeader = styled(Header)`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const HeaderComponent = ({ siteTitle, navLinks }) => (
  <StyledHeader>
    <StyledHeaderWrapper>
      <StyledSiteHeading1>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </StyledSiteHeading1>
      <Navigation navLinks={navLinks} />
    </StyledHeaderWrapper>
  </StyledHeader>
)

export default HeaderComponent
