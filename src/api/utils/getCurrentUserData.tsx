import axios from 'axios';
import React from 'react'
import { getHostAPIUrl } from '../../appConfig';
import { GET_CURRENT_USER_DATA } from '../url/common';
import getUserToken from './getUserToken'

const getCurrentUserData = () => {
  const token = getUserToken();
  const response = axios.get(getHostAPIUrl() + GET_CURRENT_USER_DATA, {
    headers: {
      Authorization: `Token ${token}`,
    }})
    return response
}

export default getCurrentUserData;