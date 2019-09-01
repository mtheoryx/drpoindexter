import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Navigation = () => (
  <nav>
    <Link
      to="/work/"
      style={{ color: `white`, marginRight: 10, textDecoration: `none` }}
    >
      Work
    </Link>
    <Link
      to="/writing/"
      style={{ color: `white`, marginRight: 10, textDecoration: `none` }}
    >
      Writing
    </Link>
    <Link
      to="/projects/"
      style={{ color: `white`, marginRight: 10, textDecoration: `none` }}
    >
      Projects
    </Link>
    <Link
      to="/opensource/"
      style={{ color: `white`, marginRight: 10, textDecoration: `none` }}
    >
      Open Source
    </Link>
    <Link
      to="/stream/"
      style={{ color: `white`, marginRight: 10, textDecoration: `none` }}
    >
      Stream
    </Link>
    <Link
      to="/contact/"
      style={{ color: `white`, marginRight: 10, textDecoration: `none` }}
    >
      Contact
    </Link>
    <Link to="/about/" style={{ color: `white`, textDecoration: `none` }}>
      About
    </Link>
  </nav>
)

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Navigation />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
