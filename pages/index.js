import React, { Component, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import wp from "../wp-config";

export default class extends Component {
  state = () => ({
    posts: [],
    tags: [],
  });

  // Resolve promise and set initial props.
  static async getInitialProps() {
    const response = await axios.get(wp.allPosts);
    return {
      posts: response.data,
    };
  }

  render() {
    return (
      <Fragment>
        <style jsx>{`
          nav {
            background-color: #000;
            color: #fff;
            padding: 1em 100px;
          }
          nav li {
            display:inline-block;
            margin-right:30px;
          }
          nav a {
            text-decoration: none;
            color: white;
          }
          .masthead {
            border: solid 1px red;
            width: 100%;
              height: 90vh;
              overflow: hidden;
              text-align: center;
              display: -webkit-box;
              display: flex;
              -webkit-box-pack: center;
              justify-content: center;
              -webkit-box-align: center;
              align-items: center;
              padding: 7vw;
              background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 37%, rgba(0, 0, 0, 0.65) 100%), url(/mountains-masthead.jpg) no-repeat center center scroll;
              background-size: cover;
              color: #333;
          }
          }
        `}</style>

        <div>
          <nav>
            <ul>
              <li>
                <a href="/" class="">
                  BlogName
                </a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </nav>
          <section class="masthead">
            <h1>Headless WordPress on the JAMstack</h1>
          </section>
          <div className="post">
            {this.props.posts.map((post) => {
              return (
                <div className="post" key={post.id}>
                  <h3>{post.title.rendered}</h3>
                  <small>{post.date}</small>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <a href={post.slug} className="readmore">
                    read more
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}
