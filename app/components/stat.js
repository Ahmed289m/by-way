function Stat() {
  const stats = [
    { number: "250+", text: "Courses by our best mentors" },
    { number: "1000+", text: "Courses by mentors" },
    { number: "15+", text: "Courses by our best mentors" },
    { number: "2400+", text: "Courses by our best mentors" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {stat.number}
            </div>
            <div className="mt-2 text-sm text-gray-500">{stat.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stat;
