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





  function Input({ isError, name, type, register }) {

    const errorMessage = isError?.message || '';

    return (
      <div className="flex flex-col w-full">
        <input
          className={`w-[80%] mb-[20px] rounded-[10px] text-white bg-gray-600 mx-auto pt-[12px] pb-[12px] pl-[20px] text-[16px] ${isError ? 'border-2 border-red-500 outline-red-500' : 'border-2 border-blue-500 outline-blue-500'}`}
          type={type}
          placeholder={name}
          {...register}
        />
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </div>
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

      <div className="w-full mx-auto h-[100vh] bg-custom-radial flex justify-between pl-[10%] pr-[10%]">
        <form className="bg-blue-500 w-[40%] h-[70%]" onSubmit={handleSubmit(submit)}>

          <h1 className=" pt-[80px] text-[36px] text-center text-gray-200 mb-[70px]" >Welcome!</h1>

          <Input
            isError={errors.name}
            name="Name"
            type="text"
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
          <div className="flex gap-5">
            <button className="border-2 border-blue-500 p-[5px]" type="submit">add</button>
            <Link className="border-2 border-blue-500 p-[5px]" to="/singin">sing in</Link>
          </div>
        </form>

        <div className="w-[30%] ">
          <h1 className="text-[72px] text-blue-500 text-center" >VALUENT</h1>
          <div className="w-[40%] bg-blue-500 h-[3px] rounded mx-auto mb-[5px]"></div>
          <p className="text-center text-[24px] text-gray-200">Your currency dashboard</p>
        </div>

      </div>


    </>
  )
}

export default logIn
