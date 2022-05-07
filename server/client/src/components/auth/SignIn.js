import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signin } from '../../actions';

const userSchema = Yup.object().shape({
  email: Yup.string().email().lowercase().required(),
  password: Yup.string().required()
});

const SignIn = () => { 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { authenticated, authError} = useSelector(state => {
    const test = state.auth;
    return test;
  });

  const handleSignInSubmit = (data) => {
    dispatch(signin(data, () => {
      navigate(state?.path || "/");
    }));
  };

  
  return (
    <form onSubmit={handleSubmit(handleSignInSubmit)}>
      <div className='form-group'>
        <label>Email</label>
        <input
          className='form-control'
          name='email'
          {...register("email", {
            required: "Required",
          })}/>
          {errors.email?.message}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          className="form-control"
          name='password'
          type='password' 
          {...register("password", {
            required: "Required",
          })}/>
          {errors.password?.message}
          {(authError && !authenticated) ? authError : ''}
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
)
}

export default SignIn;