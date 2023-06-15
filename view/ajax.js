function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/product",
        success(data) {
            console.log(data);

            let context = ""
            context += `<table border="1">
<tr>
<td>ID</td>
<td>Name</td>
<td>Number</td>
<td>Price</td>
<td>Status</td>
<td>Category</td>
</tr>`
            for (let i = 0; i < data.length; i++) {
                context += `<tr>
<td>${data[i].id}</td>
<td>${data[i].name}</td>
<td>${data[i].number}</td>
<td>${data[i].price}</td>
<td>${data[i].status}</td>
<td>${data[i].category.name}</td>
<td><button onclick="view(${data[i].id})">View</button></td>
<td><button onclick="deleteById(${data[i].id})">Delete</button></td>
<td><button onclick="showFormUpdate(${data[i].id})">Update</button> </td>
</tr>`
            }
            context += `</table>`

            document.getElementById("display").innerHTML = context;
        }
    })
}

function showFormCreate() {
    let context = ``
    context += `<table>
<tr>
<td>Name</td>
<td><input type="text" id="name"></td>
</tr>
<tr>
<td>Number</td>
<td><input type="text" id="number"></td>
</tr>
<tr>
<td>Price</td>
<td><input type="text" id="price"></td>
</tr>
<tr>
<td>Status</td>
<td><input type="text" id="status"></td>
</tr>
<tr>
<td><select id="category"></select></td>
</tr>
<tr><td><button onclick="save()">Add</button></td></tr>
</table>`
    document.getElementById("display").innerHTML = context;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/category",
        success(data) {
            let text = ``
            for (let i = 0; i < data.length; i++) {
                text += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById("category").innerHTML = text;
        }
    })
}

function save() {
    let name = $('#name').val()
    let number = $('#number').val()
    let price = $('#price').val()
    let status = $('#status').val()
    let cate = document.getElementById("category").value
    let newProduct = {
        name: name,
        number: number,
        price: price,
        status: status,
        category: {
            "id": cate
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(newProduct),
        url: "http://localhost:8080/product",
        success() {
            showAll()
        }
    })

}

function view(id) {
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/product/" + id,
        success(data) {
            console.log(data)
            let context = ``
            context += `<table border="1">
<tr>
<td>ID</td>
<td>Name</td>
<td>Number</td>
<td>Price</td>
<td>Status</td>
<td>Category</td>
</tr>
<td>${data.id}</td>
<td>${data.name}</td>
<td>${data.number}</td>
<td>${data.price}</td>
<td>${data.status}</td>
<td>${data.category.name}</td>
`

            document.getElementById("display").innerHTML = context;
        }
    })
}

function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/product/" + id,
        success() {
            showAll()
        }
    });
}

function showFormUpdate(id) {
    $.ajax({
        type: "patch",
        url: "http://localhost:8080/product/" + id,
        success(data) {
            let context = ``
            context += `<table>
<tr>
<td>Name</td>
<td><input type="text" value="${data.name}" id="name"></td>
</tr>
<tr>
<td>Number</td>
<td><input type="text" value="${data.number}" id="number"></td>
</tr>
<tr>
<td>Price</td>
<td><input type="text" value="${data.price}" id="price"></td>
</tr>
<tr>
<td>Status</td>
<td><input type="text" value="${data.status}" id="status"></td>
</tr>
<tr>
<td><select id="category"></select></td>
</tr>
<tr><td><button onclick="update(${data.id})">Add</button></td></tr>
</table>`
            document.getElementById("display").innerHTML = context;
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/category",
                success(arr) {
                    let text = ``
                    for (let i = 0; i < arr.length; i++) {
                        text += `<option value="${arr[i].id}">${arr[i].name}</option>`
                    }
                    document.getElementById("category").innerHTML = text
                }
            })
        }
    })

}

function update(id) {
    let name = $('#name').val()
    let number = $('#number').val()
    let price = $('#price').val()
    let status = $('#status').val()
    let cate = document.getElementById("category").value
    let newProduct = {
        name: name,
        number: number,
        price: price,
        status: status,
        category: {
            "id": cate
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8080/product/" + id,
        data: JSON.stringify(newProduct),
        success() {
            showAll();
        }
    });
    event.defaultPrevented
}