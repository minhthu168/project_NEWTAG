$(function () {
    var ds = [];
    $.getJSON("js/data.json", function (items) {
        console.log(items);
        ds = items;
       displayImages(ds);

    });

    //lap trinh su kien click chon TYPE/BRAND san pham
    $("input[type=checkbox]").click(function () {

        var types =
            $('input:checkbox[name="type"]:checked')
                .map(function () {
                    return $(this).val();
                }).get();

        types = types.toString();
        if (types == "Purse" || types == "Wallet") {
            let subdata = (types.length == 0) ? ds : ds.filter(item => types.search(item.type) >= 0);
            displayImages(subdata);

        }
        else {
            let subdata = (types.length == 0) ? ds : ds.filter(item => types.search(item.brand) >= 0);
            displayImages(subdata);

        }

    });
    // compare product
    function myCompare() {
        var product = document.getElementsByName("product");
        var mark = new Array();
        for (var i = 0; i < product.length; ++i) {
            if (product[i].checked == true) {
                mark.push(product[i].value);
            }
        }

        if (mark.length < 2 || mark.length > 4) {
            alert("Please take at least 2 products and at most 4 products !" + "\n");
            $("#note").append(
                '<div class = "alert alert-danger"><strong>You have chosen "' + mark.length + '" product !</strong>' +
                '<p>Click RESET to COMPARE again!</p>' +
                '</div>'
            )
            $("#information, #product").hide(function () {
                $(".Image").show();
                $("#showshop").fadeIn(1000);
            })
        } else {
            var arr = new Array();
            for (var i = 0; i < mark.length; ++i) {
                for (var j = 0; j < ds.length; ++j) {
                    if (ds[j].id == mark[i]) {
                        arr.push(ds[j]);
                        break;
                    }
                }
            }
            $("#information").append(
                '<div class="row border rowImage">' +
                '<p style="line-height:10em">Image</p>' +
                '</div>' +
                '<div class="row border">' +
                '<p>Name</p><br>' +
                '</div>' +
                '<div class="row border">' +
                '<p>Color</p>' +
                '</div>' +
                '<div class="row border">' +
                '<p>Size</p><br>' +
                '</div>' +
                '<div class="row border">' +
                '<p>Made in</p>' +
                '</div>' +
                '<div class="row border">' +
                '<p>Price</p>' +
                '</div>'
            );
            var n = Math.floor(12 / mark.length);
            for (var i = 0; i < mark.length; ++i) {
                $("#product").append(
                    '<div class="col-xs-' + n + '">' +
                    '<div class="row border rowImage">' +
                    '<img src="images\\' + arr[i].link + '" alt="img" height = "100%">' +
                    '</div>' +
                    '<div class="row border">' +
                    '<p>' + arr[i].name + '</p><br>' +
                    '</div>' +
                    '<div class="row border">' +
                    '<p>' + arr[i].color + '</p>' +
                    '</div>' +
                    '<div class="row border">' +
                    '<p>' + arr[i].size + '</p>' +
                    '</div>' +
                    '<div class="row border">' +
                    '<p>' + arr[i].made + '</p>' +
                    '</div>' +
                    '<div class="row border">' +
                    '<p>' + arr[i].cost + '</p>' +
                    '</div>' +
                    '</div>'
                );
            }
        }

    };
    // Function: reset product checkbox
    function myReset() {
        var product = document.getElementsByName("product");
        for (var i = 0; i < product.length; ++i) {
            product[i].checked = false;
        }
        $("#note").empty();
    }

    $(function () {
        $("#compare").click(function () {
            $("#information, #product").empty();
            $("#showshop").hide(function () {
                myCompare();
                $("#information, #product").fadeIn(1000);
            });

        })

        $("#reset").click(function () {
            myReset();
            $("#information, #product").fadeOut();
            $("#showshop").fadeIn(1000);
            $("#product").empty();
        })
    })
    /* scoll to top */
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

})
function displayImages(items) {
    let s = '';
    $.each(items, function (k, v) {
            s = s + '<div class="col-sm-4 image ' + v.type + ' ' +v.brand + '" style = "margin-bottom: 2em">' +
            '<img src="images\\' + v.link + '" class="img-responsive ep_fade ep_fade_0 card divImage" style="width:100%" alt="Image">' +
            '<p>' + v.name + '</p>' +
             '<p id="cost">'+ v.cost +  '</p>' +
            '<input type="checkbox" class="checkbox mark" name = "product" value = "' + v.id + '">' +
            '</div>'
    });

    console.log(s)
    $("#showshop").html(s);
}