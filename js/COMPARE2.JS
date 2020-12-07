
$(document).ready(function () {
    var data = [];
    $.getJSON("js/data.json", function (items) {
        // console.log(items);
        data = items;
        displayImages(data);
        myCompare(data);

    });
    //lap trinh su kien click chon loai san pham
    $("input[type=checkbox]").click(function () {

        var types =
            $('input:checkbox[name="type"]:checked')
                .map(function () {
                    return $(this).val();
                }).get();

        types = types.toString();
        if (types == "Wallet" || types == "Purse") {
            let subdata = (types.length == 0) ? data : data.filter(item => types.search(item.type) >= 0);
            displayImages(subdata);
        }
        else {
            let subdata = (types.length == 0) ? data : data.filter(item => types.search(item.brand) >= 0);
            displayImages(subdata);
        }     
    });
   
    $("#compare").click(function () {
        $("#information, #product").empty();
        $("#showshop").hide(function () {
            displayImages();
            $("#information, #product").fadeIn(1000);
        });

    })
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#on_top').fadeIn();
        } else {
            $('#on_top').fadeOut();
        }
    });
    $('#on_top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
    /* reset */
    $("#reset").click(function () {
        myReset();
        $("#information, #product").fadeOut();
        $("#showshop").fadeIn(1000);
        $("#product").empty();
    })
});

function displayImages(items) {
    let s = ``;

    $.each(items, function (k, v) {

        s += `<div class="col-sm-6 col-md-4 divImage">
                        <img src="images/${v.link}" class="img-responsive ep_fade ep_fade_0 card " alt="" class="Image">
                        <p style="font-size:2rem;">
                            <b>${v.name}</b><br>
                            ${v.cost}</p>
                            <input type="checkbox" class="checkbox mark" name = "product" value = "${v.id}"></div>`;
    });

    $("#products").html(s);
}


