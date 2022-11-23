

function Lines({ rubs }) {


  
    return (
        <li className="list-group-item">
            <div className="home" style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="home__content">
                    <div className="home__content__info" >
                        <div className="line__content__info">
                        {rubs.im ? <div className='img-bin'>
                            <img src={rubs.im} alt='upload'>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                     Country:   {rubs.tit}
                    </div>

                    {rubs.image ? <div className='img-bin'>
                            <img src={rubs.image} alt='upload'>
                            </img> 
                         </div> : null} 
                     Type: {rubs.type}, Size: {rubs.size}, Color: {rubs.color}, Price: {rubs.price}                      
                     <div className="mb-3" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '5px'                     
                         }}>
                     <label className="form-label">Yours comment:</label>
                    <textarea className="form-control"  value={rubs.comment} readOnly style={{
                        height: '100px',
                     }} ></textarea>
                    
                    
                    <label className="form-label">Admin answer:</label>
                    <textarea className="form-control"  value={rubs.post} readOnly style={{
                        height: '100px',
                     }} ></textarea>
                    
                {rubs.orderis === 0 ? <button style={{
                    marginTop: '10px',
                    backgroundColor: 'green',
                    borderRadius: '10px',
                    height: '100px',
                   
                }}>Waiting confirmation</button> : <button style={{
                    marginTop: '10px',
                    backgroundColor: 'crimson',
                    borderRadius: '10px',
                    color: 'black',
                   
                }}>Confirmed</button>}
                </div></div>
                </div>
             </div>
        </li>
    )
}

export default Lines;