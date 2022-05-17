import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";


const preferencesSchema = Yup.object().shape({
  isPublic: Yup.bool(),
  isCoffee: Yup.bool(),
  isFastFood: Yup.bool(),
  isHotel: Yup.bool(),
  isBook: Yup.bool(),
  isOther: Yup.bool(),
});

const Preferences = () => { 
  
  // for form submit
  const initialFormState = {
    isPublic: false,
    isCoffee: false,
    isFastFood: false,
    isHotel: false,
    isBook: false,
    isOther: false
  }
  
  const [preferences, setPreferences] = useState(initialFormState);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(preferencesSchema),
    defaultValues: {
      isPublic: false,
      isCoffee: false,
      isFastFood: false,
      isHotel: false,
      isBook: false,
      isOther: false
    }
  });

  const dispatch = useDispatch();
    
  const fetchPreferences = () => {
    axios.get('/current-user')
    .then(function(response) {
      setPreferences(prev => ({ ...prev,
         isPublic: response.data.is_public,
         isCoffee: response.data.is_coffee,
         isFastFood: response.data.is_fastfood,
         isHotel: response.data.is_hotel,
         isBook: response.data.is_book,
         isOther: response.data.is_other
      }))
    })
    .catch(function (error) {
      throw error;
    })
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  useEffect(() => {
    reset(preferences);
  }, [preferences]);

  const handleUpdatePreferences = (data) => {
    dispatch(updateUser(preferences, () => {
      console.log("success");
      toast.success('Successfully saved!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }));
  };

  return <PreferencesContainer>
    <Form onSubmit={handleSubmit(handleUpdatePreferences)}>
      <div>
        <Header>What kind of restrooms do you prefer?</Header>
        <div>
          <div className="form-check form-check-inline ">
            <Input 
              className="form-check-input" 
              type="checkbox"
              id="ispubliccheckbox"
              checked={preferences.isPublic}
              {...register("isPublic", {
                onChange: () => setPreferences(prev => ({ ...prev,
                isPublic: !preferences.isPublic})),
              })}
            />
            {errors.isPublic?.message}
            <label className="lead form-check-label" htmlFor="ispubliccheckbox">Public</label>
          </div>
          <div className="form-check form-check-inline ">
            <Input 
              className="form-check-input" 
              type="checkbox"
              id="iscoffeecheckbox"
              checked={preferences.isCoffee}
              {...register("isCoffee", {
                onChange: () => setPreferences(prev => ({ ...prev,
                isCoffee: !preferences.isCoffee})),
              })}
            />
            {errors.isCoffee?.message}
            <label className="lead form-check-label" htmlFor="iscoffeecheckbox">Coffee Shop</label>
          </div>
          <div className="form-check form-check-inline ">
            <Input 
              className="form-check-input"
              type="checkbox" 
              id="isfastfoodcheckbox"
              checked={preferences.isFastFood}
              {...register("isFastFood", {
                onChange: () => setPreferences(prev => ({ ...prev,
                isFastFood: !preferences.isFastFood})),
              })}
            />
            {errors.isFastFood?.message}
            <label className="lead form-check-label" htmlFor="isfastfoodcheckbox">Fast Food</label>
          </div>
          <div className="form-check form-check-inline ">
            <Input 
              className="form-check-input" 
              type="checkbox" 
              id="ishotelcheckbox" 
              checked={preferences.isHotel}
              {...register("isHotel", {
                onChange: () => setPreferences(prev => ({ ...prev,
                isHotel: !preferences.isHotel})),
              })}
            />
            {errors.isHotel?.message}
            <label className="lead form-check-label" htmlFor="ishotelcheckbox">Hotel</label>
          </div>
          <div className="form-check form-check-inline ">
            <Input 
              className="form-check-input" 
              type="checkbox" 
              id="isbookcheckbox"
              checked={preferences.isBook}
              {...register("isBook", {
                onChange: () => setPreferences(prev => ({ ...prev,
                isBook: !preferences.isBook})),
              })}
            />
            {errors.isBook?.message}
            <label className="lead form-check-label" htmlFor="isbookcheckbox">Book Store</label>
          </div>
          <div className="form-check form-check-inline ">
            <Input 
              className="form-check-input" 
              type="checkbox" 
              id="isothercheckbox" 
              checked={preferences.isOther}
              {...register("isOther", {
                onChange: () => setPreferences(prev => ({ ...prev,
                isOther: !preferences.isOther})),
              })}
            />
            {errors.isOther?.message}
            <label className="lead form-check-label" htmlFor="isothercheckbox">Other</label>
          </div>
        </div>
      </div>
      <PrefBUtton className="btn btn-primary" type="submit">Update Settings</PrefBUtton>
      <StyledContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      <div>
      </div>
    </Form>
  </PreferencesContainer>
}

export default Preferences;

const PreferencesContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F1EA;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.header`
  font-family: 'Montserrat', sans-serif; 
  padding-bottom: 1rem;
  margin-top: -4rem;
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  transition: 0.4s;
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  @media (max-width: 1000px) {
    font-size: 1.2rem;
    margin-top: 4rem;
  }
  @media (max-width: 500px) {
    font-size: 1.1rem;
    margin-top: 5rem;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5rem;
  letter-spacing: 0.3px;
  border: none;
  borderRadius: 4px;
  width: 3rem;
  height: 1.5em;
`;

const PrefBUtton = styled.button`
  background-color: white;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 15rem;
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

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {}
  .Toastify__toast {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`;