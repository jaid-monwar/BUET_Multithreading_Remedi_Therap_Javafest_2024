export default function Trusted() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by the country's best medical experts
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Ministry of Health"
            // src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
            src="bdministry.jpg"
            width={258}
            height={148}
            className="col-span-2 max-h-35 w-full object-contain lg:col-span-1"
          />
          <img
            alt="NIANER"
            // src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
            src="nianer.png"
            width={258}
            height={148}
            className="col-span-2 max-h-35 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Square Hospital"
            // src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
            src="squarehos.png"
            width={258}
            height={148}
            className="col-span-2 max-h-35 w-full object-contain lg:col-span-1"
          />
          <img
            alt="United Hospital"
            // src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
            src="unitedhos.png"
            width={258}
            height={148}
            className="col-span-2 max-h-35 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Ibn Sina Hispital"
            // src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
            src="ibnsinahos.jpg"
            width={258}
            height={148}
            className="col-span-2 col-start-2 max-h-25 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  );
}
