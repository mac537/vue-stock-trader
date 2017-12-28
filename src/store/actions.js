import Vue from 'vue';
import axios from 'axios';

export const loadData = ({commit}) => {
    axios.get('/data.json')
    .then(response => {
        if (response.data) {
            const data = response.data;
            const stocks = data.stocks;
            const funds = data.funds;
            const stockPortfolio = data.stockPortfolio;

            const portfolio = {
                stockPortfolio,
                funds
            };

            commit('SET_STOCKS', stocks);
            commit('SET_PORTFOLIO', portfolio);
        }
    })
};