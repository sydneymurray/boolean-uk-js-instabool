
// FUNCTION DECLARATIONS ////////////////////////////////////////

// RETRIEVE THE PETS ARRAY FROM THE JSON
function retrievePetData(){
    fetch("http://localhost:3000/images")
        .then(function (promise){
            return promise.json()})
        .then(function (pets){
            displayPets(pets)})
}

// DISPLAY ALL THE PETS
function displayPets(pets){
    for (const pet of pets) {
        displayPostCard(pet)    
    } 
}

// DISPLAY POST CARD
function displayPostCard(pet){

    // FIND THE SECTION CONTAINER
    let section = document.querySelector(".image-container")

    // CREATE AN ARTICLE AS A POSTCARD
    let postCard = document.createElement("article")
    postCard.setAttribute("class","image-card")
    section.append(postCard)

    // CREATE THE H2 TITLE
    let imageTitle = document.createElement("h2")
    imageTitle.setAttribute("class","title")
    imageTitle.innerText = pet.title
    postCard.append(imageTitle)

    // DISPLAY PICTURE
    let image = document.createElement("img")
    image.setAttribute("class","image")
    image.setAttribute("src",pet.image)
    postCard.append(image)


    // CREATE A LIKES CONTAINER
    let likeContainer = document.createElement("div")
    likeContainer.setAttribute("class","likes-section")
    postCard.append(likeContainer)

        // DISPLAY LIKES
        let likes = document.createElement("span")
        likes.setAttribute("class","likes")
        likes.innerText = pet.likes + ' Likes'
        likeContainer.append(likes)

        // CREATE A LIKE BUTTON
        let likeButton = document.createElement("button")
        likeButton.setAttribute("class","like-button")
        likeButton.innerText = "♥"
        likeContainer.append(likeButton)

        // CREATE AN EVENT HANDLER TO INCREASE LIKES
        likeButton.addEventListener("click", function(){
            pet.likes++
            fetch(`http://localhost:3000/images/${pet.id}`,{
                method:'PATCH',
                headers:{'Content-Type': 'Application/json'},
                body: JSON.stringify({likes: pet.likes})
            })
        })

    // CREATE AN UNORDERED LIST FOR COMMENTS
    let commentsContainer = document.createElement("ul")
    commentsContainer.setAttribute("class","comments")
    postCard.append(commentsContainer) 

        // DISPLAY EACH COMMENT A LIST ITEM
        for(let i = 0; i < pet.comments.length; i++){
            let commentLi = document.createElement("li")
            commentLi.innerText = pet.comments[i].content
            commentsContainer.append(commentLi)
        } 

    // CREATE A FORM TO ENTER NEW COMMENTS
    let commentForm = document.createElement("form")
    commentForm.setAttribute("class","comment-form")
    postCard.append(commentForm)
    
        // CREATE A COMMENT INPUT BOX
        let commentInput = document.createElement("input")
        commentInput.setAttribute("type","text")
        commentInput.setAttribute("class","comment-input")
        commentInput.setAttribute("placeholder","Add a comment...")
        commentForm.append(commentInput)

        // CREATE A SUBMIT BUTTON
        let submitButton = document.createElement("button")
        submitButton.setAttribute("class","comment-button")
        submitButton.setAttribute("required","true")
        submitButton.innerText = "Post"
        commentForm.append(submitButton)
 
        // CREATE AN EVENT HANDLER FOR SUBMIT COMMENT BUTTON
        submitButton.addEventListener("click", function(event){
            // Prevent Page Refresh on Button Click
            event.preventDefault()
            // UPDATE COMMENTS ARRAY
            fetch(`http://localhost:3000/comments`,{
                method:'POST',
                headers:{'Content-Type': 'Application/json'},
                body: JSON.stringify({
                    content: commentInput.value,
                    imageId: pet.id    
                })
            })
            console.log(commentInput.value)
        })       
 }


// MAIN PROGRAM STARTS HERE ////////////////////////////////////

retrievePetData()
