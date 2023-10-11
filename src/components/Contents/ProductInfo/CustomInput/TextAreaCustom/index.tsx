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

export default function TextAreaCustom({
  name,
  initialValue,
  className,
  onBlur,
  onKeyDown,
  onEnter,
  onChange,
}: {
  name: string;
  initialValue: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: () => void;
  onEnter?: () => void;
  onKeyDown?: KeyboardEventHandler;
}) {
  const [editAble, setEditAble] = useState(false);
  const [value, setValue] = useState(initialValue);

  const ref = useRef<TextAreaRef>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!ref.current?.resizableTextArea?.textArea?.contains?.(event.target)) {
        setEditAble(false);
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        <Input.TextArea
          ref={ref}
          autoFocus
          onBlur={onBlur}
          onChange={handleChange}
          value={value}
          autoSize
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
