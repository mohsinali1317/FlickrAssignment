
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

        $.getJSON(URL, function (data) {
            var container = $("#container");
            container.html("");

            var count = 1;
            var mainRow = $("<div>");
            mainRow.addClass("row");
            $.each(data, function () {

                

                var thumb = $("<div>");
                thumb.addClass("medium-4 columns img-contianer");
                var image = $("<img>")
                    .attr("src", this.ImageUrl);

                var title = $("<span>")
                    .html(this.Title);

                thumb.append(title);
                thumb.append(image);

                mainRow.append(thumb);

                container.append(mainRow);
            });

            $(".spinner-loader").hide();

        });

    }, 250);
})