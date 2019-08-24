import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

const LISTING_QUERY = graphql`
  query BlogListing {
    allMarkdownRemark(
      limit: 1
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date
            title
            slug
          }
        }
      }
    }
  }
`

const listing = () => {
  return (
    <>
      <h1>Posts</h1>
      <StaticQuery
        query={LISTING_QUERY}
        render={({ allMarkdownRemark }) =>
          allMarkdownRemark.edges.map(({ node }) => (
            <article key={node.frontmatter.slug}>
              <h2>{node.frontmatter.title}</h2>
              <p>{node.frontmatter.date}</p>
              <p>{node.excerpt}</p>
              <Link to={`${node.frontmatter.slug}`}>Go to post</Link>
            </article>
          ))
        }
      />
    </>
  )
}

export default listing
