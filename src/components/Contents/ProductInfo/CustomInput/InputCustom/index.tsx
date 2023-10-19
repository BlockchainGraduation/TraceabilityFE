import fetchUpdateUser from '@/services/fetchUpdateUser';
import { EditTwoTone } from '@ant-design/icons';
import { Input, InputProps, InputRef } from 'antd';
import { FocusEvent, memo } from 'react';
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
  FocusEventHandler,
} from 'react';
export default memo(function InputCustom({
  name,
  initialValue,
  className,
  input,
  classNameLabel,
  onKeyDown,
}: // onChange = () => {},
{
  name: string;
  initialValue: string;
  className?: string;
  classNameLabel?: string;
  input?: InputProps;
  onKeyDown?: KeyboardEventHandler;
  // onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const [editAble, setEditAble] = useState(false);
  const [value, setValue] = useState(initialValue);

  const ref = useRef<InputRef>(null);

  // useEffect(() => {
  //   const handleOutSideClick = async (event: any) => {
  //     if (!ref.current?.input?.contains?.(event.target)) {
  //       setEditAble(false);
  //     }
  //   };

  //   window.addEventListener('mousedown', handleOutSideClick);

  //   return () => {
  //     window.removeEventListener('mousedown', handleOutSideClick);
  //   };
  // }, [editAble]);
  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    if (value === initialValue) {
      setEditAble(false);
    } else {
      await fetchUpdateUser(
        { full_name: e.target.value },
        (res) => {
          console.log(res);
          setEditAble(false);
          setValue(e.target.value);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // onChange?.(e);
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') {
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
          onChange={handleChange}
          // value={initialValue}
          defaultValue={value}
          onKeyDown={(e) => handleKeyDown(e)}
          onBlur={handleBlur}
          onEnded={() => alert('OK')}
        />
      ) : (
        <p defaultValue={initialValue} className={classNameLabel}>
          {value}
        </p>
      )}

      <EditTwoTone
        className="px-[10px]"
        onClick={() => setEditAble(!editAble)}
      />
    </div>
  );
});
