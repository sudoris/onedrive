<script setup>
import { ref, onMounted } from 'vue'
import filesService from '@/services/files.js'

import placeholderImg from '@/assets/imgs/placeholder.png'

const folders = ref([
  { name: 'Assignments', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '' },
  { name: 'Assignments1', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '' },
  { name: 'Assignments2', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '' },
  { name: 'Assignments3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '' },
  { name: 'Assignments4', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '' }
])

// const files = ref([
//   { name: 'File', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File1', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'pdf' },
//   { name: 'File2', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'png' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File4', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'csv' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
//   { name: 'File3', create_date: '', create_by: '', last_modified_date: '', last_modified_by: '', type: 'jpg' },
// ])
const files = ref([])
const getThumbNailSrc = (file) => {
  const imageTypes = ['png', 'jpg']

  if (imageTypes.includes(file.type)) {
    console.log(`/uploads/${file.name}.${file.type}.${file.id}`)
    return `http://localhost:3333/uploads/${file.name}.${file.type}.${file.id}`
  } else {
    return placeholderImg
  }
}

const currentFolder = ref('')

const showSelectNewType = ref(false)

const showNewFolderDialog = ref(false)
const newFolderName = ref('')

const showNewFilesDialog = ref(false)
const uploadFilesList = ref([])
const addNewFilesRef = ref(null)
const uploadFiles = () => {
  // this sends multipart/form-data request to server
  addNewFilesRef.value.submit()    
  setTimeout(() => {
    filesService.getIndex()
      .then(res => {
        files.value = res.data            
      })
  }, 100);
}
const clearUploadList = () => {
  addNewFilesRef.value.clearFiles()
}

const toggleNew = (type) => {
  showSelectNewType.value = false

  if (type === 'folder') showNewFolderDialog.value = true
  else if (type === 'file') {
    showNewFilesDialog.value = true
  }
}

onMounted(() => {
  filesService.getIndex()
    .then(res => {
      files.value = res.data         
    })
})
</script>

<template>
  <div>
    <div class="section">
      <header class="section-header">
        <h5>Folders</h5>
      </header>
      <div class="section-content">
        <div 
          v-for="folder in folders"
          class="folder-item"
        >
          <span>{{ folder.name }}</span>
        </div>
      </div>
    </div>
    <div class="section">
      <header class="section-header">
        <h5>Files</h5>
      </header>
      <div class="section-content">
        <div 
          v-for="file in files"
          class="file-item"
        >
           <el-image
              class="file-thumbnail"              
              :src="getThumbNailSrc(file)"              
              :initial-index="4"
              fit="cover"
            />
            <div class="file-caption">
              {{ `${file.name}.${file.type} ` }}
            </div>
        </div>
      </div>

    </div>

    <div class="upload">
      <el-button type="primary" circle size="large" @click="showSelectNewType = true">
        <el-icon :size="20"><Plus /></el-icon>
      </el-button>
    </div>

    <el-drawer v-model="showSelectNewType" direction="btt" :show-close="false">
      <template #default>        
        <div class="new-option" @click="toggleNew('folder')">
          <el-icon class="new-option-icon">
            <FolderAdd />
          </el-icon>      
          New folder
        </div>
        <div class="new-option" @click="toggleNew('file')">
          <el-icon class="new-option-icon">
            <DocumentAdd />
          </el-icon>      
          New file(s)
        </div>      
      </template>      
    </el-drawer>

    <!-- dialog for creating adding files -->
    <el-dialog
      v-model="showNewFilesDialog"
      width="90%"
      :before-close="null"
      align-center
    >      
      <el-upload
        ref="addNewFilesRef"
        action="http://127.0.0.1:3333/upload"
        :auto-upload="false"
        multiple=true
        limit=5
        @update:file-list="uploadFilesList = $event"
      >
        <template #trigger>
          <el-button type="primary">Add a file</el-button>
        </template>                 
      </el-upload>      
      <template #footer>
        <el-button v-if="uploadFilesList.length > 0" type="info" @click="clearUploadList">
          Clear
        </el-button>
        <el-button type="success" @click="uploadFiles">
          Upload
        </el-button>
      </template>
    </el-dialog>

    <!-- dialog for creating a new folder -->
    <el-dialog
      v-model="showNewFolderDialog"
      width="80%"
      :before-close="null"
      align-center
      :show-close="false"
    >      
      <p>New folder</p>
      <el-input v-model="newFolderName" size="large" />      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showNewFolderDialog = false">Cancel</el-button>
          <el-button type="primary" @click="showNewFolderDialog = false"
            >Create</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.section {
  min-width: 400px;
  width: 100%;
}

.section-header {
  padding: 1rem 1.5rem 0;
  color: #5d5d5d;
}

.section-content {
  padding: 0.5rem;
  display: flex;
  gap: 0.8rem 2%;
  flex-wrap: wrap;  
  align-content: center;
}

.folder-item {
  background: white;
  padding: 1rem;
  width: 49%;
}

/* .folders {
  padding: 0.5rem;
  display: flex;
  gap: 0.8rem 2%;
  flex-wrap: wrap;  
  align-content: center;
}

.files {
  padding: 0.5rem;
  display: flex;
  gap: 0.8rem 2%;
  flex-wrap: wrap;  
  align-content: center;
} */

.file-item {
  width: 49%;
  background: white;
}

.file-thumbnail {
  width: 100%;
  height: 9rem;
}

.file-caption {
  vertical-align: middle;
  padding: 0 0.2rem 0.2rem;
}

.upload {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  z-index: 999;
}

.new-option {
  padding: 1rem;
}

.new-option-icon {
  margin-right: 1rem;
}

.p-0 {
  padding: 0;
}

@media (min-width: 450px) {}
</style>

<style>
/* override element plus styles */
.el-dialog__header {
  padding: 0;
}

.el-dialog__body {   
  padding-bottom: 0;
}

.el-dialog__footer {   
  padding-top: 20px;
}
</style>