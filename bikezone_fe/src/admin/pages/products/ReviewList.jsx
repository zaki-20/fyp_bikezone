import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';

import { MdDelete } from "react-icons/md";
import { deleteReview, getProductReviews } from '../../../features/review/review.thunk';
import { reset } from '../../../features/review/review.slice';
import { deleteProduct } from '../../../features/product/product.thunk';

const ReviewList = () => {
    const dispatch = useDispatch()
    const [productId, setProductId] = useState("");


    const { isLoading, isError, message, reviews, isDeleted } = useSelector((state) => state.review)


    const deleteProductHandler = async (reviewId) => {
        dispatch(deleteReview({ reviewId, productId }))
    }

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId));
    };

    useEffect(() => {
        dispatch(getProductReviews(productId));
        if (isError) {
            dispatch(reset())
        }

    }, [dispatch, productId, isDeleted]);



    const columns = [
        { field: "id", headerName: "Review ID", headerClassName: "bg-gray-900 text-yellow-400 text-lg", minWidth: 230, flex: 0.5 },

        {
            field: "name",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Name",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "comment",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Comment",
            minWidth: 250,
            flex: 1,
        },

        {
            field: "rating",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            headerName: "Rating",
            type: "number",
            minWidth: 50,
            flex: 0.2,
            cellClassName: (params) => {
                return params.row.rating > 3
                    ? "text-green-600"
                    : "text-red-600";
            },
        },

        {
            field: "actions",
            headerClassName: "bg-gray-900 text-yellow-400 text-lg",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <button onClick={() => deleteProductHandler(params.row.id)}>
                            <MdDelete className='text-red-600' size={22} />
                        </button>
                    </>

                );
            },
            cellClassName: "text-blue-500"
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                name: `${item.firstname} ${item.lastname}`,
            });
        });

    return (
        <div className='flex w-[100%] '>
            <SideBar />
            <div className="bg-gray-100 min-h-screen p-5 w-full">
                <h1 className="text-xl ext-center">ALL REVIEWS</h1>
                <form
                    className="flex justify-center items-center gap-x-3 mb-10"
                    onSubmit={productReviewsSubmitHandler}
                >


                    <div className='flex justify-center'>
                        <input
                            type="text"
                            placeholder="Product Id"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>

                    <button
                        className="px-4 py-2 bg-[#122222] text-yellow-400"
                        type="submit"
                    // disabled={
                    //     loading ? true : false || productId === "" ? true : false
                    // }
                    >
                        Search
                    </button>
                </form>

                {
                    reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className=""
                            autoHeight
                        />
                    ) : (
                        <h1 className="text-xl text-black">No Reviews Found</h1>

                    )
                }

            </div>
        </div>
    )
}

export default ReviewList