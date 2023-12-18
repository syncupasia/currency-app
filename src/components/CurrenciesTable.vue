<template>
    <div class="w-100 h-100 table-top-space">
      <div class="text-center" v-if="currencies && currencies.length > 0">{{ formatLastModified(currencies[0].last_modified) }} - Base Currency: {{ currencies[0].base_currency }}</div>
      <table class="table table-striped table-bordered">
          <tbody>
              <tr>
                  <th class="d-none d-md-table-cell">&nbsp;</th>
                  <th>ISO</th>
                  <th>Currency</th>
                  <th class="d-none d-md-table-cell">Previous Rate</th>
                  <th>Current Rate</th>
                  <th class="d-none d-md-table-cell">&nbsp;</th>
              </tr>
              <tr v-for="currency in currencies" :key="currency.iso_code">
                  <td class="d-none d-md-table-cell text-center"><img :src="getCurrencyFlagImageUrl(currency.iso_code)" onerror="this.style.display='none'" class="flag-border"/></td>
                  <td>{{ currency.iso_code }}</td>
                  <td>{{ currency.name }}</td>
                  <td class="d-none d-md-table-cell">{{ currency.previous_rate }}</td>
                  <td>{{ currency.current_rate }}</td>
                  <td class="d-none d-md-table-cell text-center">
                      <img v-if="parseFloat(currency.current_rate) > parseFloat(currency.previous_rate)" src="/images/up-32.png" class="rate-arrow-icon" alt="Up Icon"/>
                      <img v-else-if="parseFloat(currency.current_rate) < parseFloat(currency.previous_rate)" src="/images/down-32.png" class="rate-arrow-icon" alt="Down Icon"/>
                      <span v-else>-</span>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
</template>

<script>
import { queryCurrencies } from '../http/currency-api';

export default {
  props: {
    isoCodes: Array,
  },
  data() {
    return {
      currencies: [],
    };
  },
  created() {
    this.fetchCurrencies();
  },
  methods: {
    async fetchCurrencies() {
      try {
        const response = await queryCurrencies({iso_codes: this.isoCodes});
        this.currencies = response.data;
      } catch (error) {
        alert('Failed. Please try again later.');
        console.log('Error fetching currencies:', error);
      }
    },
    formatLastModified(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
      return '';
    },
    getCurrencyFlagImageUrl(isoCode) {
      return `/images/currency-flags/${isoCode.toLowerCase()}.png`;
    },
  },
};
</script>
<style scoped>
  .table-top-space {
    margin-top: 16px;
  }
  .flag-border {
    border: 1px solid #E8E8E8;
  }

</style>