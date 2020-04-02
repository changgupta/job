
$(document).ready(function () {


    loadDoctors();


    //var table = $('#example').DataTable({
    //    "processing": true,
    //    "serverSide": true,
    //    "order": [],
    //    "ajax": "/api/values/Get",
    //    "type": "get",
    //    "columns":
    //        [

    //            { "data": "Title" },
    //            { "data": "Mobile" },
    //            { "data": "Gender" },
    //            { "data": "Fee" },
    //            {
    //                //"data": "Id",
    //                className: "center",
    //                defaultContent: '<a href="#" onclick="editfn(Id)" class="editor_edit">Edit</a> / <a href="#" class="editor_remove" onclick="Remove(Id)">Delete</a>'
    //            }

    //        ],



    //});
    LoadSpecializations();





    $("#btnSubmit").click(function () {

        var value = $("#fileForm").serialize();
        $.ajax({
            url: "https://localhost:44303/api/values/delete/77",
            type: 'get',
            cache: false,
            data: value,
            success: function (response) {
                //table.on('xhr', function () {
                //    var json = table.ajax.json();

                //    alert(json.data.length + ' row(s) were loaded');
                //});

                loadDoctors();

            }
        });
    });
});

function CallMe(data) {
    alert(data);

    $.ajax({
        url: "/api/values/Delete/" + data,
        type: 'get',
        dataType: "json",
        contentType: "application/json",
        success: function (response) {

            alert(response);

            loadDoctors();

        }
    });
}

function loadDoctors() {
    $.ajax({
        type: "get",
        url: "/api/values/Get",
        dataType: "json",
        contentType: "application/json",
        success: function (response) {

            console.log(response);
            $.each(response.data, function (index, value) {
                //console.log(response);

                //alert(value.Title );
                var tr = "<tr>";
                tr += "<td>" + value.Title + "</td>";
                tr += "<td>" + value.Mobile + "</td>";
                tr += "<td>" + value.Gender + "</td>";
                tr += "<td>" + value.Fee + "</td>";
                tr += "<td>" + "<input type='button' id='" + value.Id + "' onclick='CallMe(" + value.Id + ")' value='Delete'>" + "</td>" + "</tr>";
                $("#tBody").append(tr);
            });
            $('#example').DataTable({
                "dom": '<"toolbar">frtip'
            });

            $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');
        }
    });

}

function LoadSpecializations() {
    var options = $("#DoctorSpecializa");
    options.append($("<option />").val("0").text("Select Specialization"));
    $.getJSON("/api/values/GetDoctorbranch", function (response) {
        $.each(response, function () {
            //alert("");
            options.append($("<option />").val(this.Id).text(this.Title));
        });
    });
}

function editfn(id) {
    alert(id);


}



function checkPass() {
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if (pass1.value == pass2.value) {
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match"
    } else {
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
}
function validatephone(phone) {
    var maintainplus = '';
    var numval = phone.value
    if (numval.charAt(0) == '+') {
        var maintainplus = '';
    }
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g, '');
    phone.value = maintainplus + curphonevar;
    var maintainplus = '';
    phone.focus;
}
// validates text only
function Validate(txt) {
    txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
}
// validate email
function email_validate(email) {
    var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if (regMail.test(email) == false) {
        document.getElementById("status").innerHTML = "<span class='warning'>Email address is not valid yet.</span>";
    }
    else {
        document.getElementById("status").innerHTML = "<span class='valid'>Thanks, you have entered a valid Email address!</span>";
    }
}
// validate date of birth
function dob_validate(dob) {
    var regDOB = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;

    if (regDOB.test(dob) == false) {
        document.getElementById("statusDOB").innerHTML = "<span class='warning'>DOB is only used to verify your age.</span>";
    }
    else {
        document.getElementById("statusDOB").innerHTML = "<span class='valid'>Thanks, you have entered a valid DOB!</span>";
    }
}
// validate address
function add_validate(address) {
    var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;

    if (regAdd.test(address) == false) {
        document.getElementById("statusAdd").innerHTML = "<span class='warning'>Address is not valid yet.</span>";
    }
    else {
        document.getElementById("statusAdd").innerHTML = "<span class='valid'>Thanks, Address looks valid!</span>";
    }
}
