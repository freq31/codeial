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
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
            let postId = self.prop('id').split("-")[1];
            //console.log(postId);
            createComment(postId);
            convertCommentsToAjax(postId);
        });
    }
    createPost();
    convertPostsToAjax();
}