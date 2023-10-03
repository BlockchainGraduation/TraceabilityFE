'use client';
import HomeDescription from '@/components/Contents/Main/HomeDescription';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { increment } from '@/reducers/counterSlice';
import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations('Index');
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className={`mainpage text-white px-[20px] pt-[100px]`}>
      <h1>{t('title')}</h1>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Incre</button>
      <div className={`flex-col	items-center w-fit ml-[150px]`}>
        <div
          className={`w-[300px] m-auto py-[10px] text-2xl rounded-sm text-center border-x-[1px] border-t-[1px]`}
        >
          Hệ thống chuỗi cung ứng
        </div>
        <div
          className={`w-[350px] text-xl py-[5px] rounded-sm text-center text-gray-900	 bg-gray-200`}
        >
          Design by
        </div>
      </div>
      <div className={`w-full flex text-lg mt-[200px] pr-[100px] justify-end`}>
      {/* shadow-[0px_4px_50px_30px_#00000089] px-[30px] py-[20px] backdrop-blur-xl bg-[#00000089] rounded` */}
        <p className={`w-[500px]`}>
          DatBe tạo ra một hệ thống minh bạch cho việc theo dõi nguồn gốc của
          sản phẩm. Thông tin về quá trình sản xuất, vận chuyển và lưu trữ sản
          phẩm được ghi lại một cách an toàn và không thể thay đổi. Điều này
          giúp tăng độ tin cậy cho tất cả các bên liên quan, từ nhà sản xuất đến
          người tiêu dùng cuối cùng
        </p>
      </div>
      <div className={`w-full mt-[200px] relative justify-around flex before:content-[''] before:absolute before:block before:top-1/2 before:w-full before:h-[1px] before:bg-white`}>
        <div className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}>Minh bạch</div>
        <div className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}>Uy tín</div>
        <div className={`w-[200px] text-3xl backdrop-blur-xl rounded-sm border-[0.5px] py-[10px] text-center`}>Minh bạch</div>
      </div>
      <div className='w-full flex flex-col gap-y-[100px] text-black mt-[100px] py-[50px] rounded-sm bg-[#F5F5F5ED]'>
        <HomeDescription alignRight={false}/>
        <HomeDescription alignRight={true}/>
        <HomeDescription alignRight={false}/>
      </div>
    </div>
  );
}
