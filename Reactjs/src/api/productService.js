'use strict';
import axios from 'axios'

const config_pth = 'http://localhost:8001/'
axios.defaults.baseURL = config_pth;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

  
const Axio = axios.create({
    baseURL: config_pth,
    responseType: 'json',
});
//set token
export const setAuthToken = (token) => {
  if (token) {
    Axio.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete Axio.defaults.headers.common['Authorization'];
  }
};

// Function to refresh the token
const refreshTokenFunc = async () => {
  const refreshTk = localStorage.getItem('refreshToken');

  if (refreshTk) {
    try{

     const response = await axios.post(config_pth+'api/refresh-token', { refreshTk });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('jwtToken', accessToken);
      localStorage.setItem('refreshToken',refreshToken)
      setAuthToken(accessToken);
      return accessToken;

    } catch(error){
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login'; 
      return null;
    }
    
  }  
  return null;
};


// Axios request interceptor to refresh token if it is expired
Axio.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response &&error.response.status === 401 && !originalRequest._retry) {
      try{
       
        originalRequest._retry = true;
        
        const newToken = await refreshTokenFunc();
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return Axio(originalRequest); // Retry the request with the new token
        }

      } catch(error){
        return Promise.reject(error)
      }
     
    }

    return Promise.reject(error);
  }
);


///create Product
export const new_product = async (para) =>{
  try
  {
   let token = localStorage.getItem('jwtToken')
      let response = await Axio(
          {
              method: 'post',
              url: '/api/create-product',
              data: para,
              headers: {
                Authorization: `Bearer ${token}` 
              }
          }
      );
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

///login
export const login = async (para) =>{
  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/login',
              data: para,
          }
      );
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}




