'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ShareProps {
  memoryId: string
}

export function Share({ memoryId }: ShareProps) {
  function copyToClipboard() {
    const url = `localhost:3000/memories/${memoryId}`

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Link copiado!', {
          position: 'bottom-center',
        })
      })
      .catch((error) => {
        console.error('Erro ao copiar o link:', error)
      })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600">
          Compartilhar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-slate-200/80 dark:bg-black/80" />
        <Dialog.Content className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 p-10 text-white">
          <Dialog.Title className="text-2xl font-extrabold leading-tight">
            Compartilhar
          </Dialog.Title>
          <Dialog.Description className="text-md mb-5 mt-[10px] text-[15px] leading-normal">
            Compartilhe o link com os seus amigos para que ele possa acompanhar
            a sua memória.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <input
              value={`localhost:3000/memories/${memoryId}`}
              readOnly
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] text-[15px] text-sm leading-none text-black shadow-[0_0_0_1px] shadow-black outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              id="link"
            />
          </fieldset>

          <div className="mt-[25px] flex justify-end">
            <div>
              <button
                onClick={copyToClipboard}
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-400 px-[15px] font-medium leading-none text-white hover:bg-green-500 focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Copiar
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X className="opacity-90 hover:opacity-100" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
