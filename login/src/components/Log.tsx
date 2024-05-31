import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 Character(s)" }),
});

type FormData = z.infer<typeof schema>;

const Log = () => {
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
          <h1 className="text-center">Sign in</h1>
          <form onSubmit={handleSubmit(onHelpSubmit)}>
            <div className="myContainer">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="form-control"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
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

export default Log;
