import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

const formatDateDistance = (date: Date) => {
  return formatDistanceToNow(date, { locale: ja, addSuffix: false })
}

export default formatDateDistance
