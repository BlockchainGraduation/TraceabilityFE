import { Image, Modal, Typography } from 'antd';
import React, { useState } from 'react';

export default function GrowUpItem() {
  const [showListImageModal, setShowListImageModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  return (
    <div className="flex w-full items-center py-[30px]">
      <div
        className={`relative pl-[100px] before:content-[''] before:absolute before:bg-[#1677ff] before:border-[5px] before:rounded-[50%] before:left-[0px] before:top-1/2 before:translate-y-[-50%] before:w-[20px] before:h-[20px] after:content-[''] after:absolute after:z-[-1] after:left-0 after:top-1/2 after:translate-y-[-50%]  after:w-[110%] after:h-[2px] after:bg-[#0505050f]`}
      >
        <p className="absolute top-1/2 left-0 translate-x-[-120%] translate-y-[-50%]">
          01/01/2001
        </p>
        <Image
          preview={false}
          onClick={() => setShowListImageModal(true)}
          alt=""
          className="object-cover rounded drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
          width={300}
          height={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </div>
      <div className="p-[50px] w-2/3 max-h-2/3 ">
        <Typography.Title
          onClick={() => setShowDescriptionModal(true)}
          level={3}
        >
          Sự thay đổi của sản ohamar ngày 12
        </Typography.Title>
        <p className="line-clamp-6 whitespace-pre-wrap bg-inherit text-justify">
          Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết sớm nghĩ
          sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có 2 tay + trời mưa
          to đường trơn mà nhà c cũng không gần KTX lắm nên việc Sót đơn hoặc để
          các em chờ hơi lâu là một thiết sót lớn với chịCác em bao dung sự bất
          tiện này nhé LÊN ĐƠN KÈM SỐ PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm
          giờ nào cũng có các em yên tâm nhaaaChị bé ship cả ngoài kí túc xá nên
          cứ mạnh dạn lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ
          CHIÊN XÙ #20k -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM MẮM
          #5k -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT #15_20k -CÁ
          VIÊN CHIÊN MẮM #20k
        </p>
      </div>
      <Modal
        width={700}
        onCancel={() => setShowListImageModal(false)}
        open={showListImageModal}
        footer={[]}
      >
        <Typography.Title level={3}>
          Danh sách hình ảnh được tải lên
        </Typography.Title>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Image
            alt=""
            width={200}
            height={150}
            className="object-cover"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          <Image
            alt=""
            width={200}
            height={150}
            className="object-cover"
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          />
        </Image.PreviewGroup>
      </Modal>
      <Modal
        width={700}
        onCancel={() => setShowDescriptionModal(false)}
        open={showDescriptionModal}
        footer={[]}
      >
        <Typography.Title level={3}>
          Thông tin về sự phát triển của sản phẩm ngày 23
        </Typography.Title>
        <div>
          Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết sớm nghĩ
          sớm nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có 2 tay + trời mưa
          to đường trơn mà nhà c cũng không gần KTX lắm nên việc Sót đơn hoặc để
          các em chờ hơi lâu là một thiết sót lớn với chịCác em bao dung sự bất
          tiện này nhé LÊN ĐƠN KÈM SỐ PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm
          giờ nào cũng có các em yên tâm nhaaaChị bé ship cả ngoài kí túc xá nên
          cứ mạnh dạn lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ
          CHIÊN XÙ #20k -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM MẮM
          #5k -CHÂN GÀ NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT #15_20k -CÁ
          VIÊN CHIÊN MẮM #20k
        </div>
      </Modal>
    </div>
  );
}
