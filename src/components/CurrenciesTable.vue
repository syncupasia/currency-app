<template>
    <div>
        <table class="table table-striped table-bordered">
            <tbody>
                <tr>
                    <th>ISO</th>
                    <th>Currency</th>
                    <th class="hide-on-sm">Previous Rate</th>
                    <th>Current Rate</th>
                    <th class="hide-on-sm">&nbsp;</th>
                </tr>
                <tr v-for="currency in currencies" :key="currency.iso_code">
                    <td>{{ currency.iso_code }}</td>
                    <td>{{ currency.name }}</td>
                    <td class="hide-on-sm">{{ currency.previous_rate }}</td>
                    <td>{{ currency.current_rate }}</td>
                    <td class="hide-on-sm">
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
import { onMounted, ref } from 'vue';
import { getCurrencies } from '../http/currency-api';

export default {
  setup() {
    const currencies = ref([]);

    onMounted(async () => {
      try {
        const response = await getCurrencies(['EUR', 'GBP']);
        currencies.value = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to get data. Please try again later');
      }
    });

    return {
      currencies,
    };
  },
};
</script>