import React from 'react';
import { Chart } from './Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Statistical() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap gap-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex w-1/4 gap-x-5 p-[20px] bg-green-100 rounded-xl"
          >
            <FontAwesomeIcon
              size={'4x'}
              icon={faUsers}
              style={{ color: '#3e74d0' }}
            />
            <div className="flex flex-col">
              <p className="text-[25px] font-bold">234</p>
              <p>Tất cả user trên hệ thống</p>
            </div>
          </div>
        ))}
      </div>
      <Chart />
    </div>
  );
}
