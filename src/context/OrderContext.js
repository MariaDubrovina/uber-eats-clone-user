import { createContext, useState, useEffect, useContext } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { Order, Basket, OrderItem } from '../models';
import { useAuthContext } from './AuthContext';
import { useBasketContext } from './BasketContext';



const OrderContext = createContext({});

const OrderContextProvider = ({children}) => {
    
    const [orders, setOrders] = useState([]);
    const {dbUser} = useAuthContext();
    const {totalPrice, restaurant, basketItems, basket} = useBasketContext();
    

    useEffect(() => {
        if (!dbUser) {
            return;
        }
        DataStore.query(Order, (order) => 
        order.userID('eq', dbUser.id )).then(setOrders);
    }, [dbUser]);

   

    const createNewOrder = async () => {
        //create a new order
        const newOrder = await DataStore.save(
            new Order({
                userID: dbUser.id,
                Restaurant: restaurant,
                total: totalPrice,
                status: 'NEW'
            })
        );
        

        //add all basket items to the order
        const allItems = await Promise.all(
            basketItems.map(basketItem => DataStore.save(
                new OrderItem({
                    orderID: newOrder.id,
                    quantity: basketItem.quantity,
                    Dish: basketItem.Dish
                })
            ))
        );


        //delete basket
        await DataStore.delete(basket);

        setOrders([...orders, newOrder]);

        return newOrder;
    };

    const getOrderById = async (id) => {
        const order = await DataStore.query(Order, id);
        const orderItems = await DataStore.query(OrderItem, (oi) => oi.orderID('eq', id));

        return {...order, items: orderItems};
    };

    return (
        <OrderContext.Provider 
            value={{createNewOrder, orders, getOrderById}}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);