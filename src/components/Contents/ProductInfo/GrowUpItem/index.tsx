import { Image } from 'antd';
import React from 'react';

export default function GrowUpItem() {
  return (
    <div className="flex items-center py-[30px] translate-y-[50%]">
      <div
        className={`relative pl-[100px] before:content-[''] before:absolute before:bg-[#1677ff] before:border-[5px] before:rounded-[50%] before:left-[0px] before:top-1/2 before:translate-y-[-50%] before:w-[20px] before:h-[20px] after:content-[''] after:absolute after:z-[-1] after:left-0 after:top-1/2 after:translate-y-[-50%]  after:w-[110%] after:h-[2px] after:bg-[#0505050f]`}
      >
        <p className="absolute top-1/2 left-0 translate-x-[-120%] translate-y-[-50%]">
          01/01/2001
        </p>
        <Image
          preview={false}
          // onClick={() => setOpenModal(true)}
          alt=""
          className="object-cover rounded"
          width={300}
          height={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </div>
      <p className="p-[50px] w-[700px] bg-inherit text-justify">
        DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của sản
        phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản phẩm
        được ghi lại một cách an toàn và không thể thay đổi. Điều này giúp tăng
        độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến người tiêu
        dùng cuối cùng
      </p>
    </div>
  );
}
