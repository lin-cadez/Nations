// commodities.js

const commodities = [
    // Oil Page Objects
  { name: 'Oil Drill', cost: 20, production: 1, icon: 'icons/oil.png', tab: 'oil' },
  { name: 'Sea Oil Platform', cost: 800, production: 90, icon: 'icons/rig.png', tab: 'oil' },
  { name: 'Oil Field', cost: 5000, production: 500, icon: 'icons/oil-refinery.png', tab: 'oil' },

  // Farm Page Objects
  { name: 'Small Tractor', cost: 50, production: 10, icon: 'icons/tractor_small.svg', tab: 'farm' },
  { name: 'Big Tractor', cost: 500, production: 100, icon: 'icons/tractor_big.svg', tab: 'farm' },
  { name: 'Farmer', cost: 200, production: 50, icon: 'icons/farmer.svg', tab: 'farm' },
  { name: 'Combine', cost: 1000, production: 200, icon: 'icons/combine_harvester.svg', tab: 'farm' },
  { name: 'Fertilizer', cost: 300, production: 0, message:"0.0001% increase in growth speed",  icon: 'icons/fertilizer.svg', tab: 'farm' },
];
  
  export default commodities;
  