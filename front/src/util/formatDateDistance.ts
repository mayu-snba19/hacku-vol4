import { formatDistance, formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

const formatDateDistance = (
  date: Date,
  { addSuffix = false, inverse = false } = {},
) => {
  if (!inverse) {
    return formatDistanceToNow(date, { locale: ja, addSuffix })
  } else {
    return formatDistance(date, new Date(), { locale: ja, addSuffix })
  }
}

export default formatDateDistance
