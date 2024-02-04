$(document).ready(function () {
    $('#firstname').on('input', function () {
        checkfirstname2();
    });

    $('#contactnumber').on('input', function () {
        checkmobile2();
    }); 

    $('#email').on('input', function () {
        checkemail();
    });
    
    
    $('#message').on('input', function () {
        checkmessage();
    });

    $('#subject').on('input', function () {
        checksubject();
    });

    

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }  

    $("#defaultCheck1").change(function() {
        if(this.checked) {
            $('.form-check-label').css('color', '#212529');
        }else{
            $('.form-check-label').css('color', 'red');
        }
    });

    $('#submitbtn').click(function () {

        

        checkfirstname2();

        checkmobile2();

        checkemail();

        checkmessage();

        checksubject();

        if (!checkfirstname2() && !checkmobile2() && !checkemail() && !checkmessage() && !checksubject()) {
            console.log("er1");
            toastr.error('Please fill all required fields');
        } else if (!checkfirstname2() || !checkmobile2() || !checkemail()  || !checkmessage()  || !checksubject()) {
            toastr.error('Please fill all required fields');
            console.log("er");
        }
        else {
            console.log("ok");
            $("#errmessage").html("");
            var form = $('#myform')[0];
            $.ajax({
                type: "POST",
                url: "email.php",
                data: {Firstname:$("#firstname").val(),Contactnumber:$("#contactnumber").val(),Email:$("#email").val(), Message:$("#message").val(),Subject:$("#subject").val()},
                beforeSend: function () {
                    $('#submitbtn').html('Submitting <i class="fas fa-spinner fa-spin ml-1"></i>');
                    $('#submitbtn').attr("disabled", true);
                },

                success: function (data) {
                    //$('#errmessage').html('<div class="alert alert-success">'+ data +'</div>');
                    toastr.success(data);                    
                    //transitionToPage('thankyou.html');
                    $('#myform').trigger("reset");
                    $('#submitbtn').html('Send Message');
                    $('#submitbtn').attr("disabled", false);
                },
                complete: function () {
                    setTimeout(function () {
                        $('#errmessage').html('');
                    }, 5000);
                }
            });
        }
    });

    $('#submitnewsbtn').click(function () {      
        
        checknewsemail();

        if (!checknewsemail()) {
            console.log("er1");
            //$("#newserrmessage").html(<div class="alert alert-warning">Please fill all required field</div>);
            toastr.error("Please fill all required fields");
        } else if (!checknewsemail()) {
            //$("#newserrmessage").html(<div class="alert alert-warning">Please fill all required field</div>);
            toastr.error("Please fill all required fields");
            console.log("er");
        }
        else {
            console.log("ok");
            $("#newserrmessage").html("");
            var form = $('#mynewsform')[0];
            var data = new FormData(form);
            $.ajax({
                type: "POST",
                url: "newsletter.php",
                data: {Email:$("#newsemail").val()},
                processData: false,
                contentType: false,
                cache: false,
                async: false,
                beforeSend: function () {
                    $('#submitnewsbtn').html('<i class="fas fa-spinner fa-spin ml-1"></i>');
                    $('#submitnewsbtn').attr("disabled", true);
                },

                success: function (data) {
                    //$('#newserrmessage').html('<div class="alert alert-success">'+ data +'</div>');
                    toastr.success(data);
                    $('#mynewsform').trigger("reset");
                    $('#submitnewsbtn').html('<i class="fas fa-paper-plane"></i>');
                    $('#submitnewsbtn').attr("disabled", false);
                },
                complete: function () {
                    setTimeout(function () {
                        $('#newserrmessage').html('');
                    }, 5000);
                }
            });
        }
    });
});


function checkfirstname2() {
    // var pattern = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    var pattern =/^([a-zA-Z' ]+)$/;
    var user = $('#firstname').val();
    var validuser = pattern.test(user);
    if ($('#firstname').val().length < 4) {
        $('#firstname_err').html('Name length is too short');
        $('#firstname').css('border', '1px solid red');
        return false;
    } else if (user == "") {
        $('#firstname_err').html('Required field');
        $('#firstname').css('border', '1px solid red');
        return false;
    } else if (!validuser) {
        $('#firstname_err').html('Name should be a-z ,A-Z only');
        $('#firstname').css('border', '1px solid red');
        return false;
    } else {
        $('#firstname_err').html('');
        $('#firstname').css('border', '1px solid #d4d7e5');
        return true;
    }
}


function checkmobile2() {
    var pattern = /^(0|91)?[6-9][0-9]{9}$/;
    var contactnumber = $('#contactnumber').val();
    var validuser = pattern.test(contactnumber);
    if (contactnumber == "") {
        $('#contactnumber_err').html('Required field');
        $('#contactnumber').css('border', '1px solid red');
        return false;
    } else if (!validuser) {
        $('#contactnumber_err').html('Enter valid mobile number');
        $('#contactnumber').css('border', '1px solid red');
        return false;
    }
     else {
        $('#contactnumber_err').html('');
        $('#contactnumber').css('border', '1px solid #d4d7e5');
        return true;
    }
}

function checkemail() {
    var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $('#email').val();
    var validemail = pattern1.test(email);
    if (email == "") {
        $('#email_err').html('Required field');
        $('#email').css('border', '1px solid red');
        return false;
    } else if (!validemail) {
        $('#email_err').html('Invalid email address');
        $('#email').css('border', '1px solid red');
        return false;
    }
    // else if (!validemail) {
    //     $('#email_err').html('Minimum length 10');
    //     $('#email').css('border', '1px solid red');
    //     return false;
    // }
    else  {
        $('#email_err').html('');
        $('#email').css('border', '1px solid #d4d7e5');
        return true;
    }
}

function checkmessage() {
    // var pattern = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    // var pattern =/^([a-zA-Z' ]+)$/;
    var pattern = /^[A-Za-z0-9\s.,'!?-]+$/;
    var user = $('#message').val();
    var validuser = pattern.test(user);
    if ($('#message').val().length < 4) {
        $('#message_err').html('Message length is too short');
        $('#message').css('border', '1px solid red');
        return false;
    } else if (user == "") {
        $('#message_err').html('Required field');
        $('#message').css('border', '1px solid red');
        return false;
    } else if (!validuser) {
        $('#message_err').html('Name should be a-z ,A-Z only');
        $('#message').css('border', '1px solid red');
        return false;
    } else {
        $('#message_err').html('');
        $('#message').css('border', '1px solid #d4d7e5');
        return true;
    }
}

function checksubject() {
    // var pattern = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    var pattern =/^([a-zA-Z' ]+)$/;
    var user = $('#subject').val();
    var validuser = pattern.test(user);
    if ($('#subject').val().length < 4) {
        $('#subject_err').html('Subject length is too short');
        $('#subject').css('border', '1px solid red');
        return false;
    } else if (user == "") {
        $('#subject_err').html('Required field');
        $('#subject').css('border', '1px solid red');
        return false;
    } else if (!validuser) {
        $('#subject_err').html('Name should be a-z ,A-Z only');
        $('#subject').css('border', '1px solid red');
        return false;
    } else {
        $('#subject_err').html('');
        $('#subject').css('border', '1px solid #d4d7e5');
        return true;
    }
}











window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
});