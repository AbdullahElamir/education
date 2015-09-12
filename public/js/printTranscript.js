$(document).ready(function(){

  if($getMsg["msg"]==3){
    custNotify("danger","خطأ","هذا الطالب حديث التسجيل في المعهد ولم يتم تسجيل تخصصه ولم يتم فتح فصل دراسي له","ok-sign","bounceIn","bounceOut");
    replaceUrl('/transcript'); 
  }
  
});