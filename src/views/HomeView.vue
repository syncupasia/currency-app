<template>
    <div class="container" id="main">
        <div class="row" style="margin:0 !important">
            <div class="col-lg-6">
                <CurrenciesTable :isoCodes="['aud','cad','chf','eur','gbp','nzd','usd']" />
            </div>
        </div>
    </div>
</template>

<script setup>
import CurrenciesTable from '../components/CurrenciesTable.vue';
</script>