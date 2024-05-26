function getPosts() {
    fetch("http://localhost:3000")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var posts = document.getElementById("posts");
            posts.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                var singlePost = createPostDiv(data[i]);
                posts.appendChild(singlePost);
            }
        })
        .catch((err) => console.log(err));
}
getPosts();

function createPostHandler(event) {
    event.preventDefault();
    var postLink = document.getElementById("post-link");
    var postDescription = document.getElementById("post-description");
    var formData = {
        post_link: postLink.value,
        post_description: postDescription.value,
    };
    fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then((result) => {
            console.log("Form data sent to node");
            postLink.value = "";
            postDescription.value = "";
            getPosts();
        })
        .catch((error) => console.error(error));
}
function getCommentsHandler(data) {
    fetch("http://localhost:3000/comment/" + data.id)
        .then((response) => response.json())
        .then((result) => console.log(result, data))
        .catch((err) => console.log(err));
}
function createPostDiv(data) {
    var newPost = document.createElement("div");
    newPost.classList.add("post-container");
    var post_link_img = document.createElement("img")
    post_link_img.src = data.post_link;
    post_link_img.alt = "No Image";
    post_link_img.classList.add("post-image");
    var post_description_text = document.createElement("p");
    post_description_text.innerText = data.post_description;
    post_description_text.classList.add("post-description");
    newPost.appendChild(post_link_img);
    newPost.appendChild(post_description_text);

    var viewCommentsButton = document.createElement("button");
    viewCommentsButton.classList.add("comments-button")
    viewCommentsButton.innerHTML = "Comments";
    newPost.appendChild(viewCommentsButton);
    viewCommentsButton.onclick = () => {
        if (newPost.childNodes.length > 3) {
            newPost.removeChild(newPost.lastChild);
        } else {
            newPost.appendChild(createCommentsDiv(data));
            getCommentsHandler(data);
        }
    };
    return newPost;
}
function createCommentsDiv(data) {
    var commentsDiv = document.createElement("div");
    var inputCommentField = document.createElement("input");
    var sendCommentButton = document.createElement("button");
    sendCommentButton.innerText = "Send";
    commentsDiv.appendChild(inputCommentField);
    commentsDiv.appendChild(sendCommentButton);
    var savedComments = getCommentsForPost(data);
    commentsDiv.appendChild(savedComments);
    sendCommentButton.onclick = () => {
        let newCommentObject = { comment_text: inputCommentField.value };
        sendCommentHandler(data, newCommentObject).then(() => {
            commentsDiv.replaceChild(getCommentsForPost(data), commentsDiv.lastChild);
            commentsDiv.replaceChild(getCommentsForPost(data), commentsDiv.lastChild);
            inputCommentField.value = "";
        })
    };
    return commentsDiv;
}
function createSavedCommentDiv(data) {
    var savedCommentDiv = document.createElement("div");
    let comment = document.createTextNode(
        "Anonymous User : " + data.comment_text
    );
    savedCommentDiv.appendChild(comment);
    return savedCommentDiv;
}
function sendCommentHandler(data, rawBody) {

    fetch("http://localhost:3000/comment/" + data.id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawBody),
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
    console.log("Inside sendCommentHandler");
    return Promise.resolve();

}
function getCommentsForPost(data) {
    var savedComments = document.createElement("div");
    fetch("http://localhost:3000/comment/" + data.id)
        .then((response) => response.json())
        .then((comments) => {
            console.log("comments");
            for (let i = 0; i < comments.length; i++) {
                // console.log(comments[i]);
                let singleCommentDiv = createSavedCommentDiv(comments[i]);
                savedComments.appendChild(singleCommentDiv);
            }
        })
        .catch((err) => console.log(err));
    return savedComments;
}
// document.getElementById("create-post").addEventListener('submit',createPostHandler);