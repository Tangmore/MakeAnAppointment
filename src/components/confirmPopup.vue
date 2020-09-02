<template>
  <div class="delete">
    <mt-popup v-model="visible" position="center" class="door-popup" :style="{height:modalObj.height}" :closeOnClickModal='false'>
      <div class="text" v-html="modalObj.content"></div>
      <div class="conitem">
        <div class="box">
          <mt-button type="primary" class="btn selected" @click="submitForm">确定</mt-button>
          <mt-button type="primary" class="btn" @click="modalClose">取消</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: "confirmPopup",
  data() {
    return {
      msg: " "
    };
  },
  props: {
    visible: { type: Boolean, default: false },
    modalObj: { type: Object, default: false },
    clickDelete: { type: Function, required: true }
  },
  methods: {
    submitForm() {
      //删除事件
      this.clickDelete(this.modalObj.curId);
      this.modalClose();
    },
    modalClose() {
      this.$emit("update:visible", false); // 直接修改父组件的属性
    }
  }
};
</script>

<style scoped lang="scss">
.door-popup {
  width: 70%;
  height: 180px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .text {
    position: absolute;
    font-size: 16px;
    color: #000;
    top: 36%;
  }
  .conitem {
    position: absolute;
    bottom: 10px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 10px;
    .box {
      width: 100%;
      height: 100%;
      list-style: none;
      box-sizing: border-box;
    }
    .btn {
      padding: 0 10px;
      margin: 0 0 10px 10px;
      width: auto;
      height: 34px;
      font-size: 12px;
      color: #000;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .selected {
      background: linear-gradient(to right, #474750, #29535a);
      color: #fff;
    }
  }
}
</style>
