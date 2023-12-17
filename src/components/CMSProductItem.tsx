import instanceAxios from '@/api/instanceAxios';
import {
  faEllipsis,
  faFileArrowDown,
  faPenToSquare,
  faShop,
  faShopLock,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Col,
  Dropdown,
  Image,
  Modal,
  QRCode,
  Row,
  message,
  notification,
} from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';

export default function CMSProductItem({
  data,
  index,
}: {
  index: number;
  data?: ProductType;
}) {
  const [linkQRCode, setLinkQRCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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

  const fetchDelete = async (productId: number) => {
    await instanceAxios
      .delete(`product/${productId}/`)
      .then((res) => {
        message.success('Đã xóa');
        mutate('product/me');
      })
      .catch((err) => message.error('Xóa thất bại'));
  };

  const downloadQRCodeWithPadding = (padding: number, preView?: boolean) => {
    const originalCanvas = document
      .getElementById('myqrcode')
      ?.querySelector<HTMLCanvasElement>('canvas');

    if (originalCanvas) {
      const paddedCanvas = document.createElement('canvas');
      const paddingSize = padding * 2; // Gói gọn cả hai bên

      // Đặt kích thước của canvas mới
      paddedCanvas.width = originalCanvas.width + paddingSize;
      paddedCanvas.height = originalCanvas.height + paddingSize;

      const paddedContext = paddedCanvas.getContext('2d');

      if (paddedContext) {
        // Vẽ một hình vuông trắng để tạo padding
        paddedContext.fillStyle = '#fff'; // Màu trắng
        paddedContext.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

        // Vẽ nội dung QR code lên canvas mới
        paddedContext.drawImage(originalCanvas, padding, padding);

        // Tạo data URL và tải về
        const url = paddedCanvas.toDataURL();
        if (preView) {
          setVisible(true);
          setLinkQRCode(url);
        } else {
          const a = document.createElement('a');
          a.download = 'QRCode.png';
          a.href = url;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }
    }
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
          <p>{moment(data?.create_at).format('DD/MM/YYYY - HH:mm:ss')}</p>
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
                    <Link href={`/edit/${data?.id}`}>
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
                        setOpenModal(true);
                      }}
                    >
                      <Col span={5}>
                        <FontAwesomeIcon
                          icon={faFileArrowDown}
                          style={{ color: '#63e6be' }}
                        />
                      </Col>
                      <p>Xuất QR code</p>
                    </Row>
                  ),
                },
                {
                  key: 5,
                  label: (
                    <Row
                      onClick={() => {
                        fetchDelete(data?.id || 0);
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

      <Image
        alt=""
        width={200}
        style={{ display: 'none' }}
        // src={QRCode}

        preview={{
          visible,
          src: linkQRCode,

          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
      <Modal open={openModal} onCancel={() => setOpenModal(false)} footer={[]}>
        <div id="myqrcode">
          {/* <Image alt="" src={QRCode} /> */}
          <QRCode
            className="m-auto"
            value={`${process.env.NEXT_PUBLIC_URL_ORIGIN}traceability/${data?.id}`}
            bgColor="#fff"
            style={{ marginBottom: 16 }}
          />
          <div className="flex gap-x-5 justify-center">
            <button
              className=" bg-gray-100 text-gray-700 font-semibold border rounded-xl py-[5px] px-[10px]"
              onClick={() => downloadQRCodeWithPadding(10)}
            >
              Tải về
            </button>
            <button
              className=" bg-gray-100 text-gray-700 font-semibold border rounded-xl py-[5px] px-[10px]"
              onClick={() => downloadQRCodeWithPadding(10, true)}
            >
              Xem trước
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
