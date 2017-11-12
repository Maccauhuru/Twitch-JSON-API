$(document).ready(function() {
  var url = "https://api.twitch.tv/kraken/streams/ESL_SC2";

  $.ajax({
    type: "GET",
    url: url,
    headers: {
      "client-id": "qqv1ika751e7o2bo3ll83g3iofxhd0"
    },
    success: function(data1) {
      if (data1.stream === null) {
        console.log(data1.stream);
        $("#ESLSC2Status").html("ESL_SC2 is currently OFFLINE");
      } else {
        $("#ESLSC2Status").html("ESL_SC2 is currently ONLINE");
      }
    }
  });

  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/users/ESL_SC2/follows/channels",
    headers: {
      "Client-ID": "qqv1ika751e7o2bo3ll83g3iofxhd0"
    },
    success: function(data2) {
      for (var i = 0; i < data2.follows.length; i++) {
        var displayName = data2.follows[i].channel.display_name;
        var status = data2.follows[i].channel.status;
        var logo = data2.follows[i].channel.logo;
        if (logo == null) {
          logo =
            "https://www.socabelec.co.ke/wp-content/uploads/no-photo-21.jpg";
          //console.log(status);
        }
        $("#followerInfo").prepend(
          "<div class ='row'>" +
            "<div class='col-md-4'>" +
            "<a href='https://www.twitch.tv/" +
            displayName +
            "'><img src='" +
            logo +
            "'></a>" +
            "</div>" +
            "<div class='col-md-4'>" +
            displayName +
            "</div>" +
            "<div class='col-md-4'>" +
            status +
            "</div></div>"
        );
      }
    }
  });
  var deletedFollowers = ["brunofin", "comster404"];
  for (var i = 0; i < deletedFollowers.length; i++) {
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
      headers: {
        "Client-ID": "qqv1ika751e7o2bo3ll83g3iofxhd0"
      },
      error: function(data3) {
        var logo =
          "https://www.socabelec.co.ke/wp-content/uploads/no-photo-21.jpg";
        var displayName = data3.statusText;
        var status = data3.status;

        $("#followerInfo").prepend(
          "<div class ='row'>" +
            "<div class='col-md-4'>" +
            "<a  href='https://www.twitch.tv/" +
            displayName +
            "'><img src='" +
            logo +
            "'></a>" +
            "</div>" +
            "<div class='col-md-4'>" +
            displayName +
            "</div>" +
            "<div class='col-md-4'>" +
            status +
            "</div></div>"
        );
      }
    });
  }
});
