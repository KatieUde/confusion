import * as ActionTypes from './ActionTypes';

export const InitialFeedback = (state = {
  firstname: '',
  lastname: '',
  telnum: '',
  email: '',
  agree: false,
  contactType: 'Tel.',
  message: ''
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_FEEDBACK:
      return {...state, feedback: action.payload};

    default:
      return state;
  }
}
