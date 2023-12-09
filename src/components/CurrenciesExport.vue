<template>
  <div class="d-flex justify-content-center align-items-center mb-5">
    <a :href="getExportLink('excel')" download="currencies.xlsx"><img src="/images/xls.png"/></a>
    <div class="mx-2"></div>
    <a :href="getExportLink('pdf')" download="currencies.pdf"><img src="/images/pdf.png"/></a>
  </div>
</template>

<script>
export default {
  props: {
    isoCodes: {
      type: Array,
      required: true
    }
  },
  methods: {
    getExportLink(format) {
      const exportUrl = import.meta.env.VITE_API_BASE_URL+'/currencies';
      const isoCodeParams = this.isoCodes.map(isoCode => `iso_codes[]=${isoCode}`).join('&');
      const formatParam = `format=${format}`;
      return `${exportUrl}?${isoCodeParams}&${formatParam}`;
    }
  }
};
</script>

