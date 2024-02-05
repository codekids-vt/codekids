import { Reader } from '../../Reader';
import { PythonTutor } from '../../PythonTutor';

const code = '# Fill in your name as a String\nyour_name = ""\n\n# Fill in your age as an Integer\nyour_age = 0\n\n# Type a thank you message!\nyour_message = ""\n\n' +
            '# Don\'t worry about the complicated line, it\'s just creating your message.\n' +
            '# If you can figure what it\'s doing, congratulations! If not, no problem!\n' +
            'thank_you_message = ("Hello, my name is " +  your_name + " and I am " + str(your_age) + " years old.\\n" + your_message + "\\nSincerely,\\n" + your_name)\n\n' +
            'print(thank_you_message)'

export function MooseThankYou() {

    return (
        <div className='flex flex-col w-full h-full items-center font-semibold text-lg text-center gap-3'>
            <Reader text='Fill out the code template to write you thank you message!'/>
            <img width={300} height={300} src={"/LifeOfMoose/moose_with_hokie_bird.jpg"} alt='Image of Moose with Hokie Bird' />
            <PythonTutor props={{code: code}}/>
        </div>
    );
}