const TOTAL_COUNT = 300;

export const susolvkaCoords = { lat: 29.2500, lng: 47.4818 };

export const markersData = [...Array(TOTAL_COUNT)].fill(0) // fill(0) for loose mode
    .map((__, index) => ({
        id: index,
        lat: susolvkaCoords.lat + 0.02 * index * Math.sin(30 * Math.PI * index / 180) * Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
        lng: susolvkaCoords.lng + 0.02 * index * Math.cos(70 + 23 * Math.PI * index / 180) * Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
    }));

