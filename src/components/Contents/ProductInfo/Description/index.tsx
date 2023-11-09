import React, { useCallback, useState } from 'react';
import InputCustom from '../../common/InputCustom/InputCustom';
import TextAreaCustom from '../../common/InputCustom/TextAreaCustom';
import { Image, Spin, Upload, message } from 'antd';
import staticVariables from '@/static';
import { EditTwoTone } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import instanceAxios from '@/api/instanceAxios';
import { useSWRConfig } from 'swr';

interface Props {
  showEdit?: boolean;
}

export default function Description(props: Props) {
  const [loadingImage, setLoadingImage] = useState(false);
  const { mutate } = useSWRConfig();

  const handleChangeAvatar = useCallback(
    async (info: UploadChangeParam<UploadFile>) => {
      setLoadingImage(true);
      info.file.status = 'done';
      let formData = new FormData();
      formData.append(
        'avatar',
        info.file.originFileObj as Blob,
        info.file.name
      );
      await instanceAxios
        .put('user/avatar', formData)
        .then((res) => {
          console.log(res.data);

          mutate('user/me');
          message.success('Cập nhật thành công');
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingImage(false));
    },
    [mutate]
  );
  return (
    <div className="w-full h-full flex border-2 border-green-500 rounded-2xl">
      <div className="w-1/2 p-[50px] flex flex-col">
        <InputCustom
          className="text-[20px] py-[20px] font-semibold"
          showEdit={props.showEdit}
          queryType="product"
          APIurl={`product/update/`}
          classNameLabel=""
          name={'description'}
          initialValue={`MAPLE OAT MUFFIN`}
        />
        <TextAreaCustom
          showEdit={props.showEdit}
          queryType="product"
          APIurl={`product/update/${props.showEdit}`}
          classNameLabel=""
          name={'description'}
          initialValue={`Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`}
        />
      </div>
      <div className="w-1/2 relative p-[10px]">
        <Image
          className="object-cover rounded-2xl"
          width="100%"
          height="100%"
          preview={false}
          src={staticVariables.qc5.src}
          alt=""
        />

        {loadingImage ? (
          <Spin
            className="absolute -left-6 top-1/2 px-[10px]"
            spinning={loadingImage}
          />
        ) : (
          <Upload
            accept="image/png, image/jpeg, image/jpg"
            showUploadList={false}
            onChange={handleChangeAvatar}
          >
            <EditTwoTone className="absolute -left-6 top-1/2 px-[10px]" />
          </Upload>
        )}
      </div>
    </div>
  );
}
