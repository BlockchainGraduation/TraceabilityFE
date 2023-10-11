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
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import { ClassElement } from 'typescript';

const { TextArea } = Input;

export default function InputCustom({
  name,
  initialValue,
  className,
  onBlur,
  onKeyDown,
  type = 'input',
  onEnter,
  onChange = () => {},
}: {
  name: string;
  type?: 'input' | 'textarea';
  initialValue: string;
  className?: string;
  onBlur?: () => void;
  onEnter?: () => void;
  onKeyDown?: KeyboardEventHandler;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setValue(e.target.value);
  };

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
          onChange={handleChange}
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
