<template>
    <CurrenciesTable :isoCodes="isoCodes" />
    <CurrenciesExport :isoCodes="isoCodes" />
</template>

<script setup>
import CurrenciesTable from '../components/CurrenciesTable.vue';
import CurrenciesExport from '../components/CurrenciesExport.vue';

const isoCodes = ['aud','cad','chf','cny','eur','gbp','hkd','jpy','nzd','usd'];
</script>