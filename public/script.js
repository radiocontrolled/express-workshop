$(document).ready(function() {
    $.ajax({
        url: '/get-posts',
        dataType: 'json',
        success: function(data) {
          console.log(data);
            for (var key in data) {
              if(data.hasOwnProperty(key)) {
                var postDiv         = document.createElement('div');
                var postText        = document.createElement('p');
                var thumbnail       = document.createElement('img');
                var postContainer   = document.getElementsByClassName('post-container')[0];
                var dateContainer   = document.createElement("p");
                var postTitle       = document.createElement("p");
                var date; 

                thumbnail.src = "./img/logo2.png";
                thumbnail.className = "thumbnail";
                postText.innerHTML = data[key].blogpost;
                postDiv.className = "post";
                dateContainer.className = "date";
                dateContainer.innerHTML = key;
                postTitle.innerHTML = data[key].title;

                postDiv.appendChild(postTitle);
                postDiv.appendChild(thumbnail);
                postDiv.appendChild(postText);
                postDiv.appendChild(dateContainer);
                postContainer.appendChild(postDiv);

                // to-do: parse timestamp 
               // console.log(key);
              }
            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
