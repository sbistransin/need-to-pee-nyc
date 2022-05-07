import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../actions';
import 'react-phone-number-input/style.css'

// "Without country select" component.
import PhoneInput from "react-phone-number-input/react-hook-form-input"

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  name: Yup.string().required(),
  phone: Yup.string().required().length(12)
});

const SignUp = () => { 

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { authError } = useSelector(state => {
    return state.auth;
  });
  
  const handleSignUpSubmit = (data) => {
    dispatch(signup(data, () => {
      navigate('/');
    }));
  };
  
  return (
    <>
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
        <div className="form-group">
          <label>Phone</label>
          <PhoneInput
            className="form-control"
            name="phone"
            country="US"
            international
            withCountryCallingCode
            control={control}
            rules={{ required: true}}
           />
          {errors.phone?.message}
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </>
    
    
)
}

export default SignUp;