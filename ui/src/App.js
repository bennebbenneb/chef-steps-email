import React from 'react'
import axios from 'axios'

class App extends React.Component {

    componentDidMount() {
        axios.get("/stubs/emails.json")
            .then((response) => {

                // use the emails as object keys to remove duplicates. Keep index to sort later
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
            });
    }

    render() {
        return (
            <div className="app">
                <h1>ChefSteps</h1>
                <h2>Remove Duplicates</h2>
                <p>I am using this list of emails. <a href="/stubs/emails.json">Email List</a></p>
                <pre>

                </pre>
            </div>
        )
    }
}

export default App;