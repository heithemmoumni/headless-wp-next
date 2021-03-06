import React, { Component, Fragment } from "react";
import Link from "next/link";
import axios from "axios";
import wp from "../wp-config";
import dateFomat from "../utils/dateFormat";

const BlogPage = ({posts, tags}) => (
  <Fragment>
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>BlogName</a>
            </Link>
          </li>
        </ul>
      </nav>
      <section className="masthead">
        <h1>Headless WordPress on the JAMstack</h1>
      </section>
      <main>
        <section className="posts">
          {posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <h3>{post.title.rendered}</h3>
                <small>{dateFomat(post.date)}</small>
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />
                <a href={post.slug} className="readmore">
                  Read more ⟶
                </a>
              </div>
            );
          })}
        </section>
        <aside>
          <h2 className="tags-title">Tags</h2>
          <div className="tags-list">
            <ul>
              {tags.map((tag) => {
                return (
                  <li key={tag.id}>
                    <a href="blog/">{tag.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  </Fragment>
);

BlogPage.getInitialProps = async () => {
  let posts = await axios.get(wp.allPosts);
  posts = posts.data
    .filter((el) => el.status === "publish")
    .map(({ id, slug, title, excerpt, date, tags, content }) => ({
      id,
      slug,
      title,
      excerpt,
      date,
      tags,
      content,
    }));

  let allTags = posts.reduce((acc, item) => {
    return acc.concat(item.tags);
  }, []);

  let tags = await axios.get(wp.getTags + allTags.join());
  tags = tags.data.map(({ id, name }) => ({
    id,
    name,
  }));
  console.log(tags);
  return {
    posts,
    tags,
  };
};
export default BlogPage
