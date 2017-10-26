import React, { Component } from 'react';
import CommentBox from './CommentBox';
import Comments from './Comments';
import Ably from '../ably';

class App extends Component {
	constructor(props) {
		super(props);

		this.handleAddComment = this.handleAddComment.bind(this);
		this.state = {
			comments: []
		}
	}

	componentDidMount() {
		const channel = Ably.channels.get('comments');
		channel.subscribe('add_comment', (message) => {
			const name = message.data.name;
			const comment = message.data.comment;

			this.handleAddComment({ name, comment });
			console.log(message.data);
		});

	}

	handleAddComment(comment) {
		this.setState((prevState) => {
			return {
				comments: prevState.comments.concat(comment)
			};
		});
	}

  	render() {
    	return (
			<section className="section">
				<div className="container">
					<div className="columns">
                		<div className="column is-half is-offset-one-quarter">
							<CommentBox handleAddComment={this.handleAddComment} />
							<Comments comments={this.state.comments} />
						</div>
					</div>
				</div>
			</section>
		);
  	}
}

export default App;
