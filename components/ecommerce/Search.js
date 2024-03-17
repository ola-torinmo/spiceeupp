import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ApiService from "../../util/ApiService";
import NoResult from "../NoResult";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        ApiService.get('/categories?page=1')
          .then((response) => {
            console.log({response})
            setCategoryData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });

      }, []);

    const handleSearch = () => {
        console.log("click");
        router.push({
            pathname: "/products",
            query: {
                search: searchTerm,
            },
        });
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    return (
        <>
            <form>
                <select className="select-active">
                    <option>All Categories</option>
                    {categoryData ? categoryData.map((category, index) => (
                        <option key={index}>{category.name}</option>
                    )) : <option>
                        <NoResult message="No category available" />
                    </option>}
                </select>
                <input
                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search"
                />
            </form>
        </>
    );
};

export default Search;
