import staticVariables from '@/static';
import { Avatar, Tag } from 'antd';
import React from 'react';

export default function CommentItem() {
  return (
    <div className="mb-[20px]">
      <div className="flex ">
        <Avatar src={staticVariables.logoRaiden.src} />
        <div className="flex ml-[10px] flex-col">
          Nguyen Van A<Tag className="w-fit">Fammer</Tag>
        </div>
      </div>
      <div className="w-[400px] p-[20px] ml-[40px] mt-[5px] bg-gray-200 rounded text-xs	drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        Nay chị Sốt nên lên bài hơi trễMưa quá nên ăn utng hộ c hết sớm nghĩ sớm
        nhaaa Có quá nhiều đơn trong 1 lúc mà chị chỉ có 2 tay + trời mưa to
        đường trơn mà nhà c cũng không gần KTX lắm nên việc Sót đơn hoặc để các
        em chờ hơi lâu là một thiết sót lớn với chịCác em bao dung sự bất tiện
        này nhé LÊN ĐƠN KÈM SỐ PHÒNG DÙM CHỊ BÉ NHÓShip chừ tới #12h đêm giờ nào
        cũng có các em yên tâm nhaaaChị bé ship cả ngoài kí túc xá nên cứ mạnh
        dạn lên đơn Đồ ăn chị có : -SET KIMPAD ĐÙI GÀ #30k -ĐUI GÀ CHIÊN XÙ #20k
        -KIMPAD TRUYỀN THỐNG #15_20k -GỎI CUỐN TÔM THỊT KÈM MẮM #5k -CHÂN GÀ
        NHỎ-LỚN #20-35k -CÁ VIÊN CHIÊN CHẤM TƯƠNG ỚT #15_20k -CÁ VIÊN CHIÊN MẮM
        #20k
      </div>
    </div>
  );
}
