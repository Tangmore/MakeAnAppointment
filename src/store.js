import Vue from 'vue'
 
// 通过Vue.observable创建一个可响应的对象
export const store = Vue.observable({
  projectId: '', 
  projectName:'',
  proAreaId:'',
  proAreaName:'', 
  tabSelectedIndex:localStorage.getItem('tabSelectedIndex') || 0
})
 
// 定义 mutations, 修改属性
export const mutations = {
  setProjectId(projectId,projectName) { 
    store.projectId = projectId;
    store.projectName = projectName;
  },
  setProAreaId(proAreaId,proAreaName) {
     store.proAreaId = proAreaId;
     store.proAreaName = proAreaName;
  }, 
  setTabSelectedIndex(tabSelectedIndex){
    store.tabSelectedIndex=tabSelectedIndex;
    localStorage.setItem('tabSelectedIndex',tabSelectedIndex);
  }
} 