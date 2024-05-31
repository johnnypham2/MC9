import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Field must contain at least 2 Character(s)"})
      .regex(/^[a-zA-Z]+$/, {message: "First Name can only contain letters"}),
    lastName: z
      .string()
      .regex(/^[a-zA-Z]+$/, {message: "Last Name can only contain letters"}),
    age: z
      .number({ invalid_type_error: "Please enter a valid number"})
      .min(21, { message: "Age Requirement: 21+" }),
    email: z
      .string()
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 Character(s)" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onHelpSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
    <div className="myContainer">
      <h1 className="text-center">Create an Account</h1>
      <form onSubmit={handleSubmit(onHelpSubmit)}>
        <div className="myContainer">
          <label htmlFor="name" className="form-label">
            First Name
          </label>
          <input {...register("name")} id="name" type="text" className="form-control" />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input {...register("lastName")} id="lastName" type="text" className="form-control" />
          {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
          
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="text"
            className="form-control"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
          
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input {...register("email")} id="email" type="email" className="form-control" />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
          
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input {...register("password")} id="password" type="password" className="form-control" />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
          
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            className="form-control"
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
          
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      </div>
      </div>
    </>
  );
};

export default Register;