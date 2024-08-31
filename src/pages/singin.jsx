import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import React from "react"

function Singin() {

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
  }, []);





  function Input({ isError, name, type, register }) {

    const errormessage = isError?.message || ""

    return (
      <div>
        <label className={`${isError} ? 'text-red-500' : 'text-green-500'`}>
          {name}
        </label>
        <input
          className={`${isError ? 'border-2 border-red-500 outline-red-500' : 'border-2 border-blue-500 outline-blue-500'} `}
          type={type}
          {...register}
        />
        {isError && <span className="color-red-500" >{errormessage}</span>}
      </div>
    )
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()





  const submit = (data) => {

    const email = users.map((user) => user.email)
    const password = users.map((user) => user.password)

    console.log(email);
    console.log(password);

    if (email.some((em) => em === data.email) && password.some((em) => em === data.password)) {
      alert("welcome again")
      navigate('/home')
    } else {
      alert("неверные данные")
    }
  }



  return (
    <>
      <form className="w-full flex flex-col pl-10 gap-2" onSubmit={handleSubmit(submit)}>




        <Input
          isError={errors.email}
          name={"email"}
          type={"email"}
          register={{
            ...register("email", {

              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
                message: "Please enter the data correctly"
              },
              required: {
                value: true,
                message: "Is reqired"
              }
            })
          }}
        />

        <Input
          isError={errors.password}
          name={"password"}
          type={"password"}
          register={{
            ...register("password", {
              pattern: {
                value: /.{6,}/gi,
                message: "Please enter the data correctly"
              },
              required: {
                value: true,
                message: "Is reqired"
              }
            })
          }}
        />
        <div className="flex gap-2">
          <button className="border-2 border-blue-500 p-[5px]" type="submit">add</button>
          <Link className="border-2 border-blue-500 p-[5px]" to="/">log in</Link>
        </div>
      </form>

    </>
  )
}

export default Singin
