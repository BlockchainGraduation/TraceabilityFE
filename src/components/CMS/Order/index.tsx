import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Empty, Image, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export default function OrderCMS() {
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  const [listTransaction, setListTransaction] = useState<TransactionType>();
  const [currentProduct, setCurrentProduct] = useState<ProductType>();
  const currentUser = useAppSelector((state) => state.user.user);

  const fetchProductMe = useCallback(async () => {
    await instanceAxios
      .get(`product-me/?create_by=${currentUser.id}`)
      .then((res) => {
        setListProduct(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser.id]);
  const fetchFilterTransaction = useCallback(async () => {
    await instanceAxios
      .get(`filter-transaction?product_id=${currentProduct?.id}`)
      .then((res) => {
        setListTransaction(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentProduct?.id]);

  useEffect(() => {
    fetchFilterTransaction();
  }, [fetchFilterTransaction]);

  useEffect(() => {
    fetchProductMe();
  }, [fetchProductMe]);
  return (
    <div className="w-full p-[30px] flex gap-x-5">
      <div className="w-1/2 bg-[#f6f6f6] rounded-xl p-[30px]">
        <p className="text-[25px] font-medium">Sản phẩm</p>
        <Dropdown
          trigger={['click']}
          menu={{
            items: listProduct.map((item, index) => ({
              key: index,
              label: (
                <div className="flex justify-between">
                  <p className="font-semibold">{item.name}</p>{' '}
                  <p>{`${item.total_transaction} GD`}</p>
                </div>
              ),
              onClick: () => setCurrentProduct(item),
            })),
          }}
        >
          <Space className="w-1/2 py-[20px] text-current-color ">
            <p className="">Chọn sản phẩm</p>
            <DownOutlined />
          </Space>
        </Dropdown>
        <div className="w-full py-[20px]">
          {currentProduct ? (
            <div className="w-full flex space-x-5 bg-white p-[20px] rounded-xl">
              <div className="w-1/3">
                <Image
                  className="object-cover rounded-xl bg-[#f6f6f6]"
                  width={'100%'}
                  height={'100%'}
                  alt=""
                  preview={false}
                  src={currentProduct?.avatar || staticVariables.noImage.src}
                />
              </div>
              <div className="w-2/3 flex space-y-3 flex-col">
                <p className="text-[20px] bg-[#f6f6f6]  rounded-xl py-[5px] px-[20px] truncate font-semibold">
                  {currentProduct?.name}
                </p>
                <div className="flex py-[10px] px-[20px] rounded-xl bg-[#f6f6f6] w-full justify-between">
                  <Space className="w-1/2 " direction={'vertical'}>
                    <p className="truncate">Giá đơn vị</p>
                    <p className="text-[18px] font-normal">
                      {currentProduct?.price}
                    </p>
                  </Space>
                  <Space className="w-1/2 " direction={'vertical'}>
                    <p className="truncate">Số lượng đang bán</p>
                    <p className="text-[18px] font-normal">
                      {currentProduct?.quantity}
                    </p>
                  </Space>
                </div>
              </div>
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description="Vui lòng chọn sản phẩm"
            />
          )}
        </div>
      </div>
      <div className="w-1/2 bg-[#f6f6f6] rounded-xl p-[30px]">
        <p className="text-[25px] font-medium">Đơn đặt hàng</p>
      </div>
    </div>
  );
}
