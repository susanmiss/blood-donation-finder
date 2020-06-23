import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth/userAuth';



class EditPost extends Component {
    constructor(){
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            quantity:'',
            requireToProfile: false,
            error: '',
            loading: false,
            hospital: ''
        }
    }

        init = (postId) => {
            fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.error){
                this.setState({ redirectToProfile: true })
            }else{
                this.setState({ id: data._id, title: data.title, body: data.body, quantity: data.quantity,  error: ""  })
            }
        })
    }

     updatePost = (postId, token, post) => {
        console.log("Post DATA UPDATE: ", post);
        return fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(post)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    componentDidMount(){
        const postId = this.props.match.params.postId
        this.init(postId);  
        this.setState({ hospital: isAuthenticated().hospital });
    }

    handleChange = (name) => (event) => {
                this.setState({ [name]:  event.target.value});
            }
        
        
            update = (postId, token, post, ) => {
                console.log('post DATA: ', post)
                return fetch(`${process.env.REACT_APP_API_URL}/post/post/${postId}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${isAuthenticated().token}`
                    },
                    body: JSON.stringify(post)     
                    
                })
                .then(response => {
                    return response.json()
                })
                .catch(err => console.log(err));
            }

    isvalid = () => {
                const {title, body} = this.state;
                if(title.length == 0 || body.length == 0){
                    this.setState({ error: 'All fields are required'})
                    return false
                }

                return true;
            }

    clickSubmit = event => {
        event.preventDefault(); 
        this.setState({ loading: true })

        if(this.isvalid()){
            const postId = this.state.id
            const token = isAuthenticated().token;
            const hospitaId = isAuthenticated().hospital._id;

            const {title, body, quantity, error, hospitalId} = this.state
       
            const post = { 
                title,
                body,
                quantity,
                error
            };
    
            //console.log(post)
    
            this.update(postId, token, post, error, hospitalId)
            .then(data => {
                if(data.error){
                    this.setState({error: data.error})
                } else {
                    this.setState({
                        redirectToProfile: true
                    })
                }
            }) 
        }       
    }
        

    editPostForm = (title, body, quantity) => (
        <form>
      
            <div className="form-group">
                <label >Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label >Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <div className="form-group">
                <label >Quantity</label>
                <textarea
                    onChange={this.handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-block" style={{backgroundColor: "rgb(234, 181, 178)"}}
            >
                Update Post
            </button>
        </form>
    );


    render(){
        const {title, body, quantity, redirectToProfile, hospital} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/dashboard-hospital/${hospital._id}`} />;
        }

        return (
            <div className="container">
                 {/* <p>{this.props.match.params.postId}</p> */}
                {/* {JSON.stringify(this.state)} */}
                <h2>Update your Post</h2>
                {this.editPostForm(title, body, quantity)}
               
            </div>
        )
    }
}





export default EditPost;