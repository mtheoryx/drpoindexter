import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

// Rounded image
const roundImageBase = ({ className, src, alt }) => (
  <Img fluid={src} alt={alt} className={className} />
)

export const RoundImage = styled(roundImageBase)`
  border-radius: 50%;
  border: 2px solid #663399;
  &:hover {
    border: 5px solid #663399;
  }
`
// Regular image
const FluidImage = ({ src, alt }) => <Img fluid={src} alt={alt} />

export default FluidImage
