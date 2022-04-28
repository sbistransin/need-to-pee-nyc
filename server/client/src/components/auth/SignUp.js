import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../actions';


const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  name: Yup.string().required()
});

const SignUp = () => { 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { authError } = useSelector(state => {
    return state.auth;
  });
  
  const handleSignUpSubmit = (data) => {
    dispatch(signup(data, () => {
      debugger;
      navigate('/');
    }));
  };
  
  return (
    <form onSubmit={handleSubmit(handleSignUpSubmit)}>
      <div className='form-group'>
        <label>Email</label>
        <input
          className='form-control'
          name='email'
          {...register("email", {
            required: "Required",
          })}/>
          {errors.email?.message}
          {authError ? authError : ''}
      </div>
      <div className='form-group'>
        <label>Name</label>
        <input
          className='form-control'
          name='name'
          {...register("name", {
            required: "Required",
          })}/>
          {errors.name?.message}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          className="form-control"
          name='password'
          {...register("password", {
            required: "Required",
          })}/>
          {errors.password?.message}
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
)
}

export default SignUp;