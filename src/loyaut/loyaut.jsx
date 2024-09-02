import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"

function Loyaut() {

   const user = localStorage.getItem("user")
   const username = JSON.parse(user)

   const [name, setName] = useState()


   useEffect(() => {
    // Выполнение GET-запроса
    fetch('http://localhost:8080/users')
      .then(res => {
        if (!res.ok) { // Проверка статуса ответа на успешность
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        data.find((user) => user.email === username.email ? setName(user.name) : "")



    })
      .catch(error => {
        console.error('Fetch error:', error); // Логирование ошибок
      });
  }, []);

   console.log(username);

    return (
        <div className="w-full flex gap-[2%]" >
            <div className="bg-custom-radial flex flex-col justify-between h-[100vh] w-[15%] p-[1%]">
                <div className="">
                    <h1 className="text-[35px] text-blue-500 text-center mb-[0px]" >VALUET</h1>
                    <div className="w-[40%] bg-blue-500 h-[3px] mb-[40px] rounded mx-auto"></div>

                    <ul className="flex flex-col " >
                        <li className="group transition-[.2s] hover:bg-gray-600 rounded-[10px] rounded-b-[0]">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                <img className="w-[18px]" src="/menu.svg" alt="" />
                                <Link className="text-white text-[16px] font-medium" >Overview</Link>
                            </div>
                            <div className="opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto group-hover:opacity-100"></div>
                        </li>

                        <li className="group transition-[.2s] hover:bg-gray-600 rounded-[10px] rounded-b-[0]">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                <img className="w-[18px]" src="/wallet.svg" alt="" />
                                <Link className="text-white text-[16px] font-medium" >Wallets</Link>
                            </div>
                            <div className="opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto group-hover:opacity-100"></div>
                        </li>

                        <li className="group transition-[.2s] hover:bg-gray-600 rounded-[10px] rounded-b-[0]">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                <img className="w-[18px]" src="/Transictions.svg" alt="" />
                                <Link className="text-white text-[16px] font-medium" >Transictions</Link>
                            </div>
                            <div className="opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto group-hover:opacity-100"></div>
                        </li>

                        <li className="group transition-[.2s] hover:bg-gray-600 rounded-[10px] rounded-b-[0]">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                <img className="w-[18px]" src="/change.svg" alt="" />
                                <Link className="text-white text-[16px] font-medium" >Exchange</Link>
                            </div>
                            <div className="opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto group-hover:opacity-100"></div>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className=" w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto"></div>
                    <ul className="flex gap-[5px] flex-col " >
                        <li className="group transition-[.2s] ">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                            <img className="w-[18px]" src="/man.svg" alt="" />
                                <Link className="text-white text-[16px] first-letter:uppercase font-medium" >{name}</Link>
                            </div>
                        </li>

                        <li className="group transition-[.2s] hover:bg-gray-600 rounded-[10px]">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                <img className="w-[18px]" src="/wallet.svg" alt="" />
                                <Link className="text-white text-[16px] font-medium" to="/singin"> Log Out</Link>
                            </div>
                        </li>

                       
                    </ul>
                </div>

            </div>

            <div className="w-[85%]">

                <header className="bg-red-500 w-full" >
                    <h1>Мой сайт</h1>
                </header>
                <main>
                    <Outlet />
                </main>

            </div>
        </div>

    )
}

export default Loyaut
