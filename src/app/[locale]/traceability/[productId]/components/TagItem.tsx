import { Tooltip } from 'antd';
import React, { ReactNode } from 'react';

export default function TagItem({
  icon,
  label,
  value,
  className,
  iconClassName,
  labelClassName,
  valueClassName,
}: {
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
  label?: string;
  labelClassName?: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="w-full flex flex-col">
      {value && (
        <>
          <div className={`flex gap-x-1 ${iconClassName} `}>
            <div className={` ${iconClassName}`}>{icon}</div>
            <p
              className={`max-sm:text-[12px] text-[#434343] font-bold ${labelClassName}`}
            >
              {label}
            </p>
          </div>
          <Tooltip title={value}>
            <p
              className={` w-full py-[2px] px-[10px] font-medium rounded-lg max-sm:text-[10px] bg-gray-100 border border-gray-500 ${valueClassName}`}
            >
              {value}
            </p>
          </Tooltip>
        </>
      )}
    </div>
  );
}
