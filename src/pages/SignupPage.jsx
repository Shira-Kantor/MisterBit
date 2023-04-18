import { userService } from '../services/UserService'
import { Component, useState } from 'react'
import { Link, NavLink, useNavigate, withRouter } from "react-router-dom";
import { useFormRegister } from '../customHooks/useFormRegister';

export function SignupPage() {
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()
 
  async function login(ev) {
    ev.preventDefault()
    try {
      await userService.signup(userName)
      navigate('/user')
    } catch (error) {
      console.log('error:', error)
    }
  } 
  
  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
        case 'number':
        case 'range':
            value = +value
            break;
        case 'checkbox':
            value = target.checked
            break;
        default:
            break;
    }
    setUserName(value)
  }

    return (
      <section className="login">
        <form onSubmit={login}>
          <h1>Please enter yout name</h1>
          <br />
          {/* <h3>Login</h3>
          <input placeholder="Username" type="text" />
          <button onClick={login}>Login</button>
          <br />
          <br /> */}
          <h3>SignUp</h3>
          {/* //         <input type="text" placeholder="Your full name" /> */}
          <label htmlFor="userName"> </label>
          <input value={userName} onChange={handleChange} name="userName" id="userName" type="text" placeholder="Username" />
          <button>SignUp</button>
          {/* <button>SignUp</button> */}
        </form>
      </section >
    )
  
}

// export default SignupPage


// const loginUser={ username: 'puki' }
// const signupUser= { username: '', fullname: ''}
// export function SignupPage() {

//   return (
//     <section className="login">
//       <form>
//         <h1>Please enter yout name</h1>
//         <br />
//         <h3>Login</h3>
//         <input placeholder="Username" type="text" />
//         <button onClick={login}>Login</button>
//         <br />
//         <br />
//         {/* <h3>Signup</h3>
//         <input type="text" placeholder="Your full name" />
//         <input type="text" placeholder="Username" />
//         <button>Signup</button> */}
//       </form>
//     </section >
//   )
// }

