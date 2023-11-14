import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Waitlist() {

    const [email, setEmail] = useState<string>(localStorage.getItem("dark-mode-pdf-email") || "");
    const [show, setShow] = useState<Boolean>(false);
    const navigate = useNavigate();

    const joinWaitlist = async () => {
        if(localStorage.getItem("dark-mode-pdf-email") !== ""){
            navigate('/view');
        }
        else if(email){
            const userDataPostReq = {
                email: email
            }
            localStorage.setItem("dark-mode-pdf-email", email);
            const user = await axios.post("https://yt-connect-backend.onrender.com/swapperUsers/register", userDataPostReq);
            if(user.status == 201){
                navigate('/view');
            }
            else if(user.status == 400){
                setShow(true);
            }
            else{
                alert("Some unexpected error occured.")
            }
        }
        else{
            alert("Please enter your email.")
        }
    }

    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center border-black border-2 border-solid max-w-[300px] w-[50vw] min-w-[250px] text-center gap-12 p-2 rounded-[10px] py-12">

                <strong className="text-2xl" id="joinHead"><u>Free Access</u></strong>


                <div className=" flex flex-col justify-center text-left">

                <p className="font-semibold">E-mail</p>
                <input className="mb-4 p-1 rounded-[9px] w-full bg-blue-200 border-2 border-black border-solid" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <p className={`${show ? 'block' : 'hidden'} text-red-600 -mt-4`}>
                    Email already in use
                </p>
                <button className="font-semibold mt-8 border-2 border-black rounded-[9px] bg-blue-200 px-4 py-1 font-semibold hover:bg-blue-300 " onClick={joinWaitlist}>Start</button>

                </div>

            </div>
        </div>
    )
}

export default Waitlist