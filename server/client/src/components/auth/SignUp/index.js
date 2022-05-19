import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../actions"; 
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import { SignUpContainer, LeftSideWrapper, Form, ErrorMsg, Input, SignUpBtn, RightSideWrapper } from "./SignUpElements";
import { Title, RightMobileTitle } from "../SignIn/SignInElements";
import AuthHeader from "../../Headers/AuthHeader";


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

  const { signUpAuthError } = useSelector(state => state.auth);
  
  const renderPhoneFormatError = () => {
    if (errors.phone) {
      if (errors.phone.type === "typeError"){
        return <ErrorMsg>US number required</ErrorMsg>;
      } else if (errors.phone.type === "length") {
        return <ErrorMsg>Must be a 10 digit US number.</ErrorMsg>;
      } else {
        return <ErrorMsg>errors.phone.message</ErrorMsg>;
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
    <>
      <AuthHeader/>
      <SignUpContainer>
        <LeftSideWrapper>
          <RightMobileTitle>Ready to Pee?</RightMobileTitle>
          <Form onSubmit={handleSubmit(handleSignUpSubmit)}>
            {signUpAuthError ? <ErrorMsg>{signUpAuthError} </ErrorMsg> : ''}
            <div className='form-group'>
              <label>Email</label>
              <Input
                className='form-control'
                name='email'
                {...register("email", {
                  required: "Required",
                })}/>
                {errors.email ? <ErrorMsg>{errors.email.message}</ErrorMsg> : ''}
            </div>
            <div className='form-group'>
              <label>Name</label>
              <Input
                className='form-control'
                name='name'
                {...register("name", {
                  required: "Required",
                })}/>
                {errors.name ? <ErrorMsg>{errors.name.message}</ErrorMsg> : ''}
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
          <Title>Ready to Pee?</Title>
        </RightSideWrapper>
      </SignUpContainer>
    </>
    
    
    
)
}

export default SignUp;

