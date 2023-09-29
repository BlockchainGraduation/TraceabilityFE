import { Image } from 'antd';
import React from 'react';

export default function GrowUpItem() {
  return (
    <div className="flex items-center">
      <div
        className={`relative pl-[100px] before:content-[''] before:absolute before:left-[0px] before:top-1/2 before:translate-y-[-50%] before:w-[30px] before:h-[30px] before:bg-[#0505050f] after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:translate-y-[-50%] after:w-full after:h-[2px] after:bg-[#0505050f]`}
      >
        <p className="absolute top-1/2 left-0 translate-x-[-200%] translate-y-[-50%]">
          01/01/2001
        </p>
        <Image
          preview={false}
          // onClick={() => setOpenModal(true)}
          alt=""
          width={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </div>
      <p className="p-[50px] w-[700px]">
        DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của sản
        phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản phẩm
        được ghi lại một cách an toàn và không thể thay đổi. Điều này giúp tăng
        độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến người tiêu
        dùng cuối cùng
      </p>
    </div>
  );
}
