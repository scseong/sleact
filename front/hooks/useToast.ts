import { toast, ToastOptions, ToastPosition } from "react-toastify";

type CustomToastIcon = ToastOptions["icon"];

class ToastOption {
  position: ToastPosition;
  hideProgressBar = true;
  autoClose = 1000;
  closeOnClick = true;
  pauseOnHover = false;
  draggable = false;
  icon: CustomToastIcon;

  constructor({ position, timeout, icon }: Option) {
    this.autoClose = timeout;
    this.position = position;
    this.icon = icon;
  }
}

type Option = {
  position: ToastPosition;
  timeout: number;
  icon?: CustomToastIcon;
};

type ToastArgs = {
  message: string;
  timeout?: number;
};

const useToast = () => {
  const successTopRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions<unknown> = new ToastOption({
      position: "top-right",
      timeout: timeout ?? 1000,
    });
    toast.success(message, topCenter);
  };

  const errorTopRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: "top-right",
      timeout: timeout ?? 1000,
    });
    toast.error(message, topCenter);
  };

  const warnTopRight = ({ message, timeout }: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption({
      position: "top-right",
      timeout: timeout ?? 1000,
    });
    toast.warn(message, topCenter);
  };

  return {
    successTopRight,
    errorTopRight,
    warnTopRight,
  };
};

export default useToast;
