import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signin } from '../../actions';
import styled from "styled-components";
import { ErrorMsg } from "./SignUp";


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
    
)
}

export default SignIn;

const SignInContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F1EA;
  width: 100vw;
  height: 100vh;
`;

const LeftSideWrapper = styled.div`
  width: 50%;
  min-width: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const RightSideWrapper = styled.div`
  font-weight: 600;
  font-size: 6.6rem;
  width: 50%;
  display: flex;
  flex-direciton: column;
  align-items: flex-start;
  box-sizing: border-box;
  margin-bottom: 3rem;
  @media (max-width: 980px) {
    width: 0%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 8rem;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5rem;
  letter-spacing: 0.3px;
  border: none;
  border-radius: 4px;
  width: 14rem;
  height: 1.5em;
  font-size: 1rem;
`;

const LoginBtn = styled.button`
  background-color: white;
  color: black;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 10rem;
  padding: 0.5em;
  margin: 0.5rem;
  border: 1px back;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const Title = styled.div`
  height: calc(100% - 100px);
  box-sizing: border-box;
  justify-self: flex-start;
  padding-right: 5rem;
  margin-top: -150px;
  max-width: 90%;
  transition: 0.4s;

  @media (max-width: 1400px) {
    padding: 2rem;
  }

  @media (max-width: 1400px) {
    padding: 2rem;
  }

  @media (max-width: 980px) {
    display: none;
  }
`

export const RightMobileTitle = styled.div`
  transition: 0.4s;
  width: 50%;
  display: flex;
  flex-direciton: column;
  align-items: flex-start;
  box-sizing: border-box;
  margin-bottom: 3rem;
  

  @media (max-width: 1600px) {
    display: none;
  }

  @media (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 980px) {
    display: flex;
    font-weight: 600;
    font-size: 4rem;
    width: 70%;
  }

  @media (max-width: 750px) {
    display: flex;
    font-weight: 600;
    font-size: 3rem;
    width: 60%;
  }

  @media (max-width: 600px) {
    display: flex;
    font-weight: 600;
    font-size: 3rem;
    width: 50%
  }
`
