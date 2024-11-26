import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export default function MyModal({ add , title, children,isOpen,toggleModal }) {

  

  return (
    <>
      <button
        onClick={toggleModal}
        className="rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white focus:outline-none hover:bg-blue-700"
      >
        {add}
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6">
           <div className='flex justify-between items-center'>
              <DialogTitle as="h3" className="text-lg font-medium text-black">
                {title}
              </DialogTitle>
        
                  <svg       onClick={toggleModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className=" hover:text-red-600 size-5 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                
           </div>
              <div className="mt-4">{children}</div>
              <div className="mt-4 flex justify-end">
              
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
