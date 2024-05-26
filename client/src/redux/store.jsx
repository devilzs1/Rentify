import {configureStore} from "@reduxjs/toolkit";
import {useDispatch as useAppDispatch} from "react-redux";
import {persistStore, persistReducer} from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

const store = configureStore({
    reducer : persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
export const dispatch = store.dispatch;
// export const useSelector = useAppSelector();
export const useDispatch =  useAppDispatch;


