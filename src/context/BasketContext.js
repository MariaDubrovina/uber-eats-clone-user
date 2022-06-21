import { createContext, useState, useEffect, useContext } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { Basket, BasketItem } from '../models';
import { useAuthContext } from './AuthContext';



const BasketContext = createContext({});

const BasketContextProvider = ({children}) => {
    const {dbUser} = useAuthContext();
    const [basket, setBasket] = useState(null);
    const [basketItems, setBasketItems] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    const subtotalPrice = basketItems.reduce((sum, basketItem) => sum + basketItem.quantity * basketItem.Dish.price, 0);

    const totalPrice = subtotalPrice + restaurant?.deliveryFee;

    useEffect(() => {
        if (restaurant && dbUser) {
        DataStore.query(Basket, (basket) => 
        basket.restaurantID('eq', restaurant.id).userID('eq', dbUser.id )).then((baskets) => setBasket(baskets[0]));
        }
    }, [dbUser, restaurant]);

    useEffect(() => {
        if (basket) {
            DataStore.query(BasketItem, (bi) => 
            bi.basketID('eq', basket.id)).then(setBasketItems); 
        }
        
    }, [basket])

    const addItemToBasket = async (dish, quantity) => {
        //add item to existing basket or create a new basket
        const theBasket = basket || (await createNewBasket());
        
        const newBasketItem = await DataStore.save(
            new BasketItem({
                basketID: theBasket.id,
                Dish: dish,
                quantity
            })
        );
        setBasketItems([...basketItems, newBasketItem]);
    };

    

    const createNewBasket = async () => {
        const newBasket = await DataStore.save(
            new Basket({
                userID: dbUser.id,
                restaurantID: restaurant.id
            })
        );
        setBasket(newBasket);
        return newBasket;
    }

    return (
        <BasketContext.Provider 
            value={{addItemToBasket, 
            setRestaurant, 
            basket, 
            basketItems, 
            restaurant,
            subtotalPrice,
            totalPrice}}>
            {children}
        </BasketContext.Provider>
    );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);