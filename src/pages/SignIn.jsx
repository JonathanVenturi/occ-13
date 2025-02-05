import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogUserInMutation } from '../features/auth/authService'

function SignIn() {
  const authToken = useSelector((state) => state.auth.userToken)
  const [logUserIn, { error }] = useLogUserInMutation()

  if (authToken) {
    return <Navigate to='/dashboard' />
  }

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form onSubmit={handleForm}>
          <div className='input-wrapper'>
            <label htmlFor='email'>Username</label>
            <input type='email' id='email' autoComplete='email' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button type='submit' className='sign-in-button'>
            Sign In
          </button>
        </form>
        {error && error.data && (
          <div className='error'>{error.data.message}</div>
        )}
        {error && error.error && <div className='error'>{error.error}</div>}
      </section>
    </main>
  )
  function handleForm(e) {
    e.preventDefault()
    const userCredentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    logUserIn(userCredentials)
  }
}

export default SignIn
