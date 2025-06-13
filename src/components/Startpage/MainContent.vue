<template>
  <section class="main">
    <div class="content">
      <h1>Brain Vat</h1>
      <p class="subtitle">Earn your income while you sleep</p>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Browse your next dream..."
          class="search-input"
        />
        <button class="search-button">Search</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  background-color: #f5f5f5;
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
  color: #1e1e1e;
}

.subtitle {
  font-size: 34px;
  color: #555;
  margin-bottom: 50px;
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
  background-color: #1e1e1e;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #000;
}
</style>
