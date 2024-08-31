const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        Username 
        <input 
        type="text" 
        value={username} 
        name='Username' 
        onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input 
        type="password" 
        value={password} 
        name='Password' 
        onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  </div>
)

export default LoginForm