import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`,
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder,
            })
        }),
        getOrder: builder.query({
            query: (ref) => `orders/${ref}`,
        }),
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: 'payments/intents',
                method: 'POST',
                body: data,
            })
        }),
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: 'payments/intents',
                method: 'POST',
                body: data,
            })
        }),
        // login: builder.mutation({
        //     query: credentials => ({
        //         url: "auth",
        //         method: 'POST',
        //         body: { ...credentials }
        //     })
        // })
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductQuery,
    useCreateOrderMutation,
    useGetOrderQuery,
    useCreatePaymentIntentMutation,
    // useLoginMutation 
} = apiSlice;