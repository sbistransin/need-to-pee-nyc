import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";

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
    dispatch(updateUser(preferences));
  };

  return <>
    <form onSubmit={handleSubmit(handleUpdatePreferences)}>
      <div>
        <label>Manage Restroom Preferences:</label>
        <div>
          <div className="form-check form-check-inline ">
            <input 
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
            <input 
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
            <input 
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
            <input 
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
            <input 
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
            <input 
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
      <button className="btn btn-primary" type="submit">Update Settings</button>
    </form>
  </>
}

export default Preferences;