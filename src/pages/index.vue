<script setup  lang="ts">
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {userType} from "../models/user";

const route = useRoute();
const isMatchMode = ref<boolean>(false);
const loading = ref(true);
const {tags} = route.query;

const userList = ref([]);


//加载数据
const loadData = async () =>{
  let userListData;
  loading.value = true;
  //心动模式
  if (isMatchMode.value){
    const num = 10;
    userListData = await myAxios.get('/user/match',{
      params:{
        num,
      },
    }).then(function (response){
      console.log('/user/match success',response);
      showSuccessToast('请求成功');
      return response?.data;
    }).catch(function (error){
      console.error('/user/match error',error);
      showFailToast('请求失败')
    });
  }else {
    //普通用户使用分页查询
    userListData = await myAxios.get('/user/recommend',{
      params:{
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response){
          console.log('/user/recommend succeed',response);
          showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error){
          console.error('/user/recommend error',error);
          showFailToast('请求失败');
        })
  }
  if (userListData){
    userListData.forEach((user : userType) => {
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"></van-switch>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="无用户"></van-empty>
</template>

<style scoped>

</style>