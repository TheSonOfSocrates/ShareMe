import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { getUserDataFromToken } from '../utilities';
import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();

  const googleLoginSuccess = async ({ credential }) => {
    try {
      localStorage.setItem('profile', credential);
      const { name, id, imageUrl } = getUserDataFromToken(credential);
      const doc = {
        _id: id,
        _type: 'user',
        userName: name,
        image: imageUrl,
      };
      client.createIfNotExists(doc)
        .then(() => {
          navigate('/', { replace: true });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const googleLoginError = (error) => {
    console.error("Google Sign In was not successful. Try again later. Details: ", error);
  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={ shareVideo }
          type="video/mp4"
          loop
          controls={ false }
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={ logo } width="130px" alt='logo' />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              onSuccess={googleLoginSuccess}
              onError={googleLoginError}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
