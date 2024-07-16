          <div
            key={items._id}
            className="mx-auto max-w-screen-lg md:max-w-screen-md"
          >
            <div className="grid md:grid-cols-1 lg:grid-cols-1 justify-center">
              <div className="w-full md:w-5/12 lg:w-11/12">
                <div className="mb-3 flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <img style={{height:"180px",width:"180px"}}
                    className="object-cover w-1/3 rounded-l-lg md:w-48"
                    src={items.image}
                    alt=""
                  />
                  <div className="p-4 w-2/3">
                    <h6 className="font-bold mb-2 text-gray-900 dark:text-white">
                      {items.name}
                    </h6>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Graduation Year: {items.YearOfGraduation}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Profile: {items.Role}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Company: {items.CurrentCompany}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Experience: {items.Experience}
                    </p>
                  </div>
                  <div className="row-2">
                    <Link to={items.LinkedIn}>
                      <button
                        type="submit"
                        className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                      >
                        &nbsp;Get LinkedIn Id&nbsp;
                      </button>
                    </Link>
                    <button
                      id={`connect-button-${items._id}`}
                      onClick={() => handleConnect(items._id)}
                      className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3"
                    >
                      &nbsp;&nbsp;Connect Here&nbsp;&nbsp;
                    </button>

                    {/* <button onClick={() => handleConnect(items._id)} className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">&nbsp;&nbsp;Connect Here&nbsp;&nbsp;</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>