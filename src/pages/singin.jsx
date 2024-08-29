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





  function Input({ isError, name, type, register}) {

    const errormessage = isError?.message || ""

    return (
      <div>
        <label style={{ color: isError ? "red" : "green" }}>
          {name}
        </label>
        <input
          style={{
            borderColor: isError ? "red" : "blue",
            outlineColor: isError ? "red" : "blue"
          }}
          type={type}
          {...register}
        />
        {isError && <span style={{color: "red"}} >{errormessage}</span>}
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
      <form onSubmit={handleSubmit(submit)}>


        

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

        <button type="submit">add</button>
      <Link to="/">log in</Link>
      </form>

    </>
  )
}

export default Singin
  