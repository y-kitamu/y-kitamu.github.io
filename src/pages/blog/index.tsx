import * as React from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { graphql } from "gatsby";
import BlogMainFeaturedPost from "../../components/blog/MainFeaturedPost";
import BlogFeaturedPost from "../../components/blog/FeaturedPost";
import BlogMain from "../../components/blog/Main";
import BlogSidebar from "../../components/blog/Sidebar";
import BlogLayout from "../../components/blog/layout";

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const MDX_HEADER_REGEX = /---[^]*---[\n\r]*/;

const BlogMainPage = ({ data }: { data: any }) => {
  if (data.featuredPosts.nodes.length === 0) {
    return <BlogLayout>{"No articles posted."}</BlogLayout>;
  }

  data.featuredPosts.nodes.map((node: BlogPost) => {
    node.rawBody = node.rawBody.replace(MDX_HEADER_REGEX, "");
  });

  const latestPost: BlogPost = data.featuredPosts.nodes[0];
  const recentPosts: BlogPost[] = [
    data.featuredPosts.nodes[1],
    data.featuredPosts.nodes[2],
  ];
  return (
    <BlogLayout>
      <BlogMainFeaturedPost post={latestPost} />
      <Grid container spacing={4}>
        {recentPosts.map((post) => (
          <BlogFeaturedPost key={post.frontmatter.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <BlogMain posts={data.otherPosts.nodes} />
        <BlogSidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        />
      </Grid>
    </BlogLayout>
  );
};

export const query = graphql`
  query {
    featuredPosts: allMdx(
      limit: 3
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        slug
        id
        rawBody
      }
    }
    otherPosts: allMdx(
      skip: 3
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        slug
      }
    }
  }
`;

export default BlogMainPage;
