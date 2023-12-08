<template>
  <div class="form-group">
    <label class="input-label">Currencies</label>
    <VueMultiselect
      class="currency-select"
      v-if="optionData.length > 0" 
      v-model="selectedOptions" 
      :options="optionData" 
      label="name" 
      track-by="id"
      :multiple="true"
      :searchable="true">
    </VueMultiselect>
  </div>
  <div class="form-group">
    <input class="btn btn-primary" type="submit" name="submit" value="Submit" @click="generateCurrenciesTable" />
  </div>
  <CurrenciesTable v-if="selectedIds.length > 0" :isoCodes="selectedIds" :key="selectedIds.join('-')"/>
  <CurrenciesExport v-if="selectedIds.length > 0" :isoCodes="selectedIds" :key="selectedIds.join('-')" />
</template>

<script>
import VueMultiselect from 'vue-multiselect';
import CurrenciesTable from '../components/CurrenciesTable.vue';
import CurrenciesExport from '../components/CurrenciesExport.vue';
import { queryCurrencies } from '../http/currency-api';

export default {
  components: {
    VueMultiselect,
    CurrenciesTable,
    CurrenciesExport
  },
  data() {
    return {
      optionData: [],
      selectedOptions: [],
      selectedIds: [],
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
  methods: {
    generateCurrenciesTable() {
      this.selectedIds = this.selectedOptions.map(option => option.id.toLowerCase());
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>