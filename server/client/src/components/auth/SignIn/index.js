import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signin } from "../../../actions";
import { ErrorMsg } from "../SignUp/SignUpElements";
import { SignInContainer, LeftSideWrapper, RightMobileTitle, Form, Input, LoginBtn, RightSideWrapper, Title } from "./SignInElements";
import AuthHeader from "../../Headers/AuthHeader";


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

  const { authenticated, signInAuthError} = useSelector(state => state.auth);

  const handleSignInSubmit = (data) => {
    dispatch(signin(data, () => {
      navigate(state?.path || "/");
    }));
  };
  
  return (
    <>
    <AuthHeader />
    <SignInContainer>
      <LeftSideWrapper>
        <RightMobileTitle>Welcome Back</RightMobileTitle>
        <Form onSubmit={handleSubmit(handleSignInSubmit)}>
          <div className='form-group'>
          {(signInAuthError && !authenticated) ? <ErrorMsg>{signInAuthError}</ErrorMsg> : ''}
            <label>Email</label>
            <Input
              className='form-control'
              name='email'
              {...register("email", {
                required: "Required",
              })}/>
            {errors.email ? <ErrorMsg>{errors.email.message}</ErrorMsg> : ''}
          </div>
          <div className="form-group">
            <label>Password</label>
            <Input 
              className="form-control"
              name='password'
              type='password' 
              {...register("password", {
                required: "Required",
              })}/>
              {errors.password ? <ErrorMsg>{errors.password.message}</ErrorMsg> : ''}
          </div>
          <LoginBtn className="btn btn-primary" type="submit">Enter</LoginBtn>
        </Form>
      </LeftSideWrapper>
      <RightSideWrapper>
        <Title>Welome Back</Title>
      </RightSideWrapper>
    </SignInContainer>
    </>   
)
}

export default SignIn;


