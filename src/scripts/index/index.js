import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/index.less';
import '../../styles/common.less';
import 'bootstrap';

class Index{
    constructor(){
        $('.jump').click(function () {
            window.location.href = 'login';
        })
    }
    saySomething(){
        console.log('index');
        $('div').css({
            'background-color': 'green',
            color:'black'
        })
    }
}
let index = new Index();
index.saySomething();