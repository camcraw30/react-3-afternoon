import React, { Component } from 'react';
import axios from 'axios';


import './App.css';

import Header from './Header/Header';
import Summary from './Summary/Summary';
import Feed from './Feed/Feed';

class App extends Component {
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState({ posts: results.data });
    });
  }

  constructor() {
    super();

    this.state = {
      posts: []
    }

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });
  }

  createPost( text ) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Summary count={ posts.length } />

          <Feed posts={ posts }
                updatePostFn={ this.updatePost }
                deletePostFn={ this.deletePost }
                createPostFn={ this.createPost } />

        </section>
      </div>
    );
  }
}

export default App;