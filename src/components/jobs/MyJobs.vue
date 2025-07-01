<template>
  <template v-if="userStore.isLoggedIn">
    <div class="my-jobs-page">
      <h1 class="page-title">My Jobs</h1>

      <div class="my-jobs-grid">
        <div v-for="job in appliedJobs" :key="job.id" class="my-job-card">
          <h2 class="job-title">{{ job.title }}</h2>
          <p class="job-price"><strong>{{ job.price }}</strong></p>
            <p class="job-status">
              Status: <span :class="statusColorClass(job.status)">{{ job.status || 'could not load status' }}</span>
            </p>
          <div class="actions">
            <RouterLink :to="`/jobStats/${job.id}`">
              <button class="view-button">View</button>
            </RouterLink>
            <button class="cancel-button" @click="cancelJob(job.id)">Cancel Job</button>
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
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/components/stores/userStore'
import { supabaseCopy } from '@/lib/supabaseCopy.js'
import { useRouter } from 'vue-router'
import { allJobs } from '@/utils/jobUtil'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

const appliedJobs = ref([])

onMounted(async () => {
  if (!userStore.isLoggedIn) return

  const { data, error } = await supabaseCopy
    .from('user_jobs')
    .select('job_id, status')
    .eq('user_id', userStore.user.id)

  if (error) {
    console.error('Error fetching user jobs:', error)
    return
  }

  // Match with job data
  appliedJobs.value = data.map(jobEntry => {
    const jobDetails = allJobs.find(j => j.id === jobEntry.job_id)
    return {
      ...jobDetails,
      status: jobEntry.status ?? null
    }
  })
})

async function cancelJob(jobId) {
  console.log('Attempting delete for:', {
    user_id: userStore.user.id,
    job_id: jobId
  })

  const { error } = await supabaseCopy
    .from('user_jobs')
    .delete()
    .eq('user_id', userStore.user.id)
    .eq('job_id', jobId)

  if (error) {
    console.error(error)
    ElMessage.error('Failed to cancel job.')
  } else {
    ElMessage.success('Job cancelled.')
    appliedJobs.value = appliedJobs.value.filter(job => job.id !== jobId)
  }
}
function statusColorClass(status) {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return 'status-green'
    case 'cancelled':
      return 'status-red'
    case 'ordered':
    case 'on the way':
      return 'status-yellow'
    default:
      return 'status-red'
  }
}

</script>

<style scoped>
.my-jobs-page {
  padding: 60px 30px;
  /* Zentrierung sah scheiße aus */
  max-width: none;
  margin: 0;
}
.status-green {
  color: #27ae60;
  font-weight: 500;
}

.status-red {
  color: #e74c3c;
  font-weight: 500;
}

.status-yellow {
  color: #f1c40f;
  font-weight: 500;
}
.my-jobs-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}


.page-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 30px;
}



.my-job-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
}

.job-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.job-price {
  font-size: 14px;
  margin-bottom: 6px;
}

.job-status {
  font-size: 13px;
  color: #666;
}

.actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
}

.view-button {
  background: #1e1e1e;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.cancel-button {
  background: #e74c3c;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.not-logged-in {
  text-align: center;
  margin-top: 100px;
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
