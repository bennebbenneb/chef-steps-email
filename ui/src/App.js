import React from 'react'
import axios from 'axios'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            originalEmailsEndpoint: "/stubs/emails.json",
            emailsEndpoint: "/stubs/emails.json",
            originalNumberOfEmails: null,
            noDuplicatesNumberOfEmails: null,
            textFieldTemp: "/stubs/emails.json"
        }
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({
            textFieldTemp: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            emailsEndpoint: this.state.textFieldTemp
        });
    }

    handleClick(event) {
        event.preventDefault();
        axios.get(this.state.emailsEndpoint)
            .then((response) => {
                if (!Array.isArray(response.data) || typeof response.data[0] !== "string") {
                    alert("The endpoint needs to return an array of strings");
                    return;
                }
                const originalNumberOfEmails = response.data.length;
                const emailsObject = response.data.reduce((acc, email, index) => {
                    if (acc[email] !== true) {
                        acc[email] = true;
                        acc.___arr[index] = email;
                    }
                    return acc;
                }, {
                    ___arr: []
                });
                const emailArrayNoDuplicates = emailsObject.___arr;
                const noDuplicatesNumberOfEmails = emailArrayNoDuplicates.length;

                this.setState({
                    originalNumberOfEmails,
                    noDuplicatesNumberOfEmails
                });
            });
    }

    render() {
        return (
            <div className="app">
                <h1>ChefSteps</h1>
                <h2>Remove Duplicates</h2>
                <p>I am using this list of emails. <a href="/stubs/emails.json">Email List</a></p>
                <p>To change the endpoint enter the full URL into the text field. The original URL
                    is {this.state.originalEmailsEndpoint}</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.handleChange.bind(this)} value={this.state.textFieldTemp} type="text"/>
                    <input type="submit"/>

                </form>
                <p><a href="#" onClick={this.handleClick.bind(this)}>Click here</a> to fetch the emails and remove
                    duplicates</p>
                {
                    this.state.originalNumberOfEmails ?
                        <p>
                            There were {this.state.originalNumberOfEmails} emails in the list
                            from {this.state.emailsEndpoint}. After removing duplicates there
                            are {this.state.noDuplicatesNumberOfEmails} emails left.
                        </p>
                        : ""
                }
            </div>
        )
    }
}

export default App;