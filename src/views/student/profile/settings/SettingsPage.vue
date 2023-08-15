<template>
    <div id="setting">
        <h1>修改密码</h1>
        <div class="form-container">
            <el-form :model="form" label-width="80px" class="setting-form">
                <el-form-item label="原密码">
                    <el-input type="password" v-model="form.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="form.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changePassword">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        changePassword() {
            if (this.form.oldPassword === '' || this.form.newPassword === '' || this.form.confirmPassword === '') {
                this.$message.error('请输入完整信息');
            } else if (this.form.newPassword.length < 6) {
                this.$message.error('密码长度必须大于等于6位');
            } else if (!/[a-zA-Z]/.test(this.form.newPassword) || !/[\u4e00-\u9fa5]/.test(this.form.newPassword)) {
                this.$message.error('密码必须包含中文和英文');
            } else if (this.form.newPassword !== this.form.confirmPassword) {
                this.$message.error('两次输入的密码不一致');
            } else {
                // 调用修改密码的API
                // 在这里添加你的密码修改逻辑
                this.$message.success('密码修改成功');
                this.form.oldPassword = '';
                this.form.newPassword = '';
                this.form.confirmPassword = '';
            }
        }
    }
}
</script>

<style scoped>
#setting {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.form-container {
    width: 400px;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.setting-form {
    margin-top: 20px;
}

.el-form-item__label {
    width: 80px;
}

.el-button {
    width: 120px;
}
</style>