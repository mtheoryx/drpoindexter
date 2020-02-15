import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Navigation from "./navigation"

const SiteHeading = ({ className, children }) => (
  <h4 className={className}>{children}</h4>
)

const StyledSiteHeading = styled(SiteHeading)`
  margin: 0;
  font-size: 2rem;
`

const HeaderWrapper = ({ className, children }) => (
  <div className={className}>{children}</div>
)

const StyledHeaderWrapper = styled(HeaderWrapper)`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  border-bottom: 5px solid #0abf0a;
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
      <Navigation navLinks={navLinks} />
      <StyledSiteHeading>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </StyledSiteHeading>
    </StyledHeaderWrapper>
  </StyledHeader>
)

export default HeaderComponent
