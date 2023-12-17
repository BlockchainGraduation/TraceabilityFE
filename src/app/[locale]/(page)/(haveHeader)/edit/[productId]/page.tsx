'use client';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Result, UploadFile } from 'antd';

import React, { useState } from 'react';

import instanceAxios from '@/api/instanceAxios';
import { useAppSelector } from '@/hooks';
import { useEffectOnce } from 'usehooks-ts';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import useSWR, { useSWRConfig } from 'swr';
import ProductInfoComponent from '@/components/ProductInfoComponent';

export default function ProductEditage({
  params,
}: {
  params: { productId: number };
}) {
  const [dataProduct, setDataProduct] = useState<ProductType>({});
  const [loadingPage, setLoadingPage] = useState(true);
  const currentUser = useAppSelector((state) => state.user.user);

  const fethProduct = async () => {
    await instanceAxios
      .get(`edit-product/${params.productId}`)
      .then(async (res) => {
        setDataProduct(res.data || {});
      })
      .catch((err) => console.log('asdadasd'))
      .finally(() => setLoadingPage(false));
  };

  useEffectOnce(() => {
    fethProduct();
  });

  return (
    !loadingPage && (
      <div className="w-full h-fit m-auto pt-[100px] pb-[50px]">
        {dataProduct.create_by?.id === currentUser.id ? (
          <ProductInfoComponent edit={true} productId={params.productId} />
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Xin lỗi, Bạn không có quyền truy cập vào trang này."
            extra={
              <Button type={'link'} href="/home">
                Back Home
              </Button>
            }
          />
        )}
      </div>
    )
  );
}
