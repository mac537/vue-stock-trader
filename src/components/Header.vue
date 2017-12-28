<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark row mb-4">
	  <router-link to="/" class="navbar-brand">Stock Trader</router-link>

	  <div class="collapse navbar-collapse">
	    <ul class="navbar-nav mr-auto">
	      <router-link to="/portfolio" class="nav-item" activeClass="active" tag="li"><a class="nav-link">Portfolio</a></router-link>
	      <router-link to="/stocks" class="nav-item" activeClass="active" tag="li"><a class="nav-link">Stocks</a></router-link>
	    </ul>
	    	
	    <ul class="navbar-nav my-2 my-lg-0">
				<li class="nav-item"><a class="nav-link" href="#" @click="endDay">End day</a></li>
	      <li class="nav-item dropdown" :class="{show: isDropdownOpen}" @click="isDropdownOpen = !isDropdownOpen">
	        <a
	        	class="nav-link dropdown-toggle"
	        	href="#" id="navbarDropdown"
	        	role="button"
	        	data-toggle="dropdown"
	        	aria-haspopup="true"
        	>
	          Save & Load
	        </a>
	        <div class="dropdown-menu" :class="{show: isDropdownOpen}" aria-labelledby="navbarDropdown">
	          <a class="dropdown-item" href="#" @click="saveData">Save Data</a>
	          <a class="dropdown-item" href="#" @click="loadData">Load Data</a>
	        </div>
	      </li>
	    </ul>
	    <span class="navbar-text ml-4">
		    <strong>Funds: {{ funds | currency }}</strong>
		  </span>
	    
	  </div>
	</nav>
</template>

<script>
	import axios from 'axios'
	import { mapActions } from 'vuex'

	export default{
		data(){
			return{
				isDropdownOpen: false
			}
		},
		computed: {
			funds(){
				return this.$store.getters.funds
			}
		},
		methods: {
			...mapActions({
				randomizeStocks: 'randomizeStocks',
				fetchData: 'loadData'
			}),
			endDay(){
				this.randomizeStocks()
			},
			saveData(){
				const data = {
					funds: this.$store.getters.funds,
					stockPortfolio: this.$store.getters.stockPortfolio,
					stocks: this.$store.getters.stocks
				}

				//console.log(data)
				axios.put('/data.json', data)
				.then((response) => {
					console.log(response.data);
				});
			},
			loadData(){
				this.fetchData()
			}
		}
	}
</script>