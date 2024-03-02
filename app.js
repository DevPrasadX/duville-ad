const popupClose = document.getElementById("popup-close")

popupClose.addEventListener('click', () => {
    const popup = document.getElementById("popup")
    popup.style.display = "none";
})

const popupBtns = document.querySelectorAll('.popup-btn')



popupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = document.getElementById("popup")
        popup.style.display = "block";
    })
})

const validateMobileNumber = (number) => {
    if (typeof number !== 'string') {
        return false;
    }

    const cleanedNumber = number.replace(/\D/g, '');

    if (cleanedNumber.length === 10) {
        return true;
    } else {
        return false;
    }
}

const validateName = (name) => {
    if (typeof name !== 'string') {
        return false;
    }

    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

// const getUTMTerm = () => {
//     const queryParams = new URLSearchParams(window.location.search);

//     // Retrieve the value of utm_term
//     const utmTermValue = queryParams.get('utm_term');
//     return utmTermValue;
// }

// const getCampaign = () => {
//     const utmTerm = getUTMTerm()
//     let campaign = {
//         campaign_name: " GSN Brsnd Feb",
//         url: "https://hook.eu2.make.com/cd2f5jsbei2jdizvc8nik98m8oc42nvf",
        
//     }
//     switch (utmTerm) {
//         case "brand":
//             campaign.campaign_name = "Tattav Brand google Search"
//             campaign.campaign_code = "a085g00000EM0jfAAD"
//             campaign.url = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZlMDYzNjA0MzQ1MjY4NTUzMzUxMzMi_pc"
//             campaign.form_id = "67890"
//             return campaign
//         case "display":
//             campaign.campaign_name = "Tattav google-search"
//             campaign.campaign_code = "a085g00000ELzxKAAT"
//             campaign.url = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZlMDYzNjA0MzQ1MjY4NTUzMzUxMzYi_pc"
//             campaign.form_id = "13579"
//             return campaign
//         default:
//             return campaign
//     }
// }



// const createLead = async (name, email, mobile) => {
//     if(!validateMobileNumber(mobile)){
//         alert("Mobile number is not correct")
//         return false
//     }
//     if(!validateName(name)){
//         alert("Name is not valid")
//         return false
//     }

//     const campaign = getCampaign()
//     const requestData = {
//         name,
//         email,
//         mobile,
//         configuration,
//         campaign_name: campaign.campaign_name,
//         project_id: "a015g00000tXR7YAAW",
//         form_id: campaign.form_id
//     }
//     if(requestData){
//         try {
//             const response = await fetch(campaign.url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData),
//             });
//             const data = await response.json();
//             if(data.status === 'success'){
//                 return true
//             }
//             else{
//                 return false
//             }
            
//         } catch (error) {
//             return false
//         }
//     }

// }

// Function to submit data with optional UTM parameters
function savedata() {
    // event.preventDefault(); // Prevent default form submission
  
    const form = document.getElementById('popup-form');
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData);
  
    // Capture UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    jsonData['utm_source'] = urlParams.get('utm_source');
    // jsonData['utm_medium'] = urlParams.get('utm_medium');
    jsonData['utm_campaign'] = urlParams.get('utm_campaign');
  
    // Simple UTM routing logic (modify as needed)
    const webhookUrls = {
      'GSN_Generic_Search': 'https://hook.eu2.make.com/cd2f5jsbei2jdizvc8nik98m8oc42nvf', 
      'social_organic': 'https://hook.eu2.make.com/cd2f5jsbei2jdizvc8nik98m8oc42nvf',
      // ... add more as needed
    };
  
    let targetWebhookUrl;
    if (jsonData['utm_source'] === 'search') {
      targetWebhookUrl = webhookUrls['GSN_Generic_Search'];
    } else {
      targetWebhookUrl = webhookUrls['social_organic']; 
    }
  
    // Send data to webhook
    fetch(targetWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData) 
    })
    .then(response => {
        if (response.ok) {
          console.log('Form data submitted successfully');
          // Add any success actions, e.g., display a thank you message
        } else {
          console.error('Error submitting form:', response.status);
          // Add error handling, e.g., display an error message
        }
      })
      .catch(error => console.error('Error submitting form:', error));
    
  }
  
const sendDataToGoogleSheet = async (name, email, phone,configuration) => {
    if(!validateMobileNumber(phone)){
        alert("Please enter valid 10 digit number")
        return false
    }
    if(!validateName(name)){
        alert("Name is not valid")
        return false
    }

    const requestData = {
        name: name,
        email: email,
        phone: phone,
        configuration: configuration,
    }

// https://sheetdb.io/api/v1/2u05e1oydua18
    if(requestData){
        try {
            const response = await fetch('https://sheetdb.io/api/v1/164r9x0oo9drx ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        requestData
                    ]
                })
            });
            const data = await response.json();
            if(data?.created === 1){
                return true
            }
            else{
                return false
            }
        } catch (error) {
            return false
        }
    }
}



const popupFormBtn = document.getElementById("popup-form-btn")

popupFormBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const popupForm = document.getElementById("popup-form")
    const name = popupForm.querySelector('input[name=name]').value
    const email = popupForm.querySelector('input[name=email]').value
    const phone = popupForm.querySelector('input[name=phone]').value
    const configuration = popupForm.querySelector('select[name=configuration]').value
    // const createLeadStatus = await createLead(name, email, phone,configuration)
    const sendDataToGoogleSheetStatus = await sendDataToGoogleSheet(name,email, phone,configuration)

   
    if(sendDataToGoogleSheetStatus){
       window.location.replace('./thankyou.html')
     
       localStorage.setItem("name", name)
    
    }

})

const footerFormBtn = document.getElementById("footer_form_btn")

footerFormBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const footerForm = document.getElementById("footer_form")
    const name = footerForm.querySelector('input[name=name]').value
    const email = footerForm.querySelector('input[name=email]').value
    const phone = popupForm.querySelector('input[name=phone]').value
    const configuration = popupForm.querySelector('select[name=configuration]').value
    const createLeadStatus = await createLead(name, email, phone,configuration)
    const sendDataToGoogleSheetStatus = await sendDataToGoogleSheet(name,email, phone,configuration)
    if(createLeadStatus && sendDataToGoogleSheetStatus){
       
        localStorage.setItem("name", name)
    }
})

const contactFormBtn = document.getElementById("contact-form-btn")

contactFormBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const contactForm = document.getElementById("contact-form")
    const name = contactForm.querySelector('input[name=name]').value
    const email = contactForm.querySelector('input[name=email]').value
    const phone = popupForm.querySelector('input[name=phone]').value
    const configuration = popupForm.querySelector('select[name=configuration]').value
    const createLeadStatus = await createLead(name, email, phone,configuration)
    const sendDataToGoogleSheetStatus = await sendDataToGoogleSheet(name,email, phone,configuration)
    if(createLeadStatus && sendDataToGoogleSheetStatus){
       
        localStorage.setItem("name", name)
    }
})

