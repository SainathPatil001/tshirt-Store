import React from 'react'
import {API }from '../../backend'
const ImageHelper= ({product}) =>{
    const imageUrl=product ?` ${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/2756845/pexels-photo-2756845.jpeg?cs=srgb&dl=pexels-hitesh-choudhary-2756845.jpg&fm=jpg`
    return (
        <div className="rounded border border-success p-2">
        <img
          src={imageUrl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default ImageHelper;