// import React from 'react';

// // import { Link } from 'react-router-dom';
// class Logout extends Component {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         isLoading: true,
//         // split into different components?
//         token: '',
//         // split into different components?
//         signUpError: '',
//         signInError: '',
//         logout: ''
        
//       };
     
//       this.logout = this.logout.bind(this)
//     }

//     logout() {
//         this.setState({
//           isLoading: true,
//         })
//         const obj = getFromStorage('the_main_app')
    
//         if (obj && obj.token) {
//           const { token } = obj
//           // verify token
//           fetch('/api/account/logout?token=' + token)
//             .then(res => res.json())
//             .then(json => {
//               if (json.success) {
//                 this.setState({
//                   token: '',
//                   signInError: '',
//                   signUpError: '',
//                   // could also be token: token
//                   isLoading: false,
//                 })
//               } else {
//                 this.setState({
//                   isLoading: false,
//                   signInError: '',
//                   signUpError: '',
//                 })
//               }
//             });
//         } else {
//           this.setState({
//             isLoading: false,
//             signInError: '',
//             signUpError: '',
//           })
//         }
//       }
//       render() {
          
//         <div>
//         <button className='btn' onClick={this.logout}>Logout</button>
//       </div>
//       }
// }
// export default Logout;
