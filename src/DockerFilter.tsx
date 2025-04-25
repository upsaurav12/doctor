import React, { useEffect, useState } from 'react';

const DoctorFilterUI = () => {
  const [input, setInput] = useState<string>("");
  const [doctors, setDoctors] = useState<any[]>([]);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      const data = await response.json();
      setDoctors(data);  // Save doctors into state
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctorData();  // Fetch doctors when page loads
  }, []);

  const searchWhileText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Filtered doctors based on input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={searchWhileText}
              placeholder="Search Symptoms, Doctors, Specialities, Clinics"
              className="w-full outline-none p-3 border-2 border-white rounded-[0.75rem] text-white pl-10 bg-blue-800 placeholder-white"
              data-testid="autocomplete-input"
            />
            <span className="absolute left-3 top-3 text-white">
              🔍
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 flex gap-6">
        {/* Sidebar Filters */}
        <aside className="w-1/4 space-y-6">
          {/* Sort Filter */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-bold mb-2" data-testid="filter-header-sort">Sort by</h3>
            <label className="block mb-2">
              <input type="radio" name="sort" data-testid="sort-fees" value="fees" /> Price: Low-High
            </label>
            <label className="block">
              <input type="radio" name="sort" data-testid="sort-experience" value="experience" /> Experience - Most Experience first
            </label>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold" data-testid="filter-header-speciality">Filters</h3>
              <button className="text-blue-600 text-sm">Clear All</button>
            </div>

            {/* Specialities */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Specialities</h4>
              <div className="max-h-40 overflow-auto">
                {[
                  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
                ].map((specialty) => (
                  <label key={specialty} className="block">
                    <input
                      type="checkbox"
                      value={specialty}
                      data-testid={`filter-specialty-${specialty.replace(/[\s/]/g, '-')}`}
                    /> {specialty}
                  </label>
                ))}
              </div>
            </div>

            {/* Mode of Consultation */}
            <div>
              <h4 className="font-semibold mb-2" data-testid="filter-header-moc">Mode of consultation</h4>
              <label className="block mb-1">
                <input type="radio" name="moc" data-testid="filter-video-consult" value="Video Consult" /> Video Consultation
              </label>
              <label className="block mb-1">
                <input type="radio" name="moc" data-testid="filter-in-clinic" value="In Clinic" /> In-clinic Consultation
              </label>
              <label className="block">
                <input type="radio" name="moc" value="All" /> All
              </label>
            </div>
          </div>
        </aside>

        {/* Doctor List */}
        <section className="w-3/4 space-y-4">
          {filteredDoctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-4 rounded-md shadow flex items-center justify-between"
                data-testid="doctor-card"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={doctor.image || "https://via.placeholder.com/64"}
                    alt="Doctor"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg" data-testid="doctor-name">{doctor.name}</h3>
                    <p className="text-gray-600" data-testid="doctor-specialty">{doctor.speciality}</p>
                    <p className="text-gray-500 text-sm" data-testid="doctor-experience">{doctor.experience} yrs exp.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" data-testid="doctor-fee">₹{doctor.fees}</p>
                  <button className="mt-2 border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default DoctorFilterUI;
