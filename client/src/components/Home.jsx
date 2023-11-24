import PropTypes from 'prop-types';

export default function Home({ user }) {

    return (
        <div className="bg-gray-900 text-slate-200 h-screen flex justify-center items-center">
            <div className=" bg-slate-800 h-screen w-1/3 overflow-auto flex flex-col">
                <div className=" bg-slate-950 h-[6rem] flex items-center justify-between px-8">
                    <div>
                        <div>Welcome,</div>
                        <div className=' text-2xl font-bold underline' >{user.first_name}</div>
                    </div>
                    <div className=' rounded-xl opacity-50 hover:opacity-100 p-2 transition-all duration-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div>messages</div>
                </div>
            </div>
            <div className=" bg-slate-600 h-screen w-2/3 overflow-auto p-2 flex flex-col">
                <div className='flex-grow'>chat</div>
                <div className='flex gap-2'>
                    <input type="text" placeholder='Type yout message here' className=' bg-white border p-2 flex-grow rounded-md' />
                    <button className=' bg-slate-950 p-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    user: PropTypes.object.isRequired,
}