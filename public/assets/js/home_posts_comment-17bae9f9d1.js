let createComment=function(e){let t=$(`#post-${e}-comments-form`);t.submit((function(n){n.preventDefault(),$.ajax({type:"post",url:"/comments/add-comments",data:t.serialize(),success:function(t){let n=newCommentDom(t.data.comment);$(`#post-comments-${e}`).prepend(n),deleteComment($(".delete-comment-button",n)),likebutton($(".likes-form",n)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},newCommentDom=function(e){return $(`<li id="comment-${e._id}">\n    \n        <small>\n            <a class="delete-comment-button" href="/comments/destroy/${e._id}">del</a>\n        </small>\n    ${e.content}\n    <name>\n        ${e.user.name}\n    </name>\n    <div id="likes-${e._id}">\n        <div id="likes-number-${e._id}">\n            ${e.likes.length}\n        </div>\n        <form action="/likes/add-likes/${e._id}" method="POST" class="likes-form">\n            <button type="submit"><i class="far fa-thumbs-up"></i></button>\n        </form>\n    </div>\n    </li>`)},deleteComment=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment deleted!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},likebutton=function(e){$(e).submit((function(t){t.preventDefault(),$.ajax({type:"post",url:$(e).prop("action"),success:function(e){if(e.data.deleted){let t="#likes-number-";t+=e.data.id.toString(),$(t).text(e.data.likes.length.toString()),new Noty({theme:"relax",text:"Like Deleted",type:"success",layout:"topRight",timeout:1500}).show()}else{let t="#likes-number-";t+=e.data.id.toString(),$(t).text(e.data.likes.length.toString()),new Noty({theme:"relax",text:"Like Added",type:"success",layout:"topRight",timeout:1500}).show()}},error:function(e){console.log(e.responseText)}})}))},convertCommentsToAjax=function(e){$(`#post-comments-${e}>li`).each((function(){let e=$(this),t=$(" .delete-comment-button",e),n=e.prop("id").split("-")[1],o=$(`#likes-form-${n}`,e);deleteComment(t),likebutton(o)}))};createComment();