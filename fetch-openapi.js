import fs from "fs"; // Node file system module
import fetch from "node-fetch"; // fetch API for Node

// Your live Little Lemon API schema
const url = "https://little-lemon-api-bdsl.onrender.com/api/schema/";

async function download() {
  // Fetch the schema from your live API
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  
  // Convert response to JSON
  const data = await res.json();

  // Save JSON to your React 'public' folder
  fs.writeFileSync("public/openapi.json", JSON.stringify(data, null, 2));

  console.log("OpenAPI JSON saved!");
}

download();