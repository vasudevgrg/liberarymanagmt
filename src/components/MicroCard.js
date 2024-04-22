import React from 'react'

const MicroCard = ({title, author, cover_image}) => {
  return (
<>
<div style={{display:"flex", flexDirection:"row", alignItems:"start"}}>
<img src={cover_image}/>
<div>{title}</div>
<div>{author}</div>
    
</div>
</>
  )
}

export default MicroCard