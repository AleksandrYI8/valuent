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
     <div className="w-full">
      {errorMessage && <span className="text-red-500 pl-[17%] ">{errorMessage}</span>}
      <div className="flex relative w-full gap-[0px]">
        <img className=" flex absolute left-[17%] top-[17%] h-[30px] w-[30px] border-2 border-blue-500 p-[5px] rounded-[50%]" src={img} alt="" />
        <input
          className={`outline-none mx-auto w-[70%]   rounded-[10px] text-white bg-gray-800 border pt-[10px] border-blue-500 pb-[12px] pl-[50px] text-[16px] ${isError ? 'border-2 border-red-500' : 'border-2 border-blue-500'}` }
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

      alert("welcome")
      navigate('/home')
      reset()
    }
  }



  return (
    <>

      <div className=" w-full mx-auto h-[100vh] bg-custom-radial flex items-center gap-[20%] pl-[10%] pr-[10%]">
        <form className={`flex flex-col items-center shadow-custom-shadow bg-custom-form w-[40%] h-[70%] ${errors.name || errors.email || errors.password ? 'gap-[0px]' : 'gap-[20px]'} `} onSubmit={handleSubmit(submit)}>

          <h1 className={` pt-[70px] text-[36px] text-center text-gray-200 ${errors.name || errors.email || errors.password ? 'mb-[20px]' : 'mb-[20px]'}`} >Welcome!</h1>

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
          <div className={`flex gap-5 ${errors.name || errors.email || errors.password ? 'mt-[20px]' : ''}`}>
            <button className="border-2 border-blue-500 p-[5px]" type="submit">add</button>
            <Link className="border-2 border-blue-500 p-[5px]" to="/singin">sing in</Link>
          </div>
        </form>

        <div className="flex flex-col justify-center w-[30%] ">
          <h1 className="text-[72px] text-blue-500 text-center" >VALUENT</h1>
          <div className="w-[40%] bg-blue-500 h-[3px] rounded mx-auto mb-[5px]"></div>
          <p className="text-center text-[24px] text-gray-200">Your currency dashboard</p>
        </div>

      </div>


    </>
  )
}

export default logIn
