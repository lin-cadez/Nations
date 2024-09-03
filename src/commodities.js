// commodities.js

const commodities = [
    // Oil Page Objects
  { name: 'Oil Drill', cost: 200, production: 5, icon: 'icons/oil.png', tab: 'oil' },
  { name: 'Sea Oil Platform', cost: 1200, production: 90, icon: 'icons/rig.png', tab: 'oil' },
  { name: 'Oil Field', cost: 87000, production: 950, icon: 'icons/oil-refinery.png', tab: 'oil' },

  // Farm Page Objects
  { name: 'Farmer', cost: 8000, production: 6, icon: 'icons/farmer.svg', tab: 'farm' },
  { name: 'Small Tractor', cost: 30000, production: 10, icon: 'icons/tractor_small.svg', tab: 'farm' },
  { name: 'Big Tractor', cost: 120000, production: 100, icon: 'icons/tractor_big.svg', tab: 'farm' },
  { name: 'Combine', cost: 340000, production: 600, icon: 'icons/combine_harvester.svg', tab: 'farm' },
  { name: 'Fertilizer', cost: 600, production: 0, message:"0.0001% increase in growth speed",  icon: 'icons/fertilizer.svg', tab: 'farm' },
];
  
  export default commodities;
  