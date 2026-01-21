import { TextareaHTMLAttributes } from 'react';

const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className={`w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition resize-none max-h-32 text-sm ${props.className || ''} text-base`}
    />
  );
};

export default Textarea