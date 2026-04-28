const carParts = {
  exterior: {
    label: 'Exterior',
    description: 'The outside body parts of the car',
    icon: '🚗',
    color: '#0C447C',
    bg: '#E6F1FB',
    border: '#378ADD',
    parts: [
      {
        id: 'ext1',
        name: 'Front Bumper',
        shortDesc: 'Absorbs impact in low-speed collisions to protect the car body and engine.',
        image: '/assets/car-parts/exterior/front-bumper.png',
      },
      {
        id: 'ext2',
        name: 'Rear Bumper',
        shortDesc: 'Protects the back of the car from minor impacts and houses the tail lights.',
        image: '/assets/car-parts/exterior/rear-bumper.png',
      },
      {
        id: 'ext3',
        name: 'Bonnet',
        shortDesc: 'The cover over the engine bay. Lift it to access the engine for checks and maintenance.',
        image: '/assets/car-parts/exterior/bonnet.png',
      },
      {
        id: 'ext4',
        name: 'Headlights',
        shortDesc: 'Illuminate the road ahead at night. Always use them in low visibility conditions.',
        image: '/assets/car-parts/exterior/headlights.png',
      },
      {
        id: 'ext5',
        name: 'Tail Lights',
        shortDesc: 'Red lights at the rear that show the car is present. Brake lights brighten when you stop.',
        image: '/assets/car-parts/exterior/tail-lights.png',
      },
      {
        id: 'ext6',
        name: 'Side Mirrors',
        shortDesc: 'Allow the driver to see traffic behind and beside the car. Adjust before driving.',
        image: '/assets/car-parts/exterior/side-mirrors.png',
      },
      {
        id: 'ext7',
        name: 'Windscreen',
        shortDesc: 'The front glass panel. Protects occupants from wind, rain and debris while driving.',
        image: '/assets/car-parts/exterior/windscreen.png',
      },
      {
        id: 'ext8',
        name: 'Wipers',
        shortDesc: 'Clear rain and dirt from the windscreen. Always check they work before driving in rain.',
        image: '/assets/car-parts/exterior/wipers.png',
      },
      {
        id: 'ext9',
        name: 'Tyres',
        shortDesc: 'Provide grip between the car and road. Check pressure and tread depth regularly.',
        image: '/assets/car-parts/exterior/tyres.png',
      },
      {
        id: 'ext10',
        name: 'Fuel Cap',
        shortDesc: 'Seals the fuel tank opening. Always close it tightly after refuelling to prevent leaks.',
        image: '/assets/car-parts/exterior/fuel-cap.png',
      },
    ],
  },

  engineBay: {
    label: 'Engine Bay',
    description: 'Parts found under the bonnet',
    icon: '⚙️',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
    parts: [
      {
        id: 'eng1',
        name: 'Engine',
        shortDesc: 'The heart of the car. Burns fuel to generate power that moves the vehicle.',
        image: '/assets/car-parts/engine-bay/engine.png',
      },
      {
        id: 'eng2',
        name: 'Battery',
        shortDesc: 'Provides electrical power to start the engine and run lights and electronics.',
        image: '/assets/car-parts/engine-bay/battery.png',
      },
      {
        id: 'eng3',
        name: 'Radiator',
        shortDesc: 'Cools the engine by circulating coolant fluid. Prevents the engine from overheating.',
        image: '/assets/car-parts/engine-bay/radiator.png',
      },
      {
        id: 'eng4',
        name: 'Oil Cap',
        shortDesc: 'Seals the engine oil compartment. Remove to top up engine oil during maintenance.',
        image: '/assets/car-parts/engine-bay/oil-cap.png',
      },
      {
        id: 'eng5',
        name: 'Brake Fluid Reservoir',
        shortDesc: 'Holds brake fluid that transfers pressure from the pedal to the brakes. Check level regularly.',
        image: '/assets/car-parts/engine-bay/brake-fluid-reservoir.png',
      },
      {
        id: 'eng6',
        name: 'Air Filter',
        shortDesc: 'Cleans the air entering the engine. A dirty filter reduces engine performance.',
        image: '/assets/car-parts/engine-bay/air-filter.png',
      },
      {
        id: 'eng7',
        name: 'Alternator',
        shortDesc: 'Generates electricity while the engine runs. Keeps the battery charged while driving.',
        image: '/assets/car-parts/engine-bay/alternator.png',
      },
      {
        id: 'eng8',
        name: 'Fan Belt',
        shortDesc: 'A rubber belt that drives the alternator, water pump and other components. Must not be worn or cracked.',
        image: '/assets/car-parts/engine-bay/fan-belt.png',
      },
    ],
  },

  interior: {
    label: 'Interior Controls',
    description: 'Controls and instruments inside the car',
    icon: '🪑',
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#1D9E75',
    parts: [
      {
        id: 'int1',
        name: 'Steering Wheel',
        shortDesc: 'Controls the direction of the car. Always hold with both hands in the 9 and 3 position.',
        image: '/assets/car-parts/interior/steering-wheel.png',
      },
      {
        id: 'int2',
        name: 'Clutch Pedal',
        shortDesc: 'Left pedal on manual cars. Press it to disconnect the engine before changing gears.',
        image: '/assets/car-parts/interior/clutch-pedal.png',
      },
      {
        id: 'int3',
        name: 'Brake Pedal',
        shortDesc: 'Middle pedal. Press to slow down or stop the car. Apply gradually for smooth stopping.',
        image: '/assets/car-parts/interior/brake-pedal.png',
      },
      {
        id: 'int4',
        name: 'Accelerator',
        shortDesc: 'Right pedal. Press to increase engine speed and move the car faster.',
        image: '/assets/car-parts/interior/accelerator.png',
      },
      {
        id: 'int5',
        name: 'Gear Lever',
        shortDesc: 'Changes the gear ratio between engine and wheels. Higher gears for higher speeds.',
        image: '/assets/car-parts/interior/gear-lever.png',
      },
      {
        id: 'int6',
        name: 'Handbrake',
        shortDesc: 'Keeps the car stationary when parked. Always apply on a slope. Release before moving.',
        image: '/assets/car-parts/interior/handbrake.png',
      },
      {
        id: 'int7',
        name: 'Dashboard',
        shortDesc: 'Displays all warning lights and instrument readings. Never ignore a warning light.',
        image: '/assets/car-parts/interior/dashboard.png',
      },
      {
        id: 'int8',
        name: 'Speedometer',
        shortDesc: 'Shows your current speed in km/h. Always keep within the posted speed limit.',
        image: '/assets/car-parts/interior/speedometer.png',
      },
      {
        id: 'int9',
        name: 'Rear View Mirror',
        shortDesc: 'Shows traffic directly behind you. Adjust it so you can see clearly before driving.',
        image: '/assets/car-parts/interior/rear-view-mirror.png',
      },
    ],
  },
}

export default carParts