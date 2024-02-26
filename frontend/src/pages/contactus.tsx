import React, { useState } from 'react';
import Background from '../components/Background';
import { useNavigate } from 'react-router-dom';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ name, email, subject, message });
    navigate('/');
  };

  return (
    <>
      <Background />
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="p-2 text-center text-2xl font-bold leading-9 tracking-tight text-primary-green">
            Contact Us
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-6 shadow-lg rounded-2xl sm:px-12 border-2 border-primary-green">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                Subject
              </label>
              <div className="p-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="p-2 w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                Message
              </label>
              <div className="p-2">
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-2 w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-2">
              <a href={`mailto:sallyh84@vt.edu?subject=${subject}&body=${message + encodeURI("\n\nRegards,\n") + name}`} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-green hover:bg-primary-green-dark focus:outline-none focus:border-primary-green focus:shadow-outline-primary-green active:bg-primary-green-dark transition duration-150 ease-in-out">
                Send Message
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
