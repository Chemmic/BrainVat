<template>
  <footer class="footer">

    <div class="social-icons">
      <a href="https://twitter.com" target="_blank">
        <font-awesome-icon :icon="['fab', 'x-twitter']" />
      </a>
      <a href="https://instagram.com" target="_blank">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
      <a href="https://youtube.com" target="_blank">
        <font-awesome-icon :icon="['fab', 'youtube']" />
      </a>
      <a href="https://linkedin.com" target="_blank">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
      </a>
    </div>

    <!-- Footer Links -->
    <div class="footer-links">
      <div class="column">
        <a href="#">Salaries</a>
        <a href="#">Career Advice</a>
      </div>
      <div class="column">
        <a href="#">Terms</a>
        <a href="#">FAQ</a>
      </div>
      <div class="column">
        <a href="#">About</a>
        <a href="#">Help</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 64px;
  background-color: white;
  border-top: 1px solid #eee;
  height: 100%;
}

.social-icons {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-icons a {
  color: black;
  font-size: 22px;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.social-icons a:hover {
  opacity: 0.6;
}

.footer-links {
  display: flex;
  gap: 80px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  transform: translateX(-40px);
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.column a {
  color: black;
  font-size: 18px;
  text-decoration: none;
  transition: color 0.2s;
}

.column a:hover {
  text-decoration: underline;
}
</style>
