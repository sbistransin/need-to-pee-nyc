import { USER } from '../actions/types';
// is it bad to save user data here?

const INITIAL_STATE = {
  isPublic: false,
  isCoffee: false,
  isFastFood: false,
  isHotel: false,
  isBook: false,
  isOther: false
};

const preferenceReducer = function(state = INITIAL_STATE, action) {
  debugger;
  switch (action.type) {
    case USER:
      // should i clear out the error message here?
      return { ...state,
        isPublic: action.payload.is_public,
        isCoffee: action.payload.is_coffee,
        isFastFood: action.payload.is_fastfood,
        isHotel: action.payload.is_hotel,
        isBook: action.payload.is_book,
        isOther: action.payload.is_other,
        };
    default:
      return state;
  }
}

export default preferenceReducer;