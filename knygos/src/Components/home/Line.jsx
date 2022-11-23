import { useContext } from 'react';
import Home from '../../Contexts/Home';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Dur from '../Data/Dur';

import { useState } from "react";

function Line({ book}) {

    const { setOrder } = useContext(Home);


    const [post, setPost] = useState('');
    const [text, setText] = useState('Order');
    const [color, setColor] = useState('skyblue')
    const [dur, setDur] = useState('0');
    const [nm, setNm] = useState('0')
    const [text2, setText2] = useState('Favorite');
    const [coloris2, setColoris2] = useState('crimson')

    const handleChangeOrder = () => {
        axios.put('http://localhost:3003/home/book/' + book.id, {confirmed: 1, im: book.images, tit: book.titl, dur: dur}, authConfig())
        .then(res => {
        setText('Ordered');
        setColor('orange');
        });
        setOrder({
            comment: post,
            book_id: book.id
        });
        setPost('');
       }

//     const fav = () => {
//         axios.put('http://localhost:3003/home/book/' + book.id, {confirmed: 1}, authConfig())
//   setOrder({
//     comment: post,
//     book_id: book.id
//   });
//   setPost('');
//   setText2('Favorite choose');
//   setColoris2('green');
//  }   
       
    return ( <>
    
        <li className="list-group-item">
            <div className="home">
                <div className="home__content" style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                
                <div className="line__content__info">
                        {book.images ? <div className='img-bin'>
                            <img src={book.images} alt={book.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                     Category:   {book.titl}
                    </div>
                        {book.image ? <div className='img-bin'>
                            <img src={book.image} alt='upload'>
                            </img>
                        </div> : null}
                     Name: {book.type}, Year: {book.years}  
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

                    <div className="mb-3">
            <label className="form-label">Duration:</label>
            <select
              className="form-select mb-4"
              value={dur}
              onChange={(e) => setDur(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose duration from list:
              </option>
              {Dur?.map((cl) => (
                <option key={cl.id} value={cl.type}>
                  {cl.type}
                </option>
              ))}
            </select>
            {/* <label className="form-label">Duration:</label>
            <select
              className="form-select mb-4"
              value={nm}
              onChange={(e) => setNm(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose duration from list:
              </option>
              {Dur?.map((cl) => (
                <option key={cl.id} value={cl.type}>
                  {cl.type}
                </option>
              ))}
            </select> */}
          </div>
 
                    {book.orderis === 0 ?
                       <button onClick={handleChangeOrder} type="button" style={{
                        backgroundColor: color,
                        color: 'black',
                         }} className="btn btn-outline-success">{text}</button> : <button type="button" style={{ 
                            backgroundColor: 'orange',
                            color: 'black',
                            border: '1px solid black',
                            marginLeft: '10px'
                        }} className="btn btn-outline-success" disabled>Book ordered</button> }

                         {/* {book.orderis === 0 ?
                         <button  type="button" onClick={fav} className="btn btn-outline-danger">FAVORITE</button>: <button type="button" style={{ 
                            backgroundColor: 'green',
                            color: 'black',
                            border: '1px solid black',
                            marginLeft: '10px'
                        }} className="btn btn-outline-success" disabled>FAVORITED</button> } */}
                </div>
            </div>
            
        </li></>
)
}

export default Line;