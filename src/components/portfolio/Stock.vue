<template>
	<div class="col">
		<div class="card">
		  <div class="card-header d-flex justify-content-between align-items-center">
		    <div>{{ stock.name }}</div>
		    <small>Price: {{ stock.price }} | Quantity: {{ stock.quantity }}</small>
		  </div>
		  <div class="card-body">
		  	<form class="form-inline">
			    <div class="input-group">
			    	<input
			    		type="number"
			    		class="form-control"
			    		placeholder="Quantity"
			    		v-model.number="quantity"
			    		:class="{'is-invalid': insufficientQuantity}"
		    		>
			      <span class="input-group-btn">
			        <button
			        	class="btn btn-primary"
			        	type="button"
			        	@click="sellStock"
			        	:disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)"
		        	>
			        	{{ insufficientQuantity ? 'Not enough' : 'Sell' }}
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
			insufficientQuantity(){
				return this.quantity > this.stock.quantity
			}
		},
		props: ['stock'],
		methods: {
			sellStock(){
				const order = {
					stockId: this.stock.id,
					stockPrice: this.stock.price,
					quantity: this.quantity 
				}
				this.$store.dispatch('sellStock', order)
				this.quantity = 0
			}
		}
	}
</script>