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
                            <div class="address-value">{{ address.province + address.city + address.district +
                                address.detail }}</div>
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
                <el-button type="primary" @click="goToSettings">设置</el-button>
            </el-form-item>
        </el-form>

        <el-dialog :visible="dialogVisible" title="编辑地址" @close="closeDialog">
            <el-form :model="editAddressForm" label-width="100px">
                <el-form-item label="地址">
                    <el-select v-model="editAddressForm.province" placeholder="请选择省份" @change="handleProvinceChange">
                        <el-option v-for="province in provinces" :key="province" :label="province"
                            :value="province"></el-option>
                    </el-select>
                    <el-select v-model="editAddressForm.city" placeholder="请选择城市" @change="handleCityChange">
                        <el-option v-for="city in cities" :key="city" :label="city" :value="city"></el-option>
                    </el-select>
                    <el-select v-model="editAddressForm.district" placeholder="请选择区域">
                        <el-option v-for="district in districts" :key="district" :label="district"
                            :value="district"></el-option>
                    </el-select>
                    <el-input v-model="editAddressForm.detail" placeholder="请输入详细地址"></el-input>
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
                        province: '省1',
                        city: '市1',
                        district: '区1',
                        detail: '123 Street',
                        phoneNumber: '1234567890',
                    },
                    {
                        province: '省2',
                        city: '市2',
                        district: '区2',
                        detail: '456 Street',
                        phoneNumber: '0987654321',
                    },
                ],
            },
            editMode: false,
            dialogVisible: false,
            editAddressForm: {
                province: '',
                city: '',
                district: '',
                detail: '',
                phoneNumber: '',
            },
            provinces: ['省1', '省2', '省3'],
            cities: [],
            districts: [],
            avatarDialogVisible: false,
            newAvatar: '',
        };
    },
    methods: {
        editAddress(index) {
            const address = this.userInfo.addresses[index];
            this.editAddressForm = {
                province: address.province,
                city: address.city,
                district: address.district,
                detail: address.detail,
                phoneNumber: address.phoneNumber,
            };
            this.dialogVisible = true;
        },
        deleteAddress(index) {
            this.userInfo.addresses.splice(index, 1);
        },
        addAddress() {
            this.editAddressForm = {
                province: '',
                city: '',
                district: '',
                detail: '',
                phoneNumber: '',
            };
            this.dialogVisible = true;
        },
        saveAddress() {
            if (
                this.editAddressForm.province &&
                this.editAddressForm.city &&
                this.editAddressForm.district &&
                this.editAddressForm.detail &&
                this.editAddressForm.phoneNumber.length === 11
            ) {
                if (this.dialogVisible) {
                    // 编辑地址
                    const index = this.userInfo.addresses.findIndex(
                        (address) => address.province === this.editAddressForm.province && address.city === this.editAddressForm.city && address.district === this.editAddressForm.district && address.detail === this.editAddressForm.detail
                    );
                    if (index !== -1) {
                        this.userInfo.addresses[index] = {
                            province: this.editAddressForm.province,
                            city: this.editAddressForm.city,
                            district: this.editAddressForm.district,
                            detail: this.editAddressForm.detail,
                            phoneNumber: this.editAddressForm.phoneNumber,
                        };
                    }
                } else {
                    // 新增地址
                    this.userInfo.addresses.push({
                        province: this.editAddressForm.province,
                        city: this.editAddressForm.city,
                        district: this.editAddressForm.district,
                        detail: this.editAddressForm.detail,
                        phoneNumber: this.editAddressForm.phoneNumber,
                    });
                }
                this.dialogVisible = false;
            }
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        handleProvinceChange(province) {
            // 根据省份选择城市
            this.cities = this.getCitiesByProvince(province);
            // 清空城市和区域
            this.editAddressForm.city = '';
            this.editAddressForm.district = '';
        },
        handleCityChange(city) {
            // 根据城市选择区域
            this.districts = this.getDistrictsByCity(city);
            // 清空区域
            this.editAddressForm.district = '';
        },
        getCitiesByProvince(province) {
            // 根据省份获取城市数据
            // 根据实际情况替换成真实数据
            if (province === '省1') {
                return ['市1', '市2', '市3'];
            } else if (province === '省2') {
                return ['市4', '市5', '市6'];
            } else if (province === '省3') {
                return ['市7', '市8', '市9'];
            } else {
                return [];
            }
        },
        getDistrictsByCity(city) {
            // 根据城市获取区域数据
            // 根据实际情况替换成真实数据
            if (city === '市1') {
                return ['区1', '区2', '区3'];
            } else if (city === '市2') {
                return ['区4', '区5', '区6'];
            } else if (city === '市3') {
                return ['区7', '区8', '区9'];
            } else {
                return [];
            }
        },
        goToSettings() {
            this.$router.push('/student/profile/settings');
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