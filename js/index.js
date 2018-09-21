$(function () {

    // 监听游戏规则的点击
    $(".rulers").on("click", function () {
       // $(".ruler").css({display : "block"});
        $(".ruler").stop().fadeIn(100);
    });
    // 监听关闭蒙版ruler的点击
    $(".close").on("click", function () {
        // $(".ruler").css({display : "none"});
        $(".ruler").stop().fadeOut(100);
    });

    // 监听开始游戏的点击
    $(".start").on("click", function () {

        // 开始按钮消失
        $(this).css({
            display : "none"
        });

        // 播放动画
        autoPlay();
        wolfPlay();

        // 监听重新开始按钮点击
        $(".reStart").on("click", function () {

            // 进度条时间复原
            $(".progress").css({
                width : 180
            });

            $(".score").text("0");

            // 播放动画
            autoPlay();
            wolfPlay();

            // 关闭蒙版
            $(".mask").css({
                display : "none"
            });

        });
    });
});

function autoPlay() {

    // 进度条动画
    $(".progress").animate({
        width : 0
    },10000,"linear",function () {

        // 开启蒙版
        $(".mask").css({
            display : "block"
        });

        clearInterval(timer);

        $(".wolf").remove();
    });
}


var imgIndex = 0, timer = null, endIndex = 5;
function wolfPlay() {
    // 狂拍灰太狼动画

    // 动态创建灰太狼动画
    // $("<div class='wolfImg'></div>");


    // 1.定义两个数组保存所有灰太狼和小灰灰的图片
    var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
    var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
    // 2.定义一个数组保存所有可能出现的位置
    var arrPos = [
        {left:"100px",top:"115px"},
        {left:"20px",top:"160px"},
        {left:"190px",top:"142px"},
        {left:"105px",top:"193px"},
        {left:"19px",top:"221px"},
        {left:"202px",top:"212px"},
        {left:"120px",top:"275px"},
        {left:"30px",top:"295px"},
        {left:"209px",top:"297px"}
    ];

    var $wolfImg = $("<img src='' class='wolf'>");
    $(".box").append($wolfImg);


    var number8 = parseInt(Math.random() * 8);
    var number1 = parseInt(Math.random());
    var wolfType = number1 === 0 ? wolf_1 : wolf_2;

    $wolfImg.css({
        position : "absolute",
        cursor: "pointer",
        left : arrPos[number8].left,
        top : arrPos[number8].top
    });



    timer = setInterval(function () {

        $wolfImg.attr("src", wolfType[imgIndex]);

        if (imgIndex >= endIndex){

            imgIndex = 0;
            number8 = parseInt(Math.random() * 8);
            number1 = Math.round(Math.random());
            wolfType = number1 === 0 ? wolf_1 : wolf_2;

            $wolfImg.attr("src", wolfType[imgIndex]);

            $wolfImg.css({
                position : "absolute",
                cursor: "pointer",
                left : arrPos[number8].left,
                top : arrPos[number8].top
            });

        }else {
            imgIndex++;
        }

        endIndex = 5;

    }, 200);

    // gameRules($wolfImg);

    $wolfImg.on("click", function () {

        endIndex = 9;

        if (wolfType === wolf_1) {

            $(".score").text(parseInt($(".score").text()) + 10);

        }else {

            $(".score").text(parseInt($(".score").text()) - 10);

        }
    });
}

// function gameRules($wolfImg) {
//     $wolfImg.on("click", function () {
//
//     });
// }