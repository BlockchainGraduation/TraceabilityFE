import { useAppDispatch } from '@/hooks';
import { User, setUser } from '@/reducers/userSlice';
import fetchUpdate from '@/services/fetchUpdate';
import { EditTwoTone, WarningTwoTone } from '@ant-design/icons';
import {
  Button,
  Input,
  InputProps,
  InputRef,
  Modal,
  Spin,
  notification,
} from 'antd';
import { TextAreaProps } from 'antd/es/input';
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
import { useEffectOnce } from 'usehooks-ts';
export default memo(function TextAreaCustom({
  name,
  initialValue,
  className,
  input,
  classNameLabel,
  APIurl,
  queryType,
  onKeyDown,
  showEdit = true,
}: // onChange = () => {},
{
  name: string;
  initialValue: string;
  className?: string;
  classNameLabel?: string;
  APIurl: string;
  queryType: 'user' | 'product';
  showEdit?: boolean;
  input?: TextAreaProps;
  onKeyDown?: KeyboardEventHandler;
  // onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const [editAble, setEditAble] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
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
  const handleOk = async () => {
    setLoading(true);
    await fetchUpdate(
      APIurl,
      { [name]: value },
      (res) => {
        setEditAble(false);
        setOpenModalConfirm(false);
        if (queryType == 'user') {
          dispatch(setUser(res.data.data as User));
        }
        notification.success({
          message: 'Success',
          description: 'Cập nhật dữ liệu thành công',
        });
      },
      (err) => {
        console.log(err);
        notification.error({
          message: 'Error',
          description: 'Cập nhật dữ liệu thất bại',
        });
      },
      () => setLoading(false)
    );
  };

  const handleBlur = async () => {
    if (value === initialValue) {
      setTimeout(() => setEditAble(false), 300);
    } else {
      setOpenModalConfirm(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // onChange?.(e);
    setValue(e.target.value);
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') {
      if (value === initialValue) {
        setEditAble(false);
      } else {
        setOpenModalConfirm(true);
      }
    }
  };
  return (
    <div className={`flex h-fit item-center ${className}`}>
      {editAble ? (
        <Input.TextArea
          className="w-full"
          autoSize
          {...input}
          // ref={ref}
          autoFocus
          onChange={handleChange}
          value={value}
          defaultValue={value}
          onKeyDown={(e) => handleKeyDown(e)}
          onBlur={handleBlur}
          onEnded={() => alert('OK')}
        />
      ) : (
        <p
          defaultValue={initialValue}
          className={`max-w-[100%] text-ellipsis overflow-hidden ${classNameLabel}`}
        >
          {value}
        </p>
      )}
      <Modal
        title={
          <div>
            <WarningTwoTone className="mr-[10px]" />
            Xác nhận thay đổi dữ liệu
          </div>
        }
        centered
        open={openModalConfirm}
        // onOk={fetchUpdate}
        onCancel={() => {
          setOpenModalConfirm(false), setValue(initialValue);
        }}
        // cancelText="Huỷ"
        // okText="OK"
        footer={[
          <Button loading={loading} onClick={handleOk} key={0}>
            Xác nhận
          </Button>,
          <Button
            disabled={loading}
            onClick={() => {
              setOpenModalConfirm(false), setValue(initialValue);
            }}
            key={1}
          >
            Hủy
          </Button>,
        ]}
      >
        Dữ liệu của bạn vừa nhập có sự thay đổi đối với dữ liệu gốc. Xác nhận
        thay đổi!!!!
      </Modal>
      {showEdit && (
        <EditTwoTone
          className="px-[10px]"
          onClick={() => setEditAble(!editAble)}
        />
      )}
    </div>
  );
});
