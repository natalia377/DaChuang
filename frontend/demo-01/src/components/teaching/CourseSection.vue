//编程教学主界面--课程系列
<template>
  <div class="course-section">
    <!-- 课程系列标题 -->
    <h2 class="section-title">课程系列</h2>

    <!-- 空状态提示 -->
    <div v-if="!loading && paginatedCourses.length === 0" class="empty-state">
      <el-icon size="60" class="empty-icon"><Document /></el-icon>
      <p class="empty-text">当前没有课程系列</p>
    </div>

    <!-- 课程卡片网格 -->
    <div v-else class="course-grid">
      <el-card
        v-for="course in paginatedCourses"
        :key="course.id"
        class="course-card"
        :body-style="{ padding: '0' }"
        @click="handleCardClick(course)"
      >
        <!-- 课程图片 -->
        <div class="course-image">
          <el-icon size="60" class="image-placeholder"><Document /></el-icon>
        </div>

        <!-- 课程信息 -->
        <div class="course-info">
          <h3 class="course-title">{{ course.name }}</h3>
          <p class="course-description">{{ course.description || '暂无描述' }}</p>
        </div>
      </el-card>
    </div>

    <!-- 分页控件（仅在有数据时显示） -->
    <div v-if="!loading && total > pageSize" class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 加载状态（可选） -->
    <el-skeleton v-if="loading" :rows="4" animated />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Document } from '@element-plus/icons-vue';
import { ElCard, ElPagination, ElIcon, ElSkeleton } from 'element-plus';
import { getCourseSectionsPage } from '../../utils/teaching/CourseSectionAPI';
import { useRouter } from 'vue-router';

const router = useRouter();

// 响应式数据
const pageSize = ref(12);
const currentPage = ref(1);
const courses = ref([]);
const total = ref(0);
const loading = ref(true); // 新增加载状态

// 计算属性
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));
const paginatedCourses = computed(() => courses.value);

// 获取数据
const fetchCourses = async () => {
  loading.value = true;
  try {
    const response = await getCourseSectionsPage(currentPage.value, pageSize.value, null, null);
    // ✅ 修复：使用后端返回的 total
    courses.value = response.data.records || [];
    total.value = response.data.total || 0; // 关键修复！
  } catch (error) {
    console.error('获取课程数据失败:', error);
    courses.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

// 跳转
const handleCardClick = (course) => {
  sessionStorage.setItem('selectedCourseSectionId', String(course.id));
  router.push('/course');
};

// 分页
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchCourses();
};

// 初始化
onMounted(() => {
  fetchCourses();
});
</script>

<style scoped>
.course-section {
  padding: 24px;
  background: linear-gradient(160deg, #f8fafc 0%, #ffffff 100%);
  min-height: 100vh;
}

.section-title {
  color: #0d47a1;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: left;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #1890ff, #59bfff);
  border-radius: 2px;
  margin-top: 8px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.empty-icon {
  color: #b3d9ff;
  margin-bottom: 16px;
}

.empty-text {
  color: #8c8c8c;
  font-size: 16px;
  font-weight: 500;
}

/* 课程网格 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 30px;
}

.course-card {
  height: 280px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid #e6f4ff;
}

.course-card:hover {
  box-shadow: 0 6px 20px rgba(24, 144, 255, 0.18);
  transform: translateY(-3px);
  border-color: #cce6ff;
}

.course-image {
  height: 140px;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
}

.image-placeholder {
  opacity: 0.7;
}

.course-info {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.course-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a365d;
  margin: 0 0 10px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.course-description {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex: 1;
  margin: 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .course-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 992px) {
  .course-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .course-grid { grid-template-columns: 1fr; }
  .course-card { height: auto; min-height: 240px; }
}
@media (max-width: 576px) {
  .course-section { padding: 16px; }
  .section-title { font-size: 20px; }
}
</style>