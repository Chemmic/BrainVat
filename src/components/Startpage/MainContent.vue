<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

function search() {
  const query = searchQuery.value.trim()
  if (query) {
    router.push({path: '/jobs', query: {search: query}})
  } else {
    router.push('/jobs')
  }
}

const steps = ref([
  {
    title: 'Apply',
    text: 'Sign up and apply for Jobs on BrainVat.xyz.\nYou can search and filter between a vast variety of jobs!',
    image: 'Apply.png',
  },
  {
    title: 'Get Package',
    text: 'The BCI package will be sent directly to your home.\n' +
        "You will rent the BCI device until you do not need it anymore",
    image: 'BrainVatUebergabe.jpg',
  },
  {
    title: 'Earn in your sleep',
    text: 'Each BCI is connected with your account and one specific job.\nJust put it on while sleeping to litterly make money while sleeping!',
    image: 'Sleep.png',
  },
  {
    title: 'Return Package',
    text: 'You dont want to use BrainVat or a specific job anymore?\nNo problem! Just return the BCI back to us.'
  },
  {
    title: 'Get Paid',
    text: 'Receive your payment.'
  },
])
</script>

<template>
  <section class="main">
    <!-- Hero-Teil -->
    <div class="hero-section">
      <div>
        <h1>Brain Vat</h1>
        <p class="subtitle">Earn your income while you sleep</p>
      </div>
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

      <div class="spacer"></div>

<h2 class="timeline-title">How does BrainVat work</h2>
      <div class="timeline-section">

<div class="custom-timeline">
  <div
    v-for="(step, index) in steps"
    :key="index"
    class="timeline-item"
    :class="index % 2 === 0 ? 'left' : 'right'"
  >
    <!-- Die Zahl auf der Mittellinie -->
    <div :class="index % 2 === 0 ? 'left-circle' : 'right-circle'">{{ index + 1 }}</div>

    <!-- Inhalt (Text + Bild) abwechselnd links/rechts -->
    <div class="timeline-content">
      <h3>{{ step.title }}</h3>
      <p>{{ step.text }}</p>
      <img :src="step.image" class="timeline-image"  alt=""/>
    </div>
  </div>
</div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  background-color: #9482BC;
  width: 100%;
}

.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10%;
  padding: 0 1rem 0;
  box-sizing: border-box;
}

.spacer {
  margin-bottom: 8rem;
  min-height: 50vh;
  height: 500px;
}

h1 {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: #333238;
}

h2 {
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: -7rem;
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
  background: var(--cyber-amethyst);
  background: linear-gradient(180deg, var(--cyber-amethyst) 0%, rgba(237, 221, 83, 0) 100%);
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
  padding: 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
}


.custom-timeline {
  position: relative;
  margin: 0 auto;
  padding: 50px 0;
  width: 100%;
  max-width: 1000px;
}

/* Zentrale vertikale Linie */
.custom-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background-color: white;
  z-index: 1;
}

/* Timeline-Eintrag */
.timeline-item {
  position: relative;
  width: 50%;
  padding: 2rem 2rem;
  box-sizing: border-box;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  text-align: left;
}

/* Inhalte links/rechts */
.timeline-content {
  background-color: #ffffff22;
  border-radius: 10px;
  padding: 1rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.timeline-image {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  object-fit: cover;
}

/* Runde Nummern auf der Linie */
.left-circle {
  position: absolute;
  top: 1rem;
  left: 100%;
  right: 0%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background-color: white;
  color: #333238;
  border: 2px solid #333238;
  width: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.right-circle {
  position: absolute;
  top: 1rem;
  left: 0%;
  right: 0%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background-color: white;
  color: #333238;
  border: 2px solid #333238;
  width: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
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
  .timeline-content,
  .timeline-content.reverse {
    flex-direction: column;
    text-align: center;
  }

  .timeline-text, .timeline-image-wrapper {
    flex: 1 1 100%;
  }
  .timeline-left,
  .timeline-right {
    max-width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>
