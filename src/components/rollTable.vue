<template>
  <div class="table_container">
    <el-table
      :data="tableData"
      class="tr-tab"
      :cell-style="cellStyle"
      :row-style="rowStyle"
      :header-row-class-name="headerStyle"
    >
      <el-table-column width='124' prop="mch_name" label="服务点" align="center"></el-table-column>
      <el-table-column width='70' prop="busi_code" label="类型" align="center"></el-table-column>
      <el-table-column width='135' prop="start_time" label="时间" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['tableData'],
  methods: {
    //在method里面写上方法
    cellStyle({ row, column, rowIndex, columnIndex }) {
        return { padding: "0" };
    },
    rowStyle({ row, rowindex }) {
      //调整表格的高度
      return {
        height: "0.16rem",
        borderBottom: "1px solid rgba(101,124,168,.5)"
      };
    },
    headerStyle() {
      return "tbhd"; 
    },
    appearRow(){

    }
  }
};
</script>
<style lang="less">
//样式加上去，但页面显示不出来，scoped会给元素加上data的属性，生成一个局部作用域，待页面渲染完毕之后，在调用方法，所以样式没有显示到页面上
.table_container{
  width: 100%;
  height: 100%;
  .el-table {
  font-size: 0.12rem !important;
  color: rgb(73, 163, 255);
}
.el-table .cell {
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
  padding: 0.085rem;
}
.tr-tab {
  width: 100%;
  border-top: none;
  height: 100%;
}
.data {
  font-size: 0.12rem;
  margin: 0.05rem 0;
}
.el-table th,
.el-table tr {
  background-color: transparent !important;
}
.el-table td, .el-table th.is-leaf{
  border-bottom: 1px solid rgba(101,124,168,.1);
}
.tbhd > th {
  background-color: rgba(255, 255, 255, .1) !important;
  color: rgb(195, 202, 217);
  padding: 0;
  border-bottom: none !important;
}
// .el-table__body tbody {
//   .el-table__row:nth-of-type(7n){
//     border-bottom: none !important;
//     td{
//       border-bottom: none !important;
//     }
//   }
// }

}
</style>
