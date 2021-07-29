import { CHANGE_FILTER } from '../utils/utils';

export const changeFilter = activeFilter => ({
  type: CHANGE_FILTER,
  activeFilter,
})