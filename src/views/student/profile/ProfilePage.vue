<template>
    <div id="profile">
        <h2 class="title">个人信息</h2>
        <el-form :model="userInfo" label-width="100px" class="form">
            <el-form-item label="头像">
                <el-avatar :src="userInfo.avatar" :size="100" @click="showAvatarDialog"></el-avatar>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userInfo.nickname" :readonly="!editMode"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="userInfo.username" :readonly="!editMode"></el-input>
            </el-form-item>
            <el-form-item label="地址信息">
                <el-card>
                    <div v-for="(address, index) in userInfo.addresses" :key="index" class="address-item">
                        <div class="address-info">
                            <div class="address-label">地址:</div>
                            <div class="address-value">{{ address.canteen + address.floor + address.window  }}</div>
                        </div>
                        <div class="address-info">
                            <div class="address-label">手机号:</div>
                            <div class="address-value">{{ address.phoneNumber }}</div>
                        </div>
                        <div class="address-actions">
                            <el-button type="primary" @click="editAddress(index)">编辑</el-button>
                            <el-button type="danger" @click="deleteAddress(index)">删除</el-button>
                        </div>
                    </div>
                    <div v-if="userInfo.addresses.length === 0" class="no-address">暂无地址信息</div>
                </el-card>
            </el-form-item>
            <el-form-item>
                <el-button v-if="!editMode" type="primary" @click="editMode = true">编辑</el-button>
                <el-button v-else type="primary" @click="saveChanges">保存</el-button>
                <el-button type="primary" @click="addAddress">新增地址</el-button>
                <el-button type="primary" @click="goToSettings">修改密码</el-button>
            </el-form-item>
        </el-form>

        <el-dialog :visible="dialogVisible" title="编辑地址" @close="closeDialog">
            <el-form :model="editAddressForm" label-width="100px">
                <el-form-item label="地址">
                    <el-select v-model="editAddressForm.canteen" placeholder="请选择食堂" @change="handlecanteenChange">
                        <el-option v-for="canteen in canteens" :key="canteen" :label="canteen"
                            :value="canteen"></el-option>
                    </el-select>
                    <el-select v-model="editAddressForm.floor" placeholder="请选择楼层" @change="handlefloorChange">
                        <el-option v-for="floor in cities" :key="floor" :label="floor" :value="floor"></el-option>
                    </el-select>
                    <el-select v-model="editAddressForm.window" placeholder="请选择窗口">
                        <el-option v-for="window in windows" :key="window" :label="window"
                            :value="window"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="editAddressForm.phoneNumber"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="saveAddress">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible="avatarDialogVisible" title="修改头像" @close="closeAvatarDialog">
            <el-input v-model="newAvatar" placeholder="请输入新的头像链接"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAvatarDialog">取消</el-button>
                <el-button type="primary" @click="saveAvatar">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            userInfo: {
                avatar: 'https://example.com/avatar.jpg',
                nickname: 'John',
                username: 'john123',
                addresses: [
                    {
                        canteen: '一食堂',
                        floor: '一楼',
                        window: '48号窗口',
                        phoneNumber: '1234567890',
                    },
                    {
                        canteen: '二食堂',
                        floor: '二楼',
                        window: '3号窗口',
                        phoneNumber: '0987654321',
                    },
                ],
            },
            editMode: false,
            dialogVisible: false,
            editAddressForm: {
                canteen: '',
                floor: '',
                window: '',
                phoneNumber: '',
            },
            canteens: ['一食堂', '二食堂', '三食堂'],
            cities: [],
            windows: [],
            avatarDialogVisible: false,
            newAvatar: '',
        };
    },
    methods: {
        editAddress(index) {
            const address = this.userInfo.addresses[index];
            this.editAddressForm = {
                canteen: address.canteen,
                floor: address.floor,
                window: address.window,
                phoneNumber: address.phoneNumber,
            };
            this.dialogVisible = true;
        },
        deleteAddress(index) {
            this.userInfo.addresses.splice(index, 1);
        },
        addAddress() {
            this.editAddressForm = {
                canteen: '',
                floor: '',
                window: '',
                phoneNumber: '',
            };
            this.dialogVisible = true;
        },
        saveAddress() {
            if (
                this.editAddressForm.canteen &&
                this.editAddressForm.floor &&
                this.editAddressForm.window &&
                this.editAddressForm.phoneNumber.length === 11
            ) {
                if (this.dialogVisible) {
                    // 编辑地址
                    const index = this.userInfo.addresses.findIndex(
                        (address) => address.canteen === this.editAddressForm.canteen && address.floor === this.editAddressForm.floor && address.window === this.editAddressForm.window
                    );
                    if (index !== -1) {
                        this.userInfo.addresses[index] = {
                            canteen: this.editAddressForm.canteen,
                            floor: this.editAddressForm.floor,
                            window: this.editAddressForm.window,
                            phoneNumber: this.editAddressForm.phoneNumber,
                        };
                    }
                } else {
                    // 新增地址
                    this.userInfo.addresses.push({
                        canteen: this.editAddressForm.canteen,
                        floor: this.editAddressForm.floor,
                        window: this.editAddressForm.window,
                        phoneNumber: this.editAddressForm.phoneNumber,
                    });
                }
                this.dialogVisible = false;
            }
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        handlecanteenChange(canteen) {
            this.cities = this.getCitiesBycanteen(canteen);
            this.editAddressForm.floor = '';
            this.editAddressForm.window = '';
        },
        handlefloorChange(floor) {
            this.windows = this.getwindowsByfloor(floor);
            // 清空区域
            this.editAddressForm.window = '';
        },
        getCitiesBycanteen(canteen) {
            if (canteen === '一食堂') {
                return ['一楼', '二楼', '三楼'];
            } else if (canteen === '二食堂') {
                return ['一楼', '二楼', '三楼'];
            } else if (canteen === '三食堂') {
                return ['一楼', '二楼', '三楼'];
            } else {
                return [];
            }
        },
        getwindowsByfloor(floor) {
            if (floor === '一楼') {
                return ['1号窗口', '2号窗口', '3号窗口'];
            } else if (floor === '二楼') {
                return ['1号窗口', '2号窗口', '3号窗口'];
            } else if (floor === '三楼') {
                return ['1号窗口', '2号窗口', '3号窗口'];
            } else {
                return [];
            }
        },
        goToSettings() {
            this.$router.push('/student/settings');
        },
        showAvatarDialog() {
            this.avatarDialogVisible = true;
        },
        closeAvatarDialog() {
            this.avatarDialogVisible = false;
        },
        saveAvatar() {
            if (this.newAvatar) {
                this.userInfo.avatar = this.newAvatar;
                this.closeAvatarDialog();
            }
        },
        saveChanges() {
            this.editMode = false;
            // Save the changes to the server or update the local storage
        },
    },
};
</script>
  
<style scoped>
#profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

.form {
    width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.address-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}

.address-info {
    display: flex;
}

.address-label {
    font-weight: bold;
    margin-right: 10px;
}

.address-value {
    margin-left: 5px;
}

.address-actions {
    display: flex;
    margin-top: 5px;
}

.dialog-footer {
    text-align: right;
}

.no-address {
    text-align: center;
    margin: 10px 0;
    color: #999;
}

@media screen and (max-width: 768px) {
    .form {
        width: 90%;
    }
}
</style>