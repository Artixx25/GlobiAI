import React, { useEffect } from 'react';

const TileGrid = () => {
  const createTile = () => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.opacity = 1;
    return tile;
  };

  const createTiles = (quantity) => {
    const tiles = Array.from(Array(quantity)).map((tile, index) => {
      return createTile(index);
    });
    return tiles;
  };

  const createGrid = () => {
    const wrapper = document.getElementById("tiles");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const size = document.body.clientWidth > 800 ? 100 : 50;

    const columns = Math.floor(document.body.clientWidth / size);
    const rows = Math.floor(document.body.clientHeight / size);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    const quantity = columns * rows;
    const tiles = createTiles(quantity);
    tiles.forEach((tile) => {
      wrapper.appendChild(tile);
    });
  };

  useEffect(() => {
    createGrid();
    window.onresize = () => createGrid();

    return () => {
      window.onresize = null;
    };
  }, []);

  return <div id="tiles" />;
};

export default TileGrid;