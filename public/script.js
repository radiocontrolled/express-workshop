$(document).ready(function() {
    $.ajax({
        url: '/get-posts',
        dataType: 'json',
        success: function(data) {
            for (var blogPost in data) {

              if(data.hasOwnProperty(blogPost)) {
                var postDiv         = document.createElement('div');
                var postText        = document.createElement('p');
                var thumbnail       = document.createElement('img');
                var postContainer   = document.getElementsByClassName('post-container')[0];
                var dateContainer   = document.createElement("p");
                var date; 

                thumbnail.src = "./img/logo2.png";
                thumbnail.className = "thumbnail";
                postText.innerHTML = data[blogPost];
                postDiv.className = "post";
                dateContainer.className = "date";
                dateContainer.innerHTML = blogPost;

                postDiv.appendChild(thumbnail);
                postDiv.appendChild(postText);
                postDiv.appendChild(dateContainer);
                postContainer.appendChild(postDiv);


                console.log(blogPost);
              }
            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
