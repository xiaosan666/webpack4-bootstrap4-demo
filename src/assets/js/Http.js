
/**
 * 封装jquery Ajax
 * 1.统一异常处理
 * 2.default请求添加默认api，添加权限请求头
 * 3.注意post方法的请求头为application/json，不需要此请求头则调用postFormData()
 * 示例：
 Http({
    url: '',
    data: {},
    success: function (data) {
        console.log(data);
    }
 }).post();
 */
window.Http = function (opts) {
    return new JqueryAjax(opts); // 如果不new一个新对象，第一次请求未完成紧接着第二次请求的话参数会污染
};

function JqueryAjax(opts) {
    this.url = opts.url;
    this.type = opts.type || 'POST';
    this.data = opts.data || {};
    this.dataType = opts.dataType || 'json';
    this.headers = opts.headers || { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
    this.beforeSend = opts.beforeSend;
    this.success = opts.success;
    this.error = opts.error;
    this.complete = opts.complete;
    this.isShowLoading = !(opts.isShowLoading === false); // 本次请求是否显示loading，默认显示
    this.isDefaultApiRequest = !(opts.isDefaultApiRequest === false); // 是否使用默认api请求，默认请求会添加请求头，会添加默认api
}

JqueryAjax.prototype = {
    request: function () {
        let that = this;
        $.ajax({
            type: this.type,
            url: this.url,
            data: this.data,
            dataType: this.dataType,
            headers: this.headers,
            crossDomain: !(document.all),
            beforeSend: function (xhr) {
                that.showLoading();
                that.beforeSend && that.beforeSend(xhr);
            },
            complete: function (xhr, status) {
                that.hideLoading();
                that.complete && that.complete(xhr, status);
            },
            error: function (xhr, status, error) {
                that.error && that.error(xhr, status, error);
                let state = xhr.status;
                if (state === 404) {
                    swal('找不到页面', '', 'error');
                } else if (state === 500) {
                    swal('服务器处理失败', '', 'error');
                } else if (state === 400) { // 业务异常
                    let result = xhr.responseJSON;
                    if (result && result.msg) {
                        // 发票已存在
                        if (result.code === 601) {
                            let data = JSON.parse(result.msg);
                            swal({
                                title: '该发票已经存在',
                                text: '发票号码：' + data.invoiceNumber + '，添加时间：' + Utils.dateFormat(data.createTime, 'yyyy-MM-dd HH:mm:ss'),
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
                            swal(result.msg, '', 'warning');
                        }
                    } else {
                        swal('请求发生异常，请联系管理员', '', 'error');
                    }
                } else {
                    swal('请求发生异常', '', 'error');
                    console.warn(xhr);
                }
            },
            success: function (result, status, xhr) {
                that.success && that.success(that.isDefaultApiRequest ? result.data : result, status, xhr);
            }
        });
    },
    defaultApiRequest: function () {
        this.headers = this.headers || {};
        this.headers.Authorization = 'Bearer ' + (window.token || Utils.getSessionStorage('token'));
        this.url = Utils.formatUrl(this.url.indexOf('http') !== -1 ? this.url : API + this.url);
        this.request();
    },
    post: function () {
        this.headers = { 'Content-Type': 'application/json; charset=UTF-8' };
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
    requestCount: 0, //  记录未完成的请求数量,当请求数为0关闭loading,否则显示loading
    // 关于统一显示loading的处理逻辑，请查看/doc/《Http请求统一显示Loading.md》
    showLoading: function () {
        ++this.requestCount;
        this.isShowLoading && Helper.showLoading();
    },
    hideLoading: function () {
        --this.requestCount === 0 && Helper.hideLoading();
    }
};
