import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from "../../../utils/components/Card.js";

export function ProductPageCollection({ products }) {
    const navigate = useNavigate();
    const [visibleProduct, setvisibleProduct] = useState(10);

    const handleCardClick = (itemId) => {
        navigate(`/product/${itemId}`);
    };

    const handleShowMore = () => {
        setvisibleProduct((prevCount) => prevCount + 10); 
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        {/* Cards Row */}
        {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, visibleProduct).map((item) => (
                    <div
                        key={item._id}
                        onClick={() => handleCardClick(item._id)}
                        className="cursor-pointer hover:scale-105 transform transition-all"
                    >
                        <Card item={item} />
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-600">
                Rất tiếc, chúng tôi không tìm thấy kết quả cho của bạn.
                <br />
                Vui lòng kiểm tra chính tả, sử dụng từ tổng quát hơn hoặc thay đổi bộ lọc và thử lại!
            </div>
        )}

        {/* Show More Button */}
        {products.length > visibleProduct && (
            <div className="text-center mt-6">
                <button
                    onClick={handleShowMore}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                    Show More
                </button>
            </div>
        )}
    </div>
    );
}
