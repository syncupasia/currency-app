<template>
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </p>
    <div class="form-group">
        <label class="input-label">From</label>
        <VueMultiselect
            class="currency-select"
            v-if="optionData.length > 0" 
            v-model="selectedFrom" 
            :options="optionData" 
            label="name" 
            track-by="id"
            :searchable="true">
        </VueMultiselect>
    </div>
    <div class="form-group">
        <label class="input-label">Amount</label>
        <input type="number" id="amount" name="amount" placeholder="Enter dollar amount" class="form-control input-type" v-model="amount">
    </div>
    <div class="form-group">
        <label class="input-label">To</label>
        <VueMultiselect
            class="currency-select"
            v-if="optionData.length > 0" 
            v-model="selectedTo" 
            :options="optionData" 
            label="name" 
            track-by="id"
            :searchable="true">
        </VueMultiselect>
    </div>
    <div class="form-group">
        <input class="btn btn-primary" type="submit" name="submit" value="Submit" @click="convertCurrnecy" />
    </div>
    
    <ConvertedCurrencyResult v-if="finalAmount !== false" :amount="amount" :currencyFrom="selectedFrom.id" :currencyTo="selectedTo.id" :finalAmount="finalAmount" />

</template>

<script>
import VueMultiselect from 'vue-multiselect';
import ConvertedCurrencyResult from '../components/ConvertedCurrencyResult.vue';
import { queryCurrencies } from '../http/currency-api';

export default {
    components: {
        VueMultiselect,
        ConvertedCurrencyResult,
    },
    data() {
        return {
            errors: [],
            amount: '',
            selectedFrom: '',
            selectedTo: '',
            optionData: [],
            finalAmount: false
        };
    },
    async mounted() {
        try {
            const response = await queryCurrencies();
            this.optionData = response.data.map(item => ({
                id: item.iso_code,
                name: item.iso_code + ' - ' + item.name,
            }));
        } catch (error) {
            alert('Failed. Please try again later.');
            console.log('Error fetching currencies:', error);
        }
    },
    computed: {
        inputFieldsChanged() {
            return this.amount + this.selectedFrom.id + this.selectedTo.id;
        },
    },
    watch: {
        inputFieldsChanged: 'resetFinalAmount',
    },
    methods: {
        async convertCurrnecy() {
            if (this.validInput() == true) {
                try {
                    const response = await queryCurrencies({}, 'convert/'+ this.selectedFrom.id.toLowerCase()+'/'+this.selectedTo.id.toLowerCase()+'?amount='+this.amount);
                    this.finalAmount = response.amount;
                    console.log("data:", response.amount);
                } catch (error) {
                    alert('Failed. Please try again later.');
                    console.log('Error convert currency:', error);
                }
            }
        },
        validInput() {
            this.errors = [];
            if (this.selectedFrom.length === 0) {
                this.errors.push('"From" input is required.');
            }
            if (this.amount.length === 0) {
                this.errors.push('"Amount" input is required.');
            } else if (this.amount <= 0){
                this.errors.push('"Amount" input must be a valid positive number.');
            }
            if (this.selectedTo.length === 0) {
                this.errors.push('"To" input is required.');
            }
            if (this.errors.length === 0) {
                return true;
            }
            return false;
        },
        resetFinalAmount() {
            this.finalAmount = false;
        },
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>