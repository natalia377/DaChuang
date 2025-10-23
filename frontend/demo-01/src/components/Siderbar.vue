<template>
  <div class="sidebar-container">
    <!-- Logo 和名称部分 -->
    <div class="logo-section">
      <div class="logo-circle"></div>
      <span class="logo-name">慧编未来</span>
    </div>

    <!-- 导航菜单部分 -->
    <nav class="nav-menu">
      <button
        v-for="item in menuItems"
        :key="item.key"
        class="nav-item"
        :class="{ selected: currentPath === item.path }"
        @click="handleClick(item.key)"
        :aria-label="item.label"
      >
        <el-icon class="nav-icon"><component :is="item.icon" /></el-icon>
        <span class="nav-text">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Document, Edit, User } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const currentPath = computed(() => route.path);

const menuItems = [
  { key: 'teaching', label: '编程教学', icon: Document, path: '/coursesection' },
  { key: 'practice', label: '练习实践', icon: Edit, path: '/pracindex' },
  { key: 'profile', label: '个人中心', icon: User, path: '/profile' },
];

const handleClick = (key) => {
  const item = menuItems.find(i => i.key === key);
  if (item) {
    // sessionStorage.clear(); // 按需启用
    router.push(item.path);
  }
};
</script>

<style scoped>
.sidebar-container {
  height: 100vh;
  width: 240px;
  /* 浅蓝到白的柔和渐变，带一点方向感 */
  background: linear-gradient(160deg, #e6f4ff 0%, #f0f9ff 50%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  box-sizing: border-box;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.06);
  border-right: 1px solid #e0e7ff;
}

/* Logo 区域 */
.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  padding: 0 20px;
}

.logo-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1890ff 0%, #59bfff 100%);
  box-shadow: 0 3px 6px rgba(24, 144, 255, 0.25);
  margin-right: 14px;
}

.logo-name {
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #0d47a1 0%, #1890ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 1px;
  text-shadow: none;
}

/* 导航菜单 */
.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: #1a365d; /* 深蓝灰，比纯黑更柔和 */
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  outline: none;
}

.nav-item:hover {
  background-color: #e6f4ff;
  transform: translateX(4px);
}

.nav-item:active {
  background-color: #d1e9ff;
  transform: translateX(2px);
}

.nav-item.selected {
  background: #e6f4ff;
  border-left: 4px solid #1890ff;
  color: #0d6efd;
  box-shadow: 0 2px 6px rgba(24, 144, 255, 0.15);
}

.nav-icon {
  font-size: 22px;
  margin-right: 14px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff; /* 图标使用主蓝色 */
}

.nav-text {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 选中时图标也变深 */
.nav-item.selected .nav-icon {
  color: #0d6efd;
}
</style>