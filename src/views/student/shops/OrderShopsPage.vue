<template>
    <!-- 选择商家页面 -->
    <div id="orderShops">
        <!-- 左边部分 -->
        <div class="left-section">
            <div class="avatar"></div>
            <el-menu class="navigation" background-color="#f8f8f8" text-color="#333" active-text-color="#409EFF"
                @select="handleMenuSelect" unique-opened router>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        一食堂
                    </template>
                    <el-menu-item index="1-1">一楼</el-menu-item>
                    <el-menu-item index="1-2">二楼</el-menu-item>
                    <el-menu-item index="1-3">三楼</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        二食堂
                    </template>
                    <el-menu-item index="2-1">一楼</el-menu-item>
                    <el-menu-item index="2-2">二楼</el-menu-item>
                    <el-menu-item index="2-3">三楼</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        三食堂
                    </template>
                    <el-menu-item index="3-1">一楼</el-menu-item>
                    <el-menu-item index="3-2">二楼</el-menu-item>
                    <el-menu-item index="3-3">三楼</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 中间部分 -->
        <div class="middle-section">
            <div class="search-bar">
                <el-select v-model="searchRange" placeholder="请选择搜索范围">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="一楼" value="floor1"></el-option>
                    <el-option label="二楼" value="floor2"></el-option>
                    <el-option label="三楼" value="floor3"></el-option>
                </el-select>
                <el-input v-model="searchContent" placeholder="请输入搜索内容"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
            <el-row class="shop-list">
                <el-col :span="8" v-for="(shop, index) in shopList" :key="index">
                    <el-card shadow="hover" class="shop-item">
                        <div class="shop-image" :style="{ backgroundImage: `url(${shop.image})` }"></div>
                        <div class="shop-info">
                            <h3>{{ shop.name }}</h3>
                            <p>{{ shop.description }}</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-dropdown v-model="isDropdownShow" placement="bottom-start">
                <el-button type="text" slot="trigger">显示搜索结果</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(result, index) in searchResults" :key="index">{{ result }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            searchRange: 'all',
            searchContent: '',
            shopList: [
                {
                    name: '餐厅名称1',
                    description: '餐厅介绍1',
                    image: 'https://via.placeholder.com/100'
                },
                {
                    name: '餐厅名称2',
                    description: '餐厅介绍2',
                    image: 'https://via.placeholder.com/100'
                },
                {
                    name: '餐厅名称3',
                    description: '餐厅介绍3',
                    image: 'https://via.placeholder.com/100'
                }
            ],
            isDropdownShow: false,
            searchResults: []
        };
    },
    methods: {
        handleMenuSelect(index) {
            console.log('选中了菜单项：', index);
            // 根据选中的菜单项更新商铺信息
            // ...
        },
        search() {
            console.log('搜索内容：', this.searchContent);
            console.log('搜索范围：', this.searchRange);
            // 根据搜索内容和范围进行搜索，并更新搜索结果
            // ...
            this.searchResults = ['搜索结果1', '搜索结果2', '搜索结果3'];
            this.isDropdownShow = true;
        }
    }
};
</script>
  
<style scoped>
#orderShops {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.left-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: gray;
    margin-bottom: 20px;
}

.navigation {
    width: 100%;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.middle-section {
    width: 800px;
    margin: 0 40px;
}

.search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.shop-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.shop-item {
    display: flex;
    align-items: center;
    margin: 20px;
}

.shop-image {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
}

.shop-info h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}
</style>
  