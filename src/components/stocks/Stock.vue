<template>
	<div class="col">
		<div class="card">
		  <div class="card-header d-flex justify-content-between align-items-center">
		    <div>{{ stock.name }}</div>
		    <small>Price: {{ stock.price }}</small>
		  </div>
		  <div class="card-body">
		  	<form class="form-inline">
			    <div class="input-group">
			    	<input
			    		type="number"
			    		class="form-control"
			    		placeholder="Quantity"
			    		v-model.number="quantity"
			    		:class="{'is-invalid': insufficientFunds}"
		    		>
		      	<span class="input-group-btn">
			        <button
			        	class="btn btn-primary"
			        	type="button"
			        	@click="buyStock"
			        	:disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)"
		        	>
			        	{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
			        </button>
			      </span>
			    </div>
			  </form>
		  </div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				quantity: 0
			}
		},
		computed: {
			funds(){
				return this.$store.getters.funds
			},
			insufficientFunds(){
				return this.quantity * this.stock.price > this.funds
			}
		},
		props: ['stock'],
		methods: {
			buyStock(){
				const order = {
					stockId: this.stock.id,
					stockPrice: this.stock.price,
					quantity: this.quantity 
				}
				//console.log(order)
				this.$store.dispatch('buyStock', order)
				this.quantity = 0
			}
		}
	}
</script>