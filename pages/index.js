import React, { Component, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import wp from "../wp-config";
import dateFomat from '../utils/dateFormat';

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
          body {
            margin: 0;

          }
          .posts {
            margin: 30px auto;
            max-width: 800px;
          }
          nav {
            background-color: #000;
            color: #fff;
            padding: 1em 100px;
          }
          nav li {
            display: inline-block;
            margin-right: 30px;
          }
          nav a {
            color: white;
            font-size: 18px;
          }
          .masthead {
            width: 100%;
            height: 90vh;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333;
            background-color:#fafafa;
          }
          h1 {
            font-size: calc(30px + 35 * (100vw - 320px) / 1046);
          }

          .post h3{
            margin-bottom: 0.5em;
            font-size: 26px;
          }
          .post .excerpt {
            margin: 15px 0 20px;
            font-size:20px;
          }
          small {
            color: #d23669;
            font-size: 15px;
          }
          .readmore {
            color: #000;
            background-color: transparent;
            text-decoration: none;
            position: relative;
            display: inline-block;
            padding: 0 1px;
            padding: 5px 10px;
            transition: color ease 0.3s;
            border: solid 1px #000;
          }
          .readmore::after {
            content: "";
            position: absolute;
            z-index: -1;
            height: 0%;
            left: -1.5px;
            right: -1.5px;
            bottom: 0;
            background-color: #d23669;
            transition: all ease 0.3s;
          }

        `}</style>

        <div>
          <nav>
            <ul>
              <li>
                <a href="/">BlogName</a>
              </li>
            </ul>
          </nav>
          <section className="masthead">
            <h1>Headless WordPress on the JAMstack</h1>
          </section>
          <section className="posts">
            {this.props.posts.map((post) => {
              return (
                <div className="post" key={post.id}>
                  <h3>{post.title.rendered}</h3>
                  <small>{(post.date)}</small>
                  <div className="excerpt"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <a href={post.slug} className="readmore">
                  Read more ⟶
                  </a>
                </div>
              );
            })}
          </section>
        </div>
      </Fragment>
    );
  }
}
