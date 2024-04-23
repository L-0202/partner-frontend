<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted,ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const active = ref('public')
const router = useRouter();
const searchText = ref('');

//跳转到加入队伍页
const toAddTeam = () => {
    router.push({
      path:"/team/add"
    })
  }

const teamList = ref([]);

//页面加载时触发一次，查询队伍
onMounted( () => {
  listTeam();
})

const onTabChange = (name) =>{
  //查询公开队伍
  if (name === 'public'){
    listTeam(searchText.value,0);
  }else{
    //查询加密队伍
    listTeam(searchText.value,2);
  }
}

//搜索
const onSearch = (val) => {
  listTeam(val);
}

//队伍搜索方法
const listTeam = async (val = '',status = 0) => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    showFailToast("加载队伍失败，请重试")
  }
}
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <van-button class="add-button" type="primary"  icon="plus"  @click="toAddTeam"/>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>