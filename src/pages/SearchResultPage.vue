<script setup >
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast, showToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices: false})
    }
  })
      .then(function (response){
        console.log('/user/search/tags succeed',response);
        //showSuccessToast('请求成功');
        return response.data;
      })
      .catch(function (error){
        console.error('/user/search/tags error',error);
        showFailToast('请求失败')
      })
  console.log(userListData)
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags =JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="暂无条件用户"></van-empty>
</template>

<style scoped>

</style>