import React, { useState } from 'react';
import { Chart } from './Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromWaterPump,
  faCloudSun,
  faDatabase,
  faIndustry,
  faLeaf,
  faSeedling,
  faSunPlantWilt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import instanceAxios from '@/api/instanceAxios';
import { useEffectOnce } from 'usehooks-ts';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import staticVariables from '@/static';
import { Avatar, Image, Space } from 'antd';
import { useAppSelector } from '@/hooks';
import getPercent from '@/services/getPercent';
import Percent from './Percent';
import AdminStatistical from './AdminStatistical';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function Statistical() {
  const [dataStatistical, setDataStatistical] = useState<StatisticalSystemType>(
    {}
  );
  const [dataStatisticalUser, setDataStatisticalUser] =
    useState<StatisticalUserType>({});
  const currentUser = useAppSelector((state) => state.user.user);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 12,
            lineHeight: 2.5,
          },
        },
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê loại người dùng trong hệ thống',
        font: {
          size: 20,
          lineHeight: 2.5,
        },
      },
    },
  };
  const productChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 12,
            lineHeight: 2.5,
          },
        },
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê loại sản phẩm trong hệ thống',
        font: {
          size: 20,
          lineHeight: 2.5,
        },
      },
    },
  };
  const userChartData = {
    labels: [
      'Tổng tài khoản chưa kích hoạt',
      'Tổng công ty hạt giống',
      'Tổng người trồng trọt',
      'Tổng nhà máy chế biến',
    ],

    datasets: [
      {
        data: [
          dataStatistical.statistical_user?.member_count,
          dataStatistical.statistical_user?.seedling_count,
          dataStatistical.statistical_user?.farmer_count,
          dataStatistical.statistical_user?.manufacturer_count,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const productChartData = {
    labels: [
      'Tổng sản phẩm hạt giống',
      'Tổng sản phẩm trồng trọt',
      'Tổng sản phẩm của nhà máy chế biến',
    ],

    datasets: [
      {
        data: [
          dataStatistical.statistical_product?.seedling_count,
          dataStatistical.statistical_product?.farmer_count,
          dataStatistical.statistical_product?.manufacturer_count,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const listStatistical = currentUser.is_superuser
    ? [
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faUsers}
              style={{ color: '#3e74d0' }}
            />
          ),
          img: staticVariables.user_anonymous.src,
          label: 'Tổng số User',
          value: dataStatistical.statistical_user?.total_user || 0,
        },
        {
          icon: <FontAwesomeIcon size={'4x'} icon={faUser} />,
          img: staticVariables.user_anonymous.src,
          label: 'Tổng tài khoản chưa kích hoạt',
          value: dataStatistical.statistical_user?.member_count || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faUser}
              style={{ color: '#1aa231' }}
            />
          ),
          img: staticVariables.user_seed.src,
          label: 'Tổng công ty hạt giống',
          value: dataStatistical.statistical_user?.seedling_count || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faUser}
              style={{ color: '#a4ac2a' }}
            />
          ),
          img: staticVariables.user_farmer.src,
          label: 'Tổng người trồng trọt',
          value: dataStatistical.statistical_user?.farmer_count || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faIndustry}
              style={{ color: '#443d57' }}
            />
          ),
          img: staticVariables.user_factory.src,
          label: 'Tổng nhà máy chế biến',
          value: dataStatistical.statistical_user?.manufacturer_count || 0,
        },
        //Product
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faLeaf}
              style={{ color: '#b8d818' }}
            />
          ),
          img: staticVariables.product.src,
          label: 'Tổng số loại sản phẩm trên hệ thống',
          value: dataStatistical.statistical_product?.total_product || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faSeedling}
              style={{ color: '#1aa231' }}
            />
          ),
          img: staticVariables.product_seed.src,
          label: 'Tổng loại cây giống đang mở bán',
          value: dataStatistical.statistical_product?.seedling_count || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faCloudSun}
              style={{ color: '#afca2b' }}
            />
          ),
          img: staticVariables.product_farmer.src,
          label: 'Tổng sản phẩm của nông dân đang mở bán trên hệ thống',
          value: dataStatistical.statistical_product?.farmer_count || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faArrowUpFromWaterPump}
              style={{ color: '#515358' }}
            />
          ),
          img: staticVariables.product_factory.src,
          label: 'Tổng loại sản phẩm từ nhà máy chế biến',
          value: dataStatistical.statistical_product?.manufacturer_count || 0,
        },
      ]
    : [
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faCloudSun}
              style={{ color: '#afca2b' }}
            />
          ),
          img: staticVariables.product_farmer.src,
          label: 'Tổng sản phẩm của bạn',
          value: dataStatistical.statistical_product?.total_product || 0,
        },
        {
          icon: (
            <FontAwesomeIcon
              size={'4x'}
              icon={faArrowUpFromWaterPump}
              style={{ color: '#515358' }}
            />
          ),
          img: staticVariables.product_factory.src,
          label: 'Tổng lượt bán',
          value: dataStatistical.statistical_product?.total_sales || 0,
        },
      ];
  // const fethStatisticalSystems = async () => {
  //   await instanceAxios
  //     .get(
  //       `${
  //         currentUser.is_superuser ? 'user/statistical' : 'user/statistical/me'
  //       }`
  //     )
  //     .then((res) => {
  //       setDataStatistical(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log('user/statistical', err);
  //     });
  // };
  const fethStatisticalUser = async () => {
    await instanceAxios
      .get(`user/statistical`)
      .then((res) => {
        setDataStatisticalUser(res.data.detail);
      })
      .catch((err) => {
        console.log('user/statistical', err);
      });
  };
  useEffectOnce(() => {
    fethStatisticalUser();
    // fethStatisticalSystems();
  });
  return (
    <div className="w-full pb-[50px]">
      <p className="text-[#0b0c50] text-[30px] font-semibold">Tổng quan</p>
      {currentUser.is_staff ? (
        <AdminStatistical />
      ) : (
        <div className="w-full flex p-[30px]  gap-x-10">
          <div className="w-1/2 flex flex-col gap-5">
            <div className="p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
              <p className="text-[#0b0c50] text-[20px] font-semibold">
                Thống kê sản phẩm của bạn
              </p>
              <div>
                <Chart
                  label="Bảng thống kê sản phẩm của bạn trong 12 tháng"
                  type={'product'}
                  data={dataStatisticalUser}
                />
              </div>
            </div>
            <div className="p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
              <p className="text-[#0b0c50] text-[20px] font-semibold">
                Thống kê giao dịch của bạn của bạn
              </p>
              <div>
                <Chart
                  label="Bảng thống kê giao dịch của bạn trong 12 tháng"
                  type={'transaction'}
                  data={dataStatisticalUser}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex gap-5">
            <div className="w-1/2 flex flex-col gap-y-5">
              <div className="w-full p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
                <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
                  <FontAwesomeIcon
                    size={'2x'}
                    icon={faDatabase}
                    style={{ color: '#3d6ab8' }}
                  />
                </div>
                <p className="text-[#0b0c50] my-[10px] text-[16px] font-semibold">
                  Sản phẩm
                </p>
                <div className="flex items-baseline space-x-3">
                  <p className="text-[#0b0c50] text-[50px] font-semibold">
                    {dataStatisticalUser.product?.product_count}
                  </p>
                  <p className="text-gray-500 font-semibold">Sản phẩm</p>
                </div>
                <div className="w-full">
                  <Percent
                    label="Đang mở bán"
                    total={dataStatisticalUser.product?.product_count || 0}
                    value={
                      dataStatisticalUser.product?.public_product_count || 0
                    }
                  />
                  <Percent
                    label="Không mở bán"
                    total={dataStatisticalUser.product?.product_count || 0}
                    value={
                      dataStatisticalUser.product?.private_product_count || 0
                    }
                  />
                </div>
              </div>
              <div className="w-full p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
                <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
                  <FontAwesomeIcon
                    size={'2x'}
                    icon={faDatabase}
                    style={{ color: '#3d6ab8' }}
                  />
                </div>
                <p className="text-[#0b0c50] my-[10px] text-[16px] font-semibold">
                  Sản phẩm
                </p>
                <div className="flex items-baseline space-x-3">
                  <p className="text-[#0b0c50] text-[50px] font-semibold">
                    200
                  </p>
                  <p className="text-gray-500 font-semibold">Sản phẩm</p>
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-between">
                    <p className="font-normal">Đang mở bán</p>
                    <p className="font-semibold text-[16px]">25 %</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-normal">Đang đóng</p>
                    <p className="font-semibold text-[16px]">25 %</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-y-5">
              <div className="w-full p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
                <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
                  <FontAwesomeIcon
                    size={'2x'}
                    icon={faDatabase}
                    style={{ color: '#3d6ab8' }}
                  />
                </div>
                <p className="text-[#0b0c50] my-[10px] text-[16px] font-semibold">
                  Giao dịch mua sản phẩm của bạn
                </p>
                <div className="flex items-baseline space-x-3">
                  <p className="text-[#0b0c50] text-[50px] font-semibold">
                    {dataStatisticalUser.transaction?.transaction_count || 0}
                  </p>
                  <p className="text-gray-500 font-semibold">Giao dịch mua</p>
                </div>
                <div className="w-full">
                  <Percent
                    label="Đang chờ"
                    total={
                      dataStatisticalUser.transaction?.transaction_count || 0
                    }
                    value={
                      dataStatisticalUser.transaction
                        ?.pendding_transaction_count || 0
                    }
                  />
                  <Percent
                    label="Bị từ chối"
                    total={
                      dataStatisticalUser.transaction?.transaction_count || 0
                    }
                    value={
                      dataStatisticalUser.transaction
                        ?.reject_transaction_count || 0
                    }
                  />
                  <Percent
                    label="Đã xác nhận"
                    total={
                      dataStatisticalUser.transaction?.transaction_count || 0
                    }
                    value={
                      dataStatisticalUser.transaction
                        ?.accept_transaction_count || 0
                    }
                  />
                  <Percent
                    label="Đã hoàn thành"
                    total={
                      dataStatisticalUser.transaction?.transaction_count || 0
                    }
                    value={
                      dataStatisticalUser.transaction?.done_transaction_count ||
                      0
                    }
                  />
                </div>
              </div>
              <div className="w-full p-[20px] flex flex-col border-2 bg-[#fbfbfb] rounded-xl">
                <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
                  <FontAwesomeIcon
                    size={'2x'}
                    icon={faDatabase}
                    style={{ color: '#3d6ab8' }}
                  />
                </div>
                <p className="text-[#0b0c50] my-[10px] text-[16px] font-semibold">
                  Giao dịch về sản phẩm của bạn
                </p>
                <div className="flex items-baseline space-x-3">
                  <p className="text-[#0b0c50] text-[50px] font-semibold">
                    {dataStatisticalUser.sales?.transaction_sales_count || 0}
                  </p>
                  <p className="text-gray-500 font-semibold">
                    GD / {dataStatisticalUser.product?.product_count || 0} Sản
                    phẩm
                  </p>
                </div>
                <div className="w-full">
                  <Percent
                    label="GD đang chờ"
                    total={
                      dataStatisticalUser.sales?.transaction_sales_count || 0
                    }
                    value={
                      dataStatisticalUser.sales
                        ?.pendding_transaction_sales_count || 0
                    }
                  />
                  <Percent
                    label="GD đã bị bạn từ chối"
                    total={
                      dataStatisticalUser.sales?.transaction_sales_count || 0
                    }
                    value={
                      dataStatisticalUser.sales
                        ?.reject_transaction_sales_count || 0
                    }
                  />
                  <Percent
                    label="GD bạn đã xác nhận"
                    total={
                      dataStatisticalUser.sales?.transaction_sales_count || 0
                    }
                    value={
                      dataStatisticalUser.sales
                        ?.accept_transaction_sales_count || 0
                    }
                  />
                  <Percent
                    label="GD đã hoàn thành"
                    total={
                      dataStatisticalUser.sales?.transaction_sales_count || 0
                    }
                    value={
                      dataStatisticalUser.sales?.done_transaction_sales_count ||
                      0
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
