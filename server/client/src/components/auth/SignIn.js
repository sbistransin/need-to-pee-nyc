const SignIn = () => { 
  return (
    <form>
    <div className='form-group'>
      <label>Email</label>
      <input
        className='form-control'
        name='email'></input>
    </div>

    <div className="form-group">
      <label>Password</label>
      <input 
        className="form-control"
        name='password' ></input>
    </div>

    <button className="btn btn-primary" type="submit">Submit</button>
  </form>
)
}

export default SignIn;