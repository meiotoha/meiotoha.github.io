<script setup lang="ts">
import HeaderCom from '@/components/HeaderCom.vue'
import IconComponent from '@/components/IconComponent.vue'
import { PERSONAL_INFO } from '@/consts'
import { getAvatarUrl } from '@/utils/avatar'

const avatarUrl = getAvatarUrl(
  PERSONAL_INFO.avatarType,
  PERSONAL_INFO.username,
  PERSONAL_INFO.email,
  PERSONAL_INFO.avatar,
  240,
)
</script>

<template>
  <div class="base-page">
    <HeaderCom :title="PERSONAL_INFO.about.title" />

    <div class="about-container">
      <!-- profile -->
      <div class="profile-card">
        <div class="profile-header">
          <img :src="avatarUrl" :alt="PERSONAL_INFO.name" class="avatar" />
          <div class="profile-info">
            <h2 class="name">{{ PERSONAL_INFO.name }}</h2>
            <p class="username">@{{ PERSONAL_INFO.username }}</p>
            <p class="description">{{ PERSONAL_INFO.description }}</p>
          </div>
        </div>

        <!-- social -->
        <div class="social-links">
          <a
            v-for="(social, key) in PERSONAL_INFO.social"
            :key="key"
            :href="social.url"
            :title="social.label"
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent :icon-type="social.icon" size="20px" />
            <span class="label">{{ social.label }}</span>
          </a>
        </div>
      </div>

      <!-- content -->
      <div class="about-content">
        <div class="content-text" v-html="PERSONAL_INFO.about.content.replace(/\n/g, '<br>')"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-card {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #444;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: #666;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.name {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.username {
  font-size: 18px;
  color: #888;
  margin: 0;
}

.description {
  font-size: 16px;
  color: #cccccc;
  line-height: 1.5;
  margin: 0;
  text-align: center;
  max-width: 600px;
}

.social-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #2a2a2a;
  border-radius: 20px;
  text-decoration: none;
  color: #cccccc;
  transition: all 0.3s ease;
  border: 1px solid #444;
}

.social-link:hover {
  background: #3a3a3a;
  transform: translateY(-1px);
  border-color: #555;
}

.social-link .label {
  font-size: 14px;
  font-weight: 500;
}

.about-content {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.content-text {
  font-size: 16px;
  line-height: 1.8;
  color: #cccccc;
  white-space: pre-line;
}

.site-info {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.site-info h3 {
  font-size: 20px;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.site-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-item {
  font-size: 14px;
  color: #cccccc;
}

.site-item strong {
  color: #ffffff;
}

.site-item a {
  color: #64b5f6;
  text-decoration: none;
}

.site-item a:hover {
  text-decoration: underline;
  color: #90caf9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 15px;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-width: 3px;
  }

  .name {
    font-size: 24px;
  }

  .username {
    font-size: 16px;
  }

  .profile-card,
  .about-content,
  .site-info {
    padding: 20px;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
