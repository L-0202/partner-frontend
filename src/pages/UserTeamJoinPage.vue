<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted,ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const router = useRouter();
const searchText = ref('');


const teamList = ref([]);

//页面加载时触发一次，查询队伍
onMounted( () => {
  listTeam();
})

//搜索
const onSearch = (val) => {
  listTeam(val);
}

//队伍搜索方法
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join",{
    params:{
      searchText: val,
      pageNum: 1,
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
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>