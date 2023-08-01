import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from '../../axios';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        postSelectedId: null,
        error: false
    }

    componentDidMount(){
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map( post => {
                    return {
                        ...post,
                        author: 'Abhi'
                    }
                })
                this.setState({posts: updatedPosts})
                //console.log(response);
            })
            .catch(error => {
                //console.log(error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) =>{
        this.setState({postSelectedId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p> ;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                            title = {post.title} 
                            key={post.id} 
                            author = {post.author}
                            clicked = {()=> {this.postSelectedHandler(post.id)}}/>
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.postSelectedId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;