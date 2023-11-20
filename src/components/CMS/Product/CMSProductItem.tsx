import instanceAxios from '@/api/instanceAxios';
import {
  faEllipsis,
  faPenToSquare,
  faShop,
  faShopLock,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Dropdown, Row, notification } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { useSWRConfig } from 'swr';

export default function CMSProductItem({
  data,
  index,
}: {
  index: number;
  data?: ProductType;
}) {
  const { mutate } = useSWRConfig();
  const fetchChangeStatus = async (status: boolean) => {
    await instanceAxios
      .patch(`product/${data?.id}/`, {
        active: status,
      })
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: 'Đã đổi trạng thái sản phẩm!!!',
        });
        mutate('product/me');
      })
      .catch((err) =>
        notification.error({
          message: 'Lỗi',
          description: 'Đã có lỗi xảy ra!!!',
        })
      );
  };

  return (
    <div>
      <Row className="py-[10px] hover:bg-[#f5f5f5] border-b-[1px] border-[#f5f5f5]">
        <Col span={1}>
          <p className="text-center">{index}</p>
        </Col>
        <Col span={7}>
          <p>{data?.name}</p>
        </Col>
        <Col span={3}>
          <p>{data?.price}</p>
        </Col>
        <Col span={3}>
          <p>{data?.quantity}</p>
        </Col>
        <Col span={4}>
          <p>{moment(data?.create_at).format('DD/MM/YYYY-HH:MM:SS')}</p>
        </Col>
        <Col span={2}>
          <p>{data?.active ? 'Mở bán' : 'Không mở bán'}</p>
        </Col>
        <Col span={4}>
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <Link href={``}>
                      <Row
                        onClick={() => {
                          //   setProductId(record.id || '');
                          //   setOpenModalUpdate(true);
                          //   setCurrentProduct(record);
                        }}
                      >
                        <Col span={5}>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: '#2657ab' }}
                          />
                        </Col>
                        <p>Chỉnh sửa</p>
                      </Row>
                    </Link>
                  ),
                },
                data?.active
                  ? {
                      key: 2,
                      label: (
                        <Row onClick={() => fetchChangeStatus(false)}>
                          <Col span={5}>
                            <FontAwesomeIcon
                              icon={faShopLock}
                              style={{ color: '#ded935' }}
                            />
                          </Col>
                          <p>Không mở bán</p>
                        </Row>
                      ),
                    }
                  : {
                      key: 3,
                      label: (
                        <Row onClick={() => fetchChangeStatus(true)}>
                          <Col span={5}>
                            <FontAwesomeIcon
                              icon={faShop}
                              style={{ color: '#1acb47' }}
                            />
                          </Col>

                          <p>Mở bán</p>
                        </Row>
                      ),
                    },
                {
                  key: 4,
                  label: (
                    <Row
                      onClick={() => {
                        //   setProductId(record.id || '');
                        //   setOpenModalUpdate(true);
                        //   setCurrentProduct(record);
                      }}
                    >
                      <Col span={5}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: '#e43f3f' }}
                        />
                      </Col>
                      <p>Xóa</p>
                    </Row>
                  ),
                },
              ],
            }}
          >
            <p className="text-center">
              <FontAwesomeIcon icon={faEllipsis} style={{ color: '#005eff' }} />
            </p>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
