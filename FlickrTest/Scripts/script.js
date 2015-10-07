﻿
var tags = null;
$("#tags").keyup(function () {
    

    clearTimeout(tags);
    tags = setTimeout(function () {

        if ($("#tags").val().length < 3) {
            var container = $("#container");
            container.html("");
            return false;
        }

        var URL = window.location + "/Home/GetImages?tags=" + $("#tags").val();

        $("#link").html(URL).attr("href", URL);

        $(".spinner-loader").show();


        $.post(URL, function (data) {
            var container = $("#container");
            container.html("");

         //   var mainRow = $("<div>");


           // mainRow.addClass("row");

            var ul = $("<ul>");
            ul.addClass("clearing-thumbs small-block-grid-1 medium-block-grid-3 large-block-grid-5");

            $.each(data, function () {

                

              //  var thumb = $("<div>");
                // thumb.addClass("medium-4 columns img-contianer");

                var li = $("<li>");
                li.addClass("item");

                var image = $("<img>")
                    .attr("src", this.ImageUrl);

                image.addClass("item");

                var title = $("<span>")
                    .html(this.Title);

                li.append(title);
                li.append(image);

                ul.append(li);

                container.append(ul);
            });

            $(".spinner-loader").hide();

        });

    }, 250);
})