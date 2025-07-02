<template>
  <div class="color-container">
      <div class="faq-container">
        <h1 class="faq-title">BrainWHAT?!?</h1>

        <section class="faq-category" v-for="(category, index) in faqCategories" :key="index">
          <h2 class="category-title">{{ category.title }}</h2>
          <el-collapse accordion :expand-icon-position="'left'">
            <el-collapse-item v-for="(item, idx) in category.items" :title="item.question" :name="idx.toString()" :key="idx">
              <p>{{ item.answer }}</p>
            </el-collapse-item>
          </el-collapse>
        </section>
      </div>
    </div>
</template>

<script setup>
const faqCategories = [
  {
    "title": "Introduction to BrainVat",
    "items": [
      {
        "question": "What is BrainVat?",
        "answer": "BrainVat is a futuristic computing platform that uses the human brain as a natural processing unit. While the user sleeps, their brain is connected via a non-invasive Brain-Computer Interface (BCI) to the cloud, allowing it to perform tasks such as AI model training, data processing, and cryptographic computations. It’s a sustainable, passive way to contribute to the digital world and earn income."
      },
      {
        "question": "Who uses the computing power?",
        "answer": "Verified clients such as AI research labs, universities, biotech firms, and data science companies use BrainVat for secure, distributed computing tasks. All clients are screened to ensure ethical data usage and compliance with sustainability standards."
      },
      {
        "question": "What are the environmental benefits?",
        "answer": "BrainVat significantly reduces the need for traditional, energy-intensive server farms. Since the brain consumes only a fraction of the energy compared to machines, the system cuts energy usage by up to 95% and helps lower global CO₂ emissions from data centers."
      }
    ]
  },
  {
    "title": "Technology & Functionality",
    "items": [
      {
        "question": "How does it work while I’m sleeping?",
        "answer": "Users wear a comfortable BCI-enabled headset that connects their brain to the BrainVat system. The interface monitors brain activity and activates low-impact processing modes that align with natural sleep cycles. These background computations happen without waking or disrupting the user, allowing productive use of normally idle brain capacity."
      },
      {
        "question": "What device do I need?",
        "answer": "To use BrainVat, you’ll need one of the certified BCI products that is compatible with our platform. Devices are available through our network of partners or issued directly to accepted users."
      },
      {
        "question": "Can I use BrainVat during naps or only overnight?",
        "answer": "While BrainVat is optimized for full sleep cycles, short nap sessions can be used. However, they are less efficient due to limited processing time and lower consistency in brain states."
      },
      {
        "question": "What kind of computing tasks does my brain solve?",
        "answer": "Your brain can solve pattern recognition, neural model optimization, cryptographic verification, and other forms of distributed data processing. All tasks are listed on the market."
      },
      {
        "question": "How is the brain more efficient than a supercomputer?",
        "answer": "The human brain operates with unparalleled efficiency, using less than 20 watts of power while performing trillions of operations. Unlike traditional processors, it can adapt, parallelize, and self-optimize tasks — all without needing artificial cooling or massive energy input."
      }
    ]
  },
  {
    "title": "Safety & Privacy",
    "items": [
      {
        "question": "Is it safe for my health?",
        "answer": "Yes. BrainVat uses medically approved, non-invasive technology that has undergone extensive clinical testing. The system avoids overstimulation and respects brain recovery phases such as REM sleep. Continuous monitoring ensures safety, and users can pause or stop participation at any time."
      },
      {
        "question": "Can BrainVat read my mind?",
        "answer": "No. BrainVat does not have access to thoughts, memories, or personal content. All data is encrypted and processed anonymously."
      },
      {
        "question": "Does it affect my dreams or REM sleep?",
        "answer": "No. BrainVat has no recorded effects on dreams or REM sleep."
      }
    ]
  },
  {
    "title": "Usage & Participation",
    "items": [
      {
        "question": "What are the requirements to join?",
        "answer": "Participants must be at least 18 years old and in good neurological health. A basic onboarding assessment ensures compatibility. Users also need a certified BCI headset, which is either provided or available through official BrainVat partners."
      },
      {
        "question": "What happens if I wake up or remove the device mid-task?",
        "answer": "This will pause the Data Stream. The task will continue when you start sleeping again. Pause can be a max of 15 minutes. After that the task will be cancelled."
      }
    ]
  }
]
</script>

<style>
.main-scroll-container {
  background-color: #f5f5f5 !important;
}
</style>
<style scoped>
.color-container {
  min-width: 100%;
  min-height: 100%;
  background-color: #f5f5f5;
}


.faq-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* horizontal zentriert */
  padding: 3rem 3rem;
  width: 100%;
  max-width: 900px;
  min-height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #fff;
}

.faq-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.faq-category {
  width: 100%;
  margin-bottom: 2rem;
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

</style>