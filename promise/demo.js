function test(successFn,errorFn){
    var timeOut = Math.random() * 2;
    console.log('set timeout to: ' + timeOut + ' seconds.');
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

function successFn(){
    console.log('successFn');
}

function errorFn(){
    console.log('errorFn');
}

test(successFn,errorFn);