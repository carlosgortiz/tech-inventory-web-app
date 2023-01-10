var deleteBtn = document.getElementById("deleteBtn");
var updateBtn = document.getElementById("updateBtn");
var formComment = document.getElementById("formProvider");
​
​
async function deletePost() {
/*     alert(`eliminar registro : ${formComment.dataset.id}`); 
    console.log(`eliminar registro : ${formComment.dataset.id}`); 
 */    
       const response = await fetch (`/api/providers/${formComment.dataset.id}`,{
        method: 'DELETE',
        body: JSON.stringify({}),
        headers : {
        'Content-Type': 'application/json'
        }
    });
    
    if (response.ok){
        document.location.replace("/api/providers/list");
    }
    else {
        alert(`Ocurrio un error al eliminar registro : ${formComment.dataset.id}`); 
    } 
}
​
async function updatePost() {
    const name = document.getElementById("textName").value;
    const email = document.getElementById("textEmail").value;
    const tel = document.getElementById("textTel").value;
    
    //alert(`actualizar registro : ${formComment.dataset.id}  Comment ${comment}`); 
​
      const response = await fetch(`/api/providers/${formComment.dataset.id}`,{
        method: 'PUT',
        body: JSON.stringify({
            name,
            email,
            tel
        }),
        headers : {
        'Content-Type': 'application/json'
        }
    });  
​
    if (response.ok){
        document.location.replace("/api/providers/list");
    }
    else {
        alert(`Ocurrio un error al actualizar el comentario id : ${formComment.dataset.id}`); 
    }    
    
}

deleteBtn.addEventListener("click", deletePost);
updateBtn.addEventListener("click", updatePost);