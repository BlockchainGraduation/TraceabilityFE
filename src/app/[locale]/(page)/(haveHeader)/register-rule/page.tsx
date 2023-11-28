'use client';
import instanceAxios from '@/api/instanceAxios';
import RoleSelect from '@/components/RoleSelect';
import { useAppSelector } from '@/hooks';
import staticVariables from '@/static';
import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Radio,
  Space,
  Typography,
  notification,
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import Questions from './components/Questions';
import RadioCustom from './components/RadioCustom';
import TextArea from 'antd/es/input/TextArea';

export default function RegisterRulePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [rule, setRule] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [yearOld, setYearOld] = useState('');
  const [education, setEducation] = useState('');
  const [device, setDevice] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [numericKeypad, setNumericKeypad] = useState('');
  const [experience, setExperience] = useState('');
  const [digitsExperience, setDigitsExperience] = useState('');
  const [aphabetExperience, setAphabetExperience] = useState('');
  const [japaneseAbility, setJapaneseAbility] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { mutate } = useSWRConfig();
  const currentUser = useAppSelector((state) => state.user.user);
  const onFinishSelectRule = (e: string) => {
    console.log(e);
    setRule(e);
  };
  const handlePrev = () => {
    if (currentTab == 0) {
      return;
    } else {
      setCurrentTab(currentTab - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (currentTab >= listTab.length - 1) {
      await fetchChangeRule();
    } else {
      setCurrentTab(currentTab + 1);
    }
    setLoading(false);
  };
  const listTab = [
    // Get start
    <div key={0}>
      <div>
        <p className="text-[25px] font-medium">
          Chào mừng bạn tham gia hệ thống của chúng tôi
        </p>
        <p className="pt-[12px] pb-[20px] text-[14px]">
          Hãy bắt đầu thiết lập tài khoản của bạn!
        </p>
        <button
          onClick={handleSubmit}
          className="cursor-pointer rounded-xl  bg-green-100 font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2"
        >
          <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
            Bắt đầu !
          </span>
          <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </button>
        {/* <Button onClick={handleSubmit}>Bắt đầu</Button> */}
      </div>
    </div>,
    // Select Roles
    <div key={1}>
      <RadioCustom
        defaulValue={phone}
        spaceProps={{ direction: 'vertical' }}
        titleClassName="text-[20px]"
        onChange={onFinishSelectRule}
        title="Bạn muốn làm vai trò gì trong hệ thống?"
        itemList={[
          { label: 'Factory ( Nhà máy chế biến )', value: 'FACTORY' },
          { label: 'Distributer ( Nhà phân phối )', value: 'DISTRIBUTER' },
          { label: 'Retailer ( Nhà bán lẻ )', value: 'RETAILER' },
        ]}
      />
      {/* <RoleSelect onFinishSelectRule={onFinishSelectRule} /> */}
      <Button
        disabled={!!!rule}
        className="w-fit block m-auto mt-[100px]"
        onClick={handleSubmit}
      >
        Tiếp
      </Button>
    </div>,
    // Question0
    <div key={1.1}>
      <div>
        <p className="text-[20px] py-[20px]">
          Tên của bạn hoặc công ty là gì ???
        </p>
        <Input
          onChange={(e) => setName(e.target.value)}
          max={50}
          placeholder="Nhập tên của bạn hoặc công ty...(tối thiểu 8 kí tự)"
        />
      </div>
      {/* <RoleSelect onFinishSelectRule={onFinishSelectRule} /> */}
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!(name.length > 8)} onClick={handleSubmit}>
          Tiếp
        </Button>
      </div>
    </div>,
    // Question1
    <div key={2}>
      <p className="text-2xl py-2 font-medium">Hi {currentUser.fullname}</p>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={yearOld}
          onChange={(e) => setYearOld(e)}
          title="Bạn hoặc công ty của bạn kinh doanh đã được bao nhiêu năm ? "
          itemList={[
            { label: 'Mới kinh doanh', value: 'Mới kinh doanh' },
            { label: '1-5 năm', value: 'Kinh doanh 1-5 năm' },
            { label: '5-10 năm', value: 'Kinh doanh 5-10 năm' },
            { label: 'Trên 10 năm', value: 'Trên 10 năm' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!yearOld} onClick={handleSubmit}>
          Tiếp
        </Button>
      </div>
    </div>,
    // Question 2
    <div key={3}>
      <div className="flex flex-col gap-y-5">
        <p className="text-[20px] py-[20px]">Số điện thoại của bạn là gì ???</p>
        <Input
          type={'tel'}
          max={15}
          onChange={(e) => setPhone(e.target.value)}
          title="Số điện thoại của bạn ?"
          placeholder="Nhập tên SDT của b..."
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!phone} onClick={handleSubmit}>
          Tiếp
        </Button>
      </div>
    </div>,
    // Question 3
    <div key={4}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={device}
          onChange={(e) => setDevice(e)}
          title="Anh/chị sử dụng loại máy tính gì để thực hiện công việc?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Máy bàn ( PC)', value: 'Máy bàn ( PC)' },
            { label: 'Laptop', value: 'Laptop' },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!device} onClick={handleSubmit}>
          Tiếp
        </Button>
      </div>
    </div>,
    // Question 4
    <div key={5} className="w-full">
      <div className="flex flex-col gap-y-5">
        <p className="text-[20px] py-[20px]">
          Hãy giới thiệu ngắn về cửa hàng hoặc công ty của bạn ???
        </p>

        <TextArea
          maxLength={100}
          onChange={(e) => setIntroduce(e.target.value)}
          autoSize
          title="Số điện thoại của bạn ?"
          placeholder="Giới thiệu ngắn về cửa hàng hoặc công ty của bạn..."
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!(introduce.length > 20)} onClick={handleSubmit}>
          Tiếp
        </Button>
      </div>
    </div>,
    // Question 5
    <div key={5}>
      <div className="flex flex-col gap-y-5">
        <RadioCustom
          defaulValue={japaneseAbility}
          onChange={(e) => setJapaneseAbility(e)}
          title="Bạn có năng lực tiếng Anh không ?"
          spaceProps={{ direction: 'vertical' }}
          itemList={[
            { label: 'Có', value: 'Có năng lực tiếng Anh' },
            {
              label: 'Không',
              value: 'Không năng lực tiếng Anh',
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center gap-x-10 mt-[100px]">
        <Button className="" onClick={handlePrev}>
          Trước
        </Button>
        <Button disabled={!!!japaneseAbility} onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </div>
    </div>,
    // <RoleSelect onFinishSelectRule={onFinishSelectRule} key={0} />,
    // <Questions key={1} />,
  ];
  const fetchChangeRule = async () => {
    console.log(rule);
    await instanceAxios
      .post(`survey`, {
        survey: {
          user_role: rule,
          phone,
          yearOld,
          education,
          device,
          introduce,
          name,
          numericKeypad,
          digitsExperience,
          aphabetExperience,
          japaneseAbility,
        },
      })
      .then((res) => {
        notification.success({
          message: 'Thành công',
          description: (
            <p>
              Đã yêu cầu xác thực tài khoản!!! <br />
              Vui lòng chờ 1 khoảng thời gian để hệ thống xác thực!!!
            </p>
          ),
        });
        route.replace('/home');
        // mutate(mutateAPI);
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi',
          description: 'Yêu cầu xác thựcthật bại',
        });
      });
  };
  return (
    <div className="flex min-h-[750px] relative before:content-[''] before:w-full before:h-full before:absolute before:z-0 before:bg-[#00000084]  bg-[url('/shrimpBg.jpg')] bg-cover	bg-no-repeat	">
      <div className="absolute w-full h-full flex z-2">
        <div className="w-1/2 flex flex-col px-[30px] items-center justify-center text-white min-h-[750px]">
          <Image
            // width={'100%'}
            // height={'50%'}
            preview={false}
            className="object-cover m-auto p-[50px]"
            alt=""
            src={staticVariables.register_rule.src}
          />
          <p className="flex items-center gap-1 text-txt-secondary font-bold text-[50px] py-[20px] leading-[44px] mt-[13px] relative text-center ">
            Xin chào bạn
          </p>
          <p className="font-normal text-[18px] leading-7 mt-3">
            Vui lòng cho chúng tôi biết thêm về bạn...
          </p>
        </div>
        <div className="w-2/5 h-[500px] rounded-xl m-auto px-[100px] flex items-center justify-center bg-[#F7FAFFEA]">
          {listTab[currentTab]}
        </div>
      </div>
      {/* <div className="flex h-full w-full">{listTab[currentTab]}</div>
      <div className="flex items-center gap-x-10 mt-10">
        <Button
          loading={loading}
          disabled={currentTab <= listTab.length - 1}
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-1/3 backdrop-blur-sm"
          onClick={handlePrev}
        >
          Quay lại
        </Button>
        <Button
          loading={loading}
          // style={{ backgroundColor: '#FFFAFAB5' }}
          type={'default'}
          className="w-2/3 backdrop-blur-sm"
          onClick={handleSubmit}
        >
          Tiếp theo
        </Button>
      </div> */}
    </div>
  );
}
