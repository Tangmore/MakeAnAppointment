var monthDayList = [],
  timeList = [],
  timeList2=[];

// 初始年月日
var totalDays = 30,
  date = new Date(),
  week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
for (var i = 0; i < totalDays; i++) {
  var year = date.getFullYear(),
    month = (date.getMonth() + 1) < 10?'0'+ (date.getMonth()+1):date.getMonth()+1,
    day = date.getDate()<10?'0'+date.getDate():date.getDate(),
    proteWeek = date.getDay(),
    timestamp = date.getTime(); 
    var d = { 
      index:i,
      timestamp: timestamp, 
      year:year,
      month: month,
      day: day, 
      week: week[proteWeek],
      timeStr: year+'-'+month+'-'+day+' '+week[proteWeek],
      timeStr2:year+'-'+month+'-'+day,
      current: false
    }; 
    monthDayList.push(d);
  date.setDate(date.getDate() + 1);
} 
monthDayList[0].current=true;
// 小时 
timeList=[
  { timeStr: "09:00:00" },
  { timeStr: "09:15:00" },
  { timeStr: "09:30:00" },
  { timeStr: "09:45:00" },
  { timeStr: "10:00:00" },
  { timeStr: "10:15:00" },
  { timeStr: "10:30:00" },
  { timeStr: "10:45:00" },
  { timeStr: "11:00:00" },
  { timeStr: "11:15:00" },
  { timeStr: "11:30:00" },
  { timeStr: "11:45:00" },
  { timeStr: "12:00:00" },
  { timeStr: "12:15:00" },
  { timeStr: "12:30:00" },
  { timeStr: "12:45:00" },
  { timeStr: "13:00:00" },
  { timeStr: "13:15:00" },
  { timeStr: "13:30:00" },
  { timeStr: "13:45:00" }, 
  { timeStr: "14:00:00" },
  { timeStr: "14:15:00" },
  { timeStr: "14:30:00" },
  { timeStr: "14:45:00" },
  { timeStr: "15:00:00" },
  { timeStr: "15:15:00" },
  { timeStr: "15:30:00" },
  { timeStr: "15:45:00" },
  { timeStr: "16:00:00" },
  { timeStr: "16:15:00" },
  { timeStr: "16:30:00" },
  { timeStr: "16:45:00" },
  { timeStr: "17:00:00" },
  { timeStr: "17:15:00" },
  { timeStr: "17:30:00" },
];
timeList2=[
  { start: "09:00:00" , end:"09:15:00", selected:false, bind:false, length:1}, 
  { start: "09:15:00" , end:"09:30:00", selected:false, bind:false, length:1},
  { start: "09:30:00" , end:"09:45:00", selected:false, bind:false, length:1},
  { start: "09:45:00" , end:"10:00:00", selected:false, bind:false, length:1},
  { start: "10:00:00" , end:"10:15:00", selected:false, bind:false, length:1},
  { start: "10:15:00" , end:"10:30:00", selected:false, bind:false, length:1},
  { start: "10:30:00" , end:"10:45:00", selected:false, bind:false, length:1},
  { start: "10:45:00" , end:"11:00:00", selected:false, bind:false, length:1},
  { start: "11:00:00" , end:"11:15:00", selected:false, bind:false, length:1},
  { start: "11:15:00" , end:"11:30:00", selected:false, bind:false, length:1},
  { start: "11:30:00" , end:"11:45:00", selected:false, bind:false, length:1},
  { start: "11:45:00" , end:"12:00:00", selected:false, bind:false, length:1},
  { start: "12:00:00" , end:"12:15:00", selected:false, bind:false, length:1},
  { start: "12:15:00" , end:"12:30:00", selected:false, bind:false, length:1},
  { start: "12:30:00" , end:"12:45:00", selected:false, bind:false, length:1},
  { start: "12:45:00" , end:"13:00:00", selected:false, bind:false, length:1},
  { start: "13:00:00" , end:"13:15:00", selected:false, bind:false, length:1},
  { start: "13:15:00" , end:"13:30:00", selected:false, bind:false, length:1},
  { start: "13:30:00" , end:"13:45:00", selected:false, bind:false, length:1},
  { start: "13:45:00" , end:"14:00:00", selected:false, bind:false, length:1}, 
  { start: "14:00:00" , end:"14:15:00", selected:false, bind:false, length:1},
  { start: "14:15:00" , end:"14:30:00", selected:false, bind:false, length:1},
  { start: "14:30:00" , end:"14:45:00", selected:false, bind:false, length:1},
  { start: "14:45:00" , end:"15:00:00", selected:false, bind:false, length:1},
  { start: "15:00:00" , end:"15:15:00", selected:false, bind:false, length:1},
  { start: "15:15:00" , end:"15:30:00", selected:false, bind:false, length:1},
  { start: "15:30:00" , end:"15:45:00", selected:false, bind:false, length:1},
  { start: "15:45:00" , end:"16:00:00", selected:false, bind:false, length:1},
  { start: "16:00:00" , end:"16:15:00", selected:false, bind:false, length:1},
  { start: "16:15:00" , end:"16:30:00", selected:false, bind:false, length:1},
  { start: "16:30:00" , end:"16:45:00", selected:false, bind:false, length:1},
  { start: "16:45:00" , end:"17:00:00", selected:false, bind:false, length:1},
  { start: "17:00:00" , end:"17:15:00", selected:false, bind:false, length:1},
  { start: "17:15:00" , end:"17:30:00", selected:false, bind:false, length:1},
];
 
export {
  monthDayList,
  timeList,
  timeList2
}