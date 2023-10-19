import instanceAxios from '@/api/instanceAxios';

const fetchUpdateUser = async (
  data: object,
  onSucces: (res?: any) => void,
  onFailed?: (res?: any) => void,
  onFinally?: () => void
) => {
  await instanceAxios
    .put('user/update_me', data)
    .then((res) => onSucces?.(res))
    .catch((err) => onFailed?.(err))
    .finally(() => onFinally?.());
};
export default fetchUpdateUser;
