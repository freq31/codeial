{
    //method to submit the form data using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/add-post',
                data:newPostForm.serialize(),
                success:function(data){
                    //console.log(data.data.post);
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));
                    likebutton($('.likes-form',newPost));
                    createComment(data.data.post._id);
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">del</a>
        </small>

        ${post.content}
        <name>
            ${post.user.name}
        </name>
        <div>
        <div id="likes-${post._id}">
            <div id="likes-number-${post._id}">
                ${post.likes.length}
            </div>
            <form action="/likes/add-likes/${post._id}" method="POST" class="likes-form">
                <button type="submit"><i class="far fa-thumbs-up"></i></button>
            </form>
        </div>
        </div>
        <comments class="post-comments"> 
    
        <form action="/comments/add-comments" id="new-comment-form" method="POST">
            <input type="text" name="content" placeholder="add comment" required>
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Comment">
        </form>
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
        </comments>
        
    </li>`)
    }
    //method to delete a post from dom
    let deletePost=function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //function to get numbeer of likes
    let likebutton=function(likelink){
        $(likelink).submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:$(likelink).prop('action'),
                success:function(data){
                    //let postid = $(this).prop('action').split("/")[2];
                    //console.log(postid);
                    if(!data.data.deleted){
                        let link="#likes-number-";
                        link+=(data.data.id).toString();
                        $(link).text((data.data.likes.length).toString());
                        //console.log(data);
                        new Noty({
                            theme: 'relax',
                            text: "Like Added",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    }
                    else{
                        let link="#likes-number-";
                        link+=(data.data.id).toString();
                        $(link).text((data.data.likes.length).toString());
                        //console.log(data);
                        new Noty({
                            theme: 'relax',
                            text: "Like Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    }
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            let postId = self.prop('id').split("-")[1];
            let likelink = $(`#likes-form-${postId}`, self);
            deletePost(deleteButton);
            likebutton(likelink);
            //console.log(postId);
            createComment(postId);
            convertCommentsToAjax(postId);
        });
    }
    createPost();
    convertPostsToAjax();
}