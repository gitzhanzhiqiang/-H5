const mutations = {
    SET_USER: (state, user) => {
        state.user = user;
    },
    SET_TOKEN: (state, loginCode) => {
        state.loginCode = loginCode;
    },
    ADD_ROUTER: (state, addRouter) => {
        state.addRouter = addRouter;
    },
    SET_COLLAPSE: (state, isCollapse) => {
        state.isCollapse = isCollapse;
    },
    SET_IMG1: (state, img1) => {
        state.img1 = img1;
    },
    SET_IMG2: (state, img2) => {
        state.img2 = img2;
    },
    SET_IMG3: (state, img3) => {
        state.img3 = img3;
    },
}
export default mutations;