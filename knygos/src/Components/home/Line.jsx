import { useContext } from 'react';
import Home from '../../Contexts/Home';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

import { useState } from "react";

function Line({ rubs}) {

    const { setOrder } = useContext(Home);


    const [post, setPost] = useState('');
    const [text, setText] = useState('Order');
    const [color, setColor] = useState('skyblue')
    const [text2, setText2] = useState('Favorite');
    const [coloris2, setColoris2] = useState('crimson')

    const handleChangeOrder = () => {
        axios.put('http://localhost:3003/home/rubs/' + rubs.id, {confirmed: 1, im: rubs.images, tit: rubs.titl}, authConfig())
        .then(res => {
        setText('Ordered');
        setColor('orange');
        });
        setOrder({
            comment: post,
            rubs_id: rubs.id
        });
        setPost('');
       }

    const fav = () => {
        axios.put('http://localhost:3003/home/rubs/' + rubs.id, {confirmed: 1}, authConfig())
  setOrder({
    comment: post,
    rubs_id: rubs.id
  });
  setPost('');
  setText2('Favorite choose');
  setColoris2('green');
 }   
       
    return ( <>
    
        <li className="list-group-item">
            <div className="home">
                <div className="home__content" style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                
                <div className="line__content__info">
                        {rubs.images ? <div className='img-bin'>
                            <img src={rubs.images} alt={rubs.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                     Country:   {rubs.titl}
                    </div>
                        {rubs.image ? <div className='img-bin'>
                            <img src={rubs.image} alt='upload'>
                            </img>
                        </div> : null}
                     Type: {rubs.type}, Size: {rubs.size}, Color: {rubs.color}, Price: {rubs.price}   
                     <div className="mb-3" style={{
                        marginLeft: '10px',
                        color: 'black',
                        // width: '400px'                       
                         }}>
                    <label className="form-label">Add comment:</label>
                    <textarea className="form-control"  value={post} style={{
                        height: '200px',

                     }} onChange={e => setPost(e.target.value)}></textarea>
                    </div>
 
                    {rubs.orderis === 0 ?
                       <button onClick={handleChangeOrder} type="button" style={{
                        backgroundColor: color,
                        color: 'black',
                         }} className="btn btn-outline-success">{text}</button> : <button type="button" style={{ 
                            backgroundColor: 'orange',
                            color: 'black',
                            border: '1px solid black',
                            marginLeft: '10px'
                        }} className="btn btn-outline-success" disabled>Order impossible</button> }

                         {rubs.orderis === 0 ?
                         <button  type="button" onClick={fav} className="btn btn-outline-danger">FAVORITE</button>: <button type="button" style={{ 
                            backgroundColor: 'green',
                            color: 'black',
                            border: '1px solid black',
                            marginLeft: '10px'
                        }} className="btn btn-outline-success" disabled>FAVORITED</button> }
                </div>
            </div>
            
        </li></>
)
}

export default Line;