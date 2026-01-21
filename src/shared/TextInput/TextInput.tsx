import { InputHTMLAttributes } from 'react';

const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition text-sm ${props.className || ''}`}
    />
  );
};

export default TextInput