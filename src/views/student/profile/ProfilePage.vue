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
                    <div class="address-item">
                        <div class="address-info">
                            <div class="address-label">地址:</div>
                            <div class="address-value">{{ userInfo.addresses[0].address }}</div>
                        </div>
                        <div class="address-info">
                            <div class="address-label">手机号:</div>
                            <div class="address-value">{{ userInfo.addresses[0].phoneNumber }}</div>
                        </div>
                        <div class="address-actions">
                            <el-button type="primary" @click="editAddress(0)">编辑</el-button>
                            <el-button type="danger" @click="deleteAddress(0)">删除</el-button>
                        </div>
                    </div>
                    <div class="address-item">
                        <div class="address-info">
                            <div class="address-label">地址:</div>
                            <div class="address-value">{{ userInfo.addresses[1].address }}</div>
                        </div>
                        <div class="address-info">
                            <div class="address-label">手机号:</div>
                            <div class="address-value">{{ userInfo.addresses[1].phoneNumber }}</div>
                        </div>
                        <div class="address-actions">
                            <el-button type="primary" @click="editAddress(1)">编辑</el-button>
                            <el-button type="danger" @click="deleteAddress(1)">删除</el-button>
                        </div>
                    </div>
                    <div v-if="userInfo.addresses.length === 0" class="no-address">暂无地址信息</div>
                </el-card>
            </el-form-item>
            <el-form-item>
                <el-button v-if="!editMode" type="primary" @click="editMode = true">编辑</el-button>
                <el-button v-else type="primary" @click="saveChanges">保存</el-button>
                <el-button type="primary" @click="addAddress">新增地址</el-button>
                <el-button type="primary" @click="goToSettings">设置</el-button>
            </el-form-item>
        </el-form>

        <el-dialog :visible="dialogVisible" title="编辑地址" @close="closeDialog">
            <el-form :model="editAddressForm" label-width="100px">
                <el-form-item label="地址">
                    <el-input v-model="editAddressForm.address"></el-input>
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
                        address: '123 Street, City',
                        phoneNumber: '1234567890'
                    },
                    {
                        address: '456 Street, City',
                        phoneNumber: '0987654321'
                    }
                ]
            },
            editMode: false,
            dialogVisible: false,
            editAddressForm: {
                address: '',
                phoneNumber: ''
            },
            avatarDialogVisible: false,
            newAvatar: ''
        };
    },
    methods: {
        editAddress(index) {
            this.editAddressForm = {
                address: this.userInfo.addresses[index].address,
                phoneNumber: this.userInfo.addresses[index].phoneNumber
            };
            this.dialogVisible = true;
        },
        deleteAddress(index) {
            this.userInfo.addresses.splice(index, 1);
        },
        addAddress() {
            this.editAddressForm = {
                address: '',
                phoneNumber: ''
            };
            this.dialogVisible = true;
        },
        saveAddress() {
            if (this.editAddressForm.address && this.editAddressForm.phoneNumber) {
                if (this.dialogVisible) {
                    // 编辑地址
                    const index = this.userInfo.addresses.findIndex(
                        (address) => address.address === this.editAddressForm.address
                    );
                    if (index !== -1) {
                        this.userInfo.addresses[index] = {
                            address: this.editAddressForm.address,
                            phoneNumber: this.editAddressForm.phoneNumber
                        };
                    }
                } else {
                    // 新增地址
                    this.userInfo.addresses.push({
                        address: this.editAddressForm.address,
                        phoneNumber: this.editAddressForm.phoneNumber
                    });
                }
                this.dialogVisible = false;
            }
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        goToSettings() {
            this.$router.push('/settings');
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
        }
    }
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.address-info {
    display: flex;
}

.address-label {
    font-weight: bold;
}

.address-actions {
    display: flex;
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
