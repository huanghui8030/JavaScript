<template>
    <p>{{greeting}} 你好！</p>
</template>
<script>
module.exports = {
    data: function(){
        return {
            greeting:'Hello'
        }
    }
}
</script>
<style scoped>
    p{
        font-size:18px;
        text-align: center;
    }
</style>