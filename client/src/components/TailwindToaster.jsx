import { Transition } from "@headlessui/react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";

export default function TailwindToaster() {
  return (
    <Toaster>
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className='relative top-12 transform p-4 flex bg-custom-notification-blue rounded shadow-lg'
          enter='transition-all duration-150'
          enterFrom='opacity-0 scale-50'
          enterTo='opacity-100 scale-100'
          leave='transition-all duration-150'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-75'>
          <ToastIcon toast={t} />
          <p className='px-2 text-bold text-white'>{resolveValue(t.message)}</p>
        </Transition>
      )}
    </Toaster>
  );
}
