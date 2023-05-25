import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  console.log(errors);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg ">
        <h3 className=" font-bold text-lg text-gray-800 text-center">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid gap-3 mt-5 px-5"
        >
          <input
            {...register("email", {
              required: "필수항목입니다.",
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
            placeholder="이메일"
            type="email"
            className="input"
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="유효하지 않은 이메일입니다." />
          )}
          <input
            {...register("password", {
              required: "필수항목입니다.",
              minLength: 5,
              maxLength: 9,
            })}
            placeholder="5글자이상 9글자이하의 비밀번호"
            type="password"
            className="input"
            required
          />
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="5글자이상 입력하세요" />
          )}
          {errors.password?.type === "maxLength" && (
            <FormError errorMessage="9글자이하로 입력하세요" />
          )}
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
