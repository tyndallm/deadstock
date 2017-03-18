import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    //this.props.authData = authData //not sure why this is here
  }

  render() {
    console.log(this.props);
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
