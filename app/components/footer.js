import { GraduationCap, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
        {/* Company Info */}
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-white-900">
              Material
            </span>
          </div>
          <p className="text-sm sm:text-base max-w-md lg:max-w-xs">
            Empowering learners through accessible and engaging online
            education. Byway is a leading online learning platform dedicated to
            providing high-quality, flexible, and affordable educational
            experiences.
          </p>
        </div>

        {/* Get Help */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg">Get Help</h3>
          <ul className="space-y-2.5">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                Latest Articles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Programs */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg">Levels</h3>
          <ul className="space-y-2.5">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                Level 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                Level 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                Level 3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200 text-sm sm:text-base inline-block"
              >
                Level 4
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg">Contact Us</h3>
          <div className="space-y-3">
            <p className="text-sm sm:text-base">
              Address: 123 Main Street, Anytown, CA 12345
            </p>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Phone className="flex-shrink-0" size={16} />
              Tel: +1 (123) 456-7890
            </p>
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Mail className="flex-shrink-0" size={16} />
              Mail: byway.edu@webblui.in
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <span className="sr-only">Facebook</span>f
                </div>
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                  <span className="sr-only">GitHub</span>g
                </div>
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                  <span className="sr-only">Google</span>G
                </div>
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200">
                  <span className="sr-only">Twitter</span>t
                </div>
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                  <span className="sr-only">Microsoft</span>m
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
