import { EditTwoTone } from '@ant-design/icons';
import { Input, InputProps, InputRef } from 'antd';
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
export default function InputCustom({
  name,
  initialValue,
  className,
  input,
  onBlur,
  classNameLabel,
  onKeyDown,
  onEnter,
  onChange = () => {},
}: {
  name: string;
  initialValue: string;
  className?: string;
  classNameLabel?: string;
  input?: InputProps;
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
    <div className={`flex w-fit h-fit item-center ${className}`}>
      {editAble ? (
        <Input
          {...input}
          ref={ref}
          autoFocus
          onBlur={onBlur}
          onChange={handleChange}
          value={value}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      ) : (
        <p className={classNameLabel}>{value}</p>
      )}
      <EditTwoTone
        className="px-[10px]"
        onClick={() => setEditAble(!editAble)}
      />
    </div>
  );
}
