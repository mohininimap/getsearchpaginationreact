// registrationActions.js
import axios from 'axios';

export const submitRegistration = (formData) => {
  return async (dispatch) => {
    try {
      // Send a POST request to your JSON server to store the data
      const response = await axios.post('http://localhost:3001/users', formData);

      // Dispatch a success action if the request was successful
      dispatch(registrationSuccess(response.data));
    } catch (error) {
      // Handle any errors here
      console.error('Error submitting registration:', error);
      dispatch(registrationFailure(error));
    }
  };
};

const registrationSuccess = (data) => ({
  type: 'REGISTRATION_SUCCESS',
  payload: data,
});

const registrationFailure = (error) => ({
  type: 'REGISTRATION_FAILURE',
  payload: error,
});
