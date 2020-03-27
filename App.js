import React from 'react'; 
import axios from 'axios';

import './App.css'


class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: []
  }

  componentDidMount = () => {
    this.getBlogPost()
  }

  getBlogPost = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data
      this.setState({ posts: data })
      console.log('Data has been received');
    })
    .catch(() => {
      console.log('There is an internal error');
    })
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value

    });
  };

  submit = (event) => {
    event.preventDefault();
    
    const payload = {
      title: this.state.title,
      body:this.state.body
    }
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('The data has been sent to the server')
      this.resetUserInput ();
      this.getBlogPost();
    })
    .catch(() => {
      console.log('There is an internal server error')
    })
  };

  resetUserInput = () => {
    this.setState({
      title: '',
      body: ''
    })
  }
  

  deleteBlogPosts = () => {
    axios.delete(`/api/delete/:id`)
    .then((response) => {
      console.log(response.data)
      this.getBlogPost();
    })
    .catch((err) => {
      console.log(err.response)
    })
  }


  displayBlogPosts = (posts) => {
    if(!posts.length) return null
    return posts.map((post, index) => (
      <div className='blog' key={index}>
        <h1>{post.title}</h1>
        <h5>{post.body}</h5>
        <button onClick={this.deleteBlogPosts}>delete</button>
        </div>
    ))
  }

  

  render() {
    console.log('State: ', this.state)
    return (
      <div className='main'>
        <h1>The Blog Spot</h1>
        <form onSubmit={this.submit}>
          <div className='form-input'>
            <input
            type='text'
            name='title'
            placeholder='title'
            value={this.state.title}
            onChange={this.handleChange}
            />
          </div>
          <div className='form-input'>
            <textarea
            name='body' 
            cols='30' 
            rows='10' 
            placeholder='text-area' 
            value={this.state.body}
            onChange={this.handleChange}
            />
          </div>
          <button>SUBMIT</button>
        </form>

        <div className='blogs'>
          {this.displayBlogPosts(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;