var deleteBtn = document.getElementById("deleteBtn");
var updateBtn = document.getElementById("updateBtn");
var formComment = document.getElementById("formHardware");


async function deletePost() {
       const response = await fetch (`/api/hardwares/${formComment.dataset.id}`,{
        method: 'DELETE',
        body: JSON.stringify({}),
        headers : {
        'Content-Type': 'application/json'
        }
    });
    
    if (response.ok){
        document.location.replace("/api/hardwares/list");
    }
    else {
        alert(`Ocurrio un error al eliminar registro : ${formComment.dataset.id}`); 
    } 
}

async function updatePost() {
    const name = document.getElementById("textName").value;
    const purchase = document.getElementById("purchase_date").value;
    const warranty = document.getElementById("textWarranty").value;
    const brand = document.getElementById("textBrand").value;
    const address = document.getElementById("textAddress").value;
    const department = document.getElementById("textDepartment").value;
    const provider = document.getElementById("textProvider").value;

    const response = await fetch(`/api/hardwares/${formComment.dataset.id}`,{
        method: 'PUT',
        body: JSON.stringify({
            name,
            purchase,
            warranty,
            brand,
            address,
            department,
            provider
        }),
        headers : {
        'Content-Type': 'application/json'
        }
    });  

    if (response.ok){
        document.location.replace("/api/hardwares/list");
    }
    else {
        alert(`Ocurrio un error al actualizar el comentario id : ${formComment.dataset.id}`); 
    }      
}

deleteBtn.addEventListener("click", deletePost);
updateBtn.addEventListener("click", updatePost);