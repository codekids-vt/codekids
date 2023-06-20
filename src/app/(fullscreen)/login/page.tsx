// TODO: determine if we should put all of this inside of a "form page" of sorts?
export default function Login() {
  return (
    <div className="container mx-auto flex flex-col justify-center">
      {/* action is temp. -- need to replace with onSubmit later: */}
      <form action="/api/login" method="post">
        <div className="w-80 mx-auto">
          <div className="[&>*]:pb-4">
            {/* this should be exported to a component, maybe use react-hook-form? */}
            <div>
              <p>Username</p>
              <input
                type="text"
                name="username"
                className="p-1 w-full rounded-md shadow-black drop-shadow-lg" 
              />
            </div>

            <div>
              <p>Password</p>
              <input
                type="password"
                name="password"
                className="p-1 w-full rounded-md shadow-black drop-shadow-lg" 
              />
            </div>

            <div className="flex justify-between">
              <span>
                <input 
                  id="session_checkbox"
                  type="checkbox" 
                  name="long"
                />
              </span>
            </div>
          </div>

          <div className="text-center">
            <input 
              type="submit"
              className="w-auto py-1 px-12 text-white bg-blue-500 shadow-blue-500/50 shadow-lg rounded-md" 
            />
          </div>
        </div>
      </form>
    </div>
  );
}
