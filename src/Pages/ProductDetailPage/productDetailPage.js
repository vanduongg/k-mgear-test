import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { createCart } from "../../services/cartService.js";
import { getProductById } from "../../services/productService.js";
import { FrameRate } from "./components/rateDetailPage.js";

export function ProductDetailPage() {
    const [productData, setProductData] = useState(null);
    const { id } = useParams();

    const refreshProductData = async () => {
        try {
            const response = await getProductById(id);
            if (!response) {
                throw new Error('Network response was not ok');
            } else {
                setProductData(response);
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };
    useEffect(() => {
        refreshProductData();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>
        <ProductDetailPageBody />
        <FrameRate refreshProductData={refreshProductData} />
        <></>
    </>;
}

export function ProductDetailPageBody() {
    const [productData, setProductData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await getProductById(id);
                if (!response) {
                    throw new Error('Network response was not ok');
                } else {
                    setProductData(response);
                }
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };
        fetchProductData();

    }, [id]);

    const userID = localStorage.getItem("userID");
    const handleAddToCart = async () => {
        if (!userID) {
            const savedProductIDs = JSON.parse(localStorage.getItem("productIDs"));
            if (!savedProductIDs) {
                localStorage.setItem("productIDs", JSON.stringify([id]))
                alert("Thêm thành công!");
                return
            }   
            if(!savedProductIDs.find(data=> data === id)){
                localStorage.setItem("productIDs", JSON.stringify([...savedProductIDs, id]));
                alert("Thêm thành công!");
                return
            }
            alert("Sản phẩm đã có trong giỏ hàng")
        } else {
            const newCart = {
                idUser: userID,
                idProduct: id,
                amount: 1,
                status: "cart"
            }
            const response = await createCart(newCart)
            alert(response.message);
        }
    };

    const formatPrice = (price) => {
        return price ? price.toLocaleString('vi-VN') + ' VNĐ' : "N/A";
    };

    // Wait until the productData is loaded before rendering the component
    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center p-6 max-w-5xl mx-auto my-10 border rounded-lg shadow-lg bg-white">
            <div className="flex-[5] flex justify-center items-center mb-6 md:mb-0 md:mr-8">
    <div className="w-full h-72 overflow-hidden rounded-lg">
        <img
            src={productData?.imageUrl || "/path/to/fallback-image.jpg"}
            alt={productData?.name}
            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
        />
    </div>
</div>
<div className="flex-[6] px-4">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{productData?.name}</h1>
    <div className="my-4">
        {productData?.discount && productData.discount > 0 ? (
            <>
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 inline-block text-sm uppercase font-bold rounded-full mb-2 shadow-lg">
                    Flash Sale
                </div>
                {/* Price Details */}
                <div className="flex items-center">
                    <p className="!text-red-600 text-xl font-semibold mr-2">
                        {formatPrice(productData?.price - 
                            (productData?.price * (productData?.discount / 100)))}
                    </p>
                    <span className="text-gray-500 line-through text-lg mx-2">
                        {formatPrice(productData?.price)} VND
                    </span>
                    <span className="bg-[#fedee3] text-red-600 text-xs font-bold py-1 px-2 rounded-full ml-2">
                        -{productData?.discount}%
                    </span>
                </div>
            </>
        ) : (
            <p className="text-red-600 text-xl font-semibold">
                {formatPrice(productData?.price)} VND
            </p>
        )}
    </div>

    <div className="space-y-2 text-gray-600 mb-8">
        <p>
            Còn lại:{" "}
            <strong>{productData?.quantity}</strong>
        </p>
        <p>
            Hãng: <strong className="text-blue-500">{productData?.brand}</strong>
        </p>
        <p>
            Đã bán:{" "}
            <strong className="text-orange-500">{productData?.sold}</strong>
        </p>
    </div>
                <div className="flex flex-wrap gap-4">
                    <button
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors duration-300"
                        onClick={() => 
                        handleAddToCart(productData?._id)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
}
