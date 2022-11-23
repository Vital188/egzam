import { useContext, useState } from 'react';
import Orders from '../../Contexts/Orders';
import axios from 'axios'
import { authConfig } from '../../Functions/auth';

function Line({ book }) {

    const [text, setText] = useState('Confirmation');
    const [color, setColor] = useState('none')
    const { setOrders} = useContext(Orders); 
    const [post, setPost] = useState('')   

    const remove = id => {
        setOrders({id});
    }
   
   const handleChangeOrder = () =>{
          axios.put('http://localhost:3003/server/orders/' + book[1][0].oid, {confirmed: 1, post: post}, authConfig())
            .then(res => {
            setText('CONFIRMED');
            setColor('orange');
            })

   }
  console.log(book)
    return (
        <li className="list-group-item">
            <div className="home" style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                
                    
                    <div className="line__content__info" >
                        {book[1][0].im ? <div className='img-bin'>
                            <img src={book[1][0].im} alt='upload'>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                     Category:   {book[1][0].tit}
                    </div>

                    {book[1][0].image ? <div className='img-bin'>
                            <img src={book[1][0].image} alt='upload'>
                            </img>
                        </div> : null}
                     Type: {book[1][0].type}, Year: {book[1][0].years}  
                     </div>
                     <div className="mb-3" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                       
                         }}>
                     <label className="form-label">Comment:</label>
                    <textarea className="form-control"  value={book[1][0].comment} readOnly style={{
                        height: '100px',
                     }} ></textarea>
                    
                    
                    <label className="form-label">Answer:</label>
                    <textarea className="form-control"  value={post} onChange={e => setPost(e.target.value)} style={{
                        height: '100px',
                     }} ></textarea>
                    </div>
                     <div style={{
                       display: 'flex',
                    gap: '10px',
                    //    justifyContent: 'space-around',
                    }}>
                        <ul className="list-group" style={{
                     listStyle: 'none'
                    }}> 
                    {book[1][0].orderis === 0 ?
                                 <button onClick={handleChangeOrder} type="button" style={{
                                    backgroundColor: color,      
                                    color: 'black'
                                }} className="btn btn-outline-success">{text}</button> : <button onClick={handleChangeOrder} type="button" style={{ 
                                    backgroundColor: 'orange',
                                    color: 'black',
                                    border: '1px solid black'
                                }} className="btn btn-outline-success">CONFIRMED</button> }
                    
                </ul> 
                 <ul className="list-group" style={{
                     listStyle: 'none'
                    }}> 
                    {
                        book[1]?.map(o =>  <li key={o.oid}  >  
                           
                                 <button onClick={() => remove(o.oid)} type="button" style={{
                                  
                                }} className="btn btn-outline-danger">Delete</button>   
                         </li> ) 
                    }
                </ul> 
                </div>  
                
                
            
        </li>
    )
}

export default Line;