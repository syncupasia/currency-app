<template>
  <div class="form-group">
    <label id="currencies-label">Currencies</label>
    <VueMultiselect
      class="currencies-select"
      v-if="jsonData.length > 0" 
      v-model="selectedOptions" 
      :options="jsonData" 
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
</template>

<script>
import VueMultiselect from 'vue-multiselect';
import CurrenciesTable from '../components/CurrenciesTable.vue';
import { queryCurrencies } from '../http/currency-api';

export default {
  components: {
    VueMultiselect,
    CurrenciesTable,
  },
  data() {
    return {
      jsonData: [],
      selectedOptions: [],
      selectedIds: [],
    };
  },
  async mounted() {
    try {
      const response = await queryCurrencies();
      this.jsonData = response.data.map(item => ({
        id: item.iso_code,
        name: item.iso_code + ' - ' + item.name,
      }));
    } catch (error) {
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
<style scoped>
  .currencies-select {
    width: 100%;
    margin-top: 6px;
    margin-bottom: 8px;
  }
  #currencies-label {
    font-weight: 700;
  }
</style>