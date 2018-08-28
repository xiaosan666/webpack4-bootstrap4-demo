# 关于Http请求统一显示Loading处理逻辑
> 本项目在[Http.js](https://github.com/yanxiaojun617/webpack4-bootstrap4-demo/blob/master/src/assets/js/Http.js)
封装了Jquery Ajax，并添加了统一显示/隐藏Loading的逻辑。关于此逻辑的几种处理情况再此记录、说明

    

* 情况1：同时发出多个请求，loading会同时打开多个，出现loading叠加的情况
  > 处理：Helper.showLoading()判断loading已经打开则不再打开，当请求计数等于0才去关闭loading（requestCount===0）
    ```javascript
    $('#test').bind('click', () => {
        Http({
            url: '/v1/demo/map_result_post',
            success: function (data) {
    
            }
        }).post();
      
        Http({
            url: '/v1/demo/map_result_post',
            success: function (data) {
    
            }
        }).post();
    });
    ```
    
* 情况2：嵌套请求，一个请求的回调函数又是一个请求，会出现一个loading刚关闭紧接着又打开一个loading的情况
  > 处理：A请求的回调函数又是B请求，A请求的hideLoading()在ajax.complete()中调用，B请求会在A请求的ajax.success()中调用， 
   由于ajax.success()优先ajax.complete()执行，所以当A调用hideLoading()时，B会先调用了showLoading()，
   此时requestCount===2，于是A打开的loading不会关闭，直到B请求完成去关闭  
    ```javascript
    $('#test').bind('click', () => {
        Http({
            url: '/v1/demo/map_result_post',
            success: function (data) {
                Http({
                    url: '/v1/demo/map_result_post',
                    success: function (data) {
    
                    }
                }).post();
            }
        }).post();
    });
    ```
    
* 情况3：有请求isShowLoading===false,有请求isShowLoading===true（默认情况）
  > 处理：isShowLoading===false不调用Helper.showLoading();
    ```javascript
    $('#test').bind('click', () => {
        Http({
            url: '/v1/demo/map_result_post',
            isShowLoading: false,
            success: function (data) {
    
            }
        }).post();
    
        Http({
            url: '/v1/demo/map_result_post',
            success: function (data) {
    
            }
        }).post();
    });
    ```
    
* 情况4：如第一种情况，发出多个请求，但不是同时发出，A请求完成需要处理一段时间，才发出B请求，可以使用setTimeout模拟
  > A请求完成过了一会出发B请求，类似A请求完成然后用户点击了按钮触发B请求，但是用户没有任何操作，此情况Http没办法处理，需要手动处理；
    把所有请求isShowLoading设置为false，手动调用 Helper.showLoading();在用时最长的请求回调中关闭loading
    ```javascript
    $('#test').bind('click', () => {
        // 打开loading
        Helper.showLoading();
        Http({
            url: '/v1/demo/map_result_post',
            isShowLoading: false,
            success: function (data) {
    
            },
            error: function () {
                // 异常情况关闭loading
                Helper.hideLoading();
            }
        }).post();
    
        // 延迟1秒
        setTimeout(() => {
            Http({
                url: '/v1/demo/map_result_post2',
                isShowLoading: false,
                success: function (data) {
                    // 在处理时间最长处关闭loading
                    Helper.hideLoading();
                },
                error: function () {
                    // 异常情况关闭loading
                    Helper.hideLoading();
                }
            }).post();
        },1000)
    });

    // 嵌套请求
    $('#test').bind('click', () => {
            // 打开loading
            Helper.showLoading();
            Http({
                url: '/v1/demo/map_result_post',
                isShowLoading: false,
                success: function (data) {
                    // 延迟1秒
                    setTimeout(() => {
                        Http({
                            url: '/v1/demo/map_result_post2',
                            isShowLoading: false,
                            success: function (data) {
                                // 在最终的回调函数处关闭loading
                                Helper.hideLoading();
                            },
                            error: function () {
                                // 异常情况关闭loading
                                Helper.hideLoading();
                            }
                        }).post();
                    }, 1000)
                }, 
                error: function () {
                    // 异常情况关闭loading
                    Helper.hideLoading();
                }
            }).post();
        });

    ```
