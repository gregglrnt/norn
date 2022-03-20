export function convertToCoordinates(lat:number, lon:number, radius:number): { x: number; y: number; z: number; } {

    lat = (90-lat)*(Math.PI/180);
    lon = (lon+180)*(Math.PI/180);

    let x = -(radius * Math.sin(lat)*Math.cos(lon));
    let z = (radius* Math.sin(lat)*Math.sin(lon));
    let y = (radius*Math.cos(lat));
    return {x, y, z};

}