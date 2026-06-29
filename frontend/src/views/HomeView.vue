<template>

  <div class="home">

    <HeroSection :stats="stats" :loading="statsLoading" />

    <ServerStatusCard :stats="stats" :loading="statsLoading" :error="statsError" />

    <RankingsSection

      :pvp-players="pvpPlayers"

      :pk-players="pkPlayers"

      :loading="rankingsLoading"

      :error="rankingsError"

      :is-mock="usingMockData"

    />

    <CastlesSection

      :castles="castles"

      :loading="castlesLoading"

      :error="castlesError"

      :is-mock="usingMockData"

    />

    <OlympiadSection

      :heroes="olympiadHeroes"

      :loading="olympiadLoading"

      :error="olympiadError"

      :is-mock="olympiadMock"

    />

    <FeaturesSection />

  </div>

</template>



<script setup>

import { ref, onMounted } from 'vue';

import { api } from '../api/client.js';

import {

  mockStats,

  mockPvpRankings,

  mockPkRankings,

  mockCastles,

  mockOlympiadHeroes,

} from '../data/mockData.js';



import HeroSection from '../components/HeroSection.vue';

import ServerStatusCard from '../components/ServerStatusCard.vue';

import RankingsSection from '../components/RankingsSection.vue';

import CastlesSection from '../components/CastlesSection.vue';

import OlympiadSection from '../components/OlympiadSection.vue';

import FeaturesSection from '../components/FeaturesSection.vue';



const stats = ref(null);

const pvpPlayers = ref([]);

const pkPlayers = ref([]);

const castles = ref([]);

const olympiadHeroes = ref([]);



const statsLoading = ref(true);

const rankingsLoading = ref(true);

const castlesLoading = ref(true);

const olympiadLoading = ref(true);



const statsError = ref('');

const rankingsError = ref('');

const castlesError = ref('');

const olympiadError = ref('');

const usingMockData = ref(false);

const olympiadMock = ref(false);



onMounted(async () => {

  let apiFailed = false;



  try {

    stats.value = await api.stats();

  } catch (err) {

    console.error('Stats API failed:', err);

    stats.value = mockStats;

    statsError.value = 'Could not reach the server. Showing demo stats.';

    apiFailed = true;

  } finally {

    statsLoading.value = false;

  }



  try {

    const [pvpData, pkData] = await Promise.all([

      api.pvpRankings(),

      api.pkRankings(),

    ]);

    pvpPlayers.value = pvpData.players;

    pkPlayers.value = pkData.players;

  } catch (err) {

    console.error('Rankings API failed:', err);

    pvpPlayers.value = mockPvpRankings;

    pkPlayers.value = mockPkRankings;

    rankingsError.value = 'Could not load rankings. Showing demo data.';

    apiFailed = true;

  } finally {

    rankingsLoading.value = false;

  }



  try {

    const castlesData = await api.castles();

    castles.value = castlesData.castles;

  } catch (err) {

    console.error('Castles API failed:', err);

    castles.value = mockCastles;

    castlesError.value = 'Could not load castles. Showing demo data.';

    apiFailed = true;

  } finally {

    castlesLoading.value = false;

  }



  try {

    const olympiadData = await api.olympiadHeroes();

    olympiadHeroes.value = olympiadData.heroes;

    olympiadMock.value = !!olympiadData.mock;

  } catch (err) {

    console.error('Olympiad API failed:', err);

    olympiadHeroes.value = mockOlympiadHeroes;

    olympiadError.value = 'Could not load Olympiad heroes. Showing demo data.';

    olympiadMock.value = true;

    apiFailed = true;

  } finally {

    olympiadLoading.value = false;

  }



  if (stats.value?.mock) {

    usingMockData.value = true;

  } else if (apiFailed) {

    usingMockData.value = true;

  }

});

</script>


