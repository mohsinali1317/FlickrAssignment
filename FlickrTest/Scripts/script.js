
var tags = null;
var imageArray = [];
$("#tags").keyup(function () {


    clearTimeout(tags);
    tags = setTimeout(function () {

        if ($("#tags").val().length < 3) {
            var container = $("#container");
            container.html("");
            $("#link").html("");
            return false;
        }

        var flickerOption = $("#flickerType").val();

        var cacheFlicker = (flickerOption == "cachedFlicker") ? true : false;

        var URL = window.location + "/Home/GetImages";

        var tags = $("#tags").val();

        $("#link").html(URL + "?tags=" + tags).attr("href", URL + "?tags=" + tags);

        $(".spinner-loader").show();


        $.post(URL, { tags: tags, cacheFlicker: cacheFlicker }, function (data) {
            imageArray = [];
            storeInImageArray(data);
            loadImages();
            $(".spinner-loader").hide();
        });

    }, 250);
})

function storeInImageArray(data) {

    var container = $("#container");
    container.html("");

    var ul = $("<ul>");
    ul.addClass("clearing-thumbs small-block-grid-1 medium-block-grid-3 large-block-grid-5");
    var count = 0;
    $.each(data, function () {
        imageArray.push(this.ImageUrl);

        var li = $("<li>");
        li.addClass("item");

        var image = $("<img>")
                    .addClass("image-item");

        var title = $("<span>")
                    .html(this.Title);

        var source = $("<span>")
                    .addClass("source image-item" + "_" + count++);

        li.append(source);
        li.append(image);
        ul.append(li);
        container.append(ul);
    });
}

function loadImages() {
    $('.image-item').each(function (index, elem) {
        elem.src = imageArray[index];
        if (!elem.complete) {
            $(elem).load(function () {
                $(elem).hide();
                $(elem).fadeIn(2000);
                rescaleImage(elem);
                $(".image-item_" + index).html("Loaded From Flicker");
            });
        }
        else {
            $(elem).hide();
            $(elem).fadeIn(2000);
            rescaleImage(elem);
            $(".image-item_" + index).html("Loaded From Cache");
        }
    });
}

function rescaleImage(elem) {
    var logoHeight = $(elem).height();
    if (logoHeight < 222) {
        var margintop = (222 - logoHeight) / 2;
        $(elem).css('margin-top', margintop);
    }
}