import React from 'react'
import Barchart from '../Components/charts/Barchart'
import Linechart from '../Components/charts/Linechart'
import Piechart from '../Components/charts/Piechart'

export default function CustomerAnalytics() {
  return (
    <div className='flex flex-row'>
      <div style={{width:600,height:400}}>
      <Barchart/>
      </div>
      <div style={{width:600,height:400}}>
        <Linechart/>
      </div>
      <div style={{width:600,height:400}}>
        <Piechart/>
      </div>
    </div> 
  )
}
