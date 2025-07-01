<template>
   <template v-if="userStore.isLoggedIn">
  <div class="job-details-container">
    <!-- Header: Bild + Infos... -->

    <div class="job-header">
      <div class="image-wrapper">
        <img
          v-if="job.bannerUrl"
          :src="job.bannerUrl"
          class="job-image"
          alt="Job image"
        />
        <div v-else class="job-image job-image--placeholder">
          <span class="placeholder-icon">🌟</span>
        </div>
      </div>

      <div class="job-info">
        <h1 class="job-title">{{ job.title }}</h1>

        <div class="job-tags">
          <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
          <span class="tag price-tag">{{ job.price }}</span>
        </div>

        <p class="institute-desc">
          {{ job.description }}
        </p>

                        <button
                  class="apply-button"
                  :disabled="appliedJobIds.includes(job.id)"
                  @click="confirmApply(job.id)"
                  :title="appliedJobIds.includes(job.id) ? 'You already applied for this job' : ''"
                >
                  {{'Apply Now' }}
                </button>
      </div>
    </div>

    <div class="job-meta">
      <h2>Job Details</h2>
      <div class="job-details-list">
        <ul>
          <li>✔️ {{ job.price }}</li>
          <li>✔️ Multiple Iterations</li>
        </ul>
        <ul>
          <li>✔️ No Deadline</li>
          <li>✔️ ...</li>
        </ul>
      </div>
    </div>

    <div class="job-description">
      <h2>Job Description</h2>
      <p>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</p>
      <p>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
   </p>
    </div>

    <!-- Similar Jobs BASED ON TAGS! -->
    <div class="similar-jobs">
      <h2>Similar Jobs</h2>
      <div class="similar-jobs-grid">
        <div
          class="similar-job-card"
          v-for="similar in similarJobs"
          :key="similar.id"
        >
          <h3>{{ similar.title }}</h3>
          <p>{{ similar.description }}</p>
          <div class="tag-list">
            <span class="tag" v-for="tag in similar.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
      <div v-if="showConfirmPopup" class="popup-backdrop">
        <div class="popup-box">
          <p class="popup-text">
            Are you sure you want to do this job?<br />
            Currently there's no application needed – if you accept, a BrainVat Device will be sent to you!
          </p>
          <div class="popup-actions">
            <button @click="cancelApply" class="popup-cancel">Cancel</button>
            <button @click="doApply" class="popup-confirm">Confirm</button>
          </div>
        </div>
      </div>
     </div>
      </template>
    <template v-else>
      <div class="not-logged-in">
        <h2>You need to be logged in to see this page</h2>
        <button class="signin-button" @click="router.push('/login')">Login</button>
      </div>
    </template>

</template>

<script setup>
import { useRoute } from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import { allJobs } from '@/utils/jobUtil'
import { useUserStore } from '@/components/stores/userStore'

import { useRouter } from 'vue-router'
import {supabase} from "@/lib/supabase.js";
import {ElMessage} from "element-plus";
const userStore = useUserStore()
const router = useRouter()

const route = useRoute()
const jobId = Number(route.params.id)
const job = computed(() => allJobs.find(j => j.id === jobId))

const appliedJobIds = ref([])
const showConfirmPopup = ref(false)
const pendingJobId = ref(null)

onMounted(async () => {

  if (userStore.isLoggedIn) {
    const { data, error } = await supabase
      .from('user_jobs')
      .select('job_id')
      .eq('user_id', userStore.user.id)

    appliedJobIds.value = data?.map(entry => entry.job_id) || []
  }
})


function confirmApply(jobId) {
  if (!userStore.isLoggedIn) {
    alert("You must be signed in to apply.")
    return
  }
  pendingJobId.value = jobId
  showConfirmPopup.value = true
}

function cancelApply() {
  showConfirmPopup.value = false
  pendingJobId.value = null
}

async function doApply() {
  if (!pendingJobId.value) return
  const jobId = pendingJobId.value

  const { error } = await supabase.from('user_jobs').insert({
    user_id: userStore.user.id,
    job_id: jobId,
  })

  if (error) {
    console.error(error)
    ElMessage.error('Something went wrong while applying.')
  } else {
    appliedJobIds.value.push(jobId)
    ElMessage.success('Successfully applied! A BrainVat Device will be shipped!')
  }

  showConfirmPopup.value = false
  pendingJobId.value = null
}

const similarJobs = computed(() => {
  if (!job.value) return []
  return allJobs
    .filter(j => j.id !== jobId && j.tags.some(tag => job.value.tags.includes(tag)))
    .slice(0, 3)
});

</script>


<style scoped>
.job-details-container {
  width: 100%;
  min-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
}

.job-header {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  align-items: flex-start;
}

.image-wrapper {
  width: 100%;
  height: auto;
}

.job-image {
  width: 100%;
  height: auto;
  max-height: 280px;
  object-fit: cover;
  border-radius: 12px;
  background-color: #eee;
}

.job-image--placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  height: 280px;
  font-size: 2rem;
  color: #999;
}

.job-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background-color: #e4f3ea;
  color: #256d51;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
}

.price-tag {
  background-color: #f1f5f9;
  color: #111;
}

.institute-link {
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  margin-bottom: 0.2rem;
  font-weight: 600;
}

.institute-desc {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.apply-btn {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.apply-btn:hover {
  background-color: #222;
}

.job-meta {
  margin-bottom: 2rem;
}

.job-details-list {
  display: flex;
  gap: 3rem;
}
.apply-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  opacity: 0.6;
}

.apply-button {
  background-color: #1e1e1e;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.top-left {
  flex: 1;
}
.popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 30px rgba(0,0,0,0.1);
}

.popup-text {
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.popup-cancel,
.popup-confirm {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.popup-cancel {
  background-color: #ddd;
  color: #333;
}

.popup-confirm {
  background-color: #1e1e1e;
  color: white;
}
.job-details-list ul {
  list-style: none;
  padding-left: 0;
}

.job-details-list li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #444;
}

.job-description {
  margin-bottom: 3rem;
}

.job-description h2 {
  margin-bottom: 1rem;
}

.job-description p {
  margin-bottom: 1rem;
  color: #444;
  line-height: 1.6rem;
}

.similar-jobs h2 {
  margin-bottom: 1rem;
}

.similar-jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.2rem;
}

.similar-job-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background: #fafafa;
}

.similar-job-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.similar-job-card p {
  font-size: 0.9rem;
  color: #555;
}

.tag-list {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
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
