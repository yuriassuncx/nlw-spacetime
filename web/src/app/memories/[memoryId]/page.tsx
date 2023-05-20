import { Image as ImageIcon, ChevronLeft } from 'lucide-react'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { Share } from '@/components/Share'
import { useCheckbox } from '@/hooks/useCheckbox'

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default async function SingleMemory({
  params: { memoryId },
}: {
  params: { memoryId: string }
}) {
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${memoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <ImageIcon className="h-4 w-4" />
            Adicionar foto ou vídeo de capa
          </label>

          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              readOnly
              value={useCheckbox(memory.isPublic)}
              checked={memory.isPublic}
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>

        <Image
          src={memory.coverUrl}
          width={592}
          height={280}
          alt=""
          className="aspect-video w-full rounded-lg object-cover pb-4 pt-4"
        />

        <textarea
          name="content"
          value={memory.content}
          readOnly
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <Share memoryId={memoryId} />
      </div>
    </div>
  )
}
