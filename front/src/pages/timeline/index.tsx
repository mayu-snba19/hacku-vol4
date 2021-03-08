import React from 'react'
import BottomBar from '~/components/BottomBar'
import Meta from '~/components/Meta'

const Timeline = () => {
  return (
    <div>
      <Meta title="タイムライン" />
      タイムライン
      <BottomBar type="timeline" />
    </div>
  )
}

export default Timeline
