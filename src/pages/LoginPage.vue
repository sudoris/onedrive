<script setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <div class="spaceholderY"></div>
  <el-form class="form" :model="form" label-width="20%">
    <el-form-item 
      label="Email" 
      prop="email"
      size="large"
    >
      <el-input 
        v-model="form.email" 
        type="email" 
        autocomplete="off" 
      />
    </el-form-item>
    <el-form-item 
      label="Password" 
      prop="email"
    >
      <el-input 
        v-model="form.password" 
        type="password" 
        autocomplete="off"
        size="large"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Login</el-button>
      <el-button>Sign-up</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.spaceholderY {
  padding: 8rem 0;
}

.form {    
  padding: 0.6em;    
}

@media (min-width: 450px) {}
</style>
