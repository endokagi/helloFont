$(function () {
    var getSearch;

    $("#startSearch").click(function () {
        getSearch = $("#search").val();
        $.get(`https://www.instagram.com/explore/tags/${getSearch}/?__a=1`, function (data, status) {
            var location = data.graphql.hashtag.name;
            var profile_pic_url = data.graphql.hashtag.profile_pic_url;
            var post_count = data.graphql.hashtag.edge_hashtag_to_media.count;

            console.log(data);
            $("#location").text("# " + location);
            $("#profile_pic").attr("src", profile_pic_url);
            $("#post_count").text(post_count + " posts");

            var img_url = data.graphql.hashtag.edge_hashtag_to_media;

            for (node in img_url.edges) {
                var post = img_url.edges[node];
                var display_url = post.node.display_url;

                var like_count = post.node.edge_liked_by.count
                var comment_count = post.node.edge_media_to_comment.count
                var comment = post.node.edge_media_to_caption.edges[0].node.text;
                var show_img = `
                <div class="col-4">
                <img src="${display_url}" 
                style = "height: 35vh;" class="img-thumbnail"><p></p>
                <div><i style='font-size:24px' class='far'>&#xf004;</i> ${like_count} &ensp;
                <i style='font-size:24px' class='far'>&#xf075;</i> ${comment_count}</div>
                <div class="card border-0 col text-left"data-spy="scroll" 
                style="position: relative; height: 4cm; overflow-y: scroll;">
                ${comment}</div><br>
                </div>`;

                $("#show_img").append(show_img);
            }

        });
    });

});