import instanceAxios from '@/api/instanceAxios';
import InputCustom from '@/components/Contents/ProductInfo/CustomInput/InputCustom';
import TextAreaCustom from '@/components/Contents/ProductInfo/CustomInput/TextAreaCustom';
import { useAppSelector } from '@/hooks';
import fetchUpdateUser from '@/services/fetchUpdateUser';
import staticVariables from '@/static';
import { PlusOutlined } from '@ant-design/icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPenToSquare,
  faSquarePhone,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Carousel,
  Image,
  Modal,
  Tag,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function GeneralInformation() {
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);

  const contentStyle: React.CSSProperties = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // console.log(newFileList);
    info.file.status = 'done';
    setFileList(info.fileList);
  };
  const handleChangeAvatar = async (info: UploadChangeParam<UploadFile>) => {
    info.file.status = 'done';
    let formData = new FormData();
    let data = info.file;
    // URL.createObjectURL(info.file.originFileObj as RcFile);
    formData.append('avatar', info.file.originFileObj as Blob, info.file.name);
    await instanceAxios
      .put('user/update_me', {
        avatar: formData,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <div className="flex">
        <div className="relative mr-[50px]">
          <Avatar size={300} src={staticVariables.logo.src} />
          <Upload
            accept="image/*,.jpg,.png,.jpeg"
            showUploadList={false}
            onChange={handleChangeAvatar}
          >
            <FontAwesomeIcon
              className="absolute top-[10%] right-[10%]"
              icon={faPenToSquare}
              style={{ color: '#295094' }}
            />
          </Upload>
        </div>
        <div className=" flex gap-x-[100px] justify-between">
          <div className="flex flex-col gap-y-4">
            <div>
              <InputCustom
                name="full_name"
                classNameLabel="text-2xl font-bold"
                initialValue={currentUser.full_name}
                // input={{
                //   onBlur: async (e) => {

                //   },
                // }}
              />
              <Tag className="w-fit" color="success">
                Fammer
              </Tag>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-[10px]"
                icon={faLocationDot}
                size={'2xl'}
                style={{ color: '#227c4e' }}
              />
              <InputCustom name="as" initialValue="14-Khuy My  - NHS - DN" />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-[10px]"
                size={'2xl'}
                icon={faWallet}
                style={{ color: '#463eb1' }}
              />
              <p>12313213</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-[10px]"
                size={'3x'}
                icon={faSquareFacebook}
                style={{ color: '#2754b0' }}
              />
              <InputCustom name="as" initialValue="http/asd/asdd" />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-[10px]"
                size={'3x'}
                icon={faEnvelope}
                style={{ color: '#3367c1' }}
              />
              <InputCustom name="as" initialValue="adbc@gmail.com" />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-[10px]"
                size={'3x'}
                icon={faSquarePhone}
                style={{ color: '#366fba' }}
              />
              <InputCustom name="as" initialValue="012313132" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[50px] justify-between px-[50px]">
        <div className="w-1/2 relative">
          <Typography.Title level={4}>
            Hình ảnh của bạn{' '}
            <FontAwesomeIcon
              onClick={() => setShowModalUpload(!showModalUpload)}
              className="ml-[10px]"
              icon={faPenToSquare}
              style={{ color: '#295094' }}
            />
          </Typography.Title>
          <Modal
            onCancel={() => setShowModalUpload(false)}
            open={showModalUpload}
            footer={[]}
          >
            <Typography.Title className="text-center" level={4}>
              Thay đổi hình ảnh
            </Typography.Title>
            <Upload
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              multiple
              maxCount={8}
              // fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Button className="block m-auto">Done</Button>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <Image
                alt="example"
                style={{ width: '100%' }}
                src={previewImage}
              />
            </Modal>
          </Modal>
          <Carousel
            style={{ borderRadius: '10px', overflow: 'hidden' }}
            autoplay
          >
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div className="w-2/5">
          <Typography.Title level={4}>Giới thiệu bản thân</Typography.Title>
          <TextAreaCustom name="asdd" initialValue="asdasdasdasdadadasda" />
        </div>
      </div>
    </div>
  );
}
