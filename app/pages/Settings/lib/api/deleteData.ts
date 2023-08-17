import axios from 'axios';

import { db_key } from '../../../../shared/lib/constants/DB_KEY';
import { root_url } from '../../../../shared/lib/constants/REF_URL';

export const deleteData = async (uid: string) => {
  const response = await axios.delete(`${root_url}/users/${uid}.json?auth=${db_key}`);

  return response.data;
};
