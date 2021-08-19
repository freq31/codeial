
let createComment=function(postid){
    let newCommentForm=$(`#post-${postid}-comments-form`);
    newCommentForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/comments/add-comments',
            data:newCommentForm.serialize(),
            success:function(data){
                let newComment=newCommentDom(data.data.comment);
                $(`#post-comments-${postid}`).prepend(newComment);
                deleteComment($('.delete-comment-button', newComment));
                new Noty({
                    theme: 'relax',
                    text: "Comment published!",
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
//method to create a comment in DOM
let newCommentDom=function(comment){
    return $(`<li id="comment-${comment._id}">
    
        <small>
            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">del</a>
        </small>
   
    ${comment.content}
    <name>
        ${comment.user.name}
    </name>
    
    </li>`)
}
let deleteComment=function(deletelink){
    $(deletelink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deletelink).prop('href'),
            success:function(data){
                //console.log(data);
                $(`#comment-${data.data.comment_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Comment deleted!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error:function(error){
                console.log(error.responseText);
            }
        })
    })
}
let convertCommentsToAjax = function(postid){
    $(`#post-comments-${postid}>li`).each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-comment-button', self);
        deleteComment(deleteButton);
    });
}
createComment();
