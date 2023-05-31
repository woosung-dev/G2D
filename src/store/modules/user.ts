import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserMyInfo {
	email?: string;
	access_token?: string;
}
// 초기 상태 타입
export type UserState = {
	isLoggedIn: boolean;
	userData: UserMyInfo;
};

// 초기 상태
const initialState: UserState = {
	isLoggedIn: false,
	userData: { email: undefined, access_token: undefined },
};

// 리듀서 슬라이스
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginAction(state: UserState, action: PayloadAction<UserMyInfo>) {
			state.isLoggedIn = true;
			state.userData = action.payload;
		},
		logoutAction(state: UserState) {
			state.isLoggedIn = false;
			state.userData = {
				email: undefined,
				access_token: undefined,
			};
		},
	},
});

// 리듀서 & 액션 리턴
const { reducer, actions } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
