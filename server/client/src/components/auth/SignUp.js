import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../actions';
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import styled from "styled-components";


const userSchema = Yup.object().shape({
  email: Yup.string().email().lowercase().required(),
  password: Yup.string().required(),
  name: Yup.string().required(),
  phone: Yup.string().length(12).required()
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
  
  const renderPhoneFormatError = () => {
    if (errors.phone) {
      if (errors.phone.type === "typeError"){
        return "US number required";
      } else if (errors.phone.type === "length") {
        return "Must be a 10 digit US number.";
      } else {
        return errors.phone.message;
      }
    } else {
      return "";
    }
  }
  
  const handleSignUpSubmit = (data) => {
    dispatch(signup(data, () => {
      navigate('/');
    }));
  };
  
  return (
    <SignUpContainer>
      <LeftSideWrapper>
        <Form onSubmit={handleSubmit(handleSignUpSubmit)}>
          {authError ? <div>{authError} </div> : ''}
          <div className='form-group'>
            <label>Email</label>
            <Input
              className='form-control'
              name='email'
              {...register("email", {
                required: "Required",
              })}/>
              {errors.email?.message}
          </div>
          <div className='form-group'>
            <label>Name</label>
            <Input
              className='form-control'
              name='name'
              {...register("name", {
                required: "Required",
              })}/>
              {errors.name?.message}
          </div>
          <div className="form-group">
            <label>Password</label>
            <Input 
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
              placeholder="US Numbers Only"
              country="US"
              international
              withCountryCallingCode
              control={control}
              rules={{ required: true}}
              style={
                {padding: "0.5em",
                  margin: "0.5rem",
                  border: "none",
                  borderRadius: "4px",
                  width: "14rem",
                  height: "1.5em",
                }
              }
            />
            {renderPhoneFormatError()}
          </div>
          <SignUpBtn className="btn btn-primary" type="submit">Submit</SignUpBtn>
        </Form>
      </LeftSideWrapper>
      <RightSideWrapper>
        Ready to Pee?
      </RightSideWrapper>
    </SignUpContainer>
    
    
)
}

export default SignUp;

const SignUpContainer = styled.div`
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
    padding-top: 2rem;
  }

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
  @media (max-width: 1000px) {
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
  letterSpacing: 0.3px;
  border: none;
  borderRadius: 4px;
  width: 14rem;
  height: 1.5em;
`;

const SignUpBtn = styled.button`
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
  borderRadius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;