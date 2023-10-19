import { useAppDispatch } from '@/hooks';
import { User, setUser } from '@/reducers/userSlice';
import fetchUpdateUser from '@/services/fetchUpdateUser';
import { EditTwoTone, WarningTwoTone } from '@ant-design/icons';
import { Button, Input, InputProps, InputRef, Modal, notification } from 'antd';
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
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
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
  const fetchUpdate = async () => {
    await fetchUpdateUser(
      'user/update_me',
      { [name]: value },
      (res) => {
        console.log(res);
        setEditAble(false);
        setOpenModalConfirm(false);
        dispatch(setUser(res.data.data as User));
        notification.success({
          message: 'Success',
          description: 'Cập nhật dữ liệu thành công',
        });
      },
      (err) => {
        console.log(err);
        // notification.error({
        //   message: 'Error',
        //   description: 'Cập nhật dữ liệu thất bại',
        // });
      }
    );
  };

  const handleBlur = async () => {
    if (value === initialValue) {
      setEditAble(false);
    } else {
      setOpenModalConfirm(true);
    }

    // if (value === initialValue) {
    //   setEditAble(false);
    // } else {
    //   await fetchUpdateUser(
    //     { full_name: value },
    //     (res) => {
    //       console.log(res);
    //       setEditAble(false);
    //       // setValue(e.target.value);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className={`flex w-fit h-fit item-center ${className}`}>
      {editAble ? (
        <Input
          {...input}
          ref={ref}
          autoFocus
          onChange={handleChange}
          value={value}
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
          <Button onClick={fetchUpdate} key={0}>
            Xác nhận
          </Button>,
          <Button
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
      <EditTwoTone
        className="px-[10px]"
        onClick={() => setEditAble(!editAble)}
      />
    </div>
  );
});
