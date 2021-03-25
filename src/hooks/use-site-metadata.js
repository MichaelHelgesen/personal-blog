import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = (string) => {
  console.log("STRING", string);
    const { allContentfulAsset } = useStaticQuery(
    graphql`
      query All {
        allContentfulAsset {
            edges {
              node {
                contentful_id
                fluid {
                    src
                }
              }
            }
          }
      }
    `,
  );
  console.log("SITE", allContentfulAsset)
  return allContentfulAsset.edges.filter(el => el.node.contentful_id === string);
};