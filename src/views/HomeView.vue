<template>
    <CurrenciesTable :isoCodes="['aud','cad','chf','cny','eur','gbp','hkd','jpy','nzd','usd']" />
</template>

<script setup>
import CurrenciesTable from '../components/CurrenciesTable.vue';
</script>