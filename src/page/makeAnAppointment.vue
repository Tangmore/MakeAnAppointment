<template>
  <div class="content">
    <section class="srv-time-selector">
      <ul class="box">
        <li>我的场景1</li>
      </ul>
      <div class="header">
        <div class="data-picker">
          <div class="wrapper">
            <button
              v-for="(date, index) in dates.nowMonth"
              :key="index"
              :id="'scroll-' + index"
              :class="[{current: date.current}]"
              @click="selectedNow(index, $event)"
            >
              {{date.month}}/{{date.day}} {{date.week}}
              <!-- <span>{{date.appointment ? '可预约' : '暂不可约'}}</span> -->
            </button>
          </div>
        </div>
        <button class="cal" @click="selectDatePopop">
          <i class="iconfont icon-rili1"></i>
        </button>
      </div>
      <div class="items">
        <div class="main" :style="{height:courseHeight * durTimeList.length +'px'}">
          <div class="period">
            <div
              v-for="(item,index) in timeTable"
              :key="index"
              class="left-text"
              :style="{height: courseHeight + 'px'}"
            >{{item.timeStr}}</div>
          </div>
          <!-- 可选择框 -->
          <div class="select-view">
            <div
              class="flex-item"
              v-for="(item,index) in durTimeList"
              :key="index"
              @click="selectAppointmentTime(item,index)"
              :style="{height:courseHeight*item.length +'px'}"
              :class="[{selected:item.selected && !item.bind}]">
              <!-- <span style="color:#fff">{{index}}</span> -->
              <div class="select-text" v-if="item.selected && !item.bind">
                <i class="iconfont icon-duigou"></i>
              </div>
               <div class="select-text" style="color:rgba(255,255,255,.2)" v-if="!item.selected && !item.bind">
                <i class="iconfont icon-jiahao"></i>
              </div>
            </div>
          </div>
          <!-- 已经预约 -->
          <div class="bind-view">
            <div
              class="flex-item"
              v-for="(item,index) in appointmentList"
              :key="index"
              @click="getAppointmentInfo(item,index)"
              :style="{height:courseHeight*item.length +'px',
                       top:courseHeight*item.startNode +'px',
                       backgroundColor:colorArrays[index%4]}">
              <span>{{item.cname}}</span>
              <span>{{item.siname}}</span>
              <span>{{item.smname}}</span>
              <div class="select-text" v-if="item.selected && !item.bind">
                <i class="iconfont icon-duigou"></i>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 日历popup -->
    <mt-popup v-model="startPopupVisible" popup-transition="popup-fade" position="bottom">
      <div class="picker-toolbar-title">
        <div class="usi-btn-cancel" @click="startPopupVisible = !startPopupVisible">取消</div>
        <div class>请选择时间</div>
        <div class="usi-btn-sure" @click="startConfirm">确定</div>
      </div>
      <mt-picker
        ref="picker"
        :slots="sartTimeSlots"
        value-key="timeStr"
        @change="onStartValuesChange"
        :itemHeight="50"
      ></mt-picker>
    </mt-popup>

    <!-- 添加预约 -->
    <div class="add" @click="addAppointMentInit">
      <i class="iconfont icon-jiahao"></i>
    </div>
    <!-- 添加预约 -->
    <transition name="slide-fade">
      <div v-if="addPopupVisible">
        <mt-popup v-model="addPopupVisible" position="center" class="add-popup">
          <div class="close">
            <i class="iconfont icon-chacha1" @click="controlPopup"></i>
            <i class="iconfont icon-duigou" @click="saveData"></i>
          </div>
          <h2 class="title">功能房预约</h2>
          <div class="form">
            <div class="item">
              <label>项目</label>
              <span>项目1</span>
            </div>
            <div class="item">
              <label>预约人</label>
              <span>小明</span>
            </div>
            <div class="item">
              <label>区域</label>
              <span>区域1</span>
            </div>
            <div class="item">
              <label>场景</label>
              <span>我的场景1</span>
            </div>
            <div class="item" @click="modePopupVisible=true">
              <label>模式</label>
              <span>
                {{modeName}}我的模式
                <i class="iconfont icon-icon-copy"></i>
              </span>
            </div>
            <div class="item">
              <label>开始时间</label>
              <span>{{starttime}}</span>
            </div>
            <div class="item">
              <label>结束时间</label>
              <span>{{endtime}}</span>
              <!-- {{hasSelectIndex1}}{{hasSelectIndex2}} -->
            </div>
          </div>
        </mt-popup>
      </div>
    </transition>
    <!-- 确认预约信息 -->
    <ConfirmPopup
      v-if="confirmPopupVisible"
      :visible.sync="confirmPopupVisible"
      :modalObj="modalObj"
      :clickDelete="handleSaveFun"
    ></ConfirmPopup>

    <!-- 模式下拉 -->
    <mt-popup v-model="modePopupVisible" popup-transition="popup-fade" position="bottom">
      <div class="picker-toolbar-title">
        <div class="usi-btn-cancel" @click="modePopupVisible = !modePopupVisible">取消</div>
        <div class>请选择模式</div>
        <div class="usi-btn-sure" @click="modePopupConfirm">确定</div>
      </div>
      <mt-picker
        ref="picker"
        :slots="modePopupSlot"
        value-key="note"
        @change="modePopupChange"
        :itemHeight="50"
      ></mt-picker>
    </mt-popup>

    <!-- 查看预约详情 删除 -->
    <mt-popup v-model="detailPopupVisible" position="center" modal="false" class="edit-popup">
      <div class="close">
        <div class="closebtn" v-if="!isAuthority">
          <i class="iconfont icon-guanbi" @click="detailPopupVisible=false"></i>
        </div>
        <h4>预约详情</h4>
      </div>
      <div class="form">
        <div class="label" @click="stateVisible=true">
          <span>
            <small></small>预约人：
          </span>
          <div>{{appointmentItem.cname}}</div>
        </div>
        <div class="label">
          <span>
            <small></small>场景：
          </span>
          <div>{{appointmentItem.siname}}</div>
        </div>
        <div class="label">
          <span>
            <small></small>模式：
          </span>
          <div>{{appointmentItem.smname}}</div>
        </div>
        <div class="label">
          <span>
            <small></small>预约开始时间：
          </span>
          <div>{{appointmentItem.starttime}}</div>
        </div>
        <div class="label">
          <span>
            <small></small>预约结束时间：
          </span>
          <div>{{appointmentItem.endtime}}</div>
        </div>
      </div>
      <div class="footer" v-if="isAuthority">
        <span class="btn save" @click="deleteAppointment(appointmentItem)">删除</span>
        <span class="btn cancel" @click="detailPopupVisible=false">取消</span>
      </div>
    </mt-popup>

    <!-- 确认我的预约信息 -->
    <ConfirmPopup
      v-if="deletePopupVisible"
      :visible.sync="deletePopupVisible"
      :modalObj="modalObj1"
      :clickDelete="handleDeleteFun"
    ></ConfirmPopup>
  </div>
</template>
 
<script>
import axios from "../axios.js";
import { store, mutations } from "../store";
import { monthDayList, timeList, timeList2 } from "../dataPickerJson";
import ConfirmPopup from "../components/confirmPopup.vue";
export default {
  name: "makeAnAppointment",
  components: {
    ConfirmPopup
  },
  data() {
    return {
      showUsualCourseDialog: false,
      selectedCourseIndex: 0,

      senceId: "", //场景
      senceName: "",
      senceSlots: [],

      courseHeight: 50,
      appointmentId: "", //已预约ID
      appointmentList: [],

      startPopupVisible: false, //日历
      selectDateIndex: "",
      startTimeVal: "",
      sartTimeSlots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: monthDayList, //年月日
          className: "slot1",
          textAlign: "center"
        }
      ],

      addPopupVisible: false, //添加预约
      confirmPopupVisible: false, //确认预约
      modalObj: {},

      modePopupVisible: false, //模式下拉
      modePopupSlot: [
        {
          flex: 1,
          defaultIndex: 0,
          values: this.senceModeList, //场景模式
          className: "slot1",
          textAlign: "center"
        }
      ],
      modePopupValue: "",
      modeId: "",
      modeName: "",

      detailPopupVisible: false, //预约详情
      appointmentItem: "",
      isAuthority: false, //是否可以编辑
      deletePopupVisible:false,//是否取消预约信息
      modalObj1:{},

      
      userId:sessionStorage.getItem("id"),//当前预约人ID
      currentUser:'',
  
      isTimer: true,
      timer: null,
      timeOutEvent: 0,
      // isMoveing: false,

      isFirstDay: 0,
      selectedDate:monthDayList[0].timeStr2,

      dates: {
        nowMonth: monthDayList
      },
      currentMonth: null,
      timeTable: timeList, //左
      durTimeList: timeList2, //右

      checkTimeArr: [], //已经被选中的时间

      starttime: "",
      endtime: "",
      hasSelectIndex1: "",
      hasSelectIndex2: ""
    };
  },
  props: {
    colorArrays: {
      type: Array,
      default: () => ["#ff0", "#52ffff", "#fff", "#33a3dc"]
    }
  },
  computed: {
    projectId() {
      return store.projectId;
    },
    projectName() {
      return store.projectName;
    },
    proAreaName() {
      return store.proAreaName;
    },
    proAreaId() {
      return store.proAreaId;
    },
    timeTableLength() {
      return this.timeTable.length - 1;
    }
  },
  //在页面离开时
  beforeRouteLeave(to, from, next) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.isTimer = false;
    next();
  },

  //进入该页面时
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log("进入 makeAnAppointment");
      vm.isTimer = true;
      mutations.setTabSelectedIndex(2);
    });
  },

  mounted() {
    console.log("mounted");
    mutations.setTabSelectedIndex(2);
    this.InitAppointmentList();
    // if (this.timer) {
    //   clearInterval(this.timer);
    // } else {
    //   this.timer = setInterval(() => {
    //     this.compare();
    //   }, 5000);
    // } 
  },
  beforeDestroy() {
    clearInterval(this.timer); //关闭
    this.global.interceptors = true;
    this.isTimer = false;
  },
  destroyed() {
    if (this.timer) {
      //如果定时器在运行则关闭
      clearInterval(this.timer);
    }
    this.isTimer = false;
  },
  watch: {
    projectId(val) { 
      this.senceSlots = [];
      this.senceId = ""; 
      this.senceModeList = []; 
      this.appointmentSlots = [];
      this.appointmentId = "";
      this.appointmentList = [];
    },
    proAreaId(val) {
      this.senceSlots = [];
      this.senceId = ""; 
      this.appointmentList = [];
      this.senceModeList = [];

      this.appointmentSlots = [];
      this.appointmentId = "";
      this.getSenceList(); 
    },
    senceId(val) {
      console.log(val)
      this.senceModeList = [];
      this.appointmentList = [];
      // this.InitAppointmentList(); 
    },
    isFirstDay(val){
      for (var item of this.durTimeList) {
        this.$set(item, "selected", false);
      }
      this.selectedDate=monthDayList[val].timeStr2;
      this.InitAppointmentList();
    }
  },
  methods: {
    // 获取当前预约人
    getUserInfo(){},
    //所有场景列表
    getSenceList: function() {},
    // 选择日历下拉
    selectDatePopop() {
      this.startPopupVisible = true;
    },
    // 时间选择
    onStartValuesChange(picker, values) {
      this.startTimeVal = values;
    },
    startConfirm() {
      let $this = this;
      $this.startPopupVisible = false;
      this.isFirstDay = this.startTimeVal[0].index;

      for (var date in this.dates.nowMonth) {
        this.dates.nowMonth[date].current = false;
      }
      this.dates.nowMonth[this.isFirstDay].current = true;

      let str = "scroll-" + this.isFirstDay;
      document.getElementById(str).scrollIntoView();
    },
    // 点击添加+按钮
    addAppointMentInit() {
      var $selectedBoxes = this.durTimeList.filter(function(item, index) {
        return item.selected;
      });
      let len = $selectedBoxes.length;
      if (len == 0) {
        this.$toast("请先选择预约时间");
        return;
      }
       let month = this.dates.nowMonth[this.isFirstDay].month;
       let day = this.dates.nowMonth[this.isFirstDay].day;

      this.starttime = `${this.dates.nowMonth[this.isFirstDay].year}-${month}-${day} ${$selectedBoxes[0].start}`;
      this.endtime = `${this.dates.nowMonth[this.isFirstDay].year}-${month}-${day} ${$selectedBoxes[len - 1].end}`;
      this.addPopupVisible = true;
      this.isTimer = false
      this.getUserInfo();
      this.getSenceModeList();
    },
    // 模式选择
    modePopupChange(picker, values) {
      this.modePopupValue = values[0];
    },
    modePopupConfirm() {
      this.modePopupVisible = false;

      this.modeId = this.modePopupValue.id;
      this.modeName = this.modePopupValue.mname;
      console.log(this.modeId, this.modeName);
    },

    //获取场景-模式
    getSenceModeList: function() {},
    // 关闭预约
    controlPopup() {
      this.addPopupVisible = false;
      this.isTimer = true;
      for (var item of this.durTimeList) {
        this.$set(item, "selected", false);
      }
    },
    // 保存
    saveData() {
      this.confirmPopupVisible = true;
      var html = `<span style="margin-bottom:10px;display:inline-block;">开始时间:${this.starttime}</span><br/><span>结束时间:${this.endtime}</span>`;
      this.modalObj = {
        text: "提示",
        curId: "",
        content: html,
        height: 190 + "px"
      };
      for (var item of this.durTimeList) {
        this.$set(item, "selected", false);
      }
    },
    handleSaveFun() {        
      let $this=this;  
      let data={
        id:'',
        piid: this.projectId,
        siid: this.senceId,
        smid: this.modeId,
        puid: this.userId,
        starttime: this.starttime,
        endtime: this.endtime,
      }; 
      console.log(data)
      //保存  
      this.addPopupVisible = false;
      this.$toast("预约成功"); 
      for (var item of this.durTimeList) {
        this.$set(item, "selected", false);
      } 
    },
    // 初始获取时间段
    InitAppointmentList() {
      let param={
        selectedDate:this.selectedDate,
        'params[piid]': this.projectId,
        'params[siid]': this.senceId,
        page: 1,
        rows: 100,
      };   
      // 请求 
      this.appointmentList = [{id:'1',starttime:'2020-09-02 13:15:00',endtime:'2020-09-02 14:15:00',
        cname:'小明',siname:'场景名称',smname:'场景模式名称'}]; 
      for (var item of this.appointmentList) {
        let obj = this.getStartEndIndex(item); 
        item.startNode = obj.startNode;
        item.length = obj.length;
      }    
    },
    // 获取时间段起始index
    getStartEndIndex(item) {
      var starttime = item.starttime.split(" ")[1];
      var endtime = item.endtime.split(" ")[1];
      var startIndex = '',
        endIndex = '';
      for (var i = 0; i < this.durTimeList.length; i++) {
        this.$set(this.durTimeList[i],'bind',false);
        if (this.durTimeList[i]["start"] == starttime) {
          // console.log(i);
          startIndex = i;
        }
        if (this.durTimeList[i]["end"] == endtime) {
          // console.log(i);
          endIndex = i;
        } 
      }
      if(!startIndex && !endIndex){
        return {};
      }
     
      for (var i = startIndex; i <= endIndex; i++) { 
        this.$set(this.durTimeList[i],'bind',true);
      }
      return { startNode: startIndex, length: endIndex - startIndex + 1 };
    },
    // 获取预约详情
    getAppointmentInfo(item, index) {
      for (var key of this.durTimeList) {
        this.$set(key, "selected", false);
      }
      console.log(item);
      this.detailPopupVisible = true;
      this.appointmentItem = item;
      var starttime = item.starttime.split(" ")[1];
      let hour =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let minute =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let current = hour + ":" + minute +':00';
      if (starttime <= current) {
        this.isAuthority = false;
      } 
      if(starttime > current && this.userId==item.puid){
        this.isAuthority = true; 
      }
      console.log(this.isAuthority); 
    },
    // 取消我的预约
    deleteAppointment(item){
      this.deletePopupVisible=true;
      this.detailPopupVisible=false;
      this.modalObj1 = { text: '提示',  curId: item.id, content: '确认取消该预约？' } 
    },
    handleDeleteFun(id){ 
      let $this=this; 
      $this.isTimer=false; 
      let data = {id: id};  
      this.$toast('预约取消成功');
    },
    selectedNow: function(index, event) {
      for (var date in this.dates.nowMonth) {
        this.dates.nowMonth[date].current = false;
      }
      this.isFirstDay = index;
      console.log(this.isFirstDay);
      this.sartTimeSlots[0].defaultIndex = this.isFirstDay;
      this.dates.nowMonth[index].current = true;
    },
    // 选择预约时间
    selectAppointmentTime(item, index) {
      console.log(index);
      if (item.bind) {
        this.$toast("当前时间已被预约");
        return;
      }

      var starttime = item.start;
      let hour =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let minute =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let current = hour + ":" + minute +':00';
      if (this.isFirstDay==0 && starttime <= current) {
        this.$toast("请选择大于当前时间的时间段进行预约");
        return;
      }

      if (!this.hasSelectIndex1 && this.hasSelectIndex1 !== 0) {
        //  console.log('index1赋值')
        // 点击第一个盒子的时候清空所有box的checked状态
        // 移除之前存储的box2变量
        // 只给当前盒子增加checked
        this.hasSelectIndex1 = index;
        for (var item of this.durTimeList) {
          this.$set(item, "selected", false);
        }
        this.durTimeList[index].selected = true;
        this.hasSelectIndex2 = null;
      } else if (!this.hasSelectIndex2 && this.hasSelectIndex2 !== 0) {
        // console.log('index2赋值')
        // // 点击第二个盒子的时候
        // // 计算从哪个盒子开始到哪个盒子结束需要增加checked状态
        this.hasSelectIndex2 = index;
        // console.log(this.hasSelectIndex1,this.hasSelectIndex2)

        //重复点击第一个盒子时，不计算为第二个盒子
        if (this.hasSelectIndex1 == this.hasSelectIndex2) {
          this.durTimeList[this.hasSelectIndex2].selected = !this.durTimeList[
            this.hasSelectIndex2
          ].selected;
          this.hasSelectIndex1 = null;
          this.hasSelectIndex2 = null;
          return;
        }
        // 相邻盒子
        if (Math.abs(this.hasSelectIndex1 - this.hasSelectIndex2) == 1) {
          this.durTimeList[index].selected = true;
          return;
        }

        // “开始盒子”和“结束盒子”
        var startBoxIndex = Math.min(
          this.hasSelectIndex1,
          this.hasSelectIndex2
        );
        var endBoxIndex = Math.max(this.hasSelectIndex1, this.hasSelectIndex2);

        // 开始盒子和结束盒子之间所有的盒子
        var $startEndBoxRange = this.durTimeList.filter(function(item, index) {
          return index >= startBoxIndex && index <= endBoxIndex;
        });

        var $disableBoxes = $startEndBoxRange.filter(function(item, index) {
          return item.bind;
        });

        // 选择的区间是否包含禁用的盒子
        if ($disableBoxes.length !== 0) {
          // 包含禁用盒子则提示，并重置第二盒子
          this.hasSelectIndex2 = null;
          $disableBoxes = [];
          this.$toast("请选择连续时间段预约！");
          return;
        } else {
          // 不包含禁用盒子
          for (var item of this.durTimeList) {
            this.$set(item, "selected", false);
          }
          for (var i = startBoxIndex; i <= endBoxIndex; i++) {
            this.durTimeList[i].selected = true;
          }
        }
      } else {
        // 当已经选择了第二个盒子后重新点击，意味着刚才选过的一系列盒子作废
        // 用户期望重新选择盒子区间
        // 和选择第一个盒子后的逻辑相同
        this.hasSelectIndex1 = index;
        this.hasSelectIndex2 = null;
        for (var item of this.durTimeList) {
          this.$set(item, "selected", false);
        }
        this.durTimeList[index].selected = true;
      }
    },
    // 定时刷新
    compare() {
      if (this.isTimer) {
        this.global.interceptors = false;
        this.InitAppointmentList();
      }
    }
  }
};
</script>
 
<style scoped lang="scss">
@import "../assets/css/makeAnAppointment";
</style>