import ajax from '@utils/config';
//这个action会被传入一个Object，这个Object里面可能有很多的方法和属性，而你只需要commit方法
const actions = {
    SETUSER({ commit }, { user }) {
        commit('SET_USER', user);
    },
    SETTOKEN({ commit }, { loginCode }) {
        commit('SET_TOKEN', loginCode);
    },
    ADDROUTER({ commit }, { addRouter }) {
        commit('ADD_ROUTER', addRouter);
    },
    SETISCOLLAPSE({ commit }, { isCollapse }) {
        commit('SET_COLLAPSE', isCollapse);
    },
    SETIMG1({ commit }, { img1 }) {
        commit('SET_IMG1', img1);
    },
    SETIMG2({ commit }, { img2 }) {
        commit('SET_IMG2', img2);
    },
    SETIMG3({ commit }, { img3 }) {
        commit('SET_IMG3', img3);
    }
}
export default actions;