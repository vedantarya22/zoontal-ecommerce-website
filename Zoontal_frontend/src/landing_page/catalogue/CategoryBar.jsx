import React,{useState,useEffect} from 'react';
import { Link, useParams,useLocation } from 'react-router-dom';
// import { products } from '../../data/data';
import "./CategoryBar.css"

import axios from 'axios'
const API = import.meta.env.VITE_API_URL || "http://localhost:2000";



function CategoryBar() {
    const [collections, setCollections] = useState([]);

    
            useEffect(()=>{
                axios.get(`${API}/allCollections`).then((res)=>{
                      setCollections(res.data);
                })
            },[]); //run only once

     const { slug } = useParams();
  const location = useLocation();
  const queryCategory = new URLSearchParams(location.search).get("category");
  const isViewAllActive = !slug && !queryCategory;




    return ( 
         <div className="category-bar-wrapper border-bottom">
      <div className="category-bar d-flex gap-4">
        <Link to="/collection" className={`category-link ${isViewAllActive ? "active" : ""}`}>
          VIEW ALL
        </Link>
        {collections.map((c) => {
          const isActive = slug === c.slug || queryCategory === c.slug;
          return (
            <Link
              key={c._id}
              to={`/collection?category=${c.slug}`}
              className={`category-link ${isActive ? "active" : ""}`}
            >
              {c.collectionName.replace(/sheenkaar\s*/i, "").toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
     );
}

export default  CategoryBar;