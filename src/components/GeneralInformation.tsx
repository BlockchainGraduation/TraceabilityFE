import instanceAxios from '@/api/instanceAxios';
import InputCustom from '@/components/Contents/common/InputCustom/InputCustom';
import TextAreaCustom from '@/components/Contents/common/InputCustom/TextAreaCustom';
import { useAppSelector } from '@/hooks';
import { setUser } from '@/reducers/userSlice';
import fetchUpdateUser from '@/services/fetchUpdate';
import staticVariables from '@/static';
import { MailFilled, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faL,
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
  Col,
  Image,
  Modal,
  Row,
  Spin,
  Tag,
  Typography,
  Upload,
  UploadFile,
  message,
  notification,
} from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { getCookie } from 'cookies-next';
// import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSWRConfig } from 'swr';

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
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const currentUser = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

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
  const handleSubmitChangeBanner = async () => {
    setLoadingBanner(true);
    let formData = new FormData();
    fileList.map((item) =>
      formData.append('uploaded_images', item.originFileObj as Blob)
    );
    await instanceAxios
      .patch('user/update', formData)
      .then((res) => {
        mutate('user/me');
        message.success('Thay đổi thành công');
        setFileList([]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingBanner(false));
  };

  // const fetchUpdateAvatar = () => {};
  // const handleChangeAvatar = useCallback(
  //   async (info: UploadChangeParam<UploadFile>) => {
  //     setLoadingImage(true);
  //     info.file.status = 'done';
  //     let formData = new FormData();
  //     let data = info.file;
  //     formData.append(
  //       'avatar',
  //       info.file.originFileObj as Blob,
  //       info.file.name
  //     );
  //     await instanceAxios
  //       .put('user/avatar', formData)
  //       .then((res) => {
  //         console.log(res.data);
  //         mutate('user/me');
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoadingImage(false));
  //   },
  //   [mutate]
  // );
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <p className="py-[50px] font-bold text-[30px]">Thông tin của bạn</p>
      <div className="flex gap-x-10 justify-center">
        <div className="bg-[#f6f6f6] p-[30px] rounded-xl">
          <p className="font-semibold text-[20px]">Ảnh đại diện</p>
          <div className="relative mr-[50px] p-[20px]">
            <Spin spinning={loadingImage}>
              <Avatar
                icon={<UserOutlined />}
                alt=""
                size={300}
                src={currentUser.avatar || staticVariables.noImage.src}
              />
              <Upload
                action={`${process.env.NEXT_PUBLIC_API_ORIGIN}user/update`}
                accept="image/png, image/jpeg, image/jpg"
                showUploadList={false}
                method="PATCH"
                name="avatar"
                headers={{
                  authorization: `Bearer ${getCookie('access')}`,
                }}
                onChange={(info) => {
                  if (info.file.status === 'uploading') {
                    setLoadingImage(true);
                  }
                  if (info.file.status === 'done') {
                    mutate(`user/me`);
                    message.success(`Upload thành công`);
                  }
                  if (info.file.status === 'error') {
                    message.error(`Upload thất bại`);
                  }
                  setLoadingImage(false);
                }}
              >
                <FontAwesomeIcon
                  className="absolute top-[10%] right-[10%]"
                  icon={faPenToSquare}
                  style={{ color: '#295094' }}
                />
              </Upload>
            </Spin>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-y-5">
          <div className="p-[20px] flex flex-col w-full bg-[#f6f6f6] rounded-xl">
            <p className="font-semibold text-[20px]">Tên của bạn</p>
            <InputCustom
              APIurl={'user/update'}
              queryType={'user'}
              name="fullname"
              className="text-2xl font-bold p-[20px]"
              initialValue={currentUser.fullname || ''}
            />
          </div>
          <div className="w-full bg-[#f6f6f6] p-[20px] rounded-xl">
            <p className="font-semibold text-[20px]">Thông tin khác</p>
            <div className="p-[20px] flex gap-x-3">
              <div className="w-1/2 flex flex-col space-y-5">
                <div className="w-full border-b-[1px] border-gray-300 py-[5px]">
                  <p className="font-semibold">Email</p>
                  <Row className="items-center">
                    <Col span={2}>
                      <MailFilled />
                    </Col>
                    <Col span={22}>
                      <InputCustom
                        showEdit={false}
                        name={''}
                        initialValue={currentUser.email || ''}
                        APIurl={''}
                        queryType={'user'}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="w-full border-b-[1px] border-gray-300 py-[5px]">
                  <p className="font-semibold">Số điện thoại</p>
                  <Row className="items-center">
                    <Col span={2}>
                      <MailFilled />
                    </Col>
                    <Col span={22}>
                      <InputCustom
                        name={'phone'}
                        initialValue={currentUser.phone || ''}
                        APIurl={'user/update'}
                        queryType={'user'}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="w-full border-b-[1px] border-gray-300 py-[5px]">
                  <p className=" font-semibold">Địa chỉ</p>
                  <Row className="items-center">
                    <Col span={2}>
                      <MailFilled />
                    </Col>
                    <Col span={22}>
                      <InputCustom
                        name={'geographical_address'}
                        initialValue={currentUser.geographical_address || ''}
                        APIurl={'user/update'}
                        queryType={'user'}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-full border-b-[1px] border-gray-300 py-[5px]">
                  <p className="font-semibold">Email</p>
                  <Row className="items-center">
                    <Col span={2}>
                      <MailFilled />
                    </Col>
                    <Col>
                      <InputCustom
                        name={''}
                        initialValue={currentUser.email || ''}
                        APIurl={''}
                        queryType={'user'}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[50px] justify-between px-[50px]">
        <div className="w-1/2 relative  ">
          <Typography.Title level={4}>
            Hình ảnh của bạn
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
              accept="image/png, image/jpeg, image/jpg"
              listType="picture-card"
              multiple
              maxCount={8}
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Button
              loading={loadingBanner}
              onClick={handleSubmitChangeBanner}
              className="block m-auto"
            >
              Done
            </Button>
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
            {currentUser.user_banner?.map((item, index) => (
              <div key={index} className="w-full h-[300px]">
                <div className="w-full h-full">
                  <Image
                    width={'100%'}
                    height={'100%'}
                    className="object-cover"
                    preview={false}
                    alt=""
                    src={item.image || staticVariables.noImage.src}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-2/5 bg-[#f6f6f6] p-[20px] rounded-xl">
          <Typography.Title level={4}>Giới thiệu bản thân</Typography.Title>
          <div className="w-full bg-[#f6f6f6] p-[20px] rounded-xl">
            <TextAreaCustom
              input={{
                className: 'max-h-[400px]',
              }}
              name="introduce"
              initialValue={
                currentUser.introduce || 'Chưa có giới thiệu gì về bản thân!!!'
              }
              APIurl={'user/update'}
              queryType={'user'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
