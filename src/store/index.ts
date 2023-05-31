import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules";

const store = () => {
	const store = configureStore({ reducer: rootReducer });
	return store;
};

const wrapper = createWrapper(store, {
	debug: process.env.NODE_ENV === "development",
});

export default wrapper;
