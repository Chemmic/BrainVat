<template>
  <header class="header">
    <el-menu mode="horizontal" class="menu" :default-active="'1'" background-color="transparent" text-color="#1E1E1E" active-text-color="#1E1E1E">
      <el-menu-item index="1">View Jobs</el-menu-item>
      <el-menu-item index="2">Resources</el-menu-item>
      <el-menu-item index="3">Contact</el-menu-item>
      <div class="button-group">
        <el-button type="default" plain class="gray">Sign in</el-button>
        <el-button type="primary" class="black">Register</el-button>
      </div>
    </el-menu>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
}


.menu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: none !important;

}

::v-deep(.el-menu-item) {
  font-size: 16px;
  line-height: 16px;
  padding: 0 10px;
}


.button-group {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  margin-left: 1rem;
}

.black {
  background-color: black;
}

.gray {
  background-color: #D9D9D9;
}
</style>
