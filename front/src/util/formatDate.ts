import {
  formatDistance,
  formatDistanceToNow,
  format,
  differenceInDays,
} from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatDate = (date: Date, formatStr?: string) =>
  format(date, formatStr ?? 'M月d日 (ccc)', { locale: ja })

export const formatDateDistance = (
  date: Date,
  { inverse = false, approximately = false } = {},
) => {
  if (!inverse) {
    if (approximately && differenceInDays(new Date(), date) < 1) {
      return '0日'
    }
    return formatDistanceToNow(date, { locale: ja })
  } else {
    if (approximately && differenceInDays(date, new Date()) < 1) {
      return '0日'
    }
    return formatDistance(date, new Date(), { locale: ja })
  }
}
