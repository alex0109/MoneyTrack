import axios from 'axios';

import { API_KEY } from '../../../../shared/lib/constants/API_KEY';

const authenticade = async (mode: string, email: string, password: string) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token: string = response.data.idToken;
  const uid: string = response.data.localId;

  return { token: token, uid: uid };
};

export const createUser = (email: string, password: string) =>
  authenticade('signUp', email, password);

export const loginUser = (email: string, password: string) =>
  authenticade('signInWithPassword', email, password);
