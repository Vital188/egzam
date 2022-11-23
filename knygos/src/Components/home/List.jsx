import { useState, useEffect, useContext } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";
// import Year from "../Data/Year";
// import Clothes from "../Data/Clothes";
// import Color from "../Data/Color";

// const sortData = [
//   { v: "default", t: "Default" },
//   { v: "price_asc", t: "Price 1-9" },
//   { v: "price_desc", t: "Price 9-1" },
// ];

function List() {
  const { book, setBook } = useContext(Home);
  const [type, setType] = useState("");
  const [years, setYears] = useState("0");
 

  // const [sortBy, setSortBy] = useState("default");
  const [stats, setStats] = useState({ bookCount: null });
  const [rubFiltered, setRubFiltered] = useState([]);

  const [titl, setTitl] = useState('');
 
 

  useEffect(() => {
    if (null === book) {
      return;
    }
    setStats((s) => ({ ...s, bookCount: book.length }));
  }, [book]);

  // useEffect(() => {
  //   switch (sortBy) {
  //     case "price_asc":
  //       setBook((r) => [...r]?.sort((a, b) => a.price - b.price));
  //       break;
  //     case "price_desc":
  //       setBook((r) => [...r]?.sort((b, a) => a.price - b.price));
  //       break;
  //     default:
  //       setBook((r) => [...(r ?? [])]?.sort((a, b) => a.row - b.row));
  //   }
  // }, [sortBy, setBook]);

  // useEffect(() => {
  //   if (book !== null) {
  //     setRubFiltered([...book]?.filter((el) => el.color === color));
  //   }
  // }, [color, book]);

  useEffect(() => {
    if (book !== null) {
      setRubFiltered([...book]?.filter((el) => el.years === years));
    }
  }, [book, years]);

  useEffect(() => {
    if (book !== null) {
      setRubFiltered([...book]?.filter((el) => el.type === type));
    }
  }, [book, type]);

  const stop = () => {
    setRubFiltered([]);
    setYears('0');
    setType('')
  }
 

  useEffect(() => {
    if (book !== null) {
      setRubFiltered([...book]?.filter((el) => el.type === titl));
    }
  }, [book, titl]);

 
  return (
   <>
      <div className="card m-4">
      <div className='box'>
      <h4 className="card-header">Book list</h4>
      <h5 className="card-header">Search</h5>
      <div className="card-body">
      <div className="list-group">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Please, write book name here..." value={titl} onChange={e => setTitl(e.target.value)} />   
         </div>
       
              <h5 className="card-header">Sort</h5>
        <div className="card-body">
          {/* <div className="mb-3">
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
          </div> */}
          <div className="mb-3">
            <label className="form-label">Sort by name:</label>
            <select
              className="form-select mb-4"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose book name from list:
              </option>
              {book?.map((cl) => (
                <option key={cl.id} value={cl.type}>
                  {cl.type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sort book by years:</label>
            <select
              className="form-select mb-4"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose books years from list:
              </option>
              {book?.map((year) => (
                <option key={year.id} value={year.years}>
                  {year.years}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-3">
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
          </div> */}
           <button onClick={stop}>
          {rubFiltered === null ? 'Without sort' : 'All list'}
          </button>   
          <div className="mb-3"></div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Total book numbers in the list ({stats.bookCount})</h5>
        <div className="card-body">
          <div className="list-group">
            {rubFiltered.length > 0
              ? (rubFiltered?.map((r) => <Line key={r.id} book={r} />))
              : (book?.map((r) => <Line key={r.id} book={r} />))}
          </div>
        </div>
      </div>
      </div>
      </div> </div>       
        </>
  );
}

export default List;
