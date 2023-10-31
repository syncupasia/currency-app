<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <img src="/images/currency.png" style="width:60px; height:60px"/>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">CurrencyWatch</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'convert' }" class="nav-link">Converter</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>

import { useRouter } from "vue-router"

const router = useRouter()

</script>

<style scoped>

.nav-link.router-link-active {
    color: #000;
    font-weight: 700;
}
</style>