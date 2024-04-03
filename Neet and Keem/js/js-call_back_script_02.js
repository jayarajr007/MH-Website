
jQuery.validator.addMethod("validate_phone",function(value, element) {
    if ($('#callback_country_code').val() == "+91"){                
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

$('#call_back_form').validate({
    rules : {
  
            student_name : {
                required : true,
                minlength:1,
                maxlength:50,
                validate_name : true 
            },
            email: {
                required: false,
                validate_email: true
            },
  
             phone_number : {
                required : true,
                number: true,
                minlength:function(element) {                            
                        if ($('#callback_country_code').val() == "+91")
                          return 10
                        else
                          return 7
                      },
               maxlength:function(element) {
                 if ($('#callback_country_code').val() == "+91"){
                   return 10
                 }
                 else{
                   return 12
                 }
               },
               validate_phone :true             
            },         
            
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
                if ($('#callback_country_code').val() == "+91")
                  return "Phone number should be 10 digit "
                else
                  return "Phone number should be in the range 7-12 "
              },
      maxlength:function(element) {
        if ($('#callback_country_code').val() == "+91")
          return "Phone number should be 10 digit "
        else
          return "Phone number should be in the range 7-12 "
      }   
       
        },
        
    },
   
  });

  $('#callback_otp_form').validate({
    rules : {
        callback_otp : {
                required : true,
                maxlength:6,
            },
        },
    messages : {
        callback_otp:{
        required : "Please enter OTP.",
        },
    }, 
    errorPlacement: function(error, element) {
        if (element.attr("name") == "callback_otp" )
            $("#callback_otp_error").html( error );
        }             
});

function resend_callback_otp(){
    var counter = 61;
    var interval = setInterval(function() {                           
    $("#callback_resend_otp").show();
    $('#callback_resend_otp').prop('disabled', true);
    $('#callback_resend_otp').css('pointer-events','none');
    $('#callback_resend_otp').css('cursor', 'default');
    counter--;
    $("#callback_resend_otp").html('Resend OTP in '+counter+' seconds')
     // Display 'counter' wherever you want to display it.
        if (counter == 0) {
            // Display a login box
            clearInterval(interval);
            $("#callback_resend_otp").text('Click here to resend OTP')
            // $('#login_resend_otp').prop('disabled', false);
            $('#callback_resend_otp').css('pointer-events','');
            $('#callback_resend_otp').css('cursor', 'pointer');
        }
    }, 1000);
}




function request_call_back(source){
    $("#callback_source").val(source);
    $("#request_callback_Modal").modal('show');
}
function validate_callback_info(){
    if($("#call_back_form").valid())
    {
        send_callback_otp();
    }
}

function send_callback_otp(){
        student_name = $("#callback_student_name").val();
        country_code = $("#callback_country_code").val();
        mobile = $("#callback_phone_number").val();
        email = $("#email_id").val();
        source = $("#callback_source").val()
        $.ajax({
            url: "/callback-registration/",
            type: "GET",
            dataType: "json", 
            data:{"student_name":student_name,"country_code":country_code,"mobile":mobile,"email":email,"source":source},
            success:function(data)
            {
                if(data.code == 1){
                    if (data.response.otp_generated == true){
                        $("#request_callback_Modal").modal('hide');
                        $("#callback_student_mobile_number").val(mobile)
                        $("#callback_otpModal").modal('show');
                        resend_callback_otp()

                    }
                    else{
                        $("#callback_otp_form").trigger("reset");
                        $("#call_back_form").trigger("reset");
                        $("#request_callback_Modal").modal('hide');

                        $("#callback_otpModal").modal('hide');

                        $("#callback_successModal").modal('show')
                    }
                }
                else if (data.message =='failed')
                {
                    $("#success_message_div").html("Name required");
                    myAlertTop();
                    location.reload();
                }
                else{
                    $("#success_message_div").html(data.message);
                    myAlertTop();
                    location.reload();

                }
            }
        
    })
}

function callback_verify_otp(){
    otp = $("#callback_otp").val()
    mobile = $("#callback_student_mobile_number").val()
    if($("#callback_otp_form").valid())
    {
        post_data = $("#callback_otp_form").serialize()
        post_data['mobile'] = mobile
        $.ajax({
        url: "/callback-registration/",
            type: "POST",
            dataType: "json", 
            data:post_data,
            success:function(data)
            {
                if(data.code == 1){
                    $("#callback_otp_form").trigger("reset");
                    $("#call_back_form").trigger("reset");

                    $("#callback_otpModal").modal('hide');
                    $("#callback_successModal").modal('show')
                }
                else{
                    $("#callback_otp_error").html("Invalid OTP")
                }
            }
            
        })
    }else{
        
    }
}
function close_success_modal(){
    $("#callback_successModal").modal('hide');
}
function close_callback_reg_modal(){
    $("#request_callback_Modal").modal('hide');
    $("#call_back_form").trigger("reset");

}
function close_callback_otp_modal(){
    $("#callback_otp_form").trigger("reset");
    $("#call_back_form").trigger("reset");
    $("#callback_otpModal").modal('hide');

}

function resendcallback_otp()
{
    $("#callback_otp_form").trigger("reset");
    send_callback_otp()
}