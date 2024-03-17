import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import NoResult from "../../NoResult";

const SubCategories = ({ updateProductCategory }) => {
    const router = useRouter();
    const categoryState = useSelector((state) => state.category);
    const titlex = router.query.cat;

    const subCategories = categoryState.category && categoryState.category.find((cat) => cat.name === titlex)?.['sub-categories'] || [];

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
                {subCategories ? subCategories.map((sub) => (
                    <li key={sub.id} onClick={(e) => selectCategory(e, sub.name)}>
                        <a>
                            <img
                                src={sub.image}
                                alt="nest"
                            />
                            {sub.name}
                        </a>
                        <span className="count">{sub.products.length}</span>
                    </li>
                )) : <NoResult message="No sub category available" />}
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(SubCategories);
