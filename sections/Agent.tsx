import Analysis from '@/components/Analysis'
import React from 'react'

function Agent() {
  return (
        <div className='container px-4 mb-4'>
          <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-3'>
              <Analysis
                title='Properties matched to Me'
                data={2}
                day='Since January'
                percentage={100}
                labels={[]}
              />
              <Analysis
                title='Total Property Cost'
                data={"₦5M"}
                day='Since January'
                percentage={100}
                labels={[]}
              />
              <Analysis
                title='Sold Properties'
                data={"₦2M"}
                day='Since January'
                percentage={100}
                labels={[]}
              />
          </div>
    </div>
  )
}

export default Agent