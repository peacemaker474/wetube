const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    const span = document.createElement("span");
    const removespan = document.createElement("span");
    const icon = document.createElement("i");

    icon.className = "fas fa-comment";
    newComment.className = "video__comment";
    span.innerText = ` ${text}`;
    removespan.innerText = " ❌";
    newComment.append(icon);
    newComment.append(span);
    newComment.append(removespan);
    videoComments.prepend(newComment);
}

const handleSubmit = async (evt) => {
    evt.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return ;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text
        }),
    });
    
    if (response.status === 201) {
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
        textarea.value = "";
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}