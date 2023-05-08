import jwt_decode from 'jwt-decode';

export const getUserDataFromToken = (token) => {
  const jwtToken = token ?? localStorage.getItem('profile');
  if (jwtToken) {
    const tokenData = jwt_decode(jwtToken);
    return {
      name: tokenData?.name,
      imageUrl: tokenData?.picture,
      email: tokenData?.email,
      id: tokenData?.sub,
      exp: tokenData?.exp,
    };
  }
  return null;
};