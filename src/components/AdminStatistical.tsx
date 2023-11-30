import { faBox, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import instanceAxios from '@/api/instanceAxios';
import getPercent from '@/services/getPercent';
ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthDataType {
  '1'?: number;
  '2'?: number;
  '3'?: number;
  '4'?: number;
  '5'?: number;
  '6'?: number;
  '7'?: number;
  '8'?: number;
  '9'?: number;
  '10'?: number;
  '11'?: number;
  '12'?: number;
}

interface AdminStatisticalType {
  user?: {
    user_total?: number;
    anonymous_user_total?: number;
    factory_user_total?: number;
    distributer_user_total?: number;
    retailer_user_total?: number;
    month_user?: MonthDataType;
  };
  product?: {
    product_total?: number;
    factory_product_total?: number;
    distributer_product_total?: number;
    retailer_product_total?: number;
    month_product?: MonthDataType;
  };
}

export default function AdminStatistical() {
  const [dataAdminStatistical, setDataAdminStatistical] =
    useState<AdminStatisticalType>({});
  useEffect(() => {
    const fetchDataAdminStatistical = async () => {
      await instanceAxios
        .get(`user/admin-statistical`)
        .then((res) => setDataAdminStatistical(res.data.detail))
        .catch((err) => console.log(err));
    };
    fetchDataAdminStatistical();
  }, []);

  const dataPieChartUser = {
    labels: [
      'Nhà máy chế biến',
      'Nhà phân phối',
      'Nhà bán lẻ',
      'Người dùng chưa kích hoạt',
    ],
    datasets: [
      {
        label: '# of Votes',
        data: [
          dataAdminStatistical.user?.factory_user_total,
          dataAdminStatistical.user?.distributer_user_total,
          dataAdminStatistical.user?.retailer_user_total,
          dataAdminStatistical.user?.anonymous_user_total,
        ],
        backgroundColor: [
          'rgb(0, 63, 114)',
          'rgb(0, 185, 128)',
          'rgb(0, 146, 153)',
          'rgb(126, 217, 87)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };
  const dataPieChartProduct = {
    labels: [
      'Sản phẩm của nhà máy chế biến',
      'Sản phẩm của nhà phân phối',
      'Sản phẩm của nhà bán lẻ',
    ],
    datasets: [
      {
        label: 'Sản phẩm',
        data: [
          dataAdminStatistical.product?.factory_product_total,
          dataAdminStatistical.product?.distributer_product_total,
          dataAdminStatistical.product?.retailer_product_total,
        ],
        backgroundColor: [
          'rgb(0, 105, 149)',
          'rgb(22, 119, 255)',
          'rgb(255, 99, 132)',
        ],

        borderWidth: 1,
      },
    ],
  };

  const optionsPieChartUser = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê người dùng',
      },
    },
  };
  const optionsPieChartProduct = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê sản phẩm',
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kề sự tăng trưởng của người dùng và sản phẩm trong 12 tháng',
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const dataListCardUser = [
    {
      label: 'Người dùng chưa kích hoạt tài khoản',
      value: dataAdminStatistical.user?.anonymous_user_total,
      percentage: getPercent(
        dataAdminStatistical.user?.user_total || 0,
        dataAdminStatistical.user?.anonymous_user_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.user?.anonymous_user_total} người dùng chưa kích hoạt`,
    },
    {
      label: 'Người dùng với vai trò là nhà máy chế biến',
      value: dataAdminStatistical.user?.factory_user_total,
      percentage: getPercent(
        dataAdminStatistical.user?.user_total || 0,
        dataAdminStatistical.user?.factory_user_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.user?.factory_user_total} người dùng là nhà máy chế biến`,
    },
    {
      label: 'Người dùng với vai trò là nhà phân phối',
      value: dataAdminStatistical.user?.distributer_user_total,
      percentage: getPercent(
        dataAdminStatistical.user?.user_total || 0,
        dataAdminStatistical.user?.distributer_user_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.user?.distributer_user_total} người dùng là nhà phân phối`,
    },
    {
      label: 'Người dùng với vai trò là nhà bán lẻ',
      value: dataAdminStatistical.user?.retailer_user_total,
      percentage: getPercent(
        dataAdminStatistical.user?.user_total || 0,
        dataAdminStatistical.user?.retailer_user_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.user?.retailer_user_total} người dùng là nhà bán lẻ`,
    },
  ];

  const dataListCardProduct = [
    {
      label: 'Sản phẩm của nhà máy',
      value: dataAdminStatistical.product?.factory_product_total,
      percentage: getPercent(
        dataAdminStatistical.product?.product_total || 0,
        dataAdminStatistical.product?.factory_product_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.product?.factory_product_total} sản phẩm của nhà máy`,
    },
    {
      label: 'Sản phẩm của nhà phân phối',
      value: dataAdminStatistical.product?.distributer_product_total,
      percentage: getPercent(
        dataAdminStatistical.product?.product_total || 0,
        dataAdminStatistical.product?.distributer_product_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.product?.distributer_product_total} sản phẩm của nhà phân phối`,
    },
    {
      label: 'Sản phẩm của nhà bán lẻ',
      value: dataAdminStatistical.product?.retailer_product_total,
      percentage: getPercent(
        dataAdminStatistical.product?.product_total || 0,
        dataAdminStatistical.product?.retailer_product_total || 0
      ),
      description: `Trên hệ thống hiện có ${dataAdminStatistical.product?.retailer_product_total} sản phẩm của nhà bán lẻ`,
    },
  ];
  // const statistiacal =
  //   type === 'product'
  //     ? data?.month_product || {}
  //     : data?.month_transaction || {};
  // const labels = Object.keys(statistiacal as any).map((key) => key);

  const statisticalData = {
    labels: Object.keys(dataAdminStatistical.user?.month_user || {}).map(
      (key) => `Tháng ${key}`
    ),
    datasets: [
      {
        label: 'Người dùng',
        data: Object.values(dataAdminStatistical.user?.month_user || {}).map(
          (item) => item
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132)',
      },
      {
        label: 'Sản phẩm',
        data: Object.values(
          dataAdminStatistical.product?.month_product || {}
        ).map((item) => item),
        borderColor: 'rgb(0, 104, 249)',
        backgroundColor: 'rgb(0, 104, 249)',
      },
    ],
  };
  return (
    <div className="w-full flex">
      <div className="w-2/3 mt-[10px]">
        <div className="w-full  ">
          <p className="text-[20px] py-[30px] font-semibold">Người dùng</p>
          <div className="flex flex-wrap gap-5">
            {dataListCardUser.map((item, index) => (
              <div
                key={index}
                className="w-1/4 border-[1px] rounded-2xl overflow-hidden shadow-xl flex flex-col"
              >
                <div className="p-[20px] pb-[5px]">
                  <p>{item.label}</p>
                  <div className="flex items-baseline justify-between pr-[30px] pt-[10px]">
                    <p className="text-[30px] font-bold text-[#0b0c72]">
                      {item.value}
                    </p>
                    <p className="text-current-color">{item.percentage} %</p>
                  </div>
                </div>
                <div className="p-[20px]  text-white bg-[#2c2c2c]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-[50px] ">
          <p className="text-[20px] py-[30px] font-semibold">Sản phẩm</p>
          <div className="flex flex-wrap gap-5">
            {dataListCardProduct.map((item, index) => (
              <div
                key={index}
                className="w-1/4 border-[1px] rounded-2xl overflow-hidden shadow-xl flex flex-col"
              >
                <div className="p-[20px] pb-[5px]">
                  <p>{item.label}</p>
                  <div className="flex items-baseline justify-between pr-[30px] pt-[10px]">
                    <p className="text-[30px] font-bold text-[#0b0c72]">
                      {item.value}
                    </p>
                    <p className="text-current-color">{item.percentage} %</p>
                  </div>
                </div>
                <div className="p-[20px]  text-white bg-[#2c2c2c]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-[50px]">
          <p className="text-[20px] text-center py-[30px] font-semibold">
            Thống kê theo 12 tháng
          </p>
          <div className="w-4/5 m-auto  p-[30px] border-2 rounded-xl">
            <Line options={options} data={statisticalData} />
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col ">
        <p className="text-[30px] font-semibold">Tổng kết</p>
        <div className="flex flex-col gap-y-5 mt-[30px]">
          <div className="w-full flex items-center rounded-3xl justify-between border-2 p-[30px]">
            <div>
              <p className="text-green-600 text-[20px]">TỔNG NGƯỜI DÙNG</p>
              <p className="text-[30px] font-semibold">
                {dataAdminStatistical.user?.user_total}
              </p>
            </div>
            <FontAwesomeIcon
              className="p-[20px]  bg-[#bfe8de] rounded-full"
              icon={faUser}
              size={'2x'}
              style={{ color: '#00a47c' }}
            />
          </div>
          <div className="w-full flex items-center rounded-3xl justify-between border-2 p-[30px]">
            <div>
              <p className="text-green-600 text-[20px]">TỔNG SẢN PHẨM</p>
              <p className="text-[30px] font-semibold">
                {dataAdminStatistical.product?.product_total}
              </p>
            </div>
            <FontAwesomeIcon
              className="p-[20px] bg-[#f4c5c5] rounded-full"
              size={'2x'}
              style={{ color: '#d41616' }}
              icon={faBox}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-10 mt-[50px]">
          <div className="w-full">
            <Pie options={optionsPieChartUser} data={dataPieChartUser} />
          </div>
          <div className="w-full">
            <Pie options={optionsPieChartProduct} data={dataPieChartProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}
