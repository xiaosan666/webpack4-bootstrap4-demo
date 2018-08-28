# 如何使用html默认的表单验证然后用ajax提交数据？

## 方法一
```html
<!--onsubmit中的return不能省略-->
<form name="form" onsubmit="return login(form.username.value,form.password.value)">
    <input type="text" name="username" placeholder="请输入用户名" required>
    <input type="password" name="password" placeholder="请输入密码" required>
    <!--type必须是submit-->
    <button type="submit">登录</button>
</form>
```
```javascript
window.login=function(username, password){
    Http({
        url: '/v1/login',
        data: data, // 表单数据
        success: function (token) {
            window.location.href = 'invoice.html';
        }
    }).post();
    return false; // 这里必须return false
}
```

## 方法二，建议使用
```html
<form>
    <input type="text" name="username" placeholder="请输入用户名" required>
    <input type="password" name="password" placeholder="请输入密码" required>
    <!--type必须是submit-->
    <button type="submit">登录</button>
</form>
```
```javascript
$('form').on('submit', function (ev) {
    Http({
        url: '/v1/login',
        data: data, // 表单数据
        success: function (token) {
            window.location.href = 'invoice.html';
        }
    }).post();
    // 阻止submit表单提交
    // ev.preventDefault();
    // 或者return false
    return false;
});
```
