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

const steps = ref([
  {
    title: 'Test object1',
    text: 'Lorem Ipsum test1',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object2',
    text: 'Lorem Ipsum test2',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object3',
    text: 'Lorem Ipsum test3',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object4',
    text: 'NLorem Ipsum test4',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object4',
    text: 'Test object4',
    image: 'https://via.placeholder.com/200x150',
  },
      {
    title: 'Test object1',
    text: 'Lorem Ipsum test1',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object2',
    text: 'Lorem Ipsum test2',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object3',
    text: 'Lorem Ipsum test3',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object4',
    text: 'NLorem Ipsum test4',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object4',
    text: 'Test object4',
    image: 'https://via.placeholder.com/200x150',
  },
      {
    title: 'Test object1',
    text: 'Lorem Ipsum test1',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object2',
    text: 'Lorem Ipsum test2',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object3',
    text: 'Lorem Ipsum test3',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object4',
    text: 'NLorem Ipsum test4',
    image: 'https://via.placeholder.com/200x150',
  },
  {
    title: 'Test object4',
    text: 'Test object4',
    image: 'https://via.placeholder.com/200x150',
  },
])
</script>

<template>
  <section class="main">
    <!-- Hero-Teil -->
    <div class="hero-section">
      <div class = "first-component">
      <h1>Brain Vat</h1>
      <p class="subtitle">Earn your income while you sleep</p>



    <div class="search-wrapper">
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
    </div>
</div>

    <div class="spacer"></div>


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
  overflow-x: hidden;
  width: 100%;
}
.first-component {
  max-height: 100vh;
  min-height: 100vh;
}
.hero-section {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10%;
  padding: 0 1rem;
  padding-bottom: 0rem;
  box-sizing: border-box;
}

h1 {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: #333238;
}

.subtitle {
  font-size: 2rem;
  color: #333238;
  margin-bottom: 2rem;
}

/* Sticky Suchleiste */
.search-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #9482BC;
  padding: 1rem 0;
  width: 100%;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1 1 300px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  outline: none;
  min-width: 200px;
}

.search-button {
  padding: 1rem 2rem;
  font-size: 1rem;
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


.timeline-section {
  margin-top: 10%;
  padding: 0rem 0rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.timeline-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-left,
.timeline-right {
  max-width: 45%;
  flex: 1 1 300px;
}

.timeline-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .search-input,
  .search-button {
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }

  .timeline-left,
  .timeline-right {
    max-width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>
