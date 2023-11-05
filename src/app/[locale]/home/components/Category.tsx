import instanceAxios from '@/api/instanceAxios';
import currency from '@/services/currency';
import staticVariables from '@/static';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ConfigProvider, Empty, Image, Statistic } from 'antd';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

interface MarketType {
  id?: string;
  order_type?: string;
  order_id?: string;
  order_by?: string;
  hash_data?: string;
  created_at?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: string;
    quantity?: string;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  comments?: {
    content?: string;
    marketplace_id?: string;
    user_id?: string;
    id?: string;
    created_at?: string;
    user?: string;
    reply_comments?: string;
  };
}
interface Props {
  orderType: 'FARMER' | 'SEEDLING_COMPANY' | 'MANUFACTURER';
  title?: string;
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return disabled ? (
    <></>
  ) : (
    <ArrowLeftOutlined
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    />
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return disabled ? (
    <></>
  ) : (
    <ArrowRightOutlined disabled={disabled} onClick={() => scrollNext()} />
  );
}

export default function Category(props: Props) {
  const [limit, setLimit] = useState(10);
  const [listMarket, setListMarket] = useState<MarketType[]>([]);
  const [totalMarket, setTotalMarket] = useState(0);

  const fetchListMarket = useCallback(async () => {
    await instanceAxios
      .get(`marketplace/list?order_type=${props.orderType}&skip=0&limit=10`)
      .then((res) => {
        setListMarket(res.data.data.list_marketplace);
        setTotalMarket(res.data.data.total_marketplace);
      })
      .catch((err) => {
        console.log(err);
        setListMarket([]);
      });
  }, [props.orderType]);
  useEffect(() => {
    fetchListMarket();
  }, [fetchListMarket]);
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1500"
      data-aos-easing="ease-in-out"
      className="px-[50px]"
    >
      <p className="text-[24px] font-semibold text-[#121212]">{props.title}</p>
      {listMarket.length ? (
        <ScrollMenu
          Footer={[]}
          noPolyfill
          wrapperClassName="max-w-full w-fit px-[20px]  mb-[30px] "
          scrollContainerClassName="mx-[20px]"
          itemClassName="my-[20px]"
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          {listMarket.map((item, index) => (
            <Link
              className="hover:text-inherit"
              key={index}
              href={`/market/${item.id}`}
            >
              <div className="relative w-[280px] flex flex-col mx-[20px] rounded-2xl overflow-hidden shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ">
                <Image
                  width={280}
                  height={190}
                  preview={false}
                  className="rounded object-cover"
                  alt=""
                  src={item.product?.banner}
                />
                <p className="w-full text-center font-bold truncate px-[15px] p-[10px] text-[16px]">
                  {item.product?.name}
                </p>
                <div className="w-full flex justify-between px-[40px] pb-[10px]">
                  <ConfigProvider
                    theme={{
                      components: {
                        Statistic: {
                          titleFontSize: 14,
                          contentFontSize: 16,
                        },
                      },
                    }}
                  >
                    <Statistic
                      className="font-semibold"
                      title="Số lượng"
                      value={item.product?.quantity}
                    />
                    <Statistic
                      className="font-semibold"
                      title="Giá"
                      value={item.product?.price}
                      suffix={currency}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </Link>
          ))}
        </ScrollMenu>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={`Không tìm thấy dữ liệu về ${props.title}`}
        />
      )}
    </div>
  );
}
