const baseURL = 'https://css-tricks.com/wp-json';

const wp = {    
    allPosts: `${baseURL}/wp/v2/posts?page=1&per_page=20&_embed=1`,
    getTags: `${baseURL}/wp/v2/tags?page=1&per_page=40&include=` 
}
export default wp

