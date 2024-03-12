window.onload = fetchPosts();
let posts = [];
const post_list = document.querySelector(".post_list");

document.querySelector("#form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.querySelector('#form_post_title').value;
    const body = document.querySelector('#form_post_body').value;
    // const id = posts.length + 1;
    const response = await fetch("http://localhost:3000/posts", {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body : JSON.stringify({title, body})
    } )
    const result = await response.json()

    console.log(result);
    
    posts.unshift(result)
    addPost(result);
});


async function fetchPosts (){
    const response = await fetch("http://localhost:3000/posts");
    posts = await response.json();
    posts = posts.slice(0, 10);
    addPosts(posts)
}

function addPosts (){
    if (arguments.length == 1) {
        arguments[0].forEach(post => {
            addPost(post);
        });
    }
}

function addPost(post){
    const {title, body, id} = post;
    const postItem = document.createElement('div');
    postItem.classList.add('post_item');
    
    const postItemTitle = document.createElement('span');
    postItemTitle.classList.add('post_item_title');

    const postItemBody = document.createElement('div');
    postItemBody.classList.add('post_item_body');

    postItemTitle.innerText = id + ') ' + title;
    postItemBody.innerText = body;

    postItem.appendChild(postItemTitle);
    postItem.appendChild(postItemBody);
    post_list.appendChild(postItem);
}