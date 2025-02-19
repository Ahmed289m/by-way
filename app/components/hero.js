function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Unlock Your Potential</span>
                <span className="block text-blue-600">with Byway</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Welcome to Byway, where learning knows no bounds. We believe
                that education is the key to personal and professional growth.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    Start your discovery journey
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
          <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute w-full h-full ">
                <img
                  style={{ top: 0, left: 0 }}
                  className="absolute mx-auto z-10"
                  src="/back_ground_of_hero_img.png"
                  alt="student"
                />
                <img
                  style={{
                    top: -30,
                    left: 0,
                    clipPath: "inset(0 0 9% 0)",
                  }}
                  className="absolute mx-auto z-10 "
                  src="/hero_image.png"
                  alt="student"
                />
                <img
                  src="/marks_of_back_of_hero.png"
                  style={{ top: 0, right: 0 }}
                  className="absolute "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
