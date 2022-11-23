import { useState, useEffect, useContext } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";
import Size from "../Data/Size";
import Clothes from "../Data/Clothes";
import Color from "../Data/Color";

const sortData = [
  { v: "default", t: "Default" },
  { v: "price_asc", t: "Price 1-9" },
  { v: "price_desc", t: "Price 9-1" },
];

function List() {
  const { rubs, setRubs, } = useContext(Home);
  const [type, setType] = useState("0");
  const [size, setSize] = useState("0");
  const [color, setColor] = useState("0");

  const [sortBy, setSortBy] = useState("default");
  const [stats, setStats] = useState({ rubsCount: null });
  const [rubFiltered, setRubFiltered] = useState([]);

  const [titl, setTitl] = useState('');
 
 

  useEffect(() => {
    if (null === rubs) {
      return;
    }
    setStats((s) => ({ ...s, rubsCount: rubs.length }));
  }, [rubs]);

  useEffect(() => {
    switch (sortBy) {
      case "price_asc":
        setRubs((r) => [...r]?.sort((a, b) => a.price - b.price));
        break;
      case "price_desc":
        setRubs((r) => [...r]?.sort((b, a) => a.price - b.price));
        break;
      default:
        setRubs((r) => [...(r ?? [])]?.sort((a, b) => a.row - b.row));
    }
  }, [sortBy, setRubs]);

  useEffect(() => {
    if (rubs !== null) {
      setRubFiltered([...rubs]?.filter((el) => el.color === color));
    }
  }, [color, rubs]);

  useEffect(() => {
    if (rubs !== null) {
      setRubFiltered([...rubs]?.filter((el) => el.size === size));
    }
  }, [rubs, size]);

  useEffect(() => {
    if (rubs !== null) {
      setRubFiltered([...rubs]?.filter((el) => el.type === type));
    }
  }, [rubs, type]);

  const stop = () => {
    setRubFiltered([]);
    setColor('0');
    setSize('0');
    setType('0')
  }
 

  useEffect(() => {
    if (rubs !== null) {
      setRubFiltered([...rubs]?.filter((el) => el.titl === titl));
    }
  }, [rubs, titl]);

 
  return (
   <>
      <div className="card m-4">
      <div className='box'>
      <h4 className="card-header">Cloths list</h4>
      <h5 className="card-header">Search</h5>
      <div className="card-body">
      <div className="list-group">
                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" placeholder="Please, write searching country here..." value={titl} onChange={e => setTitl(e.target.value)} />   
         </div>
       
              <h5 className="card-header">Sort</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Sort by price:</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortData.map((c) => (
                <option key={c.v} value={c.v}>
                  {c.t}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sort by type:</label>
            <select
              className="form-select mb-4"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose clothes type from list:
              </option>
              {Clothes?.map((cl) => (
                <option key={cl.id} value={cl.type}>
                  {cl.type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sort by size:</label>
            <select
              className="form-select mb-4"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose size from list:
              </option>
              {Size?.map((size) => (
                <option key={size.id} value={size.type}>
                  {size.type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sort by color:</label>
            <select
              className="form-select mb-4"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose color from list:
              </option>
              {Color?.map((cl) => (
                <option key={cl.id} value={cl.type}>
                  {cl.type}
                </option>
              ))}
            </select>
          </div>
           <button onClick={stop}>
          {rubFiltered === null ? 'Without sort' : 'All list'}
          </button>   
          <div className="mb-3"></div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Total number cloths in the list ({stats.rubsCount})</h5>
        <div className="card-body">
          <div className="list-group">
            {rubFiltered.length > 0
              ? (rubFiltered?.map((r) => <Line key={r.id} rubs={r} />))
              : (rubs?.map((r) => <Line key={r.id} rubs={r} />))}
          </div>
        </div>
      </div>
      </div>
      </div> </div>       
        </>
  );
}

export default List;
