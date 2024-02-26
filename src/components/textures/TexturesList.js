import React, { useEffect, useRef, useState } from 'react'

import { Button } from 'primereact/button';

import { useSelector, useDispatch } from 'react-redux'
import { setTextureSelected } from "../../redux/reducers/textures-reducer.js";
import { textureAction } from "../../redux/actions/texture-action.js"

import "./TexturesList.scss"

export let texturesArray = [
    { id: 1, name: 'дерево 1', url: `${process.env.PUBLIC_URL}/textures/wood-1.jpg` },
    { id: 2, name: 'дерево 2', url: `${process.env.PUBLIC_URL}/textures/wood-2.jpg` },
    { id: 3, name: 'дерево 3', url: `${process.env.PUBLIC_URL}/textures/wood-3.jpg` },
    { id: 4, name: 'Google', url: 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw' },
]

const TexturesList = () => {
    const textureSelected = useSelector((state) => state.textureSelected);
    const dispatch = useDispatch()

    return(
        <div className='textures-lists'>
            {texturesArray.map((texture)=>(
                <Button key={texture.id} 
                    className={`texture-item ${texture.id === textureSelected.id ? "active" : "" }`}
                    style={{ backgroundImage: `url(${texture.url})` }}
                    onClick={()=> dispatch(setTextureSelected(texture))}>
                    <p> {texture.name} </p>
                </Button>
            ))
            }
        </div>
    )
}

export default TexturesList