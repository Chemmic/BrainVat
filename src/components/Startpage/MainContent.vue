<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

function search() {
  const query = searchQuery.value.trim()
  if (query) {
    router.push({ path: '/jobs', query: { search: query } })
  } else {
    router.push('/jobs')
  }
}


</script>

<template>
  <section class="main">
    <div class="content">
      <h1>Brain Vat</h1>
      <p class="subtitle">Earn your income while you sleep</p>

      <div class="search-bar">
        <input
          v-model="searchQuery"
          @keyup.enter="search"
          type="text"
          placeholder="Browse your next dream..."
          class="search-input"
        />
        <button type="submit" class="search-button" @click="search">Search</button>
      </div>
          <div class="timeline-section">
        <el-timeline>
          <el-timeline-item
            v-for="(step, index) in steps"
            :key="index"
            :timestamp="`Step ${index + 1}`"
            placement="alternate"
          >
            <div class="timeline-content">
              <div v-if="index % 2 === 0" class="timeline-left">
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
              <div v-else class="timeline-right">
                <img :src="step.image" alt="Step image" class="timeline-image" />
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  background-color: #9482BC;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
}


.content {
  width: 800px;
  text-align: center;
}

h1 {
  font-size: 86px;
  font-weight: 900;
  margin-bottom: 30px;
  color: #333238;
}

.subtitle {
  font-size: 34px;
  color: #333238;
  margin-bottom: 50px;
}
.timeline-section {
  margin-top: 100px;
  padding: 40px 0;
}

.timeline-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.timeline-left,
.timeline-right {
  max-width: 45%;
}

.timeline-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.search-bar {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.search-input {
  padding: 20px 26px;
  font-size: 20px;
  width: 360px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  outline: none;
}

.search-button {
  padding: 20px 32px;
  font-size: 20px;
  background-color: #333238;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #7D8088;
}
</style>
