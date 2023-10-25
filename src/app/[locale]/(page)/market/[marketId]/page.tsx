'use client';
import staticVariables from '@/static';
import {
  EyeOutlined,
  FieldTimeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Carousel,
  Col,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  List,
  Modal,
  Row,
  Segmented,
  Table,
  Tag,
  Timeline,
  Typography,
  Upload,
} from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import GrowUpItem from '@/components/Contents/ProductInfo/GrowUpItem';
import Paragraph from 'antd/es/typography/Paragraph';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import CommentItem from '@/components/Contents/ProductInfo/CommentItem';
import { ColumnsType } from 'antd/es/table';
import { CheckoutForm } from '@/components/Contents/common/CheckoutForm';
import instanceAxios from '@/api/instanceAxios';
import GrowUpForm from '@/components/Contents/ProductInfo/GrowUpForm';

interface DataType {
  key: React.Key;
  buyer: ReactNode;
  quantity: number;
  price: number;
  time: string;
  status: ReactNode;
}

export default function MarketInfo({
  params,
}: {
  params: { marketId: string };
}) {
  const [openListImageModal, setOpenListImageModal] = useState(false);
  const [openGrowUpModal, setOpenGrowUpModal] = useState(false);
  const [dataMarket, setDataMarket] = useState<any>({});
  const [dataOwner, setDataOwner] = useState({});
  const [dataProduct, setDataProduct] = useState({});
  const [changePageRight, setChangePageRight] = useState('COMMENT');
  const [isOwner, setIsOwner] = useState(true);
  const [commentList, setCommentList] = useState([]);
  const [showModalPay, setShowModalPay] = useState(false);

  useEffect(() => {
    const fethMarket = async () => {
      await instanceAxios
        .get(`marketplace/${params.marketId}`)
        .then(async (res) => {
          setDataMarket(res.data.data);
          await instanceAxios
            .get(`product/${res.data.data.order_id}`)
            .then((res) => setDataProduct(res.data.data))
            .catch((err) => console.log('asdadasd'));
          // await instanceAxios
          //   .get(`user/${res.data.data.order_id}`)
          //   .then((res) => setDataOwner(res.data.data))
          //   .catch((err) => console.log('asdadasd'));
        })
        .catch((err) => console.log(err));
    };
    fethMarket();
  }, [params.marketId]);

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      width: 200,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      buyer: `Edward King ${i}`,
      quantity: 32,
      price: 1231313 + i,
      time: `2${i}/12/1212`,
      status: i,
    });
  }

  return (
    <div className="w-full  m-auto">
      <div className="px-[50px]">
        <div className="flex gap-x-10">
          <Image
            className="object-cover rounded drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
            alt=""
            width={700}
            height={500}
            src={staticVariables.logo.src}
          />
          <div>
            <Typography.Title level={2}>Sau rieng viet nam</Typography.Title>
            <div className="flex gap-x-2 text-[#7B7B7B] font-light">
              San pham cua
              <p className="text-[#313064] font-bold">SimpRaidenEi</p>
            </div>
            <div className="flex gap-x-4 my-[20px]">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-fit items-center py-[10px] px-[20px] bg-lime-50 rounded-2xl border-[1px] border-stone-300"
                >
                  <EyeOutlined className="mr-[5px]" />
                  12313
                </div>
              ))}
            </div>
            <div className="border-[1px] rounded p-[20px]">
              <div className="flex pb-[10px] mb-[10px] border-b-[1px]">
                <FieldTimeOutlined className="px-[10px] text-2xl" />
                Sell day - 12/12/12
              </div>
              <div>The current price of durian fruit is $1,000 per fruit</div>
              <div className="w-fit flex items-center text-xs m-auto my-[20px]">
                Price<p className="text-3xl">123123 VND</p>
              </div>
              <div className="flex items-center mt-[10px]">
                <Button
                  onClick={() => setShowModalPay(true)}
                  className="w-full"
                >
                  Buy now
                </Button>
                <Button
                  onClick={() => {
                    // setBuyOrCart('CART');
                    setShowModalPay(true);
                  }}
                  className="flex items-center"
                >
                  <ShoppingCartOutlined />
                </Button>
              </div>
              <Modal
                onCancel={() => setShowModalPay(false)}
                open={showModalPay}
                footer={[]}
              >
                <CheckoutForm form={{ onFinish: (e) => console.log(e) }} />
              </Modal>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-[50px]">
          <div className="w-2/5 ">
            <p className="py-[10px] border-b-[1px]">Thông tin về sản phẩm</p>
            <div className="flex flex-col w-2/3 px-[20px] py-[15px] border-[1px] rounded">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center py-[5px]"
                >
                  <p>Nguyen Van A</p>
                  <Paragraph copyable>Sasdasd</Paragraph>
                </div>
              ))}
            </div>
            <div className="px-[10px] py-[15px] mt-[50px] rounded border-[1px]">
              <div className="pb-[10px] pl-[20px] border-b-[1px]">
                Decription
              </div>
              <div className="p-[20px] ">
                Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết sớm
                nghĩ sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có 2 tay
                + trời mưa to đường trơn mà nhà c cũng không gần KTX lắm nên
                việc Sót đơn hoặc để các em chờ hơi lâu là một thiết sót lớn với
                chịCác em bao dung sự bất tiện này nhé LÊN ĐƠN KÈM SỐ PHÒNG DÙM
                CHỊ BÉ NHÓShip chừ tới #12h đêm giờ nào cũng có các em yên tâm
                nhaaaChị bé ship cả ngoài kí túc xá nên cứ mạnh dạn lên đơn Đồ
                ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ CHIÊN XÙ #20k
                -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM MẮM #5k
                -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT #15_20k
                -CÁ VIÊN CHIÊN MẮM #20k
              </div>
            </div>
          </div>
          <div className="w-3/5 pl-[20px] rounded overflow-hidden">
            <Carousel
              className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]"
              waitForAnimate={true}
              effect="fade"
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
            <div className="w-full mt-[50px] pl-[50px]">
              <Segmented
                size={'large'}
                options={[
                  { label: 'Bình luận', value: 'COMMENT' },
                  { label: 'Lịch sử giao dịch', value: 'HISTORY' },
                ]}
                onChange={(e) => setChangePageRight(e as string)}
              />
              <div className="w-full mt-[20px]">
                {changePageRight === 'COMMENT' && (
                  <div className="p-[20px] border-[1px] rounded">
                    <div className="max-h-[500px] overflow-auto">
                      {commentList.length ? (
                        commentList.map((item: any, index) => (
                          <CommentItem
                            userRole={item.user.email}
                            userName={item.user.username}
                            userAvatar={item.user.avatar}
                            content={item.content}
                            key={index}
                          />
                        ))
                      ) : (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_DEFAULT}
                          description={'Chưa có bình luận nào'}
                        />
                      )}
                    </div>
                  </div>
                )}
                {changePageRight === 'HISTORY' && (
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ y: 340 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {dataMarket.order_type === 'FAMMER' && (
          <div
            //  relative before:content-[''] before:left-[15px] before:absolute before:w-[1px] before:h-full before:bg-black
            className={`border-l-2 block w-fit m-auto mt-[150px]`}
          >
            <div className="relative w-fit flex items-center p-[20px] border-[1px] border-l-0">
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                size={'2xl'}
                style={{ color: '#29c214' }}
              />
              <p className="pl-[20px]">Qua trinh phat trien </p>
              <PlusCircleTwoTone
                onClick={() => setOpenGrowUpModal(true)}
                className="text-2xl absolute right-0 top-1/2 translate-y-[-50%] translate-x-[50%]"
              />
            </div>
            <div className="ml-[-111px] h-[500px] border-b-[1px] overflow-auto mb-[200px] pl-[100px]">
              <GrowUpItem />
              <GrowUpItem />
              <GrowUpItem />
            </div>
            <Modal
              open={openGrowUpModal}
              onCancel={() => setOpenGrowUpModal(false)}
              footer={[]}
            >
              <Typography.Title level={3}>
                Cap nhat qua trinh phat trien
              </Typography.Title>

              <GrowUpForm productId={dataMarket.order_id} />
            </Modal>
          </div>
        )}
      </div>
      <div className="max-h-[800px] text-slate-200 p-[50px] bg-zinc-900">
        <p className="text-5xl mb-[20px]">Giới thiệu chi tiết về sản phẩm</p>
        <div className="max-h-[600px] w-fit flex flex-col gap-y-10 overflow-auto">
          {[...Array(5)].map((_, index) => (
            <>
              <div className="flex rounded w-full">
                <Image
                  className="object-cover w-1/2 "
                  width={550}
                  height={450}
                  style={{ borderRadius: '10px' }}
                  alt=""
                  src={staticVariables.qc1.src}
                />
                <div className="w-1/2 px-[50px]">
                  <p className="text-2xl mb-[20px]"> Gioi thieu san pham</p>
                  <div>
                    Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết
                    sớm nghĩ sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ
                    có 2 tay + trời mưa to đường trơn mà nhà c cũng không gần
                    KTX lắm nên việc Sót đơn hoặc để các em chờ hơi lâu là một
                    thiết sót lớn với chịCác em bao dung sự bất tiện này nhé LÊN
                    ĐƠN KÈM SỐ PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm giờ nào
                    cũng có các em yên tâm nhaaaChị bé ship cả ngoài kí túc xá
                    nên cứ mạnh dạn lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ
                    #30k -ĐUI GÀ CHIÊN XÙ #20k -KIMPAD TRUYỀN THỐNG #15_20k -GỎI
                    CUỐN TÔM THỊT KÈM MẮM #5k -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN
                    CHIÊN CHẤM TƯƠNG ỚT #15_20k -CÁ VIÊN CHIÊN MẮM #20k
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
