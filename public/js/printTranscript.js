$(document).ready(function(){
	$('body').on('click', 'a#printArabic', function(){
        window.location.href ="/transcript/arabicTranscript/"+$(this).val();
	 });
    

    $('body').on('click', '#printEnglish', function(){
        window.location.href ="/transcript/englishTranscript/"+$(this).val(); 
     });
});