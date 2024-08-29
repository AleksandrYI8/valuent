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
      <div>
        <label style={{ color: isError ? "red" : "green" }}>
          {name}
        </label>
        <input
          style={{
            borderColor: isError ? "red" : "blue",
            outlineColor: isError ? "red" : "blue",
          }}
          type={type}
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
      <form onSubmit={handleSubmit(submit)}>


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

        <button type="submit">add</button>
        <Link to="/singin">sing in</Link>
      </form>

    </>
  )
}

export default logIn
