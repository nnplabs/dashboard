import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

export type ModalProps = {
  children: (toggle: () => void) => ReactNode;
  onClose?: () => void;
  closeOnClickBackdrop?: boolean;
  width?: number;
};

export function Modal({ children, onClose }: ModalProps) {
  const [hide, setHide] = useState<boolean>(true);

  useEffect(() => {
    setHide(false);
  }, []);

  const toggle = () => {
    setHide(true);
    onClose && onClose();
  };

  return (
    <div
      className={classNames(
        "flex absolute h-screen w-screen top-0 left-0 z-10 bg-black bg-opacity-40",
        {
          hidden: hide,
          block: !hide,
        }
      )}
    >
      <div className="flex m-auto bg-white rounded-lg border shadow-md">
        {children(toggle)}
      </div>
    </div>
  );
}
