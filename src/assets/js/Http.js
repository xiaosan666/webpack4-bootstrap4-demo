window.Http = Http;


function Http(opts) {
    this.type = opts.type || "POST";
    this.url = opts.url;
    this.data = opts.data || {};
    this.dataType = opts.dataType || "json";
    this.beforeSend = opts.beforeSend;
    this.success = opts.success;
    this.error = opts.error;
    this.complete = opts.complete;
    this.isShowLoader = !(opts.isShowLoader === false);
    this.isDefaultApiRequest = !(opts.isDefaultApiRequest === false);
}

Http.prototype = {
    //发送请求
    request: function () {
        var that = this;
        $.ajax({
            type: this.type,
            url: this.url,
            data: this.data,
            dataType: this.dataType || 'json',
            headers: this.headers || {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            crossDomain: !(document.all),
            beforeSend: function (xhr) {
                that.showLoader();
                if (that.beforeSend && Object.prototype.toString.call(that.beforeSend) === "[object Function]") {
                    that.beforeSend(xhr);
                }
            },
            complete: function (xhr, status) {
                that.hideLoader();
                if (that.complete && Object.prototype.toString.call(that.complete) === "[object Function]") {
                    that.complete(xhr, status);
                }
            },
            error: function (xhr, status, error) {
                if (that.error && Object.prototype.toString.call(that.error) === "[object Function]") {
                    that.error(xhr, status, error);
                }
            },
            success: function (result, status, xhr) {
                if (that.success && Object.prototype.toString.call(that.success) === "[object Function]") {
                    that.success(that.isDefaultApiRequest ? result.data : result, status, xhr);
                }
            }
        });
    },
    defaultApiRequest: function () {
        this.headers = this.headers || {};
        this.headers.Authorization = 'Bearer ' + (window.token || Utils.getSessionStorageItem('token'));
        this.url = Utils.formatUrl(this.url.startsWith('http') ? this.url : API + this.url);
        this.request();
    },
    post: function () {
        this.headers = {"Content-Type": "application/json; charset=UTF-8"};
        this.data = JSON.stringify(this.data);
        this.isDefaultApiRequest ? this.defaultApiRequest() : this.request();
    },
    postFormData: function () {
        this.isDefaultApiRequest ? this.defaultApiRequest() : this.request();
    },
    get: function () {
        this.type = 'GET';
        this.isDefaultApiRequest ? this.defaultApiRequest() : this.request();
    },
    requestCount: 0, //  记录未完成的请求数量,当请求数为0关闭loading,当不为0显示loading
    showLoader: function () {
        if (this.isShowLoader && ++this.requestCount > 0) {
            Utils.showLoading();
        }
    },
    hideLoader: function () {
        if (this.isShowLoader && --this.requestCount === 0) {
            Utils.hideLoading();
        }
    }
};

// Ajax统一异常处理
$(document).ajaxError(function (event, xhr, settings, exception) {
    if (exception === 'abort') {
        return;
    }
    var state = xhr.status;
    if (state === 404) {
        swal('找不到页面', '', "error");
    } else if (state === 500) {
        swal('服务器处理失败', '', "error");
    } else if (state === 400) { // 业务异常
        var result = xhr.responseJSON;
        if (result && result.msg) {
            // 发票已存在
            if (result.code === 601) {
                var data = JSON.parse(result.msg);
                swal({
                    title: '该发票已经存在',
                    text: '发票号码：' + data.invoiceNumber + '，添加时间：' + Utils.formatDateTime(data.createTime),
                    type: 'warning'
                });
            } else if (result.code === 401) {
                swal({
                    title: '认证失败，请重新登录',
                    type: 'warning'
                }).then(function () {
                    window.location.href = document.location.origin;
                });
            } else {
                swal(result.msg, '', "warning");
            }
        } else {
            swal('请求发生异常', '', "error");
        }
    } else {
        swal('请求发生异常', '', "error");
        console.warn(xhr);
        console.warn(settings);
    }
});
