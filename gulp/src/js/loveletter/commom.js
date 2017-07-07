$('.playTipDiv').on('click',function(){
    $('#index').addClass('dis_none')
    $('#playDirect').removeClass('dis_none')
})
$('.closeBtn').on('click',function(){
    var playDirect= parent.document.getElementById("playDirect");
    var index= parent.document.getElementById("index");
    playDirect.setAttribute('class', 'dis_none');
    index.setAttribute('class', '');
})