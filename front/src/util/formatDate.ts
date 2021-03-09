import { formatDistance, formatDistanceToNow, format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatDate = (date: Date, formatStr?: string) =>
  format(date, formatStr ?? 'M月d日 (ccc)', { locale: ja })

export const formatDateDistance = (
  date: Date,
  { addSuffix = false, inverse = false } = {},
) => {
  if (!inverse) {
    return formatDistanceToNow(date, { locale: ja, addSuffix })
  } else {
    return formatDistance(date, new Date(), { locale: ja, addSuffix })
  }
}
