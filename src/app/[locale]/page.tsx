'use client';
import HomeDescription from '@/components/Contents/Main/HomeDescription';
import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { increment } from '@/reducers/counterSlice';
import { useTranslations } from 'next-intl';

export default function Index() {
  return (
    <div className={`mainpage text-white px-[20px] pt-[100px]`}>
      <div
        className={`w-[600px] text-[70px] py-[10px] ml-[70px] font-black	text-2xl]`}
      >
        Hệ thống chuỗi cung ứng sầu riêng
      </div>
      <div
        data-aos="fade-up"
        className={`w-full flex text-lg mt-[200px] pr-[100px] justify-end`}
      >
        {/* shadow-[0px_4px_50px_30px_#00000089] px-[30px] py-[20px] backdrop-blur-xl bg-[#00000089] rounded` */}
        <p data-aos="fade-up" className={`w-[500px]`}>
          DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của
          sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản
          phẩm được ghi lại một cách an toàn và không thể thay đổi. Điều này
          giúp tăng độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến
          người tiêu dùng cuối cùng
        </p>
      </div>
      <p className="m-auto mt-[300px] text-center text-[35px] font-extrabold	">
        Condimentum Mattis
        <br /> Pellentesque Dnibus Tortyga
      </p>
      <div
        data-aos="fade-up"
        className={`w-full mt-[200px] relative justify-around flex before:content-[''] before:absolute before:block before:top-1/2 before:w-full before:h-[1px] before:bg-white`}
      >
        <div
          className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
        >
          Minh bạch
        </div>
        <div
          className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
        >
          Uy tín
        </div>
        <div
          className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}
        >
          Minh bạch
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-[100px] text-black mt-[100px] py-[50px] rounded-sm bg-[#F5F5F5ED]">
        <HomeDescription alignRight={false} />
        <HomeDescription alignRight={true} />
        <HomeDescription alignRight={false} />
      </div>
    </div>
  );
}
