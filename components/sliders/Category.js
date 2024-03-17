import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { updateProductCategory } from "./../../redux/action/productFiltersAction";

SwiperCore.use([Navigation, Autoplay]);
const CategorySlider = () => {
  const router = useRouter();

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

    console.log("Click");
  };

  const categoryState = useSelector((state) => state.category);
  const categories = categoryState.category?.slice(0, 15) || [];

  const getTotalProductsInCategory = (category) => {
    return (
      category["sub-categories"]?.reduce(
        (totalProducts, subcategory) =>
          totalProducts + subcategory.products.length,
        0
      ) || 0
    );
  };

  const generateBgClassName = (index) => `bg-${(index % 30) + 1}`;

  return (
    <>
      <Swiper
        autoplay={true}
        navigation={{
          prevEl: ".custom_prev_ct1",
          nextEl: ".custom_next_ct1",
        }}
        className="custom-class"
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 8,
          },
          1200: {
            slidesPerView: 10,
          },
        }}
      >
        {categories.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`card-2 ${generateBgClassName(
                i
              )} wow animate__animated animate__fadeInUp`}
              onClick={(e) => selectCategory(e, item.slug)}
            >
              <figure className=" img-hover-scale overflow-hidden">
                <a>
                  <img src={item.image} alt="nest" />
                </a>
              </figure>
              <h6 style={{ height: '40px' }}>
                <a>{item.name}</a>
              </h6>
              <span>
                {getTotalProductsInCategory(item)}{" "}
                {getTotalProductsInCategory(item) > 1 ? "items" : "item"}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
        id="carausel-10-columns-arrows"
      >
        <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
          <i className="fi-rs-arrow-small-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_ct1">
          <i className="fi-rs-arrow-small-right"></i>
        </span>
      </div>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategorySlider);

// import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// SwiperCore.use([Navigation]);

// const CategorySlider = () => {
//     return (
//         <>
//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//
//                 navigation={{
//                     prevEl: ".custom_prev",
//                     nextEl: ".custom_next",
//                 }}
//                 className="custom-class"
//             >
//                 <SwiperSlide>1</SwiperSlide>
//                 <SwiperSlide>2</SwiperSlide>
//                 <SwiperSlide>3</SwiperSlide>
//             </Swiper>

//             <div className="custom-nav">
//                 <button type="button" className="custom_prev">
//                     Prev
//                 </button>
//                 <button type="button" className="custom_next">
//                     Next
//                 </button>
//             </div>
//         </>
//     );
// };

// export default CategorySlider;
