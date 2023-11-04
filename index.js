const date=new Date();
const current_year=date.getFullYear();
const current_month=date.getMonth();
const current_days=date.getDay();

const input= document.querySelectorAll("input");

var dd=document.querySelector(".day-button");
var mm=document.querySelector(".month-button");
var yyyy=document.querySelector(".year-button");


var error=document.querySelectorAll(".error")
var error_day=document.querySelector(".error.day");
var error_month=document.querySelector(".error.month");
var error_year=document.querySelector(".error.year");



for (let i = 0; i < input.length; i++) {
    const  button = input[i];
    button.addEventListener("input", function(e){
        const value = e.target.value;
        const pulito = value.replace(/[^0-9.]/g,"");
        e.target.value = pulito;
    
    })
    
}

document.querySelector(".arrow").addEventListener("click",submit)



function submit(){
    if (checker(dd.value,mm.value,yyyy.value)){
        let birthdate=new Date(`${yyyy.value}-${mm.value}-${dd.value}`)
        const age=calculateAge(birthdate)

        document.querySelector(".days").textContent = age.days
        document.querySelector(".months").textContent = age.months
        document.querySelector(".years").textContent = age.years
    
    }
    
        
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
  
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
  
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
      months = 12 + months;
    }
  
    if (days < 0) {
      months--;
      const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
      days = tempDate.getDate() - birth.getDate() + today.getDate();
      console.log(tempDate)
    }

  
    return {
      years: years,
      months: months,
      days: days
    };
  }
  


function checker(day,month,year){

    let input_date=`${year}-${month}-${day}`
    let timestamp = new Date(input_date)

    if(dd.value === "" || mm.value === "" || yyyy.value === "" ){
        var empty=document.querySelectorAll(".empty")
        empty.forEach(i => {
            i.classList.remove("hidden")
            if (isNaN(i.value)){
                i.classList.remove("opacity")
            }
            else{
                i.classList.add("opacity")
            }
        });
    }
    
    else if((day >31 || day<1)|| (month>12 || month<1) || year>current_year){
        error.forEach((j) => j.classList.remove("hidden"))
        if (day >31 || day<1){
            error_day.classList.remove("opacity")
        }
        else{
            error_day.classList.add("opacity")
        }

        if (month>12 || month<1){
            error_month.classList.remove("opacity")
        }
        else{
            error_month.classList.add("opacity")
        }

        if (year>current_year){
            error_year.classList.remove("opacity")
        }
        else{
            error_year.classList.add("opacity")
        }
        return false

    }
    else if(isNaN(timestamp) || timestamp.getDate() != dd.value){
        console.log(timestamp)
        
        error.forEach((j) => j.classList.remove("hidden"))
        error_day.classList.remove("opacity")
        error_day.textContent = "Must be a valid date"
        return false
    }
   
    else{
        error.forEach((j) => j.classList.add("hidden"))
        console.log(timestamp)
        return true
    }
}





