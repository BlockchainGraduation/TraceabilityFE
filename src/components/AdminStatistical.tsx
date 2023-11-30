import React from 'react';

export default function AdminStatistical() {
  return (
    <div className="w-full flex">
      <div className="w-2/3">
        <div className="w-full flex flex-wrap gap-5">
          {[...Array(5)].map((item, index) => (
            <div
              key={index}
              className="w-1/4 border-[1px] rounded-2xl overflow-hidden shadow-xl flex flex-col"
            >
              <div className="p-[20px] pb-[5px]">
                <p>Total</p>
                <div className="flex items-baseline pt-[10px]">
                  <p className="text-[25px] font-bold text-black">2123</p>
                  <p>6%</p>
                </div>
              </div>
              <div className="p-[20px] text-white bg-[#2c2c2c]">
                29 applications need review
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
}
