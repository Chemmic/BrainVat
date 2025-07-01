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
    title: 'Allgemeines',
    items: [
      { question: 'Lorem ipsum?', answer: 'Lorem ipsum.' },
    ]
  },
  {
    title: 'Benutzerkonto',
    items: [
      { question: 'Wie ändere ich mein Passwort?', answer: 'Gehen Sie zu den Kontoeinstellungen und wählen Sie "Passwort ändern".' },
      { question: 'Wie lösche ich mein Konto?', answer: 'Bitte kontaktieren Sie unseren Support über das Kontaktformular.' }
    ]
  }
]
</script>


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