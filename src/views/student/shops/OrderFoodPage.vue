<template>
    <!-- 选择菜品页面 -->
    <div id="orderFood">
        <div class="left-section">
            <el-menu class="navigation" background-color="#f8f8f8" text-color="#333" active-text-color="#409EFF"
                @select="handleMenuSelect" unique-opened router>
                <el-menu-item index="discount">打折菜品</el-menu-item>
                <el-menu-item index="meat">荤菜</el-menu-item>
                <el-menu-item index="vegetable">素菜</el-menu-item>
                <el-menu-item index="porridge">粥</el-menu-item>
                <el-menu-item index="soup">汤</el-menu-item>
                <el-menu-item index="fastfood">快餐</el-menu-item>
                <el-menu-item index="drinks">酒水饮料</el-menu-item>
            </el-menu>
        </div>
        <div class="middle-section">
            <div class="search-bar">
                <el-input v-model="searchContent" placeholder="请输入搜索内容"></el-input>
            </div>
            <div class="food-list">
                <div class="food-item" v-for="(food, index) in filteredFoods" :key="index">
                    <div class="food-image" :style="{ backgroundImage: `url(${food.image})` }"></div>
                    <div class="food-info">
                        <h3>{{ food.name }}</h3>
                        <p>{{ food.description }}</p>
                    </div>
                    <el-button class="add-cart-btn" type="primary" icon="el-icon-plus" circle
                        @click="addToCart(food)"></el-button>
                </div>
            </div>
        </div>
        <div class="right-section">
            <el-badge class="cart-badge" :value="cartItems.length" max="99">
                <el-button class="cart-btn" type="primary" icon="el-icon-shopping-cart" circle
                    @click="showCart"></el-button>
            </el-badge>
        </div>
        <el-dialog title="购物车" :visible.sync="isCartDialogVisible" width="30%">
            <div v-if="cartItems.length > 0">
                <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
                    <div class="cart-item-info">
                        <h4>{{ item.name }}</h4>
                        <p>数量: {{ item.quantity }}</p>
                    </div>
                    <el-button class="cart-item-remove-btn" type="danger" icon="el-icon-delete" circle
                        @click="removeFromCart(index)"></el-button>
                </div>
            </div>
            <div v-else>
                <p>购物车为空</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isCartDialogVisible = false">取消</el-button>
                <el-button type="primary">结算</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            searchContent: "",
            foodList: [
                {
                    name: "菜品1",
                    description: "菜品1介绍",
                    image: "https://via.placeholder.com/100"
                },
                {
                    name: "菜品2",
                    description: "菜品2介绍",
                    image: "https://via.placeholder.com/100"
                },
                {
                    name: "菜品3",
                    description: "菜品3介绍",
                    image: "https://via.placeholder.com/100"
                }
            ],
            selectedMenu: "",
            isCartDialogVisible: false,
            cartItems: []
        };
    },
    computed: {
        filteredFoods() {
            if (this.selectedMenu === "discount") {
                return this.foodList;
            } else {
                return this.foodList.filter(food => food.category === this.selectedMenu);
            }
        }
    },
    methods: {
        handleMenuSelect(index) {
            console.log("选中了菜单项：", index);
            this.selectedMenu = index;
        },
        addToCart(food) {
            const existingItem = this.cartItems.find(item => item.name === food.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cartItems.push({
                    name: food.name,
                    quantity: 1
                });
            }
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
        },
        showCart() {
            this.isCartDialogVisible = true;
        }
    }
};
</script>
  
<style scoped>
#orderFood {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
}

.left-section {
    width: 200px;
}

.navigation {
    width: 100%;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.middle-section {
    flex: 1;
    margin: 0 20px;
}

.search-bar {
    margin-bottom: 20px;
}

.food-list {
    display: flex;
    flex-wrap: wrap;
}

.food-item {
    display: flex;
    align-items: center;
    margin: 10px;
    width: 200px;
}

.food-image {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
    border-radius: 5px;
}

.food-info {
    flex: 1;
}

.add-cart-btn {
    margin-left: 10px;
}

.right-section {
    display: flex;
    align-items: center;
}

.cart-badge {
    margin-right: 10px;
}

.cart-btn {
    width: 40px;
    height: 40px;
}
</style>