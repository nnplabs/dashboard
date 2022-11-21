import classNames from "classnames";
import { useWalletSelector } from "../context/WalletSelectorContext";
import { Images } from "../images";

function Login() {
  const { modal } = useWalletSelector() ?? {};

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-[600px] h-[200px] bg-white rounded-lg p-7 flex flex-col">
        <div className="flex flex-row w-full">
          <img src={Images.Other.NearLogo} className="h-12 w-12 mr-3 mt-[5px]" />
          <div className="flex flex-col w-full justify-between">
            <div className="text-2xl font-normal">NEAR NOTIFY</div>
            <div className="text-md text-gray-500 font-medium">An end-to-end notification infrastructure for near.</div>
          </div>
        </div>
        <div className="flex flex-grow" />
        <button
          type="submit"
          onClick={() => modal?.show()}
          className={classNames(
            "font-medium rounded-lg w-full text-base px-5 py-2.5 mt-7 p-10 focus:outline-none bg-sky-50 text-blue-500"
          )}
        >
          LOGIN WITH NEAR
        </button>
      </div>
    </div>
  );
}

export default Login;
