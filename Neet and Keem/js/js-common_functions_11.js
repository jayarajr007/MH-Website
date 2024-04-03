

// function validate_info(){
//     if($("#register_form").valid()){
//         document.getElementById("horizon_register_button").disabled = true;
//         student_data = $("#register_form").serialize()
//         $.ajax({ 
//             data: student_data,
//             type: 'POST',
//             url: "/student-registration/", 
//             success: function(data) 
//             {
//                 if(data.status == "success"){
//                     $('#registerModal').modal('hide')
//                     $("#register_form").trigger("reset");
//                     $("#student_mobile_number").val(data.mobile_number)
//                     $('#otpModal').modal('show')
//                     document.getElementById("horizon_register_button").disabled = false;
//                 }
//                 {
//                     $("#error_divregister").html(data.message);                    
//                     // $("#register_form").trigger("reset");
//                     $("#error_divregister").show();
//                     setTimeout(function(){
//                     $("#error_divregister").hide();
//                     }, 3000);
//                     document.getElementById("horizon_register_button").disabled = false;
//                 }
                
//             }
//         });        
//     }    

// }

function validate_info(){

    $.ajax({
        type:'get',
        url: "/get-recaptcha-sitekey/",
        success: function(data) {
            recaptcha_site_key = data.recaptcha_site_key
            grecaptcha.ready(function() {
              grecaptcha.execute(recaptcha_site_key, {action: 'submit'}).then(function(token) {
                    
                    if($("#register_form").valid()){
                        document.getElementById("horizon_register_button").disabled = true;
                        $("#captcha_token").val(token)
                        student_data = $("#register_form").serialize()
                        $.ajax({ 
                            data: student_data,
                            type: 'POST',
                            url: "/student-registration/", 
                            success: function(data) 
                            {
                                if(data.status == "success"){
                                    $('#registerModal').modal('hide')
                                    $("#register_form").trigger("reset");
                                    $("#student_mobile_number").val(data.mobile_number)
                                    $('#otpModal').modal('show')
                                    document.getElementById("horizon_register_button").disabled = false;
                                }
                                {
                                    $("#error_divregister").html(data.message);                    
                                    // $("#register_form").trigger("reset");
                                    $("#error_divregister").show();
                                    setTimeout(function(){
                                    $("#error_divregister").hide();
                                    }, 3000);
                                    document.getElementById("horizon_register_button").disabled = false;
                                }
                                
                            }
                        });        
                    }    
              });
            });

        }
      });
    
}

$('#otp_form').validate({
    rules : {
            mob_otp : {
                required : true,
                maxlength:6,
            },
        },
    messages : {
        mob_otp:{
        required : "Please enter OTP.",
        },
    }, 
    errorPlacement: function(error, element) {
        if (element.attr("name") == "mob_otp" )
            $("#id_ct_otp").html( error );
        }             
});

$('#login_otp_form').validate({
    rules : {
        login_otp : {
                required : true,
                maxlength:6,
            },
        },
    messages : {
        login_otp:{
        required : "Please enter OTP.",
        },
    }, 
    errorPlacement: function(error, element) {
        if (element.attr("name") == "login_otp" )
            $("#login_otp_error").html( error );
        }             
});

function verify_otp(){
        otp_string = $("#mob_otp").val();
        if ($("#otp_form").valid())
        {
        student_mobile_number = $("#student_mobile_number").val()

        form_data = $("#otp_form").serialize()
        $.ajax({ 
            data: {"otp_string":otp_string,"student_mobile_number":student_mobile_number},
            type: 'POST',
            url: "/verify-otp/", 
            success: function(data) 
            {
              if(data.status == "success"){
                $('#otpModal').modal('hide')
                $("#otp_form").trigger("reset");
                if(data.otp_source === "forgot_password")
                {
                    document.getElementById("reset_stud_id").value = data.student_id;
                    document.getElementById("verified_otp").value = data.verified_otp;
                    $('#new_pwd_modal').modal('show');
                }
                else
                {
                $("#student_id").val(data.student_id)
                $('#knowMoreModal').modal('show')
                }
                
             }
             else{
                $("#error_div1").html(data.message);
                $("#otp_form").trigger("reset");
                $("#error_div1").show();
                setTimeout(function(){
                    $("#error_div1").hide();
                }, 3000);
             }
            }
        });
        }
        
    }    

  jQuery.validator.addMethod("validate_name", function (value, element) {
      if (/^[A-Za-z][A-Za-z0-9 ]*$/.test(value)) {
          return true;
      }
      else {
          return false;
      }
  }, 'Please enter alphabets only.');


  jQuery.validator.addMethod("validate_password", function (value, element) {

      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%&*]{6,16}$/.test(value)) {
          return true;
      }
      else {
          return false;
      }
  }, 'Password should contain at least 1 digit, 1 alphabet and length between 6 to 16.');


 
  jQuery.validator.addMethod("validate_phone",function(value, element) {
    if ($('#country_code').val() == "+91"){                
      if(/^[1-9][0-9]{9}$/.test( value ))
          return true;
       else
         return false;
   }
   else
    return true
 },"Phone number should not start with zero");

 jQuery.validator.addMethod("validate_mob",function(value, element) {
    if ($('#country_code').val() == "+91"){                
      if(/^[1-9][0-9]{9}$/.test( value ))
          return true;
       else
         return false;
   }
   else
    return true
 },"Phone number should not start with zero");



$('#register_form').validate({
  rules : {

          student_name : {
              required : true,
              minlength:1,
              maxlength:50,
              validate_name : true 
          },

           phone_number : {
              required : true,
              number: true,
              minlength:function(element) {                            
                      if ($('#country_code').val() == "+91")
                        return 10
                      else
                        return 7
                    },
             maxlength:function(element) {
               if ($('#country_code').val() == "+91"){
                 return 10
               }
               else{
                 return 12
               }
             },
             validate_mob :true             
          },         
          
          password : {
              required : true,
              validate_password : true            
              
          },
          confirm_password : {
              required : true,
              equalTo: "#password"          
              
          },
          user_agreement : {
            required : true
          }
          
      },
  messages : {
      student_name:{
      required : "Please enter your name.",
      minlength: "Please enter your name.",
      maxlength: "Please enter a name less than 50 characters."
      },
      phone_number:{
      required : "Please enter your phone number.",
      number: "Please enter valid phone number",
      minlength:function(element) {                            
              if ($('#country_code').val() == "+91")
                return "Phone number should be 10 digit "
              else
                return "Phone number should be in the range 7-12 "
            },
    maxlength:function(element) {
      if ($('#country_code').val() == "+91")
        return "Phone number should be 10 digit "
      else
        return "Phone number should be in the range 7-12 "
    }   
     
      },
      password:{
      required : "Please enter your password.",      
      },
      confirm_password:{
      required : "Please confirm your password.",
      equalTo: "Please enter same password",      
      },
      user_agreement:{
        required : "Please accept the terms and conditions.",
      }
      
      
      
  },
  errorPlacement: function(error, element) {
    
    if (element.attr('name') == 'user_agreement') {
      error.insertAfter('.form-check-label');
    } else {
      error.insertAfter(element);
    }
  }
 
});

function student_category(id, el){
    $(el).siblings('div').children("input").prop('checked', false);
    $(".selection_card_others").children("input").prop('checked', false);
    $(el).children("input").prop('checked', true);
    $("#student_category_id").val(id)
    $("#student_others_id").val('')
    $("#error_div2").html("");
}
function student_exam(id, el){
    $(el).siblings('div').children("input").prop('checked', false);
    $(".selection_card_others").children("input").prop('checked', false);
    $(el).children("input").prop('checked', true);
    $("#student_exam_id").val(id)
    $("#student_others_id").val('')
    $("#error_div2").html("");
}
function student_course(id, el){
    $(el).siblings('div').children("input").prop('checked', false);
    $(".selection_card_others").children("input").prop('checked', false);
    $(el).children("input").prop('checked', true);
    $("#student_course_id").val(id)
    $("#student_others_id").val('')
    $("#error_div2").html("");
}
function student_others(id, el){
    $("#knowMoreModal .selection-card").children("input").prop('checked', false);
    $(el).children("input").prop('checked', true);
    $("#student_category_id").val('');
    $("#student_course_id").val('');
    $("#student_exam_id").val('');
    $("#student_others_id").val(id)
    $("#error_div2").html("");
}
function submit_student_category(){
    if($("#student_category_id").val() == "" && $("#student_exam_id").val() == "" && $("#student_course_id").val() == "" && $("#student_others_id").val() == ""  ){
        $("#error_div2").html("Please select student category");
    }else{
        form_data = $("#student_category_form").serialize()
        $.ajax({ 
            data: form_data,
            type: 'POST',
            url: "/save-student-category/", 
            success: function(data) 
            {
              if(data.status == "success"){
                $('#knowMoreModal').modal('hide')
                $("#student_category_id").val("")

                $('#successModal').modal('show')
                
             }
             else{
                $("#error_div2").html(data.message);
                $("#student_category_form").trigger("reset");
             }
            }
        });
    }        
}

function  resend_otp() {
    student_mobile_number = $("#student_mobile_number").val()
    var source = $("#resend_otp_source").val();
    var counter = 61;
    var interval = setInterval(function() {                           
    $("#resend_otp").show();
    // $('#resend_otp').prop('disabled', true);
    $('#resend_otp').css('pointer-events','none');
    $('#resend_otp').css('cursor', 'default');
    counter--;
    $("#resend_otp").text('Resend OTP in '+counter+' seconds')
     // Display 'counter' wherever you want to display it.
        if (counter == 0) {
            // Display a login box
            clearInterval(interval);
            $("#resend_otp").text('Click here to resend OTP')
            // $('#resend_otp').prop('disabled', false);
            $('#resend_otp').css('pointer-events','');
            $('#resend_otp').css('cursor', 'pointer');
        }
    }, 1000);
    $.ajax({ 
            data: {"mobile":student_mobile_number,"resend_otp_source":source},
            type: 'GET',
            url: "/resend-otp/", 
            success: function(data) 
            {
              if(data.status == "success"){ 
                
                success_message = data.message
                $("#success_message_div").html(success_message)
                myAlertTop(); 
             }
             else{
                $("#error_div1").html(data.message);
                $("#error_div1").show();
                setTimeout(function(){
                    $("#error_div1").hide();
                }, 3000);
             }
            }
        });
}

jQuery.validator.addMethod("validate_forgotpswd_phone",function(value, element) {
    if ($('#forgot_pass_form #country_code').val() == "+91"){                
      if(/^[1-9][0-9]{9}$/.test( value )){
          return true;
      }
       else{
           return false;
       }
   }
   else{
       return true
   }
 },"Phone number should not start with zero");

$('#forgot_pass_form').validate({
    rules: {
        phone: {
            required: true,
            number: true,
            minlength:function(element) {                            
                      if ($('#forgot_pass_form #country_code').val() == "+91")
                        return 10
                      else
                        return 7
                    },
             maxlength:function(element) {
               if ($('#forgot_pass_form #country_code').val() == "+91"){
                 return 10
               }
               else{
                 return 12
               }
             },
             validate_forgotpswd_phone:true
        },
        
    },
    messages: {
        phone: {
            required: "Please enter your mobile number.",
            number: "Please enter a valid mobile number",
            minlength:function(element) {   
                      if ($('#forgot_pass_form #country_code').val() == "+91"){
                          return "Phone number should be 10 digit "
                      }
                      else{
                          return "Phone number should be in the range 7-12 "
                      }
                    },
            maxlength:function(element) {
              if ($('#forgot_pass_form #country_code').val() == "+91"){
                  return "Phone number should be 10 digit "
              }
              else{
                  return "Phone number should be in the range 7-12 "
              }
            }   

        },
    },
});




$('#password_reset_form').validate({
    rules : {
            new_password : {
                required : true,
                validate_password : true
            },
            confirm_new_password: {
                required : true, 
                equalTo: "#new_password"
            },    
        },
    messages : {
            new_password:{
            required : "Please enter your password.",
            },
            confirm_new_password:{
            required : "Please confirm your password.",
            equalTo: "Please enter same password",
            },
    },    
});

    var mobile_number = null;
        // $('#forgot_pass_form').submit(function(e) {
        //     var frm = $('#forgot_pass_form');
        //     $("#resend_otp_source").val('forgot');
        //     e.preventDefault();
        //     if ($(this).valid()) {
        //           $("#mobile_number_reset").prop('disabled', true);
        //           $.ajax({
        //               type: frm.attr('method'),
        //               url: "/mobile-verification/",
        //               data: frm.serialize(),
        //               success: function(data) {
        //                   mobile_number = $('#phone').val();
        //                   $("#forgot_pass_form").trigger("reset");
        //                   var jsnobject = data;
        //                   if (jsnobject.status === 'success') 
        //                   {
        //                       $('#forgotPwdModal').modal('hide');
        //                       var mobile_number = data.mobile_number;
        //                       $("#student_mobile_number").val(mobile_number)
        //                       $('#otpModal').modal('show')
        //                         var counter = 61;
        //                         var interval = setInterval(function() 
        //                         {    
        //                             $("#resend_otp").show();
        //                             // $('#resend_otp').prop('disabled', true);
        //                             $('#resend_otp').css('pointer-events','none');
        //                             $('#resend_otp').css('cursor', 'default'); 
        //                             counter--;
        //                             $("#resend_otp").html('Resend OTP in '+counter+' seconds')
        //                             // Display 'counter' wherever you want to display it.
        //                             if (counter == 0) {
        //                                 // Display a login box
        //                                 clearInterval(interval);
        //                                 $("#resend_otp").html('Click here to resend OTP')
        //                                 // $('#resend_otp').prop('disabled', false);
        //                                 $('#resend_otp').css('pointer-events','');
        //                                 $('#resend_otp').css('cursor', 'pointer'); 
        //                             }
        //                         }, 1000);
        //                   } 
        //                   else {
        //                       $("#mobile_number_reset").prop('disabled', false);
        //                       $('#phone').val(mobile_number);
        //                       $("#error_div_forgot").html(data.message);
        //                       $("#error_div_forgot").show();
        //                       setTimeout(function(){
        //                         $("#error_div_forgot").hide();
        //                         }, 3000);

        //                   }
        //               },
        //               error: function(data) {
        //                   console.log('An error occurred in mobile number.');
        //               },
        //           });
        //       }
        //   });      


            function reset_student_pwd() {

              
              $.ajax({
                type:'get',
                url: "/get-recaptcha-sitekey/",
                success: function(data) {
                    recaptcha_site_key = data.recaptcha_site_key

                    grecaptcha.ready(function() {
                            
                    grecaptcha.execute(recaptcha_site_key, {action: 'submit'}).then(function(token) {
                    document.getElementById("mobile_number_reset").disabled = true;
                    $("#captcha_token_pwd").val(token)
                    var frm = $('#forgot_pass_form');
                    $("#resend_otp_source").val('forgot');                
                    if (frm.valid()) {
                          $("#mobile_number_reset").prop('disabled', true);
                          $.ajax({
                              type: frm.attr('method'),
                              url: "/mobile-verification/",
                              data: frm.serialize(),
                              success: function(data) {
                                  mobile_number = $('#phone').val();
                                  $("#forgot_pass_form").trigger("reset");
                                  var jsnobject = data;
                                  if (jsnobject.status === 'success') 
                                  {
                                      document.getElementById("mobile_number_reset").disabled = false;
                                      $('#forgotPwdModal').modal('hide');
                                      var mobile_number = data.mobile_number;
                                      $("#student_mobile_number").val(mobile_number)
                                      $('#otpModal').modal('show')
                                        var counter = 61;
                                        var interval = setInterval(function() 
                                        {    
                                            $("#resend_otp").show();
                                            // $('#resend_otp').prop('disabled', true);
                                            $('#resend_otp').css('pointer-events','none');
                                            $('#resend_otp').css('cursor', 'default'); 
                                            counter--;
                                            $("#resend_otp").html('Resend OTP in '+counter+' seconds')
                                            // Display 'counter' wherever you want to display it.
                                            if (counter == 0) {
                                                // Display a login box
                                                clearInterval(interval);
                                                $("#resend_otp").html('Click here to resend OTP')
                                                // $('#resend_otp').prop('disabled', false);
                                                $('#resend_otp').css('pointer-events','');
                                                $('#resend_otp').css('cursor', 'pointer'); 
                                            }
                                        }, 1000);
                                  } 
                                  else {
                                      $("#mobile_number_reset").prop('disabled', false);
                                      $('#phone').val(mobile_number);
                                      $("#error_div_forgot").html(data.message);
                                      $("#error_div_forgot").show();
                                      setTimeout(function(){
                                        $("#error_div_forgot").hide();
                                        }, 3000);
                                      document.getElementById("mobile_number_reset").disabled = false;

                                  }
                              },
                              error: function(data) {
                                  console.log('An error occurred in mobile number.');
                                  document.getElementById("mobile_number_reset").disabled = false;
                              },
                          });
                      }

                    document.getElementById("mobile_number_reset").disabled = false;
                    });
                    });

                }

              });
              
          }      
          
          
          $('#password_reset_form').submit(function(e) {
              var frm = $('#password_reset_form');
              e.preventDefault();
              if ($(this).valid()) {
                  $.ajax({
                      type: frm.attr('method'),
                      url: "/password-reset/",
                      data: frm.serialize(),
                      success: function(data) {
                          $("#password_reset_form").trigger("reset");
                          var jsnobject = data;
                          if (jsnobject.status === 'success' )
                            {
                                $('#new_pwd_modal').modal('hide');
                                $('#password_reset_form').trigger('reset');
                                $("#sucs_msg").html(data.message);
                                $('#pwdSuccessModal').modal('show');
                            } 
                            else 
                            {
                                $("#error_div_new_pswd").html(data.message);
                                $("#error_div_new_pswd").show();
                                setTimeout(function(){
                                    $("#error_div_new_pswd").hide();
                                    }, 3000);
                            }
                      },
                      error: function(data) {
                          console.log('An error occurred in password reset.');
                      }
                  });
              }
          });


function validate_login_info() {
 is_valid = $('#student_login_form').valid()
 if(is_valid){
    logged_from = $("#login_from_career").val()
    login_data = $('#student_login_form').serialize()
    $.ajax({ 
        data: login_data,
        type: 'POST',
        url: "/login/", 
        success: function(data) 
        {
            data = JSON.parse(data)
            if(data.status == "success"){
                
                if(data.otp_verified ==true){
                    $("#loginModal").modal('hide')
                    $("#student_login_form").trigger("reset");
                    console.log("data.next_url", data.next_url)
                    console.log("data.event_unique_id________",data.event_unique_id)
                    if (data.event_unique_id){
                        console.log("event_unique_id")
                        window.location.href = "/event/details/"+data.event_unique_id+"/";
                    }
                    else if (data.from_careers){
                        window.location.href = "/careers/my-jobs/";
                    }
                    // remove redirection to dashboard after login
                    // else if(sessionStorage.getItem("redirect_to") == "dashboard"){
                    //     sessionStorage.setItem("redirect_to","null");
                    //     window.location.href = "/student/dashboard/";
                    // }
                    else if (data.next_url)
                    {
                        window.location.href = data.next_url;
                    }
                    else{
                        location.reload();
                    }
                }
                else{
                    $("#loginModal").modal('hide')
                    $("#student_login_form").trigger("reset");
                    $("#login_student_mobile_number").val(data.mobile_number)
                    $("#LoginotpModal").modal('show');
                    var counter = 61;
                    var interval = setInterval(function() 
                        {    
                            $("#login_resend_otp").show();
                            // $('#login_resend_otp').prop('disabled', true);
                            $('#login_resend_otp').css('pointer-events','none');
                            $('#login_resend_otp').css('cursor', 'default');
                            counter--;
                            $("#login_resend_otp").html('Resend OTP in '+counter+' seconds')
                            // Display 'counter' wherever you want to display it.
                            if (counter == 0) {
                                // Display a login box
                                clearInterval(interval);
                                $("#login_resend_otp").html('Click here to resend OTP')
                                // $('#login_resend_otp').prop('disabled', false);
                                $('#login_resend_otp').css('pointer-events','');
                                $('#login_resend_otp').css('cursor', 'pointer');
                            }
                        }, 1000);


                }
            }
            else{
                $("#login_error_div").html( data.message );
                $("#login_error_div").show();
                setTimeout(function(){
                $("#login_error_div").hide();
                }, 3000);
            }            
            
        }
    });
 }
}

  $('#student_login_form').validate({
      rules : {
              
              login_password : {
                  required : true,
                  
              },
              login_username : {
                  required : true,

              },
          },
      messages : {
          login_password:{
          required : "Please enter your password."
         
          },
          login_username:{
          required : "Please enter your mobile number."
          
          },
      },              
  });

  


function login_verify_otp(){
  
    otp_string = $("#login_otp").val();
    if ($("#login_otp_form").valid())
    {
    student_mobile_number = $("#login_student_mobile_number").val()
    $.ajax({ 
        data: {"otp_string":otp_string,"student_mobile_number":student_mobile_number},
        type: 'POST',
        url: "/login-otp-verification/", 
        success: function(data) 
        {
          if(data.status == "success"){
            $('#LoginotpModal').modal('hide')
            $("#login_otp_form").trigger("reset");
            if (data.message)
            {
                success_message = data.message
                $("#success_message_div").html(success_message)
                myAlertTop();
            }
            if(sessionStorage.getItem("redirect_to") == "dashboard"){
                sessionStorage.setItem("redirect_to","null");
                window.location.href = "/student/dashboard/";
            }
            else if (sessionStorage.getItem("redirect_to") == "downloadble_resource")
            {
                sessionStorage.setItem("redirect_to","null");
                window.location.href = "/downloadable-resources/download-for-free";  
            }
            else if (sessionStorage.getItem("redirect_to") == "mock_test")
            {
                sessionStorage.setItem("redirect_to","null");
                window.location.href = "/mock-test/"+sessionStorage.getItem("package_id")+"/";  
                sessionStorage.setItem("package_id","null");
            } 
            else{
                location.reload();
            }
            
         }
         else{
            $("#login_error_div1").html(data.message);
            $("#login_otp_form").trigger("reset");
            $("#login_error_div1").show();
            setTimeout(function(){
            $("#login_error_div1").hide();
            }, 3000);
         }
        }
    });
    }
}  

function  login_resend_otp() {
    student_mobile_number = $("#login_student_mobile_number").val()
    var counter = 61;
    var interval = setInterval(function() {                           
    $("#login_resend_otp").show();
    $('#login_resend_otp').prop('disabled', true);
    $('#login_resend_otp').css('pointer-events','none');
    $('#login_resend_otp').css('cursor', 'default');
    counter--;
    $("#login_resend_otp").text('Resend OTP in '+counter+' seconds')
     // Display 'counter' wherever you want to display it.
        if (counter == 0) {
            // Display a login box
            clearInterval(interval);
            $("#login_resend_otp").text('Click here to resend OTP')
            // $('#login_resend_otp').prop('disabled', false);
            $('#login_resend_otp').css('pointer-events','none');
            $('#login_resend_otp').css('cursor', 'default');
        }
    }, 1000);
    $.ajax({ 
        data: {"mobile":student_mobile_number},
        type: 'GET',
        url: "/resend-otp/", 
        success: function(data) 
        {
          if(data.status == "success"){
            $("#login_error_div1").html(data.message);
            $("#login_error_div1").show();
            setTimeout(function(){
            $("#login_error_div1").hide();
            }, 3000);
         }
         else{
            $("#login_error_div1").html(data.message);
            $("#login_error_div1").show();
            setTimeout(function(){
            $("#login_error_div1").hide();
            }, 3000);
         }
        }
    });
}


function set_session_value(login_from){
    if (login_from){
        $("#login_from_career").val(true)
    }
    sessionStorage.setItem("redirect_to","dashboard");
    $("#loginModal").modal('show')
}



$(".btn-close").click(function()
{
    
    $("#forgot_pass_form").trigger("reset");
    $(".error").html("");
    $("#student_login_form").trigger("reset");
    $('error_div_forgot').html("");
    $("#password_otp_form").trigger("reset");
    $("#password_reset_form").trigger("reset");
    $("#mobile_number_reset").prop('disabled', false);        
});


// voucher code 


$('#form_voucher_code').validate(
    {
        ignore: [],
        rules: {
            
            voucher_code4: {
                required: true,
                minlength: 4,
                maxlength: 14,
                validate_voucher:true,
            },

        },
        
        errorPlacement: function (error, element) {
                
                if (element.attr("name") == "voucher_code4")
                $("#voucher_code-error").html("Please enter valid voucher code");
            }
    });

    
    jQuery.validator.addMethod("validate_voucher", function (value, element) {
    if (/^[A-Za-z0-9\-\s]+$/.test(value)) {
        return true;
    }
    else {
        return false;
    }
    }, 'Avoid special characters and space in this field');

    function voucher_apply() { 
    $("#id_v_submit").attr("disabled", true);
    var valid = $("#form_voucher_code").valid();
       if(valid){
       json_data = $("#form_voucher_code").serialize();
         $.ajax({
                url: '/check-voucher/',   
                data:json_data,
                type: 'GET',
                dataType: "json",
                success: function(data) {
                    if(data.voucher_active == "True")
                    {
                        
                        $("#form_voucher_code").submit()
                    }
                    else
                    {
                        if(data.message){
                            $("#voucher_code-error").html(data.message);
                        }
                        else{
                            $("#voucher_code-error").html("Invalid voucher code");
                        } 
                        $("#id_v_submit").attr("disabled", false);
                    }
                },
         });
       }else{
        $("#id_v_submit").attr("disabled", false);
       }
}



// profile complete




jQuery.validator.addMethod("validate_fields", function (value, element) {

    // if(/^(?=.*[a-zA-Z])([a-zA-Z0-9_~!,@#$%&*.-]+)$/.test( value ))
    if (/^[A-Za-z0-9][ A-Za-z0-9 ]*$/.test(value)) {
        return true;
    }
    else {
        return false;
    }
}, 'Avoid special characters and space in this field');






jQuery.validator.addMethod("atleast_one_alpha", function (value, element) {

        // if(/^(?=.*[a-zA-Z])([a-zA-Z0-9_~!,@#$%&*.-]+)$/.test( value ))
        if (/^[A-Za-z0-9][ A-Za-z0-9_~!,@#$%&*.-\\(\\)\[\]]*$/.test(value)) {
            return true;
        }
        else {
            return false;
        }
    }, 'This field should not be kept blank.');

    jQuery.validator.addMethod("validate_email",function(value, element) {
        // var email = $.trim(value);
        if(value.length>0)
        {
          
           if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value))
            {
               return true;
            }
            else
            {
              return false;
            }
          }
          else
          {
            return true;
          }
           
      },"Please enter a valid Email.");

      jQuery.validator.addMethod("validatephone",function(value, element) {
        if ($('#pc_country_code').val() == "+91"){                
          if(/^[1-9][0-9]{9}$/.test( value )){
              return true;
          }
           else{
               return false;
           }
       }
       else{
           return true
       }
     },"Phone number should not start with zero");
     jQuery.validator.addMethod("noSpace",function(value, element) {
          if(/^\s/.test( value )){
              return false;
          } 
           else{
               return true;
           }
     },"Please start with a valid character");

    $(function() {
        country_name=$('#country_list').val() 
        $('#city_block').hide();
        $('#pc_city_block').hide();
        $('.other_country_block').hide();
        if(country_name!="India"){
         $('#state_block').hide();
         $('.city_block_combo').hide();
         $('#city_block').hide();
         $('#pc_city_block').hide();
         $('.other_country_block').show();
        }
     });

     
     $('#country_list').on("change",function() {
       country = $('#country_list').val() 
       if(country != "India"){
         $('#state_block').hide();
         $('.city_block_combo').hide();
         $('#city_block').hide();
         $('#abroad_state').val("");
         $('#abroad_city').val("");
         $('.other_country_block').show();
         $('#pc_id_state').val("");
         $('#pc_id_city').val("");
         
       }
       else{
         $('#pc_id_state').val("");
         $('#pc_id_city option:not(:first)').remove();
         $('#state_block').show();
         $('.city_block_combo').show();
         $('.other_country_block').hide();
       }
     });
     


$('#add_profile_complete_form').validate({
    ignore: [],
    rules: {

        pc_first_name: {
            required: true,
            minlength: 1,
            maxlength: 30,
            validate_name: true
        },
        pc_last_name: {
            required: true,
            minlength: 1,
            maxlength: 30,
            validate_name: true
        },
        
        pc_phone_number:{
          required : true,
          number: true,
          minlength:function(element) {                            
                    if ($('#pc_country_code').val() == "+91")
                      return 10
                    else
                      return 7
                  },
          maxlength:function(element) {
            if ($('#pc_country_code').val() == "+91"){
              return 10
            }
            else{
              return 12
            }
          },
          validatephone:true,
      },
        pc_contact_email: {
            required: true,
            minlength: 1,
            validate_email: true
        },
        pc_address_1: {
            required: true,
            minlength: 1,
            maxlength: 140,
            //validate_fields: true
            rangelength: [1, 140],
            noSpace: true
        },
        pc_address_2: {
            //required: true,
            minlength: 1,
            maxlength: 140,
            //validate_fields: true
            rangelength: [1, 140],
            noSpace: true
        },
        country: {
            required: true,
            minlength: 1,
            maxlength: 30,
            atleast_one_alpha: true
        },
    
        location: {
            required: true,
            minlength: 1,
            maxlength: 30,
            validate_fields: true
        },
        pc_state: {
              required: function(element){
              return $('#country_list').val() =="India";
            },
          minlength:1,
          maxlength:30
        },
        pc_city : {
                required: function(element){
                return $('#country_list').val() =="India";
                },
            minlength:1,
            maxlength:30
        },
        state_other: {
              required: function(element){
              return $('#country_list').val() !="India";
            },
          minlength:1,
          maxlength:30
        },
        
        pc_city1 : {
            required: function(element){
            return $('#country_list').val() !="India";
            },
        minlength:1,
        maxlength:30
    },
       

    },
    messages: {
        phone_number: {
            minlength: "Phone number must have atleast 8 digits.",
            maxlength: "Phone number must have a maximum of 12 digits."
        },
        
        pc_phone_number:{
required: "Please enter your mobile number.",
number: "Please enter a valid mobile number",
minlength:function(element) {                            
          if ($('#pc_country_code').val() == "+91"){
              return "Phone number should be 10 digit "
          }
          else{
              return "Phone number should be in the range 7-12 "
          }
        },
maxlength:function(element) {
  if ($('#pc_country_code').val() == "+91"){
      return "Phone number should be 10 digit "
  }
  else{
      return "Phone number should be in the range 7-12 "
  }
}
},
    },
    
});



$('#pc_id_state').on("change",function() {
    pc_id_state = $('#pc_id_state').val()
    $("#pc_id_city option").remove();
    $('#city_block').hide();
    if(pc_id_state != ""){
    $.ajax({
    url: '/get-city/',
    type: 'post',
    dataType:'json',
    data: {
    'state': pc_id_state,
    },
    success: function(data) {
    
    
    var $SelectOptions = '';
    
    $.each(data.response.city,function(key,value)
    {
    $SelectOptions+= '<option value='+value[0] +'>'+value[1]+'</option>';
    });
    $('#pc_id_city').append($SelectOptions);
    }
    
    });
    }
    else{
    var $SelectOptions = '';
    $SelectOptions = '<option value="">Select City</option>'
    $('#pc_id_city').append($SelectOptions);
    }
    
    });



    $('#id_state').on("change",function() {
        state = $('#id_state').val()   
        $("#id_city option").remove();
        $('#city_block').hide();
        if(state != ""){
         $.ajax({
                 url: '/packages/get-city/',  
                 type: 'post',
                 dataType:'json',
                 data: { 
                     'state': state,               
                 },
                 success: function(data) {
                 
                 var $SelectOptions = '';           
     
                 $.each(data.response.city,function(key,value) 
                  { 
                   $SelectOptions+= '<option value='+value[0] +'>'+value[1]+'</option>';
                  });
                 $('#id_city').append($SelectOptions);
               }
     
               });
        }
        else{
         var $SelectOptions = ''; 
         $SelectOptions = '<option value="">Select City</option>'
         $('#id_city').append($SelectOptions);
        }
     
     });
     
       


function submit_profile_complete() {

    is_valid = $("#add_profile_complete_form").valid();
   
    if (is_valid) {
       
        city = $('#id_city').val()
        city1 = $('#id_city1').val()
        if (city == "Other" && city1 == "") {
            $('#id_stu_cit1').show();
            return false;
        }
        
        $.ajax({
            url: '/profile-complete/',
            type: 'GET',
            dataType: 'json',
            data: $("#add_profile_complete_form").serialize(),
            success: function (data) {
                if (data.status == 'success') {
                    
                    $("#profile_complete_div").hide();
                    if ('{{response.transaction_data.package.0.combo}}' == 2)
                    {
                        $("#address_module").show();
                    }
                    else{
                         $("#payment_module").show();
                    } 
                }
                else {
                    
                }
            }
        })
    }
}


$('#pc_id_city').on("change", function () {
       
    city = $('#pc_id_city').val()
    if (city == "Other") {
        $('#pc_id_city1').val("");
        $('#pc_city_block').show();
    }
    else {
        $('#pc_city_block').hide();
    }

});


// Billing address




$('#add_address_form').validate({
    ignore: [],
    rules: {

        first_name: {
            required: true,
            minlength: 1,
            maxlength: 30,
            validate_name: true
        },
        last_name: {
            required: true,
            minlength: 1,
            maxlength: 30,
            validate_name: true
        },
        phone_number: {
            required: true,
            validate_phone: true
        },
        address_1: {
            required: true,
            minlength: 1,
            maxlength: 40,
            validate_fields: true
        },
        address_2: {
            required: true,
            minlength: 1,
            maxlength: 40,
            validate_fields: true
        },
        country: {
            required: true,
            minlength: 1,
            maxlength: 30,
            atleast_one_alpha: true
        },

        city: {
            required: true,
            minlength: 1,
            maxlength: 30,
            atleast_one_alpha: true
        },
        state: {
            required: true,
            minlength: 1,
            maxlength: 30,
            atleast_one_alpha: true
        },
        location: {
            required: true,
            minlength: 1,
            maxlength: 30,
            validate_fields: true
        },
        pin_code: {
            required: true,
            digits: true,
            minlength: 1,
            maxlength: 6
        },

    },
    messages: {
      
    },
    
});


$('#id_state').on("change",function() {
    state = $('#id_state').val()   
    $("#id_city option").remove();
    $('#city_block').hide();
    if(state != ""){
     $.ajax({
             url: '/get-city/',  
             type: 'post',
             dataType:'json',
             data: { 
                 'state': state,               
             },
             success: function(data) {
             // alert(data.response.city[0].key)
             
             var $SelectOptions = '';           
 
             $.each(data.response.city,function(key,value) 
              { 
               $SelectOptions+= '<option value='+value[0] +'>'+value[1]+'</option>';
              });
             $('#id_city').append($SelectOptions);
           }
 
           });
    }
    else{
     var $SelectOptions = ''; 
     $SelectOptions = '<option value="">Select City</option>'
     $('#id_city').append($SelectOptions);
    }
 
 });

 
   $('#id_city').on("change",function() {
    city = $('#id_city').val()   
    if(city == "Other" || city == "Other City"){
       $('#id_city1').val("");
       $('#id_stu_cit1').hide();
       $('#city_block').show();
    }
    else{
     $('#city_block').hide();    
    }
 
 });
 
 


 function submit_shipping_address() {
    is_valid = $("#add_address_form").valid();
   
    if (is_valid) {
       
        city = $('#id_city').val()
        city1 = $('#id_city1').val()
        if (city == "Other" && city1 == "") {
            return false;
        }
        
        $.ajax({
            url: '/add-shipping-address/',
            type: 'GET',
            dataType: 'json',
            data: $("#add_address_form").serialize(),
            success: function (data) {
                if (data.status == 'success') {
                    
                    $("#address_module").hide();
                    $("#payment_module").show();
                }
                else {
                    
                   // Materialize.toast('<i class="material-icons dp48">error_outline</i>&nbsp;&nbsp;<span>' + data.messages + '</span>', 5000);
                }
            }
        })
    }
}

// downloadable resource  js 
// $('#registerModal').on('shown.bs.modal', function (e) {
//    $("#horizon_register_button").prop('disabled', true);
// });
