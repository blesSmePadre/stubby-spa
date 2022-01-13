import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { Methods, request } from 'utils/request';

function useGoogleAuthentication() {
  const handleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('accessToken' in response) {
      return request(Methods.POST, {
        url: '/auth/oauth',
        data: { token: response.accessToken },
      });
    }

    return null;
  };

  return {
    handleSuccess,
  };
}

export default useGoogleAuthentication;
