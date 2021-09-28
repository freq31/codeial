
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
                likebutton($('.likes-form',newComment));
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
    <div id="likes-${comment._id}">
        <div id="likes-number-${comment._id}">
            ${comment.likes.length}
        </div>
        <form action="/likes/add-likes/${comment._id}" method="POST" class="likes-form">
            <button type="submit"><i class="far fa-thumbs-up"></i></button>
        </form>
    </div>
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
//function to get numbeer of likes
let likebutton=function(likelink){
    //console.log(likelink)
    $(likelink).submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:$(likelink).prop('action'),
            success:function(data){
                //let commentid = $(this).prop('action').split("/")[2];
                //console.log(commentid);
                //$(likelink).text("No of likes:"+(data.data.likes.length).toString());
                //console.log(data);
                if(!data.data.deleted){
                    let link="#likes-number-";
                    link+=(data.data.id).toString();
                    $(link).text((data.data.likes.length).toString());
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
let convertCommentsToAjax = function(postid){
    $(`#post-comments-${postid}>li`).each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-comment-button', self);
        let commentid = self.prop('id').split("-")[1];
        let likelink = $(`#likes-form-${commentid}`, self);
        deleteComment(deleteButton);
        likebutton(likelink);
    });
}
createComment();
