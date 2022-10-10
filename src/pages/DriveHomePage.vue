<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

const showNav = ref(false)
const navItems = [
  { label: 'My Drive', icon: '', to: 'my-drive' },
  { label: 'Shared with me', icon: '', to: '' },
  { label: 'Recent', icon: '', to: '' },
  { label: 'Starred', icon: '', to: '' }
]

const handleNavClick = (to) => {
  router.push(`/drive/${to}`)
  showNav.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-left">      
      <el-icon class="header-icon" @click="showNav = !showNav">
        <ArrowRightBold class="header-icon" />
      </el-icon>           
      <span class="header-title">My Drive</span>
      <Transition>
        <nav v-if="showNav" class="nav" @click.self="showNav = false">
          <ul class="nav-item-container">
            <li 
              v-for="item in navItems" 
              class="nav-item"
              @click="handleNavClick(item.to)"
            >              
              <el-icon class="nav-icon">
                <Star />
              </el-icon>
              <span>{{item.label}}</span>
            </li>            
          </ul>
        </nav>
      </Transition>
    </div>
    <div class="header-right">
      - - -
    </div>    
  </header>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;  
  color: #1c2022;
  background-color: #c1c1c1;
  z-index: 999;
}    

.header-left {
  display: flex;
  gap: 1rem;
}

.header-title {
  
}

.header-icon {
  width: 1.2em;
  height: 1.4em;
}

.header-right {

}

.nav {  
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background-color: rgba(27, 27, 27, 0.7); */
  background-color: var(--el-overlay-color-lighter);
  z-index: 9999;
}

.nav-item-container {
  padding: 1rem;
  height: 100%;
  width: 60%;
  background-color: white;
}

.nav-item {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-content: center;  
}

.nav-icon {
  padding-top: 0.3rem;  
}

.content {  
  padding-top: 60.8px;
  position: absolute;
  background: #eee;
  height: 100%;
  width: 100%;
  /* border: 1px solid red; */
  overflow: auto;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translate(-100%);
}

@media (min-width: 450px) {}
</style>
