import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  setInStorage,
  getFromStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      // split into different components?
      token: '',
      // split into different components?
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
    };
    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);

    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);

    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);

    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);

    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);

    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);

    // this.onTextBoxChangeEnterLink = this.onTextBoxChangeEnterLink.bind(this);

    this.onSignIn = this.onSignIn.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app')

    if (obj && obj.token) {
      const { token } = obj
      // verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              // could also be token: token
              isLoading: false,
            })
          } else {
            this.setState({
              isLoading: false,
            })
          }
        });
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  onTextBoxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextBoxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextBoxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextBoxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onTextBoxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }

  onTextBoxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }

  onSignUp() {
    // grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    })

    // post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
          })
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          })
        }
      })
  }

  onSignIn() {
    // post request to backend
    // grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    })

    // post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if (json.success) {
          setInStorage('the_main_app', { token: json.token })
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          })
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          })
        }
      })
  }


  logout() {
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('the_main_app')

    if (obj && obj.token) {
      const { token } = obj
      // verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              signInError: '',
              signUpError: '',
              // could also be token: token
              isLoading: false,
            })
          } else {
            this.setState({
              isLoading: false,
              signInError: '',
              signUpError: '',
            })
          }
        });
    } else {
      this.setState({
        isLoading: false,
        signInError: '',
        signUpError: '',
      })
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>)
    }
    // Nead to break the code below into individual components: sign up and sign in

    // broke when i started adding values to the below code
    if (!token) {
      return (
        <div className='container'>
          <div class="row">
            <div class="col s12">
              <div class="card blue-grey darken-1">
              <div class="card-content white-text">
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <span class="card-title">Sign In</span>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextBoxChangeSignInEmail} />
            <br /><br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextBoxChangeSignInPassword} />
            <br /><br />
            <button className='btn' onClick={this.onSignIn}>Sign In</button>
          </div>
          </div>
          </div>
          
          <br />
          <div>
          <div class="row">
            <div class="col s12">
              <div class="card blue-grey darken-1">
              <div class="card-content white-text">
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <span class="card-title">Sign Up</span>
            <input
              type="text"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.onTextBoxChangeSignUpFirstName} />
            <br /><br />
            <input
              type="text"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.onTextBoxChangeSignUpLastName} />
            <br /><br />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextBoxChangeSignUpEmail} />
            <br /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextBoxChangeSignUpPassword} />
            <br /><br />
            <button className='btn' onClick={this.onSignUp}>Sign Up</button>
            </div>
            </div>
            </div>
            </div>

          </div>
        </div>
        </div>
      )
    }

    return (
      <div>
        <p>Dashboard</p>
        
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;