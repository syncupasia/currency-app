<template>
    <CurrenciesTable :isoCodes="currencyCodes" />
    <CurrenciesExport :isoCodes="currencyCodes" />
</template>

<script setup>
import CurrenciesTable from '../components/CurrenciesTable.vue';
import CurrenciesExport from '../components/CurrenciesExport.vue';

const currencyCodes = ['aud','cad','chf','cny','eur','gbp','hkd','jpy','nzd','usd'];
</script>