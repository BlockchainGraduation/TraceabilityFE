import getPercent from '@/services/getPercent';
import { Tooltip } from 'antd';
import React from 'react';

interface Props {
  label?: string;
  total: number;
  value: number;
}

export default function Percent(props: Props) {
  return (
    <div className="w-full flex justify-between">
      <p className="font-normal">{props.label}</p>
      <Tooltip
        title={`${props.label} ${props.value} chiếm ${getPercent(
          props.total,
          props.value
        )} %`}
      >
        <p className="font-semibold text-[16px]">
          {getPercent(props.total, props.value)} %
        </p>
      </Tooltip>
    </div>
  );
}
