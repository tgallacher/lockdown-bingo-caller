module.exports = {
  siteMetadata: {
    title: `Lockdown Bingo Caller`,
    description: `A simple Bingo caller app to help when running your family/friends Bingo night during lockdown.`,
    author: `@tgallacher`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-remove-generator',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.NODE_ENV === 'production' && 'UA-72220182-2'
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Lockdown Bingo Caller',
        short_name: `BingoCaller`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`
      }
    },
    `gatsby-plugin-offline`
  ]
};
