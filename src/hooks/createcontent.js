import { useStaticQuery, graphql } from "gatsby";


export const UsePostListingQuery = () => {
    const postListData = useStaticQuery(graphql`
    query PostQuery {
        allContentfulProgrammeringsord {
            edges {
              node {
                id
              tittel
              betydning
              beskrivelse {
                raw
              }
              }
            }
          }
    }
    `)
    return postListData;
}
