import React, { Component, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import wp from '../wp-config';

export default class extends Component {
  state = () => ({
    posts: [],
    tags: [],
  });

  // Resolve promise and set initial props.
  static async getInitialProps() {
    // Make request for posts.
    const response = await axios.get(wp.allPosts);

    // Return response to posts object in props.
    return {
      posts: response.data,
    };
  }

  render() {
    return (
      <Fragment>
        <div className="post">
          {this.props.posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <h3>{post.title.rendered}</h3>
                <small>{post.date}</small>
                <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                <a href={post.slug} className="readmore">read more</a>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
