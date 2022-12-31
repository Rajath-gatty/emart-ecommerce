
const Login = () => {
  return (
    <button onClick={() => window.location = 'http://localhost:1337/api/connect/google'} className="px-6 py-3 rounded bg-primary text-white">Login with google</button>
  )
}

export default Login;