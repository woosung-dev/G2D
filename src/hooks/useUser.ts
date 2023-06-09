import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/modules";
import { UserMyInfo, loginAction, logoutAction } from "../store/modules/user";

// 커스텀 훅
export default function useUser() {
	const { isLoggedIn, userData } = useSelector(
		(state: RootState) => state.user,
	);
	const dispatch = useDispatch();

	const login = useCallback((data: UserMyInfo) => {
		dispatch(loginAction(data));
	}, []);

	const logout = useCallback(() => {
		dispatch(logoutAction());
	}, []);

	return { isLoggedIn, userData, login, logout };
}
