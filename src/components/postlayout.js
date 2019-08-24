import React, { Component } from "react"

import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"

// Static Query

export default class PostLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data
    return (
      <Layout>
        <div>
          <h1>{markdownRemark.frontmatter.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: markdownRemark.html,
            }}
          ></div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query postQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date
      }
      html
    }
  }
`
