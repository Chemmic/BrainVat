<template>
  <div class="jobs-page">
    <template v-if="userStore.isLoggedIn">
      <div class="top-bar">
        <div class="top-left">
          <h1 class="title">Brain Vat – Dashboard</h1>
          <p class="subtitle">Browse jobs</p>
        </div>
<div class="top-right">
  <div class="filter-chips">
    <div
      class="chip"
      v-for="(filter, index) in activeFilters.slice(0, 5)"
      :key="index">
      {{ filter }}
      <span class="remove-chip" @click="removeFilter(filter)">✕</span>
    </div>
  <button
    v-if="activeFilters.length > 0"
    class="clear-all"
    @click="clearAllFilters"
  >
    Clear all
  </button>

  </div>

  <input
    v-model="searchInput"
    @keyup.enter="onEnterSearch"
    type="text"
    class="search-input"
    placeholder="Search jobs..."
  />

  <div class="burger-icon" @click="toggleMenu">
                <svg width="24" height="24" viewBox="0 0 24 24">
              <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
              <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
              <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
            </svg>
  </div>
</div>
      </div>



      <!-- Filter Sidebar -->
      <div v-if="isMenuOpen" class="filter-sidebar">
        <div class="filter-header">
          <div>
            <h3 class="filter-title">Filter Jobs</h3>
            <p class="filter-subtitle">Select your preferences</p>
          </div>
          <button class="close-btn" @click="toggleMenu">✕</button>
        </div>

        <div class="filter-body">
          <label>Category</label>
          <select v-model="newTag" @change="addTag">
            <option disabled value="">Select a tag</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>

          <div class="selected-tags">
            <span class="chip" v-for="tag in selectedTags" :key="tag">
              {{ tag }}
              <span class="remove-chip" @click="removeSelectedTag(tag)">✕</span>
            </span>
          </div>

          <div class="switch-row">
            <span>All Tags should apply</span>
            <el-switch
              v-model="allTagsShouldApply"
              active-text=""
              inactive-text=""
              inline-prompt
              style="--el-switch-on-color: #BEFFE6; --el-switch-off-color: #ccc"
            />
          </div>

          <div class="slider-label-row">
            <div class="slider-label">
              <span>Income Range</span>
              <span class="slider-currency"></span>
            </div>
            <div class="income-display-inline">{{ incomeMin }}$ – {{ incomeMax }}$</div>
          </div>

          <div class="slider-wrapper">
            <double-range-slider
              :min="incomeMin"
              :max="incomeMax"
              :min-threshold="0"
              :max-threshold="1000"
              :step="10"
              @update:min="value => incomeMin = +value"
              @update:max="value => incomeMax = +value"
              class="custom-slider"
            />
          </div>

          <div class="filter-actions">
            <button class="btn-reset" @click="resetFilters">Reset</button>
            <button class="btn-confirm" @click="toggleMenu">Confirm</button>
          </div>
        </div>
      </div>

      <div class="jobs-list">
        <template v-if="jobs.length">
          <div v-for="job in jobs" :key="job.id" class="job-card" :class="{ featured: job.featured }">
            <div class="job-content">
              <div class="job-image">
                <img :src="job.imageUrl || placeholderImage" :alt="`job-${job.id}`" class="job-img" />
              </div>
              <div class="job-info">
                <div class="job-header">
                  <span v-if="job.featured" class="featured-label">SPONSORED</span>
                  <h2 class="job-title">{{ job.title }}</h2>
                </div>
                <p class="job-description">{{ job.description }}</p>
                <div class="tags">
                  <span v-for="tag in job.tags" :key="tag" class="tag">{{ tag }}</span>
                  <span class="tag price">{{ job.price }}</span>
                </div>
                <div class="actions">
                  <RouterLink :to="`/jobs/${job.id}`">
                    <button class="text-button">View Details</button>
                  </RouterLink>
                  <button class="apply-button">Apply for Job</button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="no-results">No jobs found matching your filters.</p>
        </template>
      </div>
    </template>

    <template v-else>
      <div class="not-logged-in">
        <h2>You need to be logged in to see this page</h2>
        <button class="signin-button" @click="router.push('/login')">Login</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/components/stores/userStore'
import { useRouter } from 'vue-router'
import placeholderImage from '@/assets/img_placeholder.png'
import droneImage from '@/assets/drone.png'
import plant_ill from '@/assets/plant_ill.png'
import text_to_speech from '@/assets/text-to-speech.jpg'
import gaming from '@/assets/gaming.png'
import {allJobs} from '@/utils/jobUtil.js'


const userStore = useUserStore()
const router = useRouter()
const isMenuOpen = ref(false)
const allTagsShouldApply = ref(false)
const selectedTags = ref([])
const newTag = ref('')
const incomeMin = ref(0)
const incomeMax = ref(1000)
const searchInput = ref('')
const activeFilters = ref([])



function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function addTag() {
  if (newTag.value && !selectedTags.value.includes(newTag.value)) {
    selectedTags.value.push(newTag.value)
  }
  newTag.value = ''
}

function removeSelectedTag(tag) {
  selectedTags.value = selectedTags.value.filter(t => t !== tag)
}

function resetFilters() {
  selectedTags.value = []
  newTag.value = ''
  allTagsShouldApply.value = false
  incomeMin.value = 0
  incomeMax.value = 1000
}

function onEnterSearch() {
  const value = searchInput.value.trim()
  if (
    value &&
    !activeFilters.value.includes(value) &&
    activeFilters.value.length < 5
  ) {
    activeFilters.value.push(value)
  }
  searchInput.value = ''
}
function removeFilter(tag) {
  activeFilters.value = activeFilters.value.filter(t => t !== tag)
}

function clearAllFilters() {
  activeFilters.value = []
}

const allTags = computed(() => {
  const set = new Set()
  allJobs.forEach(job => job.tags.forEach(tag => set.add(tag)))
  return Array.from(set)
})

const jobs = computed(() => {
  let filtered = allJobs.filter(job => {
    const jobTags = job.tags.map(t => t.toLowerCase())
    const selected = selectedTags.value.map(t => t.toLowerCase())
    const tagMatch = selectedTags.value.length === 0
      ? true
      : allTagsShouldApply.value
        ? selected.every(tag => jobTags.includes(tag))
        : selected.some(tag => jobTags.includes(tag))

    const numericPrice = parseFloat(job.price.replace(/[^0-9.]/g, ''))
    const priceMatch = numericPrice >= incomeMin.value && numericPrice <= incomeMax.value

    return tagMatch && priceMatch
  })

  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(job => {
      const title = job.title.toLowerCase()
      const tags = job.tags.map(t => t.toLowerCase())
      return activeFilters.value.every(filter => {
        const f = filter.toLowerCase()
        return title.includes(f) || tags.includes(f)
      })
    })
  }

  return filtered
})
</script>

<style scoped>
@import 'vue-double-slider/dist/style.css';

.jobs-page {
  padding: 150px 60px;
  background-color: #f5f5f5;
  min-height: 100%;
}

/* Just fuck this headers z-index */
/* nvm fixed */
.top-bar {
  position: fixed;
  top: 120px; /* Höhe des Headers!! */
  left: 0;
  right: 0;
  z-index: 900;
  background-color: #f5f5f5;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.top-left {
  flex: 1;
}

.title {
  font-size: 28px;
  font-weight: bold;
}

.subtitle {
  font-size: 16px;
  color: #888;
}

.top-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  overflow: hidden;
  flex-shrink: 0;
}

.filter-chips {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 70%;
  overflow-x: auto;
  white-space: nowrap;
}

.search-input {
  width: 240px;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex-shrink: 0;
}
.search-input:focus {
  outline: none;
  box-shadow: none;
  border-color: #ccc;
}

.burger-icon {
  cursor: pointer;
  flex-shrink: 0;
}

.chip {
  background-color: #1e1e1e;
  color: #fff;
  border-radius: 20px;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  gap: 8px;
  height: 32px;
  margin-bottom: 8px;
}

.remove-chip {
  margin-left: 4px;
  cursor: pointer;
  font-weight: bold;
}

.clear-all {
  background: none;
  border: none;
  font-size: 13px;
  color: #888;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}

.overflow-indicator {
  background: transparent;
  color: #666;
  font-size: 18px;
  font-weight: bold;
  padding: 0 6px;
}

.filter-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 910;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-title {
  font-weight: bold;
  font-size: 20px;
}

.filter-subtitle {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.filter-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.slider-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
}

.slider-currency {
  font-size: 14px;
  color: #333;
}

.income-display-inline {
  font-size: 14px;
  color: #333;
}

.slider-wrapper {
  margin-bottom: 12px;
}

.custom-slider .track {
  background-color: #BEFFE6 !important;
}

.custom-slider .thumb {
  background-color: #333 !important;
}

::v-deep(.slider .slider-line span) {
  background-color: #BEFFE6 !important;
  display: block;
  height: 100%;
  width: 0%;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.btn-reset {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #1e1e1e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
}

.job-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 24px;
}

.job-card.featured {
  border: 2px solid purple;
}

.job-content {
  display: flex;
  gap: 24px;
}

.job-image {
  width: 160px;
  height: 160px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.job-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.job-title {
  font-size: 18px;
  font-weight: 600;
}

.featured-label {
  font-size: 12px;
  background-color: purple;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.job-description {
  font-size: 14px;
  margin: 10px 0;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background: #e0e0e0;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
}

.tag.price {
  background: #1e1e1e;
  color: white;
}

.actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.no-results {
  margin-top: 120px;
  font-size: 18px;
  text-align: center;
  color: #777;
}

.text-button {
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

.apply-button {
  background-color: #1e1e1e;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.not-logged-in {
  text-align: center;
  margin-top: 100px;
}

.not-logged-in h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.signin-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.signin-button:hover {
  background-color: #222;
}
</style>
