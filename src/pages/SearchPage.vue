<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";


const searchText = ref('');

const router = useRouter();
/**
 * 执行搜索跳转
 */
const doSearchResult = () => {
  router.push({
    path:'/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

//原始标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
  {
    text: '城市',
    children: [
      { text: '北京', id: '北京' },
      { text: '上海', id: '上海' },
      { text: '天津', id: '天津' },
      { text: '广州', id: '广州' },
      { text: '西安', id: '西安' },
    ],
  },
];

//标签页
let tagList = ref(originTagList);

/**
 * 过滤搜索
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag =>{
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
const onCancel = () => {
  searchText.value = ' ';
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

//移除标签
const doClose = (tag) => {
      activeIds.value = activeIds.value.filter(item =>{
        return item !== tag;
  })
}


</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"/>
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<style scoped>

</style>