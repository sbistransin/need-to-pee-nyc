import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

const SignUp = () => { 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });
  
  const handleFormSubmit = (data) => {
    console.log(data);
    // call action that will sign in user if it exists in database
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

export default SignUp;