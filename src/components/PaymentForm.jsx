import { InterswitchPay } from "react-interswitch";
import { useEffect, useState } from "react";

import { generateCode } from "../utils/codeGenerator";

import emailJs from '@emailjs/browser'
import Swal from 'sweetalert2';

export function PaymentForm() {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        amount: "4000",
    });

    const [code, setCode] = useState('');
    const [customerCount, setCustomerCount] = useState(0)

    const handleGenerateCode = () => {
        let newCode;
        newCode = generateCode();
        setCode((prevCode) => newCode);
        setCustomerCount((prev) => prev + 1)
    };

    const sendEmail = () => {
        emailJs.send('service_caui9gd', 'template_tr32k97', emailTemplateParams, 'roC2_mTksZEFc54Di')
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: `Payment Succesful, an email has been sent to ${formData.email} with your event code.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
            })
    }

    const paymentProps = {
        merchantCode: "MX89162",
        payItemID: "Default_Payable_MX89162",
        customerEmail: formData.email,
        redirectURL: "http://localhost:3000/",
        text: "Pay Now",
        mode: "LIVE",
        transactionReference: `${formData.email}-${Date.now().toString()}`,
        amount: `${Number(formData.amount) * 100}`,
        style: {
            width: "100%",
            border: "2px",
            color: "#fff",
            background: "#ee0a6a",
            borderRadius: '0.5rem',
            marginTop: '1.75rem',
            fontSize: '16px',
            padding: '8px'
        },
        callback: (response) => {
            console.log("response: ", response);
            if (response.resp === '00' || response.desc === 'Approved by Financial Institution') {
                handleGenerateCode()
                setFormData({})
            }
            handleGenerateCode()
        }
    }

    const emailTemplateParams = {
        fullName: formData.fullName,
        code,
        to_email: `michaelfrancis135@gmail.com`,
        customerCount
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if(code !== '' && customerCount !== 0) sendEmail()
    }, [code, customerCount])

    return (
        <>
            <div className="rounded-md shadow-md w-full md:w-[45%] p-5 flex flex-col items-center bg-[#fff]">
                
                <form action="" className="flex flex-col gap-5 w-full">
                    
                    <div className="flex flex-col gap-2 w-full">
                        <label className="motto text-sm text-[#6a6767]">Full Name</label>
                        <input
                            className="border transition-all duration-300 ease-in focus:border-[#ee0a6a] rounded-[8px] text-sm p-3 outline-none bg-transparent"
                            placeholder="Adeife Jessica" type="text"
                            id="name"
                            name="fullName"
                            autoComplete="off"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label className="motto text-sm text-[#6a6767]">Email</label>
                        <input
                            className="border transition-all duration-300 ease-in focus:border-[#ee0a6a] rounded-[8px] text-sm p-3 outline-none bg-transparent"
                            placeholder="adeifejessica@gmail.com" type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label className="motto text-sm text-[#6a6767]">Amount</label>
                        <input
                            className="border transition-all duration-300 ease-in focus:border-[#ee0a6a] rounded-[8px] text-sm p-3 outline-none bg-transparent"
                            placeholder="Amount" type="text"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            readOnly
                        />
                    </div>

                    {/* <button
                        onClick={handleSubmit}
                        className="btn w-full text-base border-[2px] bg-[#ee0a6a] text-white p-2 border-[#ee0a6a] rounded-lg mt-7">
                        Pay Now
                    </button> */}
                </form>

                <InterswitchPay {...paymentProps}  />
            </div>
        </>
    )
}