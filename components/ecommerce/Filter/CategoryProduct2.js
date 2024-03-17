import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import ApiService from "../../../util/ApiService";
import { addToCategory } from '../../../redux/action/categoryAction';
import NoResult from "../../NoResult";

const CategoryProduct2 = ({ updateProductCategory }) => {
    const [categoryData, setCategoryData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        ApiService.get('/categories?page=2')
          .then((response) => {
            setCategoryData(response.data);
            dispatch(addToCategory(response.data));
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);


    const router = useRouter();

    // const removeSearchTerm = () => {
    //     router.push({
    //         pathname: "/products",
    //     });
    // };

    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname: "/products",
            query: {
                cat: category, //
            },
        });
    };
    return (
        <>
            <ul>
                {categoryData ? categoryData.map((category, index) => (
                    <li key={index} onClick={(e) => selectCategory(e, category.name)}>
                        <a>
                            <img
                                src={category.image ? category.image : '/assets/imgs/theme/icons/category-2.svg'}
                                alt="nest"
                            />
                            {category.name}
                        </a>

                    </li>)) : <NoResult message="No category available" />}
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct2);
