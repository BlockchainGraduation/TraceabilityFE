'use client';
import React, { useEffect, useState } from 'react';
import RelatedSide from './components/RelatedSide';
import TagItem from './components/TagItem';
import instanceAxios from '@/api/instanceAxios';
import moment from 'moment';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Avatar, Modal } from 'antd';
import staticVariables from '@/static';
import getRole from '@/services/getRole';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { LeftArrow, RightArrow } from '../../home/components/Category';

export default function TraceabilityPage() {
  const [historyList, setHistoryList] = useState<ProductType[]>([]);
  const [currentHistory, setCurrentHistory] = useState<ProductType>({});

  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchHistoryProduct = async () => {
      await instanceAxios
        .get(`hitory-product/25`)
        .then((res) => {
          setHistoryList(res.data.detail || []);
        })
        .catch((err) => console.log(err));
    };
    fetchHistoryProduct();
  }, []);

  return (
    <div className="w-full pb-[20px]">
      <div className="flex items-center justify-center gap-x-2 font-bold text-[12px] mt-[20px]">
        <FontAwesomeIcon icon={faUserSecret} />
        <p className="text-[14px]">Nguồn gốc sản phẩm</p>
      </div>
      <RelatedSide
        data={historyList[0]}
        leftItem={
          <div>
            <TagItem label="Tên sản phẩm" value={historyList[0]?.name || ''} />
            <TagItem
              label="Giá bán"
              value={(historyList[0]?.price || 0).toLocaleString()}
            />
            <TagItem
              label="Số lượng bán"
              value={(historyList[0]?.quantity || 0).toLocaleString()}
            />
            <TagItem
              label="Ngày mở bán"
              value={moment(historyList[0]?.create_at).format('L')}
            />
          </div>
        }
        rightItem={
          <div>
            <TagItem
              label="Tên cửa hàng"
              value={historyList[0]?.create_by?.fullname || ''}
            />
            <TagItem
              label="Email"
              valueClassName="truncate"
              value={historyList[0]?.create_by?.email || ''}
            />
            <TagItem
              label="Địa chỉ"
              value={historyList[0]?.create_by?.geographical_address || ''}
            />
            <TagItem
              label="Địa chỉ ví"
              valueClassName="truncate"
              value={historyList[0]?.create_by?.wallet_address || ''}
            />
            <TagItem
              label="Vai trò"
              value={historyList[0]?.create_by?.role || ''}
            />
          </div>
        }
      />
      <div className="w-full">
        <p className="p-[10px] font-bold">Các bên liên quan</p>
        <div className="w-full flex flex-col px-[20px] gap-y-5">
          {historyList.map(
            (item, index) =>
              index !== 0 && (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-100 rounded-xl border border-gray-500 p-[20px]"
                >
                  <Avatar
                    size={100}
                    src={item.create_by?.avatar || staticVariables.noImage.src}
                  />
                  <p className="my-[10px] font-semibold">
                    {getRole(item.create_by?.role || '')}
                  </p>
                  <button
                    className="px-[10px] max-sm:text-[10px] py-[3px] bg-gray-100 rounded-lg border border-gray-500"
                    onClick={() => {
                      setCurrentHistory(item);
                      setOpenModal(true);
                    }}
                  >
                    Xem thông tin
                  </button>
                </div>
              )
          )}
        </div>
      </div>
      <Modal onCancel={() => setOpenModal(false)} open={openModal} footer={[]}>
        <p className="font-semibold text-center">
          Thông tin liên quan của{' '}
          {getRole(currentHistory.create_by?.role || '')}
        </p>
        <RelatedSide
          data={currentHistory}
          leftItem={
            <div>
              <TagItem
                label="Tên sản phẩm"
                value={currentHistory?.name || ''}
              />
              <TagItem
                label="Giá bán"
                value={(currentHistory?.price || 0).toLocaleString()}
              />
              <TagItem
                label="Số lượng bán"
                value={(currentHistory?.quantity || 0).toLocaleString()}
              />
              <TagItem
                label="Ngày mở bán"
                value={moment(currentHistory?.create_at).format('L')}
              />
            </div>
          }
          rightItem={
            <div>
              <TagItem
                label="Tên cửa hàng"
                value={currentHistory?.create_by?.fullname || ''}
              />
              <TagItem
                label="Email"
                valueClassName="truncate"
                value={currentHistory?.create_by?.email || ''}
              />
              <TagItem
                label="Địa chỉ"
                value={currentHistory?.create_by?.geographical_address || ''}
              />
              <TagItem
                label="Địa chỉ ví"
                valueClassName="truncate"
                value={currentHistory?.create_by?.wallet_address || ''}
              />
              <TagItem
                label="Vai trò"
                value={currentHistory?.create_by?.role || ''}
              />
            </div>
          }
        />
      </Modal>
    </div>
  );
}
