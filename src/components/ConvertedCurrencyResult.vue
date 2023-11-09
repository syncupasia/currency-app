<template>
    <div class="alert alert-success top-spacer">
    {{ amount }} {{ currencyFrom.toUpperCase() }} = {{ finalAmount.toFixed(2) }} {{currencyTo.toUpperCase() }}
    </div>
</template>

<script>
export default {
  props: {
    amount: Number,
    currencyFrom: String,
    currencyTo: String,
    finalAmount: Number,
  },
};
</script>
