import axios from 'axios';

import { db_key } from '../../../../shared/lib/constants/DB_KEY';
import { root_url } from '../../../../shared/lib/constants/REF_URL';

import type { ICategory } from '../../../Chart/lib/types/interfaces';
import type { ICount } from '../../../Count/lib/types/interfaces';
import type { ITarget } from '../../../Target/lib/types/interfaces';

export const fetchData = async (
  uid: string,
  categories: ICategory[],
  counts: ICount[],
  targets: ITarget[]
) => {
  const response = await axios.post(`${root_url}/users/${uid}.json?auth=${db_key}`, {
    categories: [...categories],
    counts: [...counts],
    targets: [...targets],
  });

  return response.data;
};
