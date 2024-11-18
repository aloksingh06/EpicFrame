import React from 'react'

function Drop({title, option, func}) {
  return (
    <div>
         <div className="select">
           <select onChange={func} defaultValue="0" name="format" id="format">
             <option value="0" disabled >
              {title}
             </option>
             {option.map((o,i)=>(
              <option key={i} value={o} >
              {o}
             </option>
             ))}
           </select>
        </div>
    </div>
  )
}

export default Drop