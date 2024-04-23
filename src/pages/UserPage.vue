<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {showFailToast, showSuccessToast} from "vant";
  import {getCurrentUser} from "../services/user.ts";


  const user = ref();
  const router = useRouter();

  onMounted(async () => {
    //获取用户信息
    const res = await getCurrentUser();
    if (res){
      user.value = res;
      showSuccessToast('获取用户信息成功')
    }else {
      showFailToast('获取用户信息失败')
    }
  })


  const toEdit = (editKey: string,editName: string,currentValue: string) =>{
    router.push({
      path:'/user/edit',
      query: {
        editKey,
        editName,
        currentValue,
      }
    })
  }
</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号"  :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="修改个人信息" is-link to="/user/update"/>
    <van-cell title="个人创建队伍" is-link to="/team/create"/>
    <van-cell title="个人加入队伍" is-link to="/team/join"/>
  </template>
</template>

<style scoped>

</style>