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

                // Make sure the data is in the correct format
                if (!Array.isArray(response.data) || typeof response.data[0] !== "string") {
                    alert("The endpoint needs to return an array of strings");
                    return;
                }
                const originalNumberOfEmails = response.data.length;
                const emailsObject = response.data.reduce((acc, email, index) => {

                    // Make sure this email isn't a duplicate
                    if (acc.map[email] !== true) {
                        acc.map[email] = true;

                        // this will create a sparsely populated array
                        acc.array[index] = email;
                    }
                    return acc;
                }, {
                    map: {},
                    array: []
                });

                // Filter out the empty array values and save
                const emailArrayNoDuplicates = emailsObject.array.filter((email) => {
                    return email;
                });

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
                <p>I put the code on my GitHub account. <a
                    href="https://github.com/bensisson/chef-steps-email/blob/master/ui/src/App.js">View Code</a></p>
                <p>To change the endpoint enter the full URL into the text field. The original URL
                    is {this.state.originalEmailsEndpoint}</p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.handleChange.bind(this)} value={this.state.textFieldTemp} type="text"/>
                    <input type="submit"/>

                </form>
                <p>
                    <button onClick={this.handleClick.bind(this)}>Click here</button> to
                    fetch the emails and remove duplicates
                </p>
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