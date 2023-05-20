import { Calendar as CalendarPicker } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import br from 'date-fns/locale/pt-BR'

interface CalendarProps {
  value: Date
  onChange: (value: Date) => void
}

export function Calendar({ value, onChange }: CalendarProps) {
  return (
    <CalendarPicker
      date={value}
      onChange={onChange}
      locale={br}
      className="w-full capitalize tracking-tighter"
    />
  )
}
