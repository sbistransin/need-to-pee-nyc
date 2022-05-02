import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../actions";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";

// const preferencesSchema = Yup.object().shape({
//   name: Yup.string().required()
// });

const Preferences = () => { 

  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   resolver: yupResolver(preferencesSchema)
  // });

  const dispatch = useDispatch();
  // from db
  const { 
    email, 
    name, 
    isPublic, 
    isCoffee, 
    isFastFood, 
    isHotel, 
    isBook, 
    isOther } = useSelector(state => state.user);
  
  // for form submit
  const [tempName, setTempName] = useState(name);
  const [tempPublic, setTempPublic] = useState(isPublic);
  const [tempCoffee, setTempCoffee] = useState(isCoffee);
  const [tempFastFood, setTempFastFood] = useState(isFastFood);
  const [tempHotel, setTempHotel] = useState(isHotel);
  const [tempBook, setTempBook] = useState(isBook);
  const [tempOther, setTempOther] = useState(isOther);

  console.log(`email: ${email}`);
  console.log(`name: ${name}`);
  console.log(`tempName: ${tempName}`);
  console.log(`isPublic: ${isPublic}`);
  console.log(`tempPublic: ${tempPublic}`);

  useEffect(() => {
    dispatch(fetchUser());
  }, [name]);

  const handleUpdatePreferences = (e) => {
    e.preventDefault();
    //e.target.elements.name.value
    dispatch(updateUser({
      name: tempName,
      isPublic: tempPublic,
      isCoffee: tempCoffee,
      isFastFood: tempFastFood,
      isHotel: tempHotel,
      isBook: tempBook,
      isOther: tempOther
    }));
    
  };

  return <>
    <div>Manage Preferences</div>
    <form onSubmit={handleUpdatePreferences}>
      <div>Email: {email ? email : ''}</div>
      <div className='form-group'>
        <label>Name:</label>
        <input
          className='form-control'
          name='name'
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}/>
      </div>
      <div>
        <label>Restroom Type Preferences:</label>
        <div>
          <div className="form-check form-check-inline ">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="public" checked={tempPublic} onChange={() => {setTempPublic(!tempPublic)}}/>
            <label className="lead form-check-label" htmlFor="inlineCheckbox1">Public</label>
          </div>
          <div className="form-check form-check-inline ">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="coffee-shop" checked={tempCoffee} onChange={() => {setTempCoffee(!tempCoffee)}}/>
            <label className="lead form-check-label" htmlFor="inlineCheckbox1">Coffee Shop</label>
          </div>
          <div className="form-check form-check-inline ">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="fast-food" checked={tempFastFood} onChange={() => {setTempFastFood(!tempFastFood)}}/>
            <label className="lead form-check-label" htmlFor="inlineCheckbox1">Fast Food</label>
          </div>
          <div className="form-check form-check-inline ">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="hotel" checked={tempHotel} onChange={() => {setTempHotel(!tempHotel)}}/>
            <label className="lead form-check-label" htmlFor="inlineCheckbox1">Hotel</label>
          </div>
          <div className="form-check form-check-inline ">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="book-store" checked={tempBook} onChange={() => {setTempBook(!tempBook)}}/>
            <label className="lead form-check-label" htmlFor="inlineCheckbox1">Book Store</label>
          </div>
          <div className="form-check form-check-inline ">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="other" checked={tempOther} onChange={() => {setTempOther(!tempOther)}}/>
            <label className="lead form-check-label" htmlFor="inlineCheckbox1">Other</label>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Update Settings</button>
    </form>
  </>
}

export default Preferences;