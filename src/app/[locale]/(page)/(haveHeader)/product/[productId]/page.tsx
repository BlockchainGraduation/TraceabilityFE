'use client';

import instanceAxios from '@/api/instanceAxios';
import ProductInfoComponent from '@/components/ProductInfoComponent';
import { useAppSelector } from '@/hooks';
import useLogin from '@/services/requireLogin';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useEffectOnce } from 'usehooks-ts';

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
      </div>
    )
  );
}
