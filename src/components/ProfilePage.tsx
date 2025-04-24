export const ProfilePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f5f8ff] flex justify-center items-center py-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 flex flex-col lg:flex-row gap-8">
        {/* Picture section */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center items-center">
          <div className="w-64 h-72 bg-gray-200 rounded-xl border-2 border-black flex justify-center items-center">
            <span className="text-sm text-black">Picture</span>
          </div>
        </div>

        {/* Form section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Label"
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Label"
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="email"
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Label"
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Pic link"
                className="w-full border-2 border-black p-3 rounded"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-end gap-4 pt-6">
            <button className="border-2 border-black px-6 py-3 rounded shadow-md">
              Save
            </button>
            <button className="border-2 border-black px-6 py-3 rounded shadow-md">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
