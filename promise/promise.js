function test(successFn,errorFn){
    var timeOut = Math.random() * 2;
    console.log('输出时间: ' + timeOut);
    setTimeout(function(){
        if(timeOut < 1){
            console.log('success');
            successFn('ok');
        }else{
            console.log('error');
            errorFn('error');
        }
    })
}

new Promise(test)
    .then(function(t){
        console.log( '成功：' + t );
    }).catch(function(r){
        console.log( '失败：' + r );
    });

