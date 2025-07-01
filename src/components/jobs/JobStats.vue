<template>
  <div v-if="userStore.isLoggedIn && job">
    <div class="job-stats-container">
      <img :src="job.imageUrl || defaultImage" class="job-image" alt="Job image" />
      <div class="text-container">
      <h1 class="job-title">{{ job.title }}</h1>
          <p class="job-description">{{ job.description }}</p>
        <el-button type="primary" class="details-button" @click="router.push(`/jobs/${jobId}`)">
          More Details
        </el-button>
        </div>
      <el-steps :active="statusStepIndex" finish-status="success" align-center>
        <el-step title="Ordered" />
        <el-step title="On the Way" />
        <el-step title="Delivered" />
        <el-step title="Dreaming" />
        <el-step title="returned" />
      </el-steps>


      <div class="charts">
        <canvas ref="earningsChart"></canvas>
        <canvas ref="brainChart"></canvas>
      </div>
    </div>

  </div>

  <div v-else class="not-logged-in">
    <h2>You must be logged in to view this job.</h2>
    <button @click="router.push('/login')">Login</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/components/stores/userStore'
import { allJobs } from '@/utils/jobUtil'
import { supabase } from '@/lib/supabase.js'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const jobId = parseInt(route.params.id)
const job = computed(() => allJobs.find(j => j.id === jobId))
const defaultImage = '/default.jpg'

const status = ref('ordered') // Default bis Supabase geladen
const statusStepIndex = computed(() => {
  switch (status.value?.toLowerCase()) {
    case 'ordered': return 0
    case 'on the way': return 1
    case 'delivered': return 3
    case 'dreaming': return 4
    case 'returned': return 5
    default: return 0
  }
})

const earningsChart = ref(null)
const brainChart = ref(null)

onMounted(async () => {
  await userStore.restoreSession()

  if (!userStore.user) {
    router.push('/login')
    return
  }

  const { data, error } = await supabase
    .from('user_jobs')
    .select('status')
    .eq('user_id', userStore.user.id)
    .eq('job_id', jobId)
    .single()

  if (error) {
    console.error('Error loading job status:', error)
    status.value = "could not load"
  } else {
    status.value = data.status
  }

  const isDelivered = status.value?.toLowerCase() === 'dreaming'

  const earningsData = isDelivered ? [60, 30, 110, 0, 60] : [0, 0, 0, 0, 0]
  const brainData = isDelivered ? [210, 180, 260, 190] : [0, 0, 0, 0]

new Chart(earningsChart.value, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Earnings ($)',
      data: earningsData,
      borderColor: '#42a5f5',
      backgroundColor: 'rgba(66, 165, 245, 0.4)',
      borderWidth: 3,
      borderRadius: 5,
      barThickness: 100
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weekly Earnings Overview',
        font: {
          size: 20,
          weight: 'bold'
        },
        padding: {
          top: 20,
          bottom: 10
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ` $${context.parsed.y.toFixed(2)} earned`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weekday',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          font: {
            size: 13
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Earnings in USD ($)',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          callback: value => `$${value}`,
          font: {
            size: 13
          }
        },
        grid: {
          borderDash: [4, 4]
        }
      }
    }
  }
})

const timeLabels = ['22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00']
const gigaBrainData = isDelivered
  ? [50, 65, 120, 180, 220, 200, 160, 130, 80, 40]
  : Array(timeLabels.length).fill(0)

new Chart(brainChart.value, {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'GigaBrain 🧠 (Neuron/sec)',
      data: gigaBrainData,
      borderColor: '#8e44ad',
      backgroundColor: 'rgba(142, 68, 173, 0.2)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Information proccessed (GigaBrain)',
                    font: {
            size: 16,
            weight: 'bold'
          }
        }

      },
      x: {
        title: {
          display: true,
          text: 'Time',
                    font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  }
})
})


</script>

<style scoped>
.job-stats-container {
  max-width: 100%;

  background-color: white !important;
  margin-bottom: 50px;

}

.text-container {
 margin-left: 20px;
}

:deep(.main-scroll-container) {
  background-color: white !important;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: white !important;
  overflow-x: hidden;
}

.job-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 24px;
}

.job-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.job-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.charts {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-wrap: wrap;
  background-color: white !important;
  justify-content: center;
}
.details-button {
  background-color: #333238;
  color: white;
  margin-bottom: 30px;
  border: none;
}
canvas {
  width: 45%;
  max-width: 45%;
  height: 500px;
  background-color: white !important;
  max-height: 500px;

}
.not-logged-in {
  text-align: center;
  margin-top: 100px;
  background-color: white !important;
}
</style>
<style>
.main-scroll-container {
  background-color: white !important;
}
</style>