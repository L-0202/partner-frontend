<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async() => {
  //获取用户信息
  const currentUser = await getCurrentUser();
  if (!currentUser){
    showFailToast('用户未登录');
  }
  const res = await myAxios.post('/user/update',{
    'id' : currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res,'更新请求');
  if (res.code === 0 && res.data > 0){
    showSuccessToast('修改成功');
    router.back();
  }else {
    showFailToast('修改失败');
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="editUser.currentValue"
      :name="editUser.editKey"
      :label="editUser.editName"
      :placeholder="`请输入${editUser.editName}`"
      />
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>