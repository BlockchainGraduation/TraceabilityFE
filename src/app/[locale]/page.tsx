'use client';
import instanceAxios from '@/api/instanceAxios';
import HomeDescription from '@/components/Contents/Main/HomeDescription';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { increment } from '@/reducers/counterSlice';
import staticVariables from '@/static';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Image, Skeleton } from 'antd';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
// const Header = dynamic(() => import('@/components/Header'), {
//   loading: () => <Skeleton.Avatar />,
// });
// const Footer = dynamic(() => import('@/components/Footer'));
interface User {
  user?: {
    user_total?: number;
    anonymous_user_total?: number;
    factory_user_total?: number;
    distributer_user_total?: number;
    retailer_user_total?: number;
  };
}

export default function Index() {
  const [statisticalUser, setStatisticalUser] = useState<User>({});
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      await instanceAxios
        .get(`user/user-total`)
        .then((res) => setStatisticalUser(res.data.detail))
        .catch((err) => console.log(err))
        .finally(() => setLoadingPage(false));
    };
    fetchUser();
  }, []);
  return (
    !loadingPage && (
      <>
        <Header />
        <div className={`mainpage text-white pt-[100px]`}>
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="1000"
            className="h-[400px]"
          >
            <div
              className={`w-[1000px] flex justify-end items-center pr-[200px] h-[1000px] shadow-lg rounded-full bg-[#f8f7ffc6] -translate-x-1/3 -translate-y-1/3 text-black text-[50px] font-black	text-2xl]`}
            >
              <div
                data-aos="fade-right"
                data-aos-delay="1500"
                className="w-[400px] text-[#1b1b1b] pt-[100px]"
              >
                <p className="pb-[20px]">SimpRaidenEi</p>
                <p className="text-[20px] font-sans font-semibold text-gray-600 ">
                  Hệ thống blockchain truy xuất nguồn gốc tôm giống nhằm mục
                  tiêu cung cấp một giải pháp đáng tin cậy và minh bạch cho quá
                  trình sản xuất và phân phối tôm giống. Nó giúp theo dõi hành
                  trình của tôm giống từ khi nó được nuôi tạo đến khi nó đến tay
                  người chăn nuôi.
                </p>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className={`w-full flex text-lg pr-[100px] justify-end`}
          >
            {/* shadow-[0px_4px_50px_30px_#00000089] px-[30px] py-[20px] backdrop-blur-xl bg-[#00000089] rounded` */}
            <p
              data-aos="fade-up"
              className={`w-[600px] font-semibold tracking-widest	`}
            >
              Hệ thống Blockchain truy xuất nguồn gốc tôm giống là một nền tảng
              công nghệ tiên tiến được xây dựng để cải thiện quản lý và theo dõi
              nguồn gốc của tôm giống từ quốc đến tôi đĩa. Đây là một ứng dụng
              tiêu biểu của công nghệ Blockchain trong lĩnh vực quản lý chuỗi
              cung ứng và truy xuất nguồn gốc trong ngành thủy sản
            </p>
          </div>
          <div className="bg-[#000000E2] pt-[200px] mt-[300px] ">
            <div className="w-full flex justify-between">
              <div
                data-aos="zoom-out-down"
                className="w-1/2 flex flex-col items-center gap-y-8 text-[18px] text-[#c4c4c4] justify-center px-[100px]"
              >
                <p className="font-semibold text-[30px]">Mục đích phát triển</p>
                <p>
                  Giải quyết các vấn đề về việc chứng minh nguồn góc các sản
                  phẩm trên thị trường. Chúng tôi luôn hướng đến một thị trường
                  sản phẩm luôn đảm bảo an toàn đến sức khoả của công người
                </p>
                <p>
                  Mở rộng khả năng tương tác để cho phép người tiêu dùng và đối
                  tác kinh doanh đóng góp thông tin, nhận xét và đánh giá về
                  chất lượng của sản phẩm.
                </p>
                <p>
                  Phát triển khả năng thực hiện giao thương điện tử trực tiếp
                  trên nền Blockchain, giúp tối ưu hóa quy trình thanh toán và
                  giảm thiểu rủi ro gian lận.
                </p>
              </div>
              <div
                data-aos="fade-down-left"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                <Image
                  width={700}
                  className=" object-cover "
                  preview={false}
                  alt=""
                  src={staticVariables.shrimp2.src}
                />
              </div>
            </div>
            <div className="flex pt-[50px] items-center px-[50px] justify-center flex-wrap gap-x-10">
              <p
                data-aos="fade-down"
                data-aos-delay="500"
                className="w-1/2 text-[25px] font-semibold tracking-widest bg-[#b1b1b1] text-center py-[20px] rounded-b-full"
              >
                Nguyên tắc
              </p>
              <div className="w-full flex justify-center gap-x-10 mt-[50px] text-[20px] text-black font-semibold">
                <p
                  data-aos="flip-right"
                  className="py-[20px] w-1/5 text-center bg-[#b1b1b1] rounded-full"
                >
                  Minh bạch
                </p>
                <p
                  data-aos-delay="1000"
                  data-aos="flip-right"
                  className="py-[20px] w-1/5 text-center bg-[#b1b1b1] rounded-full"
                >
                  An toàn thông tin
                </p>
                <p
                  data-aos-delay="1500"
                  data-aos="flip-right"
                  className="py-[20px] w-1/5 text-center bg-[#b1b1b1] rounded-full"
                >
                  Ưu tiên khách hàng
                </p>
              </div>
            </div>
            <div className="w-full flex items-center relative flex-col gap-y-[100px] text-black mt-[100px] py-[50px] rounded-sm bg-[#F5F5F5ED]">
              <p
                data-aos="fade-down"
                data-aos-delay="500"
                className="w-1/2 text-[25px] font-semibold tracking-widest bg-[#b1b1b1] text-center py-[20px] rounded-b-full"
              >
                Hệ thống người dùng
              </p>
              <div className="w-full flex justify-around">
                <div
                  data-aos-delay="400"
                  data-aos="flip-right"
                  className="w-1/4 flex flex-col border rounded-xl border-green-600 p-[30px]"
                >
                  <div className="w-full">
                    <Image
                      width={'100%'}
                      height={200}
                      className="object-cover rounded-xl"
                      preview={false}
                      alt=""
                      src={staticVariables.factoryHome.src}
                    />
                  </div>
                  <p className=" text-[#5F5F5F] font-bold text-[25px] text-center">
                    Công ty chế biến
                  </p>
                  <div className="flex space-x-3 items-baseline justify-center">
                    <p className="text-[64px] text-[#2F3396] font-black">
                      {statisticalUser.user?.factory_user_total || 0}
                    </p>
                    <p className="text-[32px] text-[#2A2C5F] font-bold">User</p>
                  </div>
                </div>
                <div
                  data-aos-delay="800"
                  data-aos="flip-right"
                  className="w-1/4 flex flex-col border rounded-xl border-green-600 p-[30px]"
                >
                  <div className="w-full">
                    <Image
                      width={'100%'}
                      height={200}
                      className="object-cover rounded-xl"
                      preview={false}
                      alt=""
                      src={staticVariables.distributerHome.src}
                    />
                  </div>
                  <p className="font-bold text-[#5F5F5F]  text-[25px] text-center">
                    Nhà phân phối
                  </p>
                  <div className="flex space-x-3 items-baseline justify-center">
                    <p className="text-[64px] text-[#2F3396] font-black">
                      {statisticalUser.user?.distributer_user_total || 0}
                    </p>
                    <p className="text-[32px] text-[#2A2C5F] font-bold">User</p>
                  </div>
                </div>
                <div
                  data-aos-delay="1200"
                  data-aos="flip-right"
                  className="w-1/4 flex flex-col border rounded-xl border-green-600 p-[30px]"
                >
                  <div className="w-full">
                    <Image
                      width={'100%'}
                      height={200}
                      className="object-cover rounded-xl"
                      preview={false}
                      alt=""
                      src={staticVariables.retailerHome.src}
                    />
                  </div>
                  <p className="font-bold text-[#5F5F5F] text-[25px] text-center">
                    Nhà bán lẻ
                  </p>
                  <div className="flex space-x-3 items-baseline justify-center">
                    <p className="text-[64px] text-[#2F3396] font-black">
                      {statisticalUser.user?.retailer_user_total || 0}
                    </p>
                    <p className="text-[32px] text-[#2A2C5F] font-bold">User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
}
