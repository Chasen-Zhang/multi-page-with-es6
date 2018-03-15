import '../../styles/common.less';
import '../../styles/login.less';
import 'jquery.qrcode';
import '../../assets/plugins/flexible/flexible.js'
import '../../assets/plugins/flexible/flexible_css.js'
class Login{
    constructor(name_){
        this.name = name_;
        this.eventBus();
    }

   saySomething(){
        console.log(this.name);
       layui.use('laypage', function(){
           var laypage = layui.laypage;

           //执行一个laypage实例
           laypage.render({
               elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
               ,count: 50 //数据总数，从服务端得到
           });
       });
    }
    eventBus(){
      /* document.getElementById("test").addEventListener('click',function () {
            console.log(90);
        }) */
    /*  $('#test').click(function () {
          console.log(89)
      })*/
        let str = 'http://192.168.40.223:8090/aPagejs/test.html';
        $("#code").qrcode(
            {
                /*  render: "table", //table方式*/
                width: 200, //宽度
                height:200, //高度
                background: "#ffffff",            //背景颜色
                /*   foreground: "blue",       */         //前景颜色
                /* text: "http://192.168.40.223:9002/aPagejs/test.html"         //任意内容*/
                text: str
            }
        );
    }


}
let login = new Login('iiii');
login.saySomething();
