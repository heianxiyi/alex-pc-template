<template>
    <div id="login-bg">
        <vue-particles
            color="#46B886"
            :particleOpacity="0.7"
            :particlesNumber="60"
            shapeType="circle"
            :particleSize="3"
            linesColor="#036CDE"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="bg"
        ></vue-particles>
        <img src="../assets/login/bg.png" class="login-bg" />
        <img src="../assets/login/earth.png" class="login-earth login-earth-bg" />
        <img src="../assets/login/circle-outer.png" class="login-earth login-earth-outer" />
        <img src="../assets/login/circle-inner.png" class="login-earth login-earth-inner" />
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form login-earth"
            @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                    v-decorator="['userName',userNameRules]"
                    placeholder="请输入您的用户名！"
                    size="large"
                >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="['password',passwordRules]"
                    type="password"
                    placeholder="请输入您的密码！"
                    size="large"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-decorator="['remember',rememberRules]" class="remember">保存用户名密码</a-checkbox>
                <a-button type="primary" html-type="submit" class="submit-button">登陆</a-button>
            </a-form-item>
        </a-form>
        <a class="notes" href="http://www.beian.miit.gov.cn/" target="_blank">蜀ICP备19029875号</a>
    </div>
</template>
<script>
import authUtils from "@/http/auth/utils";
export default {
    name: "login",
    data() {
        return {
            userNameRules: {
                rules: [
                    {
                        required: true,
                        message: "用户名不能为空!"
                    }
                ]
            },
            passwordRules: {
                rules: [
                    {
                        required: true,
                        message: "密码不能为空!"
                    }
                ]
            },
            rememberRules: {
                valuePropName: "checked",
                initialValue: true
            }
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: "normal_login" });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields(async (err, values) => {
                if (!err) {
                    let redirect = this.$route.query.redirect
                    let { userName, password } = values;
                    let { data } = await this.$http.login({
                        userName,
                        password
                    });
                    if(!data.head.respCode){
                        authUtils.setToken(`${userName}_${password}`);
                        if(redirect){
                            this.$router.push(redirect)
                        }else{
                            this.$router.push({name: "home"});
                        }
                    }
                }
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
.bg
    position absolute
    left 0
    bottom 0
    width 100%
    height 100%
    z-index 2
.remember
    color #fff
    margin-bottom 10px
.notes
    font-size 14px
    text-align center
    margin-top 10px
    color #333
    position absolute
    left 0
    bottom 10px
    width 100%
    z-index 2
.login-bg
    position fixed
    width 100%
    z-index 1
    height 100%
.login-earth
    position fixed
    margin auto
    left 0
    right 0
    top 0
    bottom 0
.login-earth-bg
    height 837px
    max-height 80%
    z-index 3
.login-earth-outer
    height 719px
    max-height 68.72%
    z-index 4
    animation loading-outer 24s linear infinite
.login-earth-inner
    height 677px
    max-height 64.71%
    z-index 4
    animation loading-inner 24s linear infinite
.login-form
    padding-top 20px
    width 300px
    height 280px
    max-height 27%
    z-index 5
.submit-button
    padding 0
    width 100%
    height 44px
    text-align center
    line-height 44px
    font-size 20px
    color #fff
    border none
    background-color #18a5fc
    background-image linear-gradient(to right, #18a5fc, #2067e2)
    outline none
    border-radius 25px
    cursor pointer
@keyframes loading-outer
    0%
        transform rotate(0deg)
    100%
        transform rotate(360deg)
@keyframes loading-inner
    0%
        transform rotate(0deg)
    100%
        transform rotate(-360deg)
</style>
