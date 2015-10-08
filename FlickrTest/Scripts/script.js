
var tags = null;
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
            var container = $("#container");
            container.html("");

            var ul = $("<ul>");
            ul.addClass("clearing-thumbs small-block-grid-1 medium-block-grid-3 large-block-grid-5");

            $.each(data, function () {

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