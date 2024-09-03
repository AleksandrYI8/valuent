import { Input } from "postcss";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"

function Loyaut() {

    const user = localStorage.getItem("user")
    const username = JSON.parse(user)

    const location = useLocation()
    const ishome = location.pathname === '/'
    const iswallet = location.pathname === '/wallet'
    const isTrans = location.pathname === '/transictions'
    const ischange = location.pathname === '/exchange'

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
        <div className="w-full flex bg-custom-main" >
            <div className=" flex flex-col justify-between h-[100vh] w-[20%] p-[1%] shadow-menu-shadow">
                <div className="">
                    <h1 className="text-[25px] text-blue-500 text-center mb-[0px]" >VALUET</h1>
                    <div className="w-[35%] bg-blue-500 h-[2px] mb-[40px] rounded mx-auto"></div>

                    <ul className="flex flex-col gap-[5px]" >
                        <Link to={"/"}>
                            <li className={`group transition-[.2s] cursor-pointer rounded-[10px] rounded-b-[0] ${ishome ? 'bg-gray-600' : 'bg-transparent'}`}>
                                <div className={`opacity-[.5] flex items-center gap-[8%] p-[5%] ${ishome ? 'opacity-[1]' : 'opacity-[.5]'}`}>
                                    <img className="w-[18px]" src="/menu.svg" alt="" />
                                    <p className={`text-white text-[16px] font-medium`} >Overview</p>
                                </div>
                                <div className={`opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto ${ishome ? 'opacity-[1]' : 'opacity-[0]'}`}></div>
                            </li>
                        </Link>
                        <Link to={"/wallet"}>
                            <li className={`group transition-[.2s] cursor-pointer rounded-[10px] rounded-b-[0] ${iswallet ? 'bg-gray-600' : 'bg-transparent'}`}>
                                <div className={`opacity-[.5] flex items-center gap-[8%] p-[5%] ${iswallet ? 'opacity-[1]' : 'opacity-[.5]'}`}>
                                    <img className="w-[18px]" src="/wallet.svg" alt="" />
                                    <p className={`text-white text-[16px] font-medium`}>Wallet</p>
                                </div>
                                <div className={`opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto ${iswallet ? 'opacity-[1]' : 'opacity-[0]'}`}></div>
                            </li>

                        </Link>

                        <Link to={"/transictions"}>
                            <li className={`group transition-[.2s] cursor-pointer rounded-[10px] rounded-b-[0] ${isTrans ? 'bg-gray-600' : 'bg-transparent'}`}>
                                <div className={`opacity-[.5] flex items-center gap-[8%] p-[5%] ${isTrans ? 'opacity-[1]' : 'opacity-[.5]'}`}>
                                    <img className="w-[18px]" src="/Transictions.svg" alt="" />
                                    <p className={`text-white text-[16px] font-medium`} >Transictions</p>
                                </div>
                                <div className={`opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto ${isTrans ? 'opacity-[1]' : 'opacity-[0]'}`}></div>
                            </li>

                        </Link>
                        <Link to={"/exchange"}>
                            <li className={`group transition-[.2s] cursor-pointer rounded-[10px] rounded-b-[0] ${ischange ? 'bg-gray-600' : 'bg-transparent'}`}>
                                <div className={`opacity-[.5] flex items-center gap-[8%] p-[5%] ${ischange ? 'opacity-[1]' : 'opacity-[.5]'}`}>
                                    <img className="w-[18px]" src="/change.svg" alt="" />
                                    <p className={`text-white text-[16px] font-medium`} >Exchange</p>
                                </div>
                                <div className={`opacity-0 w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto ${ischange ? 'opacity-[1]' : 'opacity-[0]'}`}></div>
                            </li>

                        </Link>
                    </ul>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className=" w-full bg-blue-500 h-[2px] rounded-[10px] mx-auto"></div>
                    <ul className="flex gap-[5px] flex-col " >
                        <li className="cursor-pointer group transition-[.2s] ">
                            <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                <img className="w-[18px]" src="/man.svg" alt="" />
                                <Link className="text-white text-[16px] first-letter:uppercase font-medium" >{name}</Link>
                            </div>
                        </li>

                        <Link to="/singin">
                            <li className="cursor-pointer group transition-[.2s] hover:bg-gray-600 rounded-[10px]">
                                <div className="opacity-[.5] flex items-center gap-[8%] p-[5%] group-hover:opacity-100">
                                    <img className="w-[18px]" src="/wallet.svg" alt="" />
                                    <p className="text-white text-[16px] font-medium" > Log Out</p>
                                </div>
                            </li>
                        </Link>


                    </ul>
                </div>

            </div>

            <div className="w-[80%]">

                <header className="p-[2%] pt-[1%] pb-0 w-full" >

                    <div className="flex justify-between items-center w-[100%] mb-[1%]">
                        <div className="relative w-[25%]">
                            <input className="z-[1] no-clear-btn  text-white bg-blue-950 border-none outline-none w-full pt-[7px] pb-[7px] pl-[20px] rounded-[20px]"
                                type="search"
                                placeholder="Searching..."
                            />
                            <button className="z-[2] right-[3%] top-[15%] absolute all-unset">
                                <img src="/search.svg" alt="" />
                            </button>
                        </div>
                        <div className=" flex gap-[30px] items-center">
                            <Link>
                                <img className="w-[30px]" src="/message.svg" alt="" />
                            </Link>
                            <Link>
                                <img className="w-[25px]" src="/bell.svg" alt="" />
                            </Link>
                        </div>
                    </div>

                    <div className="opacity-100 w-full pr-[2%] bg-blue-500 h-[2px] rounded-[10px] mx-auto"></div>
                </header>
                <main>
                    <Outlet />
                </main>

            </div>
        </div >

    )
}

export default Loyaut
