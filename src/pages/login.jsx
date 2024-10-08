import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"


function logIn() {

  const [update, setUpdate] = useState([])
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

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
        setUsers(data); // Устанавливаем данные в состояние
      })
      .catch(error => {
        console.error('Fetch error:', error); // Логирование ошибок
      });
  }, [update]);





  function Input({ isError, name, type, register, img }) {

    const errorMessage = isError?.message || '';

    return (
      <>
        <div className={`w-full  ${errorMessage ? 'mt-[5px]' : 'mt-[28px]'}`}>
          {errorMessage && <span className="text-red-500 pl-[17%] ">{errorMessage}</span>}
          <div className="flex relative w-full gap-[0px]">
            <img className=" flex absolute left-[17%] top-[17%] h-[30px] w-[30px] border-2 border-blue-500 p-[5px] rounded-[50%]" src={img} alt="" />
            <input
              className={`outline-none mx-auto w-[70%]   rounded-[10px] text-white bg-gray-800 border pt-[10px] border-blue-500 pb-[12px] pl-[50px] text-[16px] ${isError ? ' border-2 border-red-500' : ' border-2 border-blue-500'}`}
              type={type}
              placeholder={name}
              {...register}
            />
          </div>


        </div>
      </>
    );
  }


  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset

  } = useForm()





  const submit = (data) => {

    const email = users.map((user) => user.email)

    if (email.some((em) => em === data.email)) {

      setError("email", {
        type: "manual",
        message: "This email is already registered"
      })

      setError
    } else {
      fetch('http://localhost:8080/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          setUpdate(data)
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });

        localStorage.setItem('username', JSON.stringify(data.name));
        localStorage.setItem('user', JSON.stringify(data));

      alert("welcome")
      navigate('/')
      reset()
    }
  }



  return (
    <>

      <div className=" w-full mx-auto h-[100vh] bg-custom-radial flex items-center gap-[20%] pl-[10%] pr-[10%]">
      <img className="absolute bottom-0 right-0" src="/bg_first.svg" alt="" />
      <img className="absolute bottom-0 right-0" src="/bg_sec.svg" alt="" />
      <img className="absolute bottom-[20%] right-[35%]" src="/bg_icn_first.svg" alt="" />
      <img className="z-[0] absolute top-[15%] left-[41%]" src="/bg_icn_sec.svg" alt="" />
      <img className="z-[2] absolute top-[20%] left-[7%]" src="/bg_icn_therd.svg" alt="" />


        <form className={`rounded-[10px] z-[1] flex flex-col items-center shadow-custom-shadow bg-custom-form w-[40%] h-[70%] `} onSubmit={handleSubmit(submit)}>

          <h1 className={` pt-[20px] text-[36px] text-center text-gray-200 mb-[60px]`} >Welcome!</h1>

          <Input
            isError={errors.name}
            name="Name"
            type="text"
            img="/man.svg"
            register={register("name", {
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё]{1,20}$/i,
                message: "Please enter the data correctly.",
              },
              required: {
                value: true,
                message: "Is reqired",
              },
            })}
          />

          <Input
            isError={errors.email}
            name="Email"
            type="email"
            img="/gmail.svg"
            register={register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/gi,
                message: "Please enter a valid email address.",
              },
              required: {
                value: true,
                message: "Is required.",
              },
            })}
          />

          <Input
            isError={errors.password}
            name={"Password"}
            type={"password"}
            img={"/lock.svg"}
            register={register("password", {
              pattern: {
                value: /.{6,}/gi,
                message: "Please enter the data correctly.",
              },
              required: {
                value: true,
                message: "Is reqired",
              },
            })}
          />
          <div className={`flex gap-5 mt-[40px]`}>
            <Link className=" pl-[25px] pr-[25px] pt-[8px] pb-[8px] text-[19px] rounded-[10px] text-gray-400 bg-gray-900  hover:text-white hover:bg-blue-500 transition  duration-[.3s] easy-linear" to="/singin">Sing in</Link>
            <button className="pl-[25px] pr-[25px] pt-[8px] pb-[8px] text-[19px] rounded-[10px] text-gray-400 bg-gray-900 hover:text-white hover:bg-blue-500 transition  duration-[.3s] easy-linear" type="submit">Sing up</button>
          </div>
        </form>

        <div className="flex flex-col justify-center w-[30%] ">
          <h1 className="text-[72px] text-blue-500 text-center" >VALUET</h1>
          <div className="w-[40%] bg-blue-500 h-[3px] rounded mx-auto mb-[5px]"></div>
          <p className="text-center text-[24px] text-gray-200">Your currency dashboard</p>
        </div>

      </div>


    </>
  )
}

export default logIn
