<template>
  <div class="main">
    <div class="header">
      <div class="area-box" @click="proAreasPopupVisible=true;">
        <i class="iconfont icon-weizhi"></i>
        <span>区域1</span> 
      </div>
      <div class="pro-box" @click="proPopupVisible=true;">
        <span>项目1</span> 
      </div> 
      <div class="add" @click="showDropDown=true;" v-if="$route.name=='SenceDetail'">
        <i class="iconfont icon-jiahao"></i>
      </div> 
      <div class="add" v-else></div>
      <mt-popup
        v-model="showDropDown" 
        popup-transition="popup-fade">
        <div>新建场景</div>
        <div>新建场景模式</div>
        <div>场景设备配置</div>
      </mt-popup>
     </div>

    <div class="content">
       <transition name="fade"> 
          <router-view></router-view> 
        </transition>
    </div>
    <!-- 项目 --> 
    <mt-popup v-model="proPopupVisible" popup-transition="popup-fade" position="bottom">
      <div class="picker-toolbar-title">
        <div class="usi-btn-cancel" @click="proPopupVisible = !proPopupVisible">取消</div>
        <div class="">请选择项目</div>
        <div class="usi-btn-sure" @click="proConfirm">确定</div>
      </div>
      <mt-picker ref='picker' :slots="proSlots" value-key='name' @change="onProjectValuesChange"
                 :itemHeight="50"></mt-picker>
    </mt-popup> 
    <!-- 区域 --> 
    <mt-popup v-model="proAreasPopupVisible" popup-transition="popup-fade" position="bottom">
      <div class="picker-toolbar-title">
        <div class="usi-btn-cancel" @click="proAreasPopupVisible = !proAreasPopupVisible">取消</div>
        <div class="">请选择区域</div>
        <div class="usi-btn-sure" @click="areaConfirm">确定</div>
      </div>
      <mt-picker ref='picker' :slots="proAreaSlots" value-key='name' @change="onAreaValuesChange"
                 :itemHeight="50"></mt-picker>
    </mt-popup>
    <div class="footer"> 
      <div class='appointment-page' @click="appointmentChangeTab()" :class="tabSelectedIndex==2?'selected':''">
         <i class="iconfont icon-zhuce"></i> 
        <span>预约</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios.js"; 
import {store,mutations} from '../store.js';
export default {
  name: "Home",
  data() {
    return {  
      showDropDown:false,

      proPopupVisible: false,
      projectName: "",//项目名称 
      proSlots: [
        {
          values: [
            {
              id: "",
              name: "暂无项目"
            }
          ]
        }
      ],
      project:'',

      proAreasPopupVisible: false,
      proAreaName: "", //项目区域名称 
      proAreaSlots: [
        {
          values: [
            {
              id: "",
              name: "暂无区域"
            }
          ]
        }
      ],
      area:'',    
    };
  },

  mounted() {
    
  }, 
 
  //离开该页面时
  beforeRouteLeave (to, from, next) {
    this.showDropDown=false; 
    next()
  },
  computed: { 
      projectId() {
        return store.projectId;
      },
      proAreaId() {
        return store.proAreaId;
      },
      tabSelectedIndex(){
        return store.tabSelectedIndex;
      }
    }, 
  watch:{
     projectId(val) { 
      this.proAreaSlots=[ {
          values: [
            { id: "", name: "暂无区域" }
          ]
      }];  
      this.getProjectAreas();  
    }
  },
  methods: { 
    // 选择项目
    onProjectValuesChange(picker, values) {
       this.project = values[0];
    }, 
    proConfirm() {  
      let $this=this;
      $this.projectName = $this.project.name; 
      mutations.setProjectId($this.project.id,$this.project.name);
      $this.proPopupVisible = false;
    },
    // 选择区域
    onAreaValuesChange(picker, values) {
       this.area = values[0];
    }, 
    areaConfirm() {  
      let $this=this;
      $this.proAreaName = $this.area.name; 
      mutations.setProAreaId($this.area.id,$this.area.name); 
      $this.proAreasPopupVisible = false;
    },   
    appointmentChangeTab(){
      mutations.setTabSelectedIndex(2); 
      this.$router.push({
          name: 'makeAnAppointment'
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/index";   
</style>
