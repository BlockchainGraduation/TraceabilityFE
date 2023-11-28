'use client';

import React, { useState } from 'react';
import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import { useEffectOnce } from 'usehooks-ts';
import useSWR, { useSWRConfig } from 'swr';
import useLogin from '@/services/requireLogin';
import ProductInfoComponent from '@/components/ProductInfoComponent';

export default function ProductInforPage({
  params,
}: {
  params: { productId: number };
}) {
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [listRelatedProduct, setListRelatedProduct] = useState<ProductType[]>(
    []
  );
  const [dataChart, setDataChart] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const { mutate } = useSWRConfig();
  const { login } = useLogin();
  const currentUser = useAppSelector((state) => state.user.user);

  const fethProduct = async () => {
    await instanceAxios
      .get(`product/${params.productId}/`)
      .then(async (res) => {
        setDataProduct(res.data || {});
        await instanceAxios
          .get(`filter-product/?create_by=${res.data.create_by.id}`)
          .then(async (res) => {
            setListRelatedProduct(res.data.results || []);
          })
          .catch((err) => setCommentList([]));
        await instanceAxios
          .get(`statistical-product/${params.productId}`)
          .then(async (res) => {
            setListRelatedProduct(res.data.results || []);
          })
          .catch((err) => setCommentList([]));
      })
      .catch((err) => console.log('asdadasd'))
      .finally(() => setLoadingPage(false));
    await fethComments();
  };

  const fethComments = async () => {
    await instanceAxios
      .get(`comment/filter-comment?product_id=${params.productId}`)
      .then(async (res) => {
        setCommentList(res.data.results || []);
      })
      .catch((err) => setCommentList([]));
  };

  useEffectOnce(() => {
    fethProduct();
  });
  useSWR(`product/${params.productId}`, fethProduct);
  useSWR(`fethComments`, fethComments);

  return (
    !loadingPage && (
      <div className="w-full h-fit m-auto pt-[100px] pb-[50px]">
        <ProductInfoComponent productId={params.productId} />
        {/* <div className="w-full h-fit flex flex-col">
          <div className="w-4/5 h-fit flex m-auto">
            <div className="w-1/2 ">
              <div className="rounded-xl overflow-hidden bg-[#f6f6f6] p-[30px]">
                <Image
                  className="object-cover rounded-xl "
                  width={'100%'}
                  height={400}
                  preview={false}
                  src={
                    currentAvatar ||
                    dataProduct.avatar ||
                    staticVariables.noImage.src
                  }
                  alt=""
                />
              </div>
              <div className="w-full">
                {dataProduct.banner?.length && (
                  <ScrollMenu
                    Footer={[]}
                    noPolyfill
                    wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
                    scrollContainerClassName="m-[20px]"
                    itemClassName="mx-[5px]"
                    LeftArrow={LeftArrow}
                    RightArrow={RightArrow}
                  >
                    {dataProduct.banner?.map((item, index) => (
                      <Image
                        onClick={() => setCurrentAvatar(item.image || '')}
                        className={`object-cover rounded-xl p-[10px] ${
                          currentAvatar === item.image
                            ? 'bg-current-color'
                            : 'bg-[#f6f6f6]'
                        }`}
                        key={index}
                        width={100}
                        height={100}
                        preview={false}
                        src={item.image}
                        alt=""
                      />
                    ))}
                  </ScrollMenu>
                )}
              </div>
            </div>
            <div className="w-1/2 flex flex-col px-[30px] font-sans ">
              <p className="text-[22px] font-normal">{dataProduct.name}</p>
              <Space>
                Create by:
                <Link href={`/user/${dataProduct.create_by?.id}`}>
                  <p className="text-current-color">
                    {dataProduct.create_by?.fullname}
                  </p>
                </Link>
              </Space>
              <Space className="text-current-color font-semibold my-[10px]">
                <p className="text-[#2d2d2d]">Price:</p>
                <p className="text-[12px]">{currency} </p>
                <p className="text-[23px]">{dataProduct.price} </p>
              </Space>
              <p className="text-[14px] tracking-wide  text-[#343434]">
                {dataProduct.description}
              </p>
              <Space className="my-[10px]">
                <p>Category:</p>
                <Tag color={'green'}>{dataProduct.product_type}</Tag>
              </Space>
              <Tag></Tag>
              <Space className="text-current-color font-semibold my-[20px]">
                <p className="text-[#2d2d2d]">Hiện có :</p>
                <p className="text-[12px]">{unit} </p>
                <p className="text-[23px]">{dataProduct.quantity} </p>
              </Space>
              <div className="flex items-center gap-x-4 my-[10px]">
                <p>Số lượng hiện có</p>
                <InputNumber
                  disabled={currentUser.id === dataProduct.create_by?.id}
                  onChange={(e) => setBuyQuantity(e || 0)}
                  defaultValue={0}
                  min={0}
                  max={dataProduct.quantity}
                />
                <button
                  disabled={currentUser.id === dataProduct.create_by?.id}
                  onClick={fetchAddCart}
                  className="bg-[#f5f5f5] cursor-not-allowed text-[#c7c7c7] font-semibold px-[20px] py-[10px] rounded-xl"
                >
                  Thêm giỏ hàng
                </button>
              </div>
              <div className="w-1/2 mx-auto my-[30px] ">
                <Modal
                  width={'70%'}
                  centered
                  open={showModalPay}
                  onCancel={() => setShowModalPay(false)}
                  footer={[]}
                >
                  <div className="px-[10px]">
                    <CheckoutForm
                      data={dataProduct}
                      buyQuantity={buyQuantity}
                      onSuccess={() => {
                        mutate(`product/${params.productId}`);
                        setShowModalPay(false);
                      }}
                    />
                  </div>
                </Modal>
                <Button
                  onClick={() =>
                    login(() => {
                      buyQuantity
                        ? setShowModalPay(true)
                        : notification.error({
                            message: 'Vui lòng chọn số lượng',
                          });
                    })
                  }
                  loading={loadingBuy}
                  disabled={currentUser.id === dataProduct.create_by?.id}
                  className="w-full h-fit rounded-xl font-semibold text-white text-[30px] bg-current-color"
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
          <div className="w-4/5 m-auto border-[1px]  rounded-xl overflow-hidden">
            <div className="flex w-full text-[20px] bg-[#f6f6f6] text-[#555555] border-b-[1px]">
              <p
                onClick={() => setCurrentTab('DESCRIPTION')}
                className={`px-[50px] py-[10px] ${
                  currentTab === 'DESCRIPTION' &&
                  'border-b-2 border-current-color'
                }`}
              >
                Giới thiệu
              </p>
              <p
                onClick={() => setCurrentTab('INFORMATION')}
                className={`px-[50px] py-[10px] ${
                  currentTab === 'INFORMATION' &&
                  'border-b-2 border-current-color'
                }`}
              >
                Thông tin
              </p>
              <p
                onClick={() => setCurrentTab('COMMENT')}
                className={`px-[50px] py-[10px] ${
                  currentTab === 'COMMENT' && 'border-b-2 border-current-color'
                }`}
              >{`Bình luận  ( ${commentList.length} )`}</p>
            </div>
            <div className="w-full flex p-[20px]">
              {currentTab === 'DESCRIPTION' && (
                <div className="w-full px-[100px] ">
                  {dataProduct.detail_decriptions?.length ? (
                    <Carousel>
                      <div>
                        <Description
                          showEdit={false}
                          id={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.id
                          }
                          title={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.title
                          }
                          description={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.description
                          }
                          image={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.image
                          }
                          product_id={
                            dataProduct.detail_decriptions[selectedDescription]
                              ?.product_id
                          }
                        />
                      </div>
                    </Carousel>
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_DEFAULT}
                      description="Chủ sản phẩm vẫn chưa thêm thông tin gì..."
                    />
                  )}
                </div>
              )}
              {currentTab === 'INFORMATION' && (
                <div className="w-full m-auto px-[100px]">
                  <ProductInformation data={dataProduct} />
                </div>
              )}
              {currentTab === 'COMMENT' && (
                <div className="w-2/3 m-auto">
                  <div className="mt-[20px] flex gap-x-3 mb-[20px] font-medium text-[18px] text-[#1a1a1a]">
                    Đã có {commentList.length} bình luận cho{' '}
                    <p className="font-semibold">{dataProduct.name}</p>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {commentList.map((item, index) => (
                      <CommentItem
                        key={index}
                        isOwner={item.user_id?.id === dataProduct.create_by?.id}
                        {...item}
                      />
                    ))}
                  </div>
                  <CommentInput productId={params.productId} />
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex my-[50px] gap-x-5">
            <div className="w-1/2 flex items-center justify-center px-[30px] bg-[#f6f6f6] rounded-xl">
              <div className="w-full p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
                <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
                  <FontAwesomeIcon
                    size={'2x'}
                    icon={faDatabase}
                    style={{ color: '#3d6ab8' }}
                  />
                </div>
                <p className="text-[#0b0c50] my-[10px] text-[16px] font-semibold">
                  Giao dịch mua sản phẩm của bạn
                </p>
                <div className="flex items-baseline space-x-3">
                  <p className="text-[#0b0c50] text-[50px] font-semibold">
                    100
                  </p>
                  <p className="text-gray-500 font-semibold">Giao dịch mua</p>
                </div>
                <div className="w-full">
                  <Percent label="Đang chờ" total={10} value={7} />
                  <Percent label="Bị từ chối" total={10} value={2} />
                  <Percent label="Đã xác nhận" total={10} value={0} />
                  <Percent label="Đã hoàn thành" total={10} value={1} />
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-[#f6f6f6] rounded-xl p-[50px] pt-[20px]">
              <p className="text-[#0b0c50] text-[20px] font-semibold py-[20px]">
                Các bên liên quan
              </p>
              <div className="w-full relative flex justify-between before:content-[''] before:absolute before:w-1/3 before:border-b-4 before:top-1/2 before:left-1/3 before:border-current-color before:border-dashed">
                <div className="flex w-1/3 bg-white items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                  <div>
                    <Avatar
                      size={'large'}
                      src={dataProduct.avatar || staticVariables.noImage.src}
                    />
                  </div>
                  <div>
                    <p className="font-semibold truncate">Sản phẩm</p>
                    <TooltipAntd title={dataProduct.name}>
                      <p className="w-[100px] truncate">{dataProduct.name}</p>
                    </TooltipAntd>
                  </div>
                </div>
                <div className="flex w-1/3 bg-white items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                  <div>
                    <Avatar size={'large'} src={staticVariables.shrimpBg.src} />
                  </div>
                  <div className="w-full -fit">
                    <p className="font-semibold">Chủ sản phẩm</p>
                    <Space className="w-full">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: '#2b8c3f' }}
                      />
                      <TooltipAntd title={dataProduct.create_by?.fullname}>
                        <p className="w-[100px] truncate">
                          {dataProduct.create_by?.fullname}
                        </p>
                      </TooltipAntd>
                    </Space>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-end justify-end">
                <div className="w-1/2 relative flex justify-end py-[20px] before:absolute before:w-1/3 before:h-full before:border-current-color  before:rounded-bl-2xl before:border-dashed before:border-l-4 before:border-b-4 before:-top-[20px] before:left-0">
                  <div className="flex w-2/3 bg-white translate-y-1/2 items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                    <div>
                      <Avatar
                        size={'large'}
                        src={staticVariables.shrimpBg.src}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Nhà phân phối</p>
                      <Space>
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: '#2b8c3f' }}
                        />
                        <p className="w-[100px] truncate">Nguyen Van A</p>
                      </Space>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 relative flex justify-end py-[20px] before:absolute before:w-1/3 before:h-full before:border-current-color  before:rounded-bl-2xl before:border-dashed before:border-l-4 before:border-b-4 before:-top-[20px] before:left-0">
                  <div className="flex w-2/3 bg-white translate-y-1/2 items-center gap-x-5 py-[10px] px-[20px] rounded-xl border-[1px]">
                    <div>
                      <Avatar
                        size={'large'}
                        src={staticVariables.shrimpBg.src}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Nhà máy chế biến</p>
                      <Space>
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: '#2b8c3f' }}
                        />
                        <p className="w-[100px] truncate">Nguyen Van A</p>
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-[30px]">
            <div className="text-center my-[30px] text-[32px] text-[#222222]">
              Sản phẩm liên quan
            </div>
            {listRelatedProduct.length && (
              <ScrollMenu
                Footer={[]}
                noPolyfill
                wrapperClassName="max-w-full w-fit px-[10px] mb-[30px] "
                scrollContainerClassName="mx-[20px]"
                itemClassName="m-[20px]"
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
              >
                {listRelatedProduct.map((item, index) => (
                  <ProductItem key={index} style={'detail'} data={item} />
                ))}
              </ScrollMenu>
            )}
          </div>
        </div> */}
      </div>
    )
  );
}
