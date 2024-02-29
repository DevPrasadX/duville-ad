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

const getUTMTerm = () => {
    const queryParams = new URLSearchParams(window.location.search);

    // Retrieve the value of utm_term
    const utmTermValue = queryParams.get('utm_term');
    return utmTermValue;
}

const getCampaign = () => {
    const utmTerm = getUTMTerm()
    let campaign = {
        campaign_name: "Tattav Generic Google Discovery",
        campaign_code: "a085g00000EM0jkAAD",
        url: "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZlMDYzNjA0MzQ1MjY4NTUzNDUxMzQi_pc",
        form_id: "12345"
    }
    switch (utmTerm) {
        case "brand":
            campaign.campaign_name = "Tattav Brand google Search"
            campaign.campaign_code = "a085g00000EM0jfAAD"
            campaign.url = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZlMDYzNjA0MzQ1MjY4NTUzMzUxMzMi_pc"
            campaign.form_id = "67890"
            return campaign
        case "display":
            campaign.campaign_name = "Tattav google-search"
            campaign.campaign_code = "a085g00000ELzxKAAT"
            campaign.url = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZlMDYzNjA0MzQ1MjY4NTUzMzUxMzYi_pc"
            campaign.form_id = "13579"
            return campaign
        default:
            return campaign
    }
}



const createLead = async (name, email, mobile) => {
    if(!validateMobileNumber(mobile)){
        alert("Mobile number is not correct")
        return false
    }
    if(!validateName(name)){
        alert("Name is not valid")
        return false
    }

    const campaign = getCampaign()
    const requestData = {
        name,
        email,
        mobile,
        campaign_code: campaign.campaign_code,
        campaign_name: campaign.campaign_name,
        project_id: "a015g00000tXR7YAAW",
        form_id: campaign.form_id
    }
    if(requestData){
        try {
            const response = await fetch(campaign.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            if(data.status === 'success'){
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
    const createLeadStatus = await createLead(name, email, phone,configuration)
    const sendDataToGoogleSheetStatus = await sendDataToGoogleSheet(name,email, phone,configuration)

   
    if(createLeadStatus && sendDataToGoogleSheetStatus){
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

