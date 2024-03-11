import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Implement login logic here using data.username and data.password
    console.log('username:', data.username);
    console.log('password:', data.password);
    // Replace with your actual API call and error handling
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username:</label>
      <input
        {...register('username', { required: 'Username is required' })}
        type="text"
        id="username"
      />
      {errors.username && <p className="error">{errors.username.message}</p>}

      <label htmlFor="password">Password:</label>
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        id="password"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;