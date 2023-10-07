import { EditTwoTone } from '@ant-design/icons';
import { Input, InputRef } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import React, {
  ReactNode,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
  RefAttributes,
} from 'react';
import { ClassElement } from 'typescript';

const { TextArea } = Input;

export default function CustomInput({
  name,
  initialValue,
  className,
  onBlur,
  onKeyDown,
  type = 'input',
  onEnter,
}: {
  name: string;
  type?: 'input' | 'textarea';
  initialValue: string;
  className?: string;
  onBlur?: () => void;
  onEnter?: () => void;
  onKeyDown?: (e?: KeyboardEvent) => void;
}) {
  const [editAble, setEditAble] = useState(false);
  const [value, setValue] = useState(initialValue);

  const ref = useRef<InputRef>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.input?.contains?.(event.target)) {
        setEditAble(false);
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, []);

  // useEffect(() => {
  //   const handleOutSideClick = (event: MouseEvent) => {
  //     if (!areaRef.current?.contains?.(event.target as Node)) {
  //       setEditAble(false);
  //     }
  //   };

  //   window.addEventListener('mousedown', handleOutSideClick);

  //   return () => {
  //     window.removeEventListener('mousedown', handleOutSideClick);
  //   };
  // }, [areaRef]);

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') {
      onEnter?.();
      setEditAble(false);
    }
  };
  return (
    <div className={`flex item-center ${className}`}>
      {editAble ? (
        <Input
          ref={ref}
          autoFocus
          onBlur={onBlur}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      ) : (
        <p>{value}</p>
      )}
      <EditTwoTone
        className="px-[10px]"
        onClick={() => setEditAble(!editAble)}
      />
    </div>
  );
}
