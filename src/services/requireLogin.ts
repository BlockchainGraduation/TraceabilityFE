import instanceAxios from '@/api/instanceAxios';
import { useAppDispatch } from '@/hooks';
import { nextEvent } from '@/reducers/nextEventSlice';
import { setshowFormLogin } from '@/reducers/showFormSlice';
import { User, setLogin } from '@/reducers/userSlice';
import { notification } from 'antd';
import { setCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';

function useLogin() {
  const dispatch = useAppDispatch();

  const login = async (beforeLoginSuccess?: () => void) => {
    dispatch(
      nextEvent({
        requireLogin: () => beforeLoginSuccess?.(),
      })
    );
    dispatch(setshowFormLogin({ showFormLogin: true }));
  };

  return { login };
}

export default useLogin;
