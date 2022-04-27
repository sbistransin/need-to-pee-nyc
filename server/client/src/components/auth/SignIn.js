import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

const SignIn = () => { 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  let navigate = useNavigate();

  
  const handleFormSubmit = (data) => {
    console.log(data);
    axios.post(
      'http://localhost:8000/login',
      data
    ).then(function (response) {
      console.log(response);
      navigate('/');
    })
    .catch(function (error) {
      console.error(error);
      navigate('/signin')
    });
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          {...register("password", {
            required: "Required",
          })}/>
          {errors.password?.message}
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
)
}

export default SignIn;