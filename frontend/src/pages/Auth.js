import React, { Component } from 'react';

class AuthPage extends Component {
    state = {
        loggedIn: false
    }

    constructor(props) {
        super(props);

        this.emailElement = React.createRef();
        this.passwordElement = React.createRef();
    }

    switchModeHandler = () => {
        this.setState((prevState) => {
            return {
                loggedIn: !prevState.loggedIn
            }
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        const email = this.emailElement.current.value;
        const password = this.passwordElement.current.value;
        const { loggedIn } = this.state;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let request = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

        if (!loggedIn) {
            request = {
                query: `
                    mutation {
                        createUser(userInput: {
                            email: "${email}",
                            password: "${password}"
                        }) {
                            _id
                            email
                        }
                    }
                `
            };
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const { status } = response;
            if (status !== 200 && status !== 201) {
                throw new Error('Failed!');
            }
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const { loggedIn } = this.state;
        return <form onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="email"></label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    ref={this.emailElement}
                />
            </div>
            <div className="form-control">
                <label htmlFor="password"></label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    ref={this.passwordElement}
                />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>Switch to {loggedIn ? 'SignUp' : 'Login'}</button>
            </div>
        </form>
    }
}

export default AuthPage;