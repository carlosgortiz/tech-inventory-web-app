var deleteBtn = document.getElementById("deleteBtn");
var updateBtn = document.getElementById("updateBtn");
var formComment = document.getElementById("formSoftware");


async function deletePost() {
    /*     alert(`eliminar registro : ${formComment.dataset.id}`); 
        console.log(`eliminar registro : ${formComment.dataset.id}`); 
     */
    const response = await fetch(`/api/softwares/${formComment.dataset.id}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace("/api/softwares/list");
    }
    else {
        alert(`Ocurrio un error al eliminar registro : ${formComment.dataset.id}`);
    }
}

async function updatePost() {
    const name = document.getElementById("textName").value;
    const purchaseDate = document.getElementById("textPurchaseDate").value;
    const warranty = document.getElementById("textWarranty").value;
    const provider = document.getElementById("textProvider").value;

    //alert(`actualizar registro : ${formComment.dataset.id}  Comment ${comment}`); 

    const response = await fetch(`/api/softwares/${formComment.dataset.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            purchaseDate,
            warranty,
            provider
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace("/api/softwares/list");
    }
    else {
        alert(`Ocurrio un error al actualizar el software id : ${formComment.dataset.id}`);
    }

}

deleteBtn.addEventListener("click", deletePost);
updateBtn.addEventListener("click", updatePost);